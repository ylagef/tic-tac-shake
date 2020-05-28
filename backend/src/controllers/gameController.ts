import { Game } from "../models/game.model";
import { Box } from "../models/box.model";

function getFillingArray(game: Game, playerValue: string): {} {
    // Rows
    const r1 = game.boxes.filter(b => [0, 1, 2].includes(b.position) && b.value === playerValue).length;
    const r2 = game.boxes.filter(b => [3, 4, 5].includes(b.position) && b.value === playerValue).length;
    const r3 = game.boxes.filter(b => [6, 7, 8].includes(b.position) && b.value === playerValue).length;

    // Cols
    const c1 = game.boxes.filter(b => [0, 3, 6].includes(b.position) && b.value === playerValue).length;
    const c2 = game.boxes.filter(b => [1, 4, 7].includes(b.position) && b.value === playerValue).length;
    const c3 = game.boxes.filter(b => [2, 5, 8].includes(b.position) && b.value === playerValue).length;

    // Diagonals
    const d1 = game.boxes.filter(b => [0, 4, 8].includes(b.position) && b.value === playerValue).length;
    const d2 = game.boxes.filter(b => [2, 4, 6].includes(b.position) && b.value === playerValue).length;

    return { r1, r2, r3, c1, c2, c3, d1, d2 };
}

function getAvailableLines(game: Game, playerValue: string): boolean[] {
    const fillingArray = getFillingArray(game, playerValue);

    return [
        !game.boxes[0].value && (fillingArray['r1'] > 1 || fillingArray['c1'] > 1 || fillingArray['d1'] > 1), !game.boxes[1].value && (fillingArray['r1'] > 1 || fillingArray['c2'] > 1), !game.boxes[2].value && (fillingArray['r1'] > 1 || fillingArray['c3'] > 1 || fillingArray['d2'] > 1),
        !game.boxes[3].value && (fillingArray['r2'] > 1 || fillingArray['c1'] > 1), !game.boxes[4].value && (fillingArray['r2'] > 1 || fillingArray['c2'] > 1 || fillingArray['d1'] > 1 || fillingArray['d2'] > 1), !game.boxes[5].value && (fillingArray['r2'] > 1 || fillingArray['c3'] > 1),
        !game.boxes[6].value && (fillingArray['r3'] > 1 || fillingArray['c1'] > 1 || fillingArray['d2'] > 1), !game.boxes[7].value && (fillingArray['r3'] > 1 || fillingArray['c2'] > 1), !game.boxes[8].value && (fillingArray['r3'] > 1 || fillingArray['c3'] > 1 || fillingArray['d1'] > 1)
    ];
}

function getEndedGame(game: Game, playerValue: string): string {
    const fillingArray = getFillingArray(game, playerValue);

    if (fillingArray['r1'] === 3 || fillingArray['r2'] === 3 || fillingArray['r3'] === 3 || fillingArray['c1'] === 3 || fillingArray['c2'] === 3 || fillingArray['c3'] === 3 || fillingArray['d1'] === 3 || fillingArray['d2'] === 3) {
        // Three-in-line achieved
        if (fillingArray['r1'] === 3) {
            return 'r1';
        } else if (fillingArray['r2'] === 3) {
            return 'r2';
        } else if (fillingArray['r3'] === 3) {
            return 'r3';
        } else if (fillingArray['c1'] === 3) {
            return 'c1';
        } else if (fillingArray['c2'] === 3) {
            return 'c2';
        } else if (fillingArray['c3'] === 3) {
            return 'c3';
        } else if (fillingArray['d1'] === 3) {
            return 'd1';
        } else if (fillingArray['d2'] === 3) {
            return 'd2';
        }
    }

    return null;
}

