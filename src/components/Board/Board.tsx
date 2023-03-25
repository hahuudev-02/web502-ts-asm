import { useEffect, useRef, useState, memo } from "react";
import Square from "../Square";

const boardInitialState = Array<string>(9).fill("");
const victoriousPositions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export default function Board() {
    const [board, setBoard] = useState<Array<string>>(boardInitialState);
    const [player, setPlayer] = useState<string>("X");

    const boardBefore = useRef<string[]>([]);
    const timeOutPlayerEl = useRef<HTMLSpanElement>(null);

    function handleChoose(index: number) {
        const xAmountOnBoard = board.filter((value) => value === "X").length;
        const oAmountOnBoard = board.filter((value) => value === "O").length;

        const boardCopy = [...board];
        boardCopy[index] = xAmountOnBoard <= oAmountOnBoard ? "X" : "O";
        // is winer

        setPlayer(xAmountOnBoard <= oAmountOnBoard ? "O" : "X");
        boardBefore.current = board;
        setBoard(boardCopy);
    }

    useEffect(() => {
        const array = board
            .map((item, index) => (item === "X" || item === "O" ? index : null))
            .filter((item) => item !== null);

        let id: number;
        if (!checkWinner()) {
            id = setTimeout(() => {
                let randomNumber: number;

                do {
                    randomNumber = Math.floor(Math.random() * 9);
                } while (array.some((item) => item === randomNumber && array.length < 8));

                handleChoose(randomNumber);
            }, 3000);
        }

        return () => {
            clearTimeout(id);
        };
    }, [player, checkWinner]);

    function checkWinner(): string | false {
        const x = board.map((value) => (value === "X" ? "X" : null));
        const o = board.map((value) => (value === "O" ? "O" : null));
        // console.log(x);
        const xWins = victoriousPositions.some((list) => list.every((number) => x[number] !== null));
        const oWins = victoriousPositions.some((list) => list.every((number) => o[number] !== null));
        if (xWins) {
            return "X";
        }
        if (oWins) {
            return "O";
        }
        return false;
    }

    const handleRestartGame = () => {
        setBoard(boardInitialState);
        setPlayer("X");
    };

    const handleUndorPlayer = () => {
        setBoard(boardBefore.current);
        const xAmountOnBoard = board.filter((value) => value === "X").length;
        const oAmountOnBoard = board.filter((value) => value === "O").length;
        setPlayer(xAmountOnBoard <= oAmountOnBoard ? "O" : "X");
    };

    const highlightWin = (index: number): boolean => {
        const [p1, p2, p3] = victoriousPositions
            .filter((position, index) => {
                const [p1, p2, p3] = position;
                if (board[p1] === board[p2] && board[p2] === board[p3] && board[p1] !== "") return true;
            })
            .flat();

        if (index === p1 || index == p2 || index == p3) {
            return true;
        }

        return false;
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <h3 className="text-xl text-yellow-600">
                {board.every((item) => item !== "") && !checkWinner() ? (
                    "Hai player hòa"
                ) : !checkWinner() ? (
                    <p>
                        Lượt của {player} <span ref={timeOutPlayerEl} id="timeout-player"></span>
                    </p>
                ) : (
                    `${checkWinner()} winer`
                )}
            </h3>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-36 py-4 rounded transition-colors duration-300"
                type="button"
                onClick={handleUndorPlayer}
                disabled={boardBefore.current === board}
            >
                Undor
            </button>

            <div className="grid grid-cols-3 gap-2">
                {board.map((value, index) => (
                    <Square
                        value={value}
                        isWiner={highlightWin(index)}
                        isPlayerWin={!!checkWinner()}
                        key={index}
                        index={index}
                        onClick={() => handleChoose(index)}
                    />
                ))}
            </div>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-72 py-4 rounded transition-colors duration-300"
                type="button"
                onClick={handleRestartGame}
            >
                Restart
            </button>
        </div>
    );
}
