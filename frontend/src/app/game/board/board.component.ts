import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { Box } from 'src/app/shared/models/box.model';
import { Player } from 'src/app/shared/models/player.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() game: Game;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.game);
  }
}
