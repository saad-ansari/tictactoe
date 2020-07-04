import React, { useState } from "react";
import { TBoard, TRow, Player } from "./utility";
import { Board } from "./Board";

export const initializeBoard = (): TBoard => {
    const boardValues: TBoard = [];
    for (var i = 0; i <= 2; i++) {
        const row: TRow = [];
        for (var k = 0; k <= 2; k++) {
            row.push(" ");
        }
        boardValues.push(row);
    }
    return boardValues;
};

const Game = () => {
    const [turn, setTurn] = useState<number>(0);
    const [player, setPlayer] = useState<Player>("x");
    const [winner, setWinner] = useState<Player | undefined>(undefined);
    const [board, setBoard] = useState<TBoard>([...initializeBoard()]);

    const hasColumnCrossed = (player: Player): boolean => {
        for (let i = 0; i <= 2; i++)
            if (
                board[i][0] === player &&
                board[i][0] === board[i][1] &&
                board[i][0] === board[i][2]
            )
                return true;
        return false;
    };

    const hasRowCrossed = (player: Player): boolean => {
        for (let i = 0; i <= 2; i++)
            if (
                board[0][i] === player &&
                board[0][i] === board[1][i] &&
                board[0][i] === board[2][i]
            )
                return true;
        return false;
    };

    const hasDiagonalCrossed = (player: Player): boolean => {
        const isCenterBelongToPlayer = board[1][1] === player;
        const hasDiagonalOneCrossed =
            isCenterBelongToPlayer &&
            board[0][0] === board[1][1] &&
            board[2][2] === board[1][1];
        const hasDiagonalTwoCrossed =
            isCenterBelongToPlayer &&
            board[0][2] === board[1][1] &&
            board[2][0] === board[1][1];
        return hasDiagonalOneCrossed || hasDiagonalTwoCrossed;
    };

    const onCellClick = (rowNumber: number, colNumber: number) => {
        const newBoard: TBoard = [...board];
        if (newBoard[rowNumber][colNumber] === " ") {
            newBoard[rowNumber][colNumber] = player;
            setTurn(turn + 1);
            setBoard(newBoard);
            setPlayer(player === "o" ? "x" : "o");
        }
        if (
            hasRowCrossed("x") ||
            hasColumnCrossed("x") ||
            hasDiagonalCrossed("x")
        ) {
            setWinner("x");
        }
        if (
            hasRowCrossed("o") ||
            hasColumnCrossed("o") ||
            hasDiagonalCrossed("o")
        ) {
            setWinner("o");
        }
    };

    const onResetClick = () => {
        setTurn(0);
        setPlayer("x");
        setWinner(undefined);
        setBoard([...initializeBoard()]);
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    turn={turn}
                    player={player}
                    board={board}
                    winner={winner}
                    onCellClick={onCellClick}
                    onResetClick={onResetClick}
                />
            </div>
        </div>
    );
};

export default Game;