function getBetterAiMove(game: Game): number {
    const fillingArray = getFillingArray(game, 'o');

    const movements = [
        !game.boxes[0].value ? (fillingArray['r1'] + fillingArray['c1'] + fillingArray['d1']) : -1, !game.boxes[1].value ? (fillingArray['r1'] + fillingArray['c2']) : -1, !game.boxes[2].value ? (fillingArray['r1'] + fillingArray['c3'] + fillingArray['d2']) : -1,
        !game.boxes[3].value ? (fillingArray['r2'] + fillingArray['c1']) : -1, !game.boxes[4].value ? (fillingArray['r2'] + fillingArray['c2'] + fillingArray['d1'] + fillingArray['d2']) : -1, !game.boxes[5].value ? (fillingArray['r2'] + fillingArray['c3']) : -1,
        !game.boxes[6].value ? (fillingArray['r3'] + fillingArray['c1'] + fillingArray['d2']) : -1, !game.boxes[7].value ? (fillingArray['r3'] + fillingArray['c2']) : -1, !game.boxes[8].value ? (fillingArray['r3'] + fillingArray['c3'] + fillingArray['d1']) : -1
    ];

    const max = Math.max(...movements);
    const validIndexes = [];
    for (let i = 0; i < movements.length; i++) {
        if (movements[i] === max) {
            validIndexes.push(i);
        }
    }

    return validIndexes[Math.floor(Math.random() * validIndexes.length)];
}

function validGame(data: any) {
    if (data.boxes !== undefined && data.boxes instanceof Array) {
        let validBoxes = true;
        let index = 0;
        data.boxes.forEach((b: any) => {
            if (!validBox(b) || b.position !== index) {
                // One box is not valid
                validBoxes = false;
            }

            index++;
        });

        if (!validBoxes) {
            return false;
        }
    } else {
        // Boxes is undefined or not array
        return false;
    }

    if (data.players !== undefined && data.players instanceof Array) {
        let validPlayers = true;
        data.players.forEach((p: any) => {
            if (!validPlayer(p)) {
                // One player is not valid
                validPlayers = false;
            }
        });

        if (!validPlayers) {
            return false;
        }
    } else {
        // Players is undefined or not array
        return false;
    }

    return (data.state !== undefined && validState(data.state) && data.currentPlayer !== undefined && validPlayer(data.currentPlayer));
}

function validBox(data: any) {
    return (data.position !== undefined && typeof data.position === 'number' && data.value !== undefined && [null, 'x', 'o'].includes(data.value));
}

function validPlayer(data: any) {
    return (data.piece !== undefined && ['x', 'o'].includes(data.piece));
}

function validState(state: string) {
    return (['preparing', 'playing', 'ended'].includes(state));
}

class GameController {
    static getNextMove(req: any, res: any) {
        if (!req.body.game || !req.body.box || !validGame(req.body.game) || !validBox(req.body.box)) {
            return res.status(400).send('Bad format.');
        }

        const game: Game = req.body.game;
        let box: Box = req.body.box;

        const response = {};
        response['boxes'] = [];

        // Player 1 movement
        box.value = 'x';
        game.boxes.find(b => b.position === box.position).value = 'x';
        response['boxes'].push(box);

        const pEnded = getEndedGame(game, 'x');

        if (pEnded !== null) {
            // Player 1 filled a line, so game ended and player 1 is the winner
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
                    // Better ai movement without ending
                    index = getBetterAiMove(game);
                }

                const iaBox = game.boxes.find(b => b.position === index);
                iaBox.value = 'o';
                response['boxes'].push(iaBox);

                const aiEnded = getEndedGame(game, 'o');
                if (aiEnded !== null) {
                    // Ai filled a line, so game ended and ai is the winner
                    response['ended'] = { player: 'o', line: aiEnded };
                }
            }
        }

        if (game.boxes.filter(b => b.value === null).length === 0 && !response['ended']) {
            // Draws: No free boxes and not ended
            response['ended'] = null;
        }

        return res.status(200).send(response);
    }
}

export default GameController;