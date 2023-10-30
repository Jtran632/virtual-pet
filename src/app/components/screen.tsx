/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import TopScreen from './TopScreen';
import BottomScreen from './BottomScreen';

export default function Screen() {

    const [stats, setStats] = useState({
        strength: 0,
        defence: 0,
        speed: 0,
    });
    const [exp, setExp] = useState(0);
    const [happiness, setHappiness] = useState(50);
    const [hunger, setHunger] = useState(50);
    const [level, setLevel] = useState(1);
    const [energy, setEnergy] = useState(10);
    const backgrounds = {
        lakeside: 'bg-lakeside',
        desert: 'bg-desert',
        campsite: 'bg-campsite'
    }
    const [bgChoice, setBgChoice] = useState('campsite')
    const [randPos, setRandPos] = useState(1)
    //for testing purposes
    const poke = {
        'charmander': {
            id: 1,
            name: 'charmander',
            url: '/1.png',
            evolvesTo: 'charmeleon',
            evolutionPhase: 'base',
            evolveCondition: {
                strength: 0,
                defence: 0,
                speed: 0,
            }
        },
        'charmeleon': {
            id: 2,
            name: 'charmeleon',
            url: '/2.png',
            evolvesTo: 'charizard',
            evolutionPhase: 'middle',
            evolveCondition: {
                strength: 0,
                defence: 0,
                speed: 0,
            }
        },
        'charizard': {
            id: 3,
            name: 'charizard',
            url: '/3.png',
            evolvesTo: 'none',
            evolutionPhase: 'final',
            evolveCondition: {
                strength: 0,
                defence: 0,
                speed: 0,
            },
        }
    }
    const [pet, setPet] = useState(poke.charmander)
    const [canEvolve, setCanEvolve] = useState(false)
    const [maxLevel, setMaxLevel] = useState(10);
    useEffect(() => {
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
        }, 1000);
        return () => clearInterval(intervalExp);
    }, [exp, level, maxLevel]);

    useEffect(() => {
        const intervalHunger = setInterval(() => {
            if (hunger - 1 <= 0) { setHunger(0); }
            else { setHunger(hunger - 1); }
        }, 5000);
        return () => clearInterval(intervalHunger);
    }, [hunger]);

    useEffect(() => {
        if (pet.evolveCondition.strength <= stats.strength &&
            pet.evolveCondition.defence <= stats.defence &&
            pet.evolveCondition.speed <= stats.speed &&
            level >= maxLevel)
            setCanEvolve(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stats.strength, stats.defence, stats.speed, level]);

    useEffect(() => {
        if (pet.evolutionPhase === 'base') {
            setMaxLevel(1)
        }
        else if (pet.evolutionPhase === 'middle') {
            setMaxLevel(2)
        }
        else {
            setMaxLevel(3)
        }
    }, [pet]);

    useEffect(() => {
        const intervalRandPos = setInterval(() => {
            setRandPos(Math.floor(Math.random() * 5) + 1);
        }, 2000);
        return () => clearInterval(intervalRandPos);
    }, [randPos]);

    function changeBG() {
        if (bgChoice === 'campsite') { setBgChoice('lakeside') }
        else if (bgChoice === 'lakeside') { setBgChoice('desert') }
        else { setBgChoice('campsite') }
    }
    function evolve() {
        if (pet.evolvesTo != 'none' || pet.evolutionPhase != 'final') {
            setPet(poke[pet.evolvesTo as keyof object])
            setCanEvolve(false)
        }
    }
    return (
        <div className='border-2 border-white rounded-lg'>
            <div className='flex justify-center items-center border-8 border-gray-300 h-96 w-[26rem] rounded-md text-xs'>
                <div className='grid grid-rows-6 h-full w-full bg-gray-400'>
                    <TopScreen {...{ happiness, hunger, exp, stats, energy }} />
                    <div className={`grid grid-rows-5 grid-cols-5 row-span-4 border-4 border-black ${backgrounds[bgChoice as keyof Object]} bg-cover`}>
                        <div className={`flex justify-center items-center row-start-4 col-start-${String(randPos)} text-black border-2`}>
                            <picture >
                                <img src={pet.url} alt={pet.name} width={90}
                                ></img>
                            </picture>
                        </div>
                        <div className='flex justify-end col-start-1 col-span-full space-x-2 mt-2'>
                            <div className='flex justify-center items-center'>Position: {randPos}</div>
                            <div className='flex justify-center items-center'>
                                {canEvolve && pet.evolutionPhase != 'final' ?
                                    <button className='flex items-center h-fit mr-2 text-3xl' onClick={() => evolve()}>‼️</button> : <></>
                                }
                            </div>
                            <button className='flex items-center h-fit mr-2 text-xl' onClick={() => changeBG()}>🗺️</button>
                        </div>
                        <div className='flex justify-between row-start-6 col-span-full w-full text-black px-4'>
                            <div>{pet.name} - {pet.evolutionPhase} </div>
                            <div>Level: {level}/{maxLevel} </div>
                        </div>
                    </div>
                    <BottomScreen />
                </div>
            </div>
        </div>
    );
}
