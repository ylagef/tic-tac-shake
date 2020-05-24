import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { BoardComponent } from './board/board.component';
import { HeaderComponent } from './header/header.component';
import { ScoringComponent } from './scoring/scoring.component';
import { BoxComponent } from './board/box/box.component';

@NgModule({
  declarations: [GameComponent, BoardComponent, HeaderComponent, ScoringComponent, BoxComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
