/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect, useContext, createContext, SetStateAction, Dispatch, ReactNode } from 'react';
import TopScreen from './screens/TopScreen';
import BottomScreen from './screens/BottomScreen';
import DefaultScreen from './screens/DefaultScreen';
import FishingScreen from './screens/fishingScreen';
interface IExpContext {
    exp: number,
    setExp: Dispatch<SetStateAction<number>>,
    level: number,
    setLevel: Dispatch<SetStateAction<number>>,
    energy: number,
    setEnergy: Dispatch<SetStateAction<number>>,
}
export const ExpContext = createContext<IExpContext>({
    exp: 0,
    setExp: () => { },
    level: 0,
    setLevel: () => { },
    energy: 0,
    setEnergy: () => { },
})
export default function Screen({ poke }: any) {
    const [stats, setStats] = useState({
        strength: 0,
        defence: 0,
        speed: 0,
    });
    const [pet, setPet] = useState(poke.egg)
    const [happiness, setHappiness] = useState(50);
    const [hunger, setHunger] = useState(50);
    const [exp, setExp] = useState(0);
    const [energy, setEnergy] = useState(10);
    const [level, setLevel] = useState(0);
    const [maxLevel, setMaxLevel] = useState(0);
    const [canEvolve, setCanEvolve] = useState(false)
    const [curScreen, setCurScreen] = useState('default')
    useEffect(() => {
        if (pet.evolutionPhase != 'egg' && curScreen === 'default') {
            const intervalHunger = setInterval(() => {
                if (hunger - 1 <= 0) { setHunger(0); }
                else { setHunger(hunger - 1); }
            }, 5000);
            return () => clearInterval(intervalHunger);
        }
    }, [curScreen, hunger, pet.evolutionPhase]);

    useEffect(() => {
        if (level >= maxLevel && pet.evolvesTo != 'none')
            setCanEvolve(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [level]);

    const mainScreen: { [key: string]: ReactNode } = {
        default: <DefaultScreen {... { pet, setPet, level, setLevel, maxLevel, setMaxLevel, poke, canEvolve, setCanEvolve }} />,
        fishing: <FishingScreen stats={stats} maxLevel={maxLevel} />,
    };

    return (
        <ExpContext.Provider value={{ exp, setExp, level, setLevel, energy, setEnergy }}>
            <div className='border-2 border-white rounded-lg'>
                <div className='flex justify-center items-center border-8 border-gray-300 h-96 w-[26rem] rounded-md text-xs'>
                    <div className='grid grid-rows-6 h-full w-full bg-gray-400'>
                        <TopScreen {...{ happiness, hunger, exp, stats, energy }} />
                        {mainScreen[curScreen]}
                        <BottomScreen {...{ pet, hunger, setHunger, energy, setEnergy, setCurScreen }} />
                    </div>
                </div>
            </div>
        </ExpContext.Provider>
    );
}