import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Board, IBoardProps} from "./Board";
import { initializeBoard } from './Game';
import { TCell } from './utility';

const props = {
    board: [...initializeBoard()],
    player: 'x',
    turn: 0,
} as IBoardProps;

test('Check board renders correctly', () => {
  let boardProps = {...props};
  const onResetClick = () => {
    boardProps = {...props};
  };
  const onCellClick = (rowNumber: number, colNumber: number) => {
    expect(colNumber).toEqual(2);
    expect(rowNumber).toEqual(0);
    let board = [...initializeBoard()];
    board[rowNumber][colNumber] = 'x';
    boardProps = {...props, turn:1, board: board};
  };
  const { getByTestId, getAllByTestId, rerender } = render(<Board {...boardProps} onCellClick={onCellClick} onResetClick={onResetClick}/>);

  /* Check it display 9 cells and cells are blank */
  let cells = getAllByTestId('cell');
  expect(cells.length).toBe(9);
  cells.map((cell: TCell, i:number)=>{
    expect(cells[i].textContent).toBe(' ');
  }); 

  /* check if it updates the cell properly*/
  fireEvent.click(cells[2]);
  rerender(<Board {...boardProps} onCellClick={onCellClick} onResetClick={onResetClick}/>);
  cells = getAllByTestId('cell');
  expect(cells.length).toBe(9);
  cells.map((cell: TCell, i:number)=>{
    if (i === 2) {
      expect(cells[i].textContent).toBe('x');
    } else {
      expect(cells[i].textContent).toBe(' ');
    }
  }); 

  /* check it resets the board correctly */
  fireEvent.click(getByTestId('reset'));
  rerender(<Board {...boardProps} onCellClick={onCellClick} onResetClick={onResetClick}/>);
  cells = getAllByTestId('cell');
  expect(cells.length).toBe(9);
  cells.map((cell: TCell, i:number)=>{
    expect(cells[i].textContent).toBe(' ');
  }); 

  /* check if it display board when there is winner */
  rerender(<Board {...{...boardProps, winner: 'x'}} onCellClick={onCellClick} onResetClick={onResetClick}/>);
  expect(getByTestId('winner').textContent).toBe('Winner: x')

  /* check if it dislpay gameover */
  rerender(<Board {...{...boardProps, turn:9}} onCellClick={onCellClick} onResetClick={onResetClick}/>);
  expect(getByTestId('gameOver').textContent).toBe('Game over')
});
