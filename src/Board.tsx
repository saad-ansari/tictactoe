import { ICellEvent } from "./Cell";
import { TBoard, Player } from "./utility";
import React, { FC, Fragment, CSSProperties } from "react";
import { Row } from "./Row";

const instructionsStyle = {
    marginTop: "5px",
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "16px",
} as CSSProperties;

const boardStyle = {
    backgroundColor: "#eee",
    width: "208px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    border: "3px #eee solid",
} as CSSProperties;

const buttonStyle = {
    marginTop: "15px",
    marginBottom: "16px",
    width: "80px",
    height: "40px",
    backgroundColor: "#8acaca",
    color: "white",
    fontSize: "16px",
} as CSSProperties;

const containerStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
} as CSSProperties;


export interface IBoardProps extends ICellEvent {
    board: TBoard;
    player: Player;
    turn: number;
    winner?: Player;
    onResetClick: () => void;
}

export const Board: FC<IBoardProps> = ({
    board,
    player,
    winner,
    turn,
    onCellClick,
    onResetClick,
}) => {
    const gameOver = !winner && turn === 9;
    const displayGameOver: JSX.Element = (
        <div data-testid="gameOver" style={instructionsStyle}>
            Game over
        </div>
    );
    const displaWinner: JSX.Element = (
        <div data-testid="winner" style={instructionsStyle}>
            Winner: {winner}
        </div>
    );
    const displayBoard: JSX.Element = (
        <Fragment>
            <div className="status" style={instructionsStyle}>
                Next player: {player}
            </div>
            <div style={boardStyle}>
                {board.map((row, i) => {
                    return (
                        <Row key={i} rowNumber={i} row={row} onCellClick={onCellClick} />
                    );
                })}
            </div>
        </Fragment>
    );
    return (
        <div style={containerStyle} className="gameBoard">
            <button data-testid="reset" style={buttonStyle} onClick={onResetClick}>Reset</button>
            {winner ? displaWinner : gameOver ? displayGameOver : displayBoard}
        </div>
    );
};