import { useEffect, useState } from 'react';
import './App.css';
import Game, { BoardState as BoardStateType } from './logic/game';

type Marks = 'X' | '0' | null;

function App() {
  const [currentGame, setGame] = useState<Game | undefined>();
  const [boardState, setBoardState] = useState<BoardStateType | undefined>(
    undefined
  );

  const handleMakeMove = (cellNumber: number): void => {
    currentGame!.makeMove = cellNumber;
    setBoardState([...currentGame!.boardState]);
    if (currentGame?.Winner) {
      currentGame.gameStatus = 'ended';
    } else {
      currentGame!.gameStatus = 'on going';
    }
  };

  const handleRestart = () => {
    currentGame!.restart();
    setBoardState([...currentGame!.boardState]);
  };

  useEffect(() => {
    setGame(Game.init());
  }, []);

  useEffect(() => {
    if (currentGame) {
      setBoardState(currentGame.boardState);
    }
  }, [currentGame]);

  const gamePrompt = (): string => {
    const gametatus = currentGame?.gameStatus;
    const nextPlayer = currentGame?.currentMove;

    let prompt: string;
    switch (gametatus) {
      case 'idle':
        prompt = 'Player X, make a move';
        break;
      case 'on going':
        prompt = `Player ${nextPlayer}, make a move`;
        break;
      default:
        prompt = `Player ${currentGame?.Winner} has won!`;
        break;
    }

    return prompt;
  };

  type BoardProps = {
    board: BoardStateType;
  };

  function Board({ board }: BoardProps) {
    return (
      <div className="board">
        {board.map((cellMark, idx) => (
          <BoardCell
            key={`${idx}-${cellMark}`}
            mark={cellMark}
            cellNumber={idx}
          />
        ))}
      </div>
    );
  }

  type BoardCellProps = {
    mark: Marks;
    cellNumber: number;
  };

  function BoardCell({ mark, cellNumber }: BoardCellProps) {
    return (
      <div
        className="board-cell"
        role="button"
        onClick={() => {
          if (
            currentGame?.boardState[cellNumber] ||
            currentGame?.gameStatus === 'ended'
          ) {
            return;
          }
          handleMakeMove(cellNumber);
        }}
        tabIndex={-1}
      >
        <p className="mark">{mark ?? ''}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h2 className="game-prompt">{gamePrompt()}</h2>
      <button className="start-button" onClick={handleRestart} type="button">
        Restart Game
      </button>
      {boardState && <Board board={boardState} />}
    </div>
  );
}

export default App;
