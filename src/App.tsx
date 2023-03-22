import './App.css';

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

function Board() {
  return (
    <div className="board">
      <div className="board-cell">1</div>
      <div className="board-cell">2</div>
      <div className="board-cell">3</div>
      <div className="board-cell">4</div>
      <div className="board-cell">5</div>
      <div className="board-cell">6</div>
      <div className="board-cell">7</div>
      <div className="board-cell">8</div>
      <div className="board-cell">9</div>
    </div>
  );
}

export default App;
