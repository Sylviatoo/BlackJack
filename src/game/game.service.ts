import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

interface Card {
  value: string;
  suit: string;
  code: string;
}

export type GameState = {
  gameId: string;
  playerHand: Card[];
  playerScore: number;
  dealerHand: Card[];
  dealerScore: number;
  hiddenDealerCard: Card;
  status: string;
};

@Injectable()
export class GameService {
  private games: Record<string, GameState> = {}; 

  constructor(private readonly httpService: HttpService) {}

  async createGame(): Promise<GameState> {
    const response = await lastValueFrom(
      this.httpService.post(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
      ),
    );
    const gameId = response.data.deck_id;

    const playerCards = await this.drawCards(gameId, 2);
    const dealerCards = await this.drawCards(gameId, 2);

    const gameState: GameState = {
      gameId,
      playerHand: playerCards,
      playerScore: this.calculateScore(playerCards),
      dealerHand: [dealerCards[0]], 
      dealerScore: this.calculateScore([dealerCards[0]]),
      hiddenDealerCard: dealerCards[1],
      status: 'In Progress',
    };

    this.games[gameId] = gameState;
    return gameState;
  }

  async drawCard(gameId: string): Promise<GameState> {
    const game = this.games[gameId];
    if (!game || game.status !== 'In Progress') {
      throw new NotFoundException('Game not found or already finished');
    }

    const newCard = await this.drawCards(gameId, 1);
    game.playerHand.push(...newCard);
    game.playerScore = this.calculateScore(game.playerHand);

    if (game.playerScore > 21) {
      game.status = 'Lost';
    }

    return game;
  }

  async stopGame(gameId: string): Promise<GameState> {
    const game = this.games[gameId];
    if (!game || game.status !== 'In Progress') {
      throw new NotFoundException('Game not found or already finished');
    }

    game.dealerHand.push(game.hiddenDealerCard);
    game.dealerScore = this.calculateScore(game.dealerHand);

    while (game.dealerScore < game.playerScore && game.dealerScore <= 21) {
      const card = await this.drawCards(gameId, 1);
      game.dealerHand.push(card[0]);
      game.dealerScore = this.calculateScore(game.dealerHand);
    }

    if (game.dealerScore > 21) {
      game.status = 'Won';
    } else if (game.dealerScore === game.playerScore) {
      game.status = 'Draw';
    } else if (game.dealerScore > game.playerScore) {
      game.status = 'Lost';
    }

    return game;
  }

  async getGameStatus(gameId: string): Promise<GameState> {
    const game = this.games[gameId];
    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }

  private async drawCards(gameId: string, count: number): Promise<Card[]> {
    const response = await lastValueFrom(
      this.httpService.get(
        `https://deckofcardsapi.com/api/deck/${gameId}/draw/?count=${count}`,
      ),
    );
    return response.data.cards;
  }

  private calculateScore(hand: Card[]): number {
    let score = 0;
    let aceCount = 0;

    hand.forEach((card) => {
      if (['JACK', 'QUEEN', 'KING'].includes(card.value)) {
        score += 10;
      } else if (card.value === 'ACE') {
        aceCount += 1;
        score += 11; 
      } else {
        score += parseInt(card.value);
      }
    });

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount -= 1;
    }

    return score;
  }
}
