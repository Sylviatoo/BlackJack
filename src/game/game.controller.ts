import { Controller, Get, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  createGame() {
    return this.gameService.createGame();
  }

  @Post(':gameId/draw')
  drawCard(@Param('gameId') gameId: string) {
     console.log(`Drawing card for gameId: ${gameId}`);
    return this.gameService.drawCard(gameId);
  }

  @Post(':gameId/stop')
  stopGame(@Param('gameId') gameId: string) {
    return this.gameService.stopGame(gameId);
  }

  @Get(':gameId')
  getGameStatus(@Param('gameId') gameId: string) {
    return this.gameService.getGameStatus(gameId);
  }
}
