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
    let ended;

    if (this.endedLine && this.endedLine.includes(this.box.position)) {
      ended = {
        animation: (type === 'o') ? 'o-winner 1s forwards' : 'x-winner 1s forwards'
      };
    } else if (this.endedLine && !this.endedLine.includes(this.box.position)) {
      ended = {
        animation: (type === 'o') ? 'o-not-winner 1s forwards' : 'x-not-winner 1s forwards'
      };
    }

    return ended;
  }
  public getBorders(): {} {
    let borders;

    switch (this.box.position) {
      case 1:
      case 7:
        borders = {
          'background-image': 'none, linear-gradient(to bottom, white 100%, white 100%), none, linear-gradient(to bottom, white 100%, white 100%)',
          'animation-delay': '1s'
        };
        break;
      case 3:
      case 5:
        borders = {
          'background-image': 'linear-gradient(to right, white 100%, white 100%), none, linear-gradient(to right, white 100%, white 100%), none',
          'animation-delay': '1s'
        };
        break;
      case 4:
      case 4:
        borders = { 'background-image': 'linear-gradient(to right, white 100%, white 100%), linear-gradient(to bottom, white 100%, white 100%), linear-gradient(to right, white 100%, white 100%), linear-gradient(to bottom, white 100%, white 100%)' };
        break;
    }

    return borders;
  }
}
