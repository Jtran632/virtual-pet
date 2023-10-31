/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import TopScreen from './TopScreen';
import BottomScreen from './BottomScreen';
import DefaultScreen from './DefaultScreen';
import FishingScreen from './fishingScreen';

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
    function MainScreenDisplay() {
        switch (curScreen) {
            case 'default':
                return ( <DefaultScreen {... { pet, setPet, level, maxLevel, setLevel, setMaxLevel, poke, canEvolve, setCanEvolve }} /> )
            case 'fishing':
                return( <FishingScreen/> )
        }

    }
    useEffect(() => {
        if (pet.evolutionPhase != 'egg') {
            const intervalExp = setInterval(() => {
                if (level < maxLevel && exp < 10) {
                    setExp(exp + 10);
                }
                else {
                    setExp(0);
                    if (level < maxLevel) {
                        setLevel(level + 1);
                    }
                }
            }, 200);
            return () => clearInterval(intervalExp);
        }
    }, [exp, level, maxLevel, pet.evolutionPhase]);

    useEffect(() => {
        if (pet.evolutionPhase != 'egg') {
            const intervalHunger = setInterval(() => {
                if (hunger - 1 <= 0) { setHunger(0); }
                else { setHunger(hunger - 1); }
            }, 5000);
            return () => clearInterval(intervalHunger);
        }
    }, [hunger, pet.evolutionPhase]);

    useEffect(() => {
        if (level >= maxLevel && pet.evolvesTo != 'none')
            setCanEvolve(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [level]);

    return (
        <div className='border-2 border-white rounded-lg'>
            <div className='flex justify-center items-center border-8 border-gray-300 h-96 w-[26rem] rounded-md text-xs'>
                <div className='grid grid-rows-6 h-full w-full bg-gray-400'>
                    <TopScreen {...{ happiness, hunger, exp, stats, energy }} />
                    <MainScreenDisplay />
                    <BottomScreen {...{pet, hunger, setHunger, energy, setEnergy, setCurScreen }} />
                </div>
            </div>
        </div>
    );
}
