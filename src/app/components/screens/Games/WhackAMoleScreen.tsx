/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react';

export default function WhackAMole() {
    const maxGameTime = 30
    const [grid, setGrid] = useState<IGrid>({});
    const [gameActive, setGameActive] = useState(false);
    const [timer, setTimer] = useState(maxGameTime);
    const [score, setScore] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [goldMoleClicks, setGoldMoleClicks] = useState(0);
    const [moleclicks, setMoleClicks] = useState(0);
    const [bombClicks, setBombClicks] = useState(0);
    const [gameScreen, setGameScreen] = useState('start');
    const cellNum = 16;

    interface IGrid {
        [key: number]: { value: string; bg: string; url: string; click: boolean };
    }

    const GridItem = (props: { item: { value: string; bg: string; url: string; click: boolean } }) => {
        const { item } = props;
        return (
            <div className={`flex justify-center items-center h-full relative border-2 text-xs ${item.bg}`}>
                {item.value.length !== 0 ? (
                    <div>{item.value}</div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    };

    function GenerateGrid() {
        let moles: number[] = [];
        let bombs: number[] = [];

        while (moles.length < 3) {
            let temp = Math.floor(Math.random() * cellNum);
            if (!moles.includes(temp)) {
                moles.push(temp);
            }
        }

        while (bombs.length < 4) {
            let temp = Math.floor(Math.random() * cellNum);
            if (!bombs.includes(temp) && !moles.includes(temp)) {
                bombs.push(temp);
            }
        }

        let gridDict: IGrid = {};

        for (let i = 0; i < cellNum; i++) {
            let gold = Math.floor(Math.random() * 5);
            let pick = Math.floor(Math.random() * 5);

            if (moles.includes(i)) {
                if (gold === pick) gridDict[i] = { value: 'Gold Mole', bg: 'bg-yellow-500', url: '', click: false };
                else gridDict[i] = { value: 'mole', bg: 'bg-white', url: '', click: false };
            } else if (bombs.includes(i)) {
                gridDict[i] = { value: 'bomb', bg: 'bg-black text-white', url: '', click: false };
            } else {
                gridDict[i] = { value: '', bg: 'bg-amber-900', url: '', click: false };
            }
        }
        setGrid(gridDict);
    }

    const handleCellClick = (index: number) => {
        const checkGrid = { ...grid };
        const cell = checkGrid[index];
        if (!cell.click && gameActive) {
            cell.click = true;
            setClicks(clicks + 1)
            if (cell.value === 'mole') {
                cell.bg = 'bg-green-500';
                setScore(score + 100);
                setMoleClicks(moleclicks + 1)
            } else if (cell.value === 'Gold Mole') {
                cell.bg = 'bg-green-500';
                setScore(score + 500);
                setMoleClicks(goldMoleClicks + 1)
            } else if (cell.value === 'bomb') {
                cell.bg = 'bg-red-500';
                setScore(score - 100);
                setBombClicks(bombClicks + 1)
            }
            cell.value = '';
            setGrid(checkGrid);
        }
    };

    let intervalRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (gameActive && timer > 0) {
            intervalRef.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => {
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
        }
    }, [gameActive]);

    let gameRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (timer > 0) {
            gameRef.current = setInterval(() => {
                GenerateGrid();
            }, 800);
            return () => {
                if (gameRef.current) clearInterval(gameRef.current);
            }
        }
        else {
            setGameScreen('stats');
        }
    }, [gameActive, timer]);


    const curScreen: { [key: string]: React.ReactNode } = {
        start: <Start />,
        game: <Game />,
        stats: <Stats />,
    };
    function gameStart() {
        GenerateGrid(),
            setGameActive(true),
            setGameScreen('game')
        setTimer(maxGameTime)
        setClicks(0)
        setGoldMoleClicks(0)
        setMoleClicks(0)
        setBombClicks(0)
    }
    function Start() {
        return (
            <div className='grid grid-rows-4 grid-cols-3 row-span-full col-span-full w-full h-full'>
                <div className='row-start-1 col-span-full flex justify-center items-center text-center text-2xl'>
                    Whack A Mole
                </div>
                <div className='row-start-2 col-span-full flex-col space-y-2 text-center text-md text'>
                    <div>
                        Golden Moles: 500pts
                    </div>
                    <div>
                        Moles: 100pts
                    </div>
                    <div>
                        Bombs: -100pts
                    </div>
                </div>
                <div className='row-start-4 col-start-2 flex justify-center items-center border-2 bg-gray-300 h-1/2 text-center rounded-xl hover:scale-110' onClick={() => gameStart()}>
                    Start
                </div>
            </div>
        );
    }

    function Game() {
        return (
            <>
                <div className="row-span-1 col-span-full flex items-center justify-center">
                    {gameActive ? (
                        <div className='flex justify-between bg-sky-300 text-white h-full w-full p-2'>
                            <div>Score: {score}</div>
                            <div>Timer: {timer}</div>
                        </div>
                    ) : (
                        'Not Active'
                    )}
                </div>
                <div className="grid grid-cols-4 grid-rows-4 row-span-5 col-span-full border-2 bg-bottomDirt">
                    {Object.keys(grid).map((cell: any, idx) => (
                        <div className={`col-span-1 row-span-1 border-black`} key={idx} onClick={() => handleCellClick(Number(cell))}>
                            <GridItem item={grid[Number(cell)]} />
                        </div>
                    ))}
                </div>
            </>
        );
    }

    function Stats() {
        return (
            <div className='grid grid-col-3 grid-row-3 row-span-full col-span-full h-full w-full'>
                <div className='row-span-2 col-span-full items-center flex justify-center'>
                    <div className='flex-col text-md'>
                        <div>Total Score: {score}</div>
                        <div>Golden Moles: {goldMoleClicks}</div>
                        <div>Moles: {moleclicks}</div>
                        <div>Bombs: {bombClicks}</div>
                        <div>Misses: {clicks - (moleclicks + bombClicks)}</div>
                        <div>Total Clicks: {clicks}</div>
                        <div>Accuracy: {((moleclicks + goldMoleClicks) / clicks * 100).toFixed(2)} %</div>
                    </div>
                </div>
                <div className='grid grid-cols-3 row-span-1 col-start-1'>
                    <div className='col-start-2 flex justify-center items-center border-2 bg-gray-300 h-3/4 text-center rounded-xl hover:scale-110' onClick={() => gameStart()}>
                        Play again?
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-rows-6 grid-cols-3 row-span-4 bg-meadow text-black border-2 border-black">
            {curScreen[gameScreen]}
        </div>
    );
}
