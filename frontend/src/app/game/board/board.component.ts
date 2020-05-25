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
export class BoardComponent implements OnInit, OnChanges {
  @Input() game: Game;
  @Output() gameChange = new EventEmitter<Game>();

  constructor(private gameService: GameService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.game);
  }

  public updateBox(box: Box) {
    // Update box
    this.game.boxes.find(b => b.position === box.position).value = box.value;

    // Update player to next player
    this.game.currentPlayer = this.game.players.find(p => p.piece !== this.game.currentPlayer.piece);

    // Update game
    this.gameChange.emit(this.game);
  }
}
