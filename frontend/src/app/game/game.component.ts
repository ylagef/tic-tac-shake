import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/models/game.model';
import { Player } from '../shared/models/player.model';
import { Box } from '../shared/models/box.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public game: Game;

  constructor() { }

  ngOnInit(): void {
    this.gameInitialization();
  }

  private gameInitialization(): void {
    this.game = new Game();
    this.game.state = 'preparing';
    this.boxesInitialization();
    this.playersInitialization();
  }

  private boxesInitialization(): void {
    this.game.boxes = [];
    for (let i = 0; i < 9; i++) {
      const b = new Box();
      b.position = i;
      b.value = null;

      this.game.boxes.push(b);
    }
    console.log(this.game.boxes);
  }

  private playersInitialization(): void {
    const p1 = new Player();
    p1.piece = 'x';

    const p2 = new Player();
    p2.piece = 'o';

    this.game.players = [p1, p2];
    this.game.currentPlayer = p1;
  }

}
