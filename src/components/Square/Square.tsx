import clsx from "clsx";
import React from "react";

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

type SquareType = {
    value: string;
    onClick: () => void;
    isWiner: boolean;
    index: number;
    isPlayerWin: boolean;
};

function Square({ value, onClick, index, isWiner, isPlayerWin, ...props }: SquareType) {
   
    return (
        <div className="" onClick={onClick} {...props}>
            <button
                className={clsx(
                    "w-[70px] h-[70px] bg-[#14BDAC] text-2xl",
                    { "text-white": !isWiner},
                    {
                        "text-red-500": isWiner,
                    }
                )}
                disabled={value !== "" || isPlayerWin}
            >
                {value}
            </button>
        </div>
    );
}

export default Square;
