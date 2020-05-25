import { Box } from './box.model';
import { Player } from './player.model';

export class Game {
    boxes: Box[];
    currentPlayer: Player;
    players: Player[];
    state: 'preparing' | 'playing' | 'ended';
}
