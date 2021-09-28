import { match } from "ts-pattern";

type Board = boolean[][];

const lowBound = (value: number) => (value === 0 ? 0 : value - 1);
const highBound = (value: number) => (value === 10 ? 10 : value + 1);

function numberLivingOfNeighbours(
  board: Board,
  currentRow: number,
  currentColumn: number
) {
  let count = 0;
  const lowRowBound = lowBound(currentRow);
  const highRowBound = highBound(currentRow);
  const lowColumnBound = lowBound(currentColumn);
  const highColumnBound = highBound(currentColumn);

  for (let i = lowRowBound; i < highRowBound; i++) {
    for (let j = lowColumnBound; j < highColumnBound; j++) {
      if (board[j][i] === true) {
        count++;
      }
    }
  }
  return count;
}

export function shouldBeAlive(
  board: Board,
  cell: boolean,
  i: number,
  j: number
) {
  const alive = true;
  const dead = false;
  return match<[boolean, number], boolean>([
    cell,
    numberLivingOfNeighbours(board, i, j),
  ])
    .with([alive, 2], [alive, 3], () => alive)
    .with([dead, 3], () => alive)
    .otherwise(() => dead);
}

export function forEachCell(
  board: Board,
  cb: (cell: boolean, rowIndex: number, columnIndex: number) => void
) {
  board.forEach((row, i) =>
    row.forEach((cell, j) => {
      cb(cell, i, j);
    })
  );
}

export function generateClearState(span: number): Board {
  return new Array(span).fill(new Array(span).fill(false));
}

export function generateRandomState(span: number): Board {
  return generateClearState(span).map((row) =>
    row.map(() => Math.round(Math.random()) === 0)
  );
}

export function toggleCellState(board: Board, row: number, column: number) {
  board[row][column] = !board[row][column];
  return board;
}
