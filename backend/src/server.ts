import * as express from "express";
import { Game } from "./shared/models/game.model";
import { Box } from "./shared/models/box.model";
import { Player } from "./shared/models/player.model";
import cors = require('cors');
import bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
    console.log(req);
    res.send("Hello World");
});

function getAvailableLines(game: Game, playerValue: string): boolean[] {
    const r1 = game.boxes.filter(b => [0, 1, 2].includes(b.position) && b.value === playerValue).length;
    const r2 = game.boxes.filter(b => [3, 4, 5].includes(b.position) && b.value === playerValue).length;
    const r3 = game.boxes.filter(b => [6, 7, 8].includes(b.position) && b.value === playerValue).length;

    const c1 = game.boxes.filter(b => [0, 3, 6].includes(b.position) && b.value === playerValue).length;
    const c2 = game.boxes.filter(b => [1, 4, 7].includes(b.position) && b.value === playerValue).length;
    const c3 = game.boxes.filter(b => [2, 5, 8].includes(b.position) && b.value === playerValue).length;

    const d1 = game.boxes.filter(b => [0, 4, 8].includes(b.position) && b.value === playerValue).length;
    const d2 = game.boxes.filter(b => [2, 4, 6].includes(b.position) && b.value === playerValue).length;

    return [
        !game.boxes[0].value && (r1 > 1 || c1 > 1 || d1 > 1), !game.boxes[1].value && (r1 > 1 || c2 > 1), !game.boxes[2].value && (r1 > 1 || c3 > 1 || d2 > 1),
        !game.boxes[3].value && (r2 > 1 || c1 > 1), !game.boxes[4].value && (r2 > 1 || c2 > 1 || d1 > 1 || d2 > 1), !game.boxes[5].value && (r2 > 1 || c3 > 1),
        !game.boxes[6].value && (r3 > 1 || c1 > 1 || d2 > 1), !game.boxes[7].value && (r3 > 1 || c2 > 1), !game.boxes[8].value && (r3 > 1 || c3 > 1 || d1 > 1)
    ];
}

function getEndedGame(game: Game, playerValue: string): string {
    const r1 = game.boxes.filter(b => [0, 1, 2].includes(b.position) && b.value === playerValue).length;
    const r2 = game.boxes.filter(b => [3, 4, 5].includes(b.position) && b.value === playerValue).length;
    const r3 = game.boxes.filter(b => [6, 7, 8].includes(b.position) && b.value === playerValue).length;

    const c1 = game.boxes.filter(b => [0, 3, 6].includes(b.position) && b.value === playerValue).length;
    const c2 = game.boxes.filter(b => [1, 4, 7].includes(b.position) && b.value === playerValue).length;
    const c3 = game.boxes.filter(b => [2, 5, 8].includes(b.position) && b.value === playerValue).length;

    const d1 = game.boxes.filter(b => [0, 4, 8].includes(b.position) && b.value === playerValue).length;
    const d2 = game.boxes.filter(b => [2, 4, 6].includes(b.position) && b.value === playerValue).length;

    console.log([r1, r2, r3, c1, c2, c3, d1, d2]);
    if (r1 === 3 || r2 === 3 || r3 === 3 || c1 === 3 || c2 === 3 || c3 === 3 || d1 === 3 || d2 === 3) {
        // Three-in-line achieved
        if (r1 === 3) {
            return 'r1';
        } else if (r2 === 3) {
            return 'r2';
        } else if (r3 === 3) {
            return 'r3';
        } else if (c1 === 3) {
            return 'c1';
        } else if (c2 === 3) {
            return 'c2';
        } else if (c3 === 3) {
            return 'c3';
        } else if (d1 === 3) {
            return 'd1';
        } else if (d2 === 3) {
            return 'd2';
        }
    }

    return null;
}

app.post("/api/next-move", (req, res, next) => {
    const game: Game = req.body.game;
    let box: Box = req.body.box;
    const player: Player = req.body.player;

    const response = {};
    response['boxes'] = [];

    if (player.piece === 'x') {
        // Player 1 movement
        box.value = 'x';
        game.boxes.find(b => b.position === box.position).value = 'x';
        response['boxes'].push(box);

        const pEnded = getEndedGame(game, 'x');
        console.log('p ended', pEnded);

        if (pEnded !== null) {
            response['ended'] = { player: 'x', line: pEnded };
        } else {
            // Player 2
            if (game.boxes.filter(b => b.value === null).length > 1) {
                // Calculate ia termination risk (rows, cols, cross)
                const iaIndex = getAvailableLines(game, 'o').indexOf(true);

                // Calculate player termination risk (rows, cols, cross)           
                const pIndex = getAvailableLines(game, 'x').indexOf(true);

                let index;
                if (iaIndex > -1) {
                    // If ia can end
                    index = iaIndex;
                } else if (pIndex > -1) {
                    // If player can end
                    index = pIndex;
                } else {
                    // Random free position move
                    while (!index) {
                        const rand = Math.floor(Math.random() * 9);
                        if (rand < 9 && game.boxes[rand].value === null) {
                            index = rand;
                        }
                    }
                }

                const iaBox = game.boxes.find(b => b.position === index);
                iaBox.value = 'o';
                response['boxes'].push(iaBox);

                const aiEnded = getEndedGame(game, 'o');
                console.log('ai ended', aiEnded);

                if (aiEnded !== null) {
                    response['ended'] = { player: 'o', line: aiEnded };
                }
            }

        }

        if (game.boxes.filter(b => b.value === null).length === 0 && !response['ended']) {
            console.log('draws');
            response['ended'] = null;
        }

        res.status(200).send(response);
    } else {
        // Wrong player
        res.status(400).send('Wrong player');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});