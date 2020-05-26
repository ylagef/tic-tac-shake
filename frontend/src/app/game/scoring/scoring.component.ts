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
    let state = '';
    switch (this.game.state) {
      case 'preparing':
        state = 'Pulsa una casilla para comenzar a jugar';
        break;
      case 'playing':
        state = 'Partida en progreso...';
        break;
      case 'ended':
        state = '¡Fin de la partida!<br/>Pulsa una casilla para volver a jugar';
        break;
    }

    return state;
  }

  public getCurrentPlayer(): string {
    let toret;

    if (this.game.winner !== undefined) {
      if (this.game.winner !== null) {
        switch (this.game.winner.piece) {
          case 'x':
            toret = 'Jugador 1';
            break;
          case 'o':
            toret = 'Jugador 2';
            break;
        }

        toret += ', ¡has ganado!';
      } else {
        toret = 'Jugadores, esto es un empate!';
      }
    } else {
      switch (this.game.currentPlayer.piece) {
        case 'x':
          toret = 'Jugador 1';
          break;
        case 'o':
          toret = 'Jugador 2';
          break;
      }

      toret += ', es tu turno';
    }


    return toret;
  }

}
