import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Box } from 'src/app/shared/models/box.model';
import { GameService } from 'src/app/shared/services/game.service';
import { Game } from 'src/app/shared/models/game.model';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  @Input() game: Game;
  @Input() box: Box;
  @Input() loading: boolean;
  @Output() loadingChange = new EventEmitter<boolean>();
  @Input() endedLine: number[];

  @Output() clickEmitter = new EventEmitter<Box>();

  constructor() { }

  ngOnInit(): void {
    // Wait until animations are done
    setTimeout(() => this.loadingChange.emit(false), 2000);
  }

  public handleClick(): void {
    this.clickEmitter.emit(this.box);
  }

  public getEnded(type: string): {} {
    let style;

    if (this.endedLine && this.endedLine.includes(this.box.position)) {
      style = {
        animation: (type === 'o') ? 'o-winner 1s forwards' : 'x-winner 1s forwards'
      };
    } else if (this.endedLine && !this.endedLine.includes(this.box.position)) {
      style = {
        animation: (type === 'o') ? 'o-not-winner 1s forwards' : 'x-not-winner 1s forwards'
      };
    }

    return style;
  }
}
