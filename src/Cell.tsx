import React, { FC, CSSProperties } from "react";
import { TCell } from "./utility";

const cellStyle = {
    width: "60px",
    height: "60px",
    backgroundColor: "#ddd",
    margin: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    color: "white",
} as CSSProperties;

export interface ICellEvent {
    onCellClick: (rowNumber: number, colNumber: number) => void;
}

export interface ICellProps extends ICellEvent {
    cell: TCell;
    rowNumber: number;
    colNumber: number;
}

export const Cell: FC<ICellProps> = ({ cell, colNumber, rowNumber, onCellClick }) => {
    return (
        <div
            data-testid="cell"
            className="cell"
            style={cellStyle}
            onClick={() => {
                onCellClick(rowNumber, colNumber);
            }}
        >
            {cell}
        </div>
    );
};
