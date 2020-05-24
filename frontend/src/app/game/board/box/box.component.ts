import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Box } from 'src/app/shared/models/box.model';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  @Input() box: Box;

  constructor() { }

  ngOnInit(): void {
  }

  public handleClick(): void {
    if (!this.box.value) {
      if (Math.random() > .5) {
        this.box.value = 'x';
      } else {
        this.box.value = 'o';
      }
    }
  }

  public getBorders(): {} {
    let borders;

    switch (this.box.position) {
      case 1:
      case 7:
        borders = { 'border-left': '3px solid white', 'border-right': '3px solid white' };
        break;
      case 3:
      case 5:
        borders = { 'border-top': '3px solid white', 'border-bottom': '3px solid white' };
        break;
      case 4:
      case 4:
        borders = { border: '3px solid white' };
        break;
    }

    return borders;
  }
}
