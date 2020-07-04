import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Cell, ICellProps} from './Cell';

const props = {
  cell: ' ',
  colNumber: 1,
  rowNumber: 2
} as ICellProps;

test('Check cell renders correctly', () => {
  let cellProps = {...props};
  const onCellClick = (rowNumber: number, colNumber: number) => {
    expect(colNumber).toEqual(1);
    expect(rowNumber).toEqual(2);
    cellProps = {...cellProps, cell: 'x'}
  };
  const { getByTestId, rerender } = render(<Cell {...cellProps} onCellClick={onCellClick}/>);
  expect(getByTestId('cell').textContent).toBe(' ');
  fireEvent.click(getByTestId('cell'));
  rerender(<Cell {...cellProps} onCellClick={onCellClick} />)
  expect(getByTestId('cell').textContent).toBe('x');
});
