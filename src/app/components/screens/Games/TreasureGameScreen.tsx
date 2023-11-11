/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

interface IGrid {
    [key: number]: { value: string, bg: string, url: string, click: boolean };
}
export default function TreasureGameScreen() {
    const [grid, setGrid] = useState<IGrid>({});
    const [gameOver, setGameOver] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const [gameScreen, setGameScreen] = useState('start')
    const cellNum = 16
    const GridItem = (props: { item: { value: string, bg: string, url: string, click: boolean } }) => {
        const { item } = props;
        return (
            <div className={`flex justify-center items-center h-full relative hover:border ${item.bg}`}>
                {item.url.length != 0
                    ? 
                    <img className='w-1/2' src={item.url} alt={item.value} />
                    : <div></div>
                }
            </div>
        );
    };
    function GenerateGrid() {
        setGameOver(false)
        setGameScreen('game')
        setAttempts(0)
        let treasure = Math.floor(Math.random() * cellNum);
        let gridDict: IGrid = {};
        for (let i = 0; i < cellNum; i++) {
            if (i === treasure) {
                gridDict[i] = { value: 'treasure', bg: 'bg-topDirt hover:border-white', url: '', click: false };
            } else {
                gridDict[i] = { value: 'trash', bg: 'bg-topDirt hover:border-white', url: '', click: false };
            }
        }
        setGrid(gridDict);
    }

    const handleCellClick = (index: number) => {
        const checkGrid = { ...grid };
        const cell = checkGrid[index]
        if (cell.value === 'treasure' && gameOver == true) {
            setGameScreen('stats')
        }
        if (!cell.click && !gameOver) {
            setAttempts(attempts + 1)
            let temp = Math.floor(Math.random() * 17) + 1
            cell.click = true;
            if (cell.value === 'trash') {
                cell.bg = 'bg-bottomDirt hover:border-red-500';
                cell.url = `/treasureGame/trash/${temp}.png`
            }
            else if (cell.value === 'treasure') {
                cell.url = `/treasureGame/treasure/1.png`
                cell.bg = 'bg-bottomDirt hover:border-green-500';
                for (let i = 0; i < cellNum; i++) {
                    if (checkGrid[i].click != true) {
                        checkGrid[i].bg = 'opacity-60'
                        checkGrid[i].url = `/treasureGame/trash/${Math.floor(Math.random() * 17) + 1}.png`
                    }
                }
                setGameOver(true)
            }
            setGrid(checkGrid);
        }
    };
    const Start = () => {
        return (
            <button
                className='row-start-4 col-start-2 col-span-2 m-3 text-xl hover:bg-gray-500 hover:scale-105 border-2 bg-gray-400 rounded-2xl'
                onClick={GenerateGrid}>
                Play!
            </button>
        )
    }

    const Game = () => {
        return (
            <div className='grid grid-cols-4 grid-rows-4 col-span-4 row-span-4 border border-black bg-topDirt cursor-shover'>
                {Object.keys(grid).map((cell: any, idx) => (
                    <div className={`col-span-1 row-span-1 border border-black`} key={idx} onClick={() => handleCellClick(cell)}>
                        <GridItem item={grid[cell]} />
                    </div>
                ))}
            </div>
        )
    }
    const Stats = () => {
        return (
            <div className='grid grid-col-5 grid-row-4 row-span-4 col-span-4 border-2 border-green-600 '>
                <img src={'/treasureGame/treasure/1.png'} alt={'treasure'} className='flex w-20 h-20 row-span-1 col-start-3 ml-12'></img>
                <div className='row-start-3 col-span-5 text-center'>Found the treasure in {attempts} turn(s)</div>
                <button
                    className='row-start-4 col-start-3 col-span-1 m-3 text-xl hover:bg-gray-500 hover:scale-105 border-2 bg-gray-400 rounded-2xl'
                    onClick={() => GenerateGrid()}>
                    Play Again?
                </button>
            </div>
        )
    }
    const curScreen: { [key: string]: React.ReactNode } = {
        start: <Start />,
        game: <Game />,
        stats: <Stats />,
    };

    return (
        <div className="grid grid-rows-4 grid-cols-4 row-span-4 bg-meadow text-black border-2 border-black">
            {curScreen[gameScreen]}
        </div>
    );
}