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
  @Output() boxChange = new EventEmitter<Box>();

  public animationLoaded = false;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    // Wait until animations are done
    setTimeout(() => this.animationLoaded = true, 2000);
  }

  public handleClick(): void {
    this.gameService.nextMove(this.game, this.box, this.game.currentPlayer).subscribe(
      (b: Box[]) => {
        // Update box state
        this.box.value = b[0].value;
        this.boxChange.emit(this.box);
        if (b[1]) {
          setTimeout(() => this.boxChange.emit(b[1]), 500);
        }
      }
    );
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
