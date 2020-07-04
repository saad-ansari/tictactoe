import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Row, IRowProps} from './Row';
import { TRow } from './utility';

const props = {
  row: ['o', 'x', 'o'] as TRow,
} as IRowProps;

test('Check row renders correctly', () => {
  let rowProps = {...props};
  const onCellClick = (rowNumber: number, colNumber: number) => {
    let newProps:IRowProps = {...props};
    newProps.row[1] = 'o';
    rowProps = newProps;
  };
  const { getAllByTestId, rerender } = render(<Row {...rowProps} onCellClick={onCellClick}/>);
  let cells = getAllByTestId('cell');
  expect(cells.length).toBe(3);
  expect(cells[0].textContent).toBe('o');
  expect(cells[1].textContent).toBe('x');
  expect(cells[2].textContent).toBe('o');
  fireEvent.click(cells[0]);
  cells = getAllByTestId('cell');
  rerender(<Row {...rowProps} onCellClick={onCellClick} />)
  expect(cells[0].textContent).toBe('o');
  expect(cells[1].textContent).toBe('o');
  expect(cells[2].textContent).toBe('o');
});
