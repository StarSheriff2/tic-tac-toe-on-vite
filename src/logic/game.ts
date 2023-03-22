export type GameStatus = 'idle' | 'on going' | 'ended';
export type Mark = 'X' | '0' | null;
export type BoardState = Mark[];

export const DEFAULT_BOARD = Object.freeze(
  Array.from({ length: 9 }, () => null)
);

class Game {
  private move: 'X' | '0';
  private board: BoardState;
  private status: GameStatus;
  private winner: Mark;

  private static instance: Game;

  static getInstance(): Game {
    if (Game.instance) {
      return this.instance;
    }

    this.instance = new Game();
    return this.instance;
  }

  static init() {
    return this.getInstance();
  }

  public restart() {
    this.move = 'X';
    this.status = 'idle';
    this.winner = null;
    this.board = [...DEFAULT_BOARD];
  }

  public set makeMove(cellNum: number) {
    const updatedBoard = [...this.board];
    updatedBoard.splice(cellNum, 1, this.move);
    this.board = updatedBoard;
    this.move = this.move === 'X' ? '0' : 'X';
    this.setWinner();
  }

  get currentMove() {
    return this.move;
  }

  public get boardState() {
    return this.board;
  }

  public get gameStatus() {
    return this.status;
  }

  public set gameStatus(newStatus: GameStatus) {
    this.status = newStatus;
  }

  get Winner() {
    return this.winner;
  }

  public setWinner() {
    const b = this.board;
    if (
      (b[0] === 'X' && b[1] === 'X' && b[2] === 'X') ||
      (b[3] === 'X' && b[4] === 'X' && b[5] === 'X') ||
      (b[6] === 'X' && b[7] === 'X' && b[8] === 'X') ||
      (b[0] === 'X' && b[3] === 'X' && b[6] === 'X') ||
      (b[0] === 'X' && b[4] === 'X' && b[8] === 'X') ||
      (b[1] === 'X' && b[4] === 'X' && b[7] === 'X') ||
      (b[2] === 'X' && b[5] === 'X' && b[8] === 'X') ||
      (b[2] === 'X' && b[4] === 'X' && b[6] === 'X')
    ) {
      this.winner = 'X';
    }
    if (
      (b[0] === '0' && b[1] === '0' && b[2] === '0') ||
      (b[3] === '0' && b[4] === '0' && b[5] === '0') ||
      (b[6] === '0' && b[7] === '0' && b[8] === '0') ||
      (b[0] === '0' && b[3] === '0' && b[6] === '0') ||
      (b[0] === '0' && b[4] === '0' && b[8] === '0') ||
      (b[1] === '0' && b[4] === '0' && b[7] === '0') ||
      (b[2] === '0' && b[5] === '0' && b[8] === '0') ||
      (b[2] === '0' && b[4] === '0' && b[6] === '0')
    ) {
      this.winner = '0';
    }
  }

  constructor() {
    this.move = 'X';
    // this.board = Array.from({ length: 9 }, () => null);
    this.board = [...DEFAULT_BOARD];
    this.status = 'idle';
    this.winner = null;
  }
}

export default Game;
