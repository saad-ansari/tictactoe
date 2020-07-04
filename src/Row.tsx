import React, { FC, CSSProperties } from "react";
import { TRow } from "./utility";
import { Cell, ICellEvent } from "./Cell";

const rowStyle = {
    display: "flex",
  } as CSSProperties;

export interface IRowProps extends ICellEvent {
    row: TRow;
    rowNumber: number;
}

export const Row: FC<IRowProps> = ({ row, rowNumber, onCellClick }) => {
    return (
        <div className="board-row" style={rowStyle}>
            {row.map((cell, i) => {
                return (
                    <Cell
                        key={i}
                        colNumber={i}
                        rowNumber={rowNumber}
                        cell={cell}
                        onCellClick={onCellClick}
                    />
                );
            })}
        </div>
    );
};