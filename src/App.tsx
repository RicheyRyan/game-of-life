import { Component, For, Show, createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Header from "./components/Header";
import Grid from "./components/Grid";
import Cell from "./components/Cell";
import Button from "./components/Button";
import * as GameOfLife from "./lib/GameOfLife";

interface GameState {
  board: boolean[][];
  running: number;
  generations: number;
}

const App: Component = () => {
  const [boardSpan] = createSignal(30);
  const [gameState, setGameState] = createStore<GameState>({
    board: GameOfLife.generateRandomState(boardSpan()),
    running: 0,
    generations: 0,
  });

  function handleStart() {
    const interval = setInterval(() => {
      setGameState(
        produce((state: GameState) => {
          GameOfLife.forEachCell(state.board, (cell, i, j) => {
            state.board[i][j] = GameOfLife.shouldBeAlive(
              state.board,
              cell,
              i,
              j
            );
          });
          state.generations++;
        })
      );
    }, 500);
    setGameState("running", interval);
  }

  function handleStop() {
    clearInterval(gameState.running);
    setGameState("running", 0);
  }

  function handleRandomize() {
    handleStop();
    setGameState(
      produce((state: GameState) => {
        state.running = 0;
        state.generations = 0;
        state.board = GameOfLife.generateRandomState(boardSpan());
      })
    );
  }

  function handleClear() {
    handleStop();
    setGameState("board", GameOfLife.generateClearState(boardSpan()));
  }

  function handleCellClick(i: number) {
    const rowNumber = Math.floor(i / boardSpan());
    const columnNumber = i % boardSpan();
    setGameState(
      produce((state: GameState) => {
        console.log(rowNumber, columnNumber);
        console.log(state.board[rowNumber][columnNumber]);
        state.board[rowNumber][columnNumber] =
          !state.board[rowNumber][columnNumber];
      })
    );
  }

  return (
    <>
      <Header title="Game of Life" generations={gameState.generations} />
      <main>
        <div class="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
          <section class="grid grid-flow-col grid-cols-auto pb-3 gap-4">
            <Button
              onClick={() => {
                gameState.running === 0 ? handleStart() : handleStop();
              }}
            >
              <Show when={gameState.running === 0} fallback="Stop">
                Start
              </Show>
            </Button>
            <Button onClick={() => handleClear()}>Clear</Button>
            <Button onClick={handleRandomize}>Randomize</Button>
          </section>
          <Grid span={boardSpan()}>
            <For each={gameState.board.flat(1)}>
              {(alive, i) => (
                <Cell
                  alive={alive}
                  onClick={() => {
                    handleCellClick(i());
                  }}
                />
              )}
            </For>
          </Grid>
        </div>
      </main>
    </>
  );
};

export default App;
