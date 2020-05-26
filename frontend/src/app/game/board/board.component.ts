import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { Box } from 'src/app/shared/models/box.model';
import { Player } from 'src/app/shared/models/player.model';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() game: Game;
  @Output() gameChange = new EventEmitter<Game>();
  @Output() restartGame = new EventEmitter<boolean>();

  public loading = true;

  public endedLine: number[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void { }

  public updateBox(box: Box) {
    // Update box
    this.game.boxes.find(response => response.position === box.position).value = box.value;

    // Update player to next player
    this.game.currentPlayer = this.game.players.find(p => p.piece !== this.game.currentPlayer.piece);

    // Update game
    this.gameChange.emit(this.game);
  }

  private endGame(player: string, line: string) {
    switch (line) {
      case 'r1':
        this.endedLine = [0, 1, 2];
        break;
      case 'r2':
        this.endedLine = [3, 4, 5];
        break;
      case 'r3':
        this.endedLine = [6, 7, 8];
        break;
      case 'c1':
        this.endedLine = [0, 3, 6];
        break;
      case 'c2':
        this.endedLine = [1, 4, 7];
        break;
      case 'c3':
        this.endedLine = [2, 5, 8];
        break;
      case 'd1':
        this.endedLine = [0, 4, 8];
        break;
      case 'd2':
        this.endedLine = [2, 4, 6];
        break;
      default:
        this.endedLine = [];
        break;
    }

    this.game.state = 'ended';
    if (player) {
      this.game.winner = this.game.players.find(p => p.piece === player);
    } else {
      this.game.winner = null;
    }
    this.gameChange.emit(this.game);
    this.loading = false;
  }

  public handleClick(box: Box) {
    // Check loading in order to avoid unwanted events
    if (this.loading === false) {
      this.loading = true;

      if (this.game.state === 'ended') {
        // If game is ended, restart it
        this.endedLine = null;
        this.restartGame.emit(true);
      } else {
        // Update game state
        if (this.game.state === 'preparing') {
          this.game.state = 'playing';
        }
        // Query server for next-move processing and response
        this.gameService.nextMove(this.game, box, this.game.currentPlayer).subscribe(
          (response: any) => {
            // Update box state player 1
            box.value = response.boxes[0].value;
            this.updateBox(box);

            // Update box state player 2
            if (response.boxes[1]) {
              setTimeout(() => {
                this.updateBox(response.boxes[1]);
                this.loading = false;
              }, 500);
            } else {
              this.loading = false;
            }

            if (response.ended && response.ended.player === 'x') {
              // Player 1 wins
              this.endGame(response.ended.player, response.ended.line);
            } else if (response.ended && response.ended.player === 'o') {
              // Player 2 wins
              setTimeout(() => {
                if (response.ended && response.ended.player === 'o') {
                  this.endGame(response.ended.player, response.ended.line);
                }
              }, 500);
            } else if (response.ended === null) {
              // Draw
              this.endGame(null, null);
            }
          }
        );
      }
    }

  }
}
