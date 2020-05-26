import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.scss']
})
export class ScoringComponent implements OnInit {
  @Input() game: Game;

  constructor() { }

  ngOnInit(): void {
  }

  public getGameState(): string {
    const filledBoxes = this.game.boxes.filter(b => b.value !== null).length;

    let state = '';
    if (filledBoxes === 0) {
      state = 'Pulsa una casilla para comenzar a jugar';
    } else if (filledBoxes === 9) {
      state = '¡Fin de la partida!';
    } else {
      state = 'Partida en progreso...';
    }

    return state;
  }

  public getCurrentPlayer(): string {
    let player = '';

    switch (this.game.currentPlayer.piece) {
      case 'x':
        player = 'Jugador 1';
        break;
      case 'o':
        player = 'Jugador 2';
        break;
    }

    return player;
  }

}
