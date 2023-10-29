'use client'

import { useState, useEffect } from 'react'
export default function Screen() {

    const [stats, setStats] = useState({
        strength: 0,
        stamina: 0,
        speed: 0,
    })
    const [exp, setExp] = useState(0);
    const [happiness, setHappiness] = useState(0);
    const [hunger, setHunger] = useState(50);
    const [level, setLevel] = useState(1)
    const [energy, setEnergy] = useState(10)
    const maxLevel = 10

    //placeholder, will replace for better mechanic
    useEffect(() => {
        const intervalExp = setInterval(() => {
            if (exp + 1 > 10) {
                setExp(0)
                if (level < maxLevel) {
                    setLevel(level + 1)
                }
            }
            else {
                if (level < maxLevel) {
                    setExp(exp + 1)
                }
            }
        }, 1000);
        return () => clearInterval(intervalExp);
    }, [exp, level]);

    useEffect(() => {
        //Implementing the setInterval method 
        const intervalHunger = setInterval(() => {
            if (hunger - 1 <= 0) {
                setHunger(0);
            }
            else {
                setHunger(hunger - 1)
            }
        }, 5000);

        //Clearing the interval 
        return () => clearInterval(intervalHunger);
    }, [hunger]);
    return (
        <div className='flex justify-center items-center border-4 h-96 w-96'>
            <div className='grid grid-rows-6 h-full w-full'>
                <div className='status grid grid-cols-5 row-span-1 border-2 border-red-500'>
                <div className='flex justify-center items-center col-span-1 border-r-2 text-sm text-center'>
                <div className='flex-col items-center text-sm'>
                    <div>Happiness</div>
                    <div className='text-xs'>{happiness}/100</div>
                    {happiness >= 66
                        ? <div>{'😁'}</div>
                        : happiness >= 33
                            ? <div>{'😀'}</div>
                            : <div>{'😢'}</div>
                    }
                </div>
            </div>
            <div className='flex justify-center items-center col-span-1 border-r-2 text-sm text-center'>
                <div >
                    <div>Hunger</div>
                    <div className='text-xs'>{hunger}/100</div>
                    {hunger >= 66
                        ? <div>{'😁'}</div>
                        : hunger >= 33
                            ? <div>{'😀'}</div>
                            : <div>{'😢'}</div>
                    }
                </div>
            </div>
            <div className='flex justify-center items-center col-span-1 border-r-2 text-sm text-center'>
                <div >
                    <div>Exp</div>
                    <div>{exp}/10</div>
                    <div></div>
                </div>
            </div>
                </div>
                <div className='grid grid-rows-5 row-span-4 border-2 border-blue-500'>
                    <div className='row-span-5 border-green-400 border-2'></div>
                    <div className='flex justify-between px-4 text-sm'>
                        <div>{
                            maxLevel ? 'Max level, evolution possible!' : <></>}</div>
                        <div>Level: {level} </div>
                    </div>
                </div>
                <div className='grid grid-cols-5 row-span-1 border-2 border-green-500'>
                    <div className='flex justify-center items-center col-span-1 border-r-2 text-center text-3xl'>
                        <button>💤</button>
                    </div>
                    <div className='flex justify-center items-center col-span-1 border-r-2 text-center text-3xl'>
                        <button>💤</button>
                    </div>
                    <div className='flex justify-center items-center col-span-1 border-r-2 text-center text-3xl'>
                        <button>💤</button>
                    </div>
                    <div className='flex justify-center items-center col-span-1 border-r-2 text-center text-3xl'>
                        <button>💤</button>
                    </div>
                    <div className='flex justify-center items-center col-span-1 border-r-2 text-center text-3xl'>
                        <button>💤</button>
                    </div>
                </div>
                <div>{stats.strength}, {stats.stamina}, {stats.speed}</div>
            </div >
        </div >
    )
}