/* eslint-disable @next/next/no-img-element */
import { useState, useContext, useEffect } from 'react'
import { ExpContext } from '../MainScreen'
interface FishingScreenProps {
    stats: {
        strength: number,
        defence: number,
        speed: number
    },
    maxLevel: number
}
const fishTypes = [
    { type: 'large', threshold: 95, size: 8, value: 10 },
    { type: 'med', threshold: 70, size: 9, value: 5 },
    { type: 'small', threshold: 40, size: 22, value: 3 },
    { type: 'junk', threshold: 0, size: 16, value: 1 },
];
export default function FishingScreen({ stats, maxLevel }: FishingScreenProps) {
    const { exp, setExp, level, setLevel, energy, setEnergy } = useContext(ExpContext)
    const [fishingText, setFishingText] = useState('Fish')
    const [pingEffect, setPingEffect] = useState(false)
    const [fishUrl, setFishUrl] = useState('')
    const [value, setValue] = useState(0)
    const [disabled, setDisabled] = useState(false)

    const disableButton = () => {
        setDisabled(true);
        setFishingText('...')
        setTimeout(() => {
            setDisabled(false);
            setFishingText("Try again?")
        }, 1250);
    };

    function GetFish() {
        const bonus = Math.floor((stats.strength + stats.defence + stats.speed) / 3);
        const pickFish = Math.floor(Math.random() * 101) + bonus;
        for (const fish of fishTypes) {
            if (pickFish >= fish.threshold) { //number of images in our selected folder
                if (level < maxLevel) {
                    setValue(fish.value);
                } else {
                    setValue(0)
                }
                setPingEffect(true);
                setEnergy(energy - 1);
                disableButton();
                setFishUrl(`/fish/${fish.type}/${String(Math.floor(Math.random() * fish.size) + 1)}.png`);
                break;
            }
        }
    }

    const AdjustExp = () => {
        if (level < maxLevel) {
            if (exp + value < 10) {
                setExp(exp + value);
            } else {
                setLevel(level + 1);
                setExp(0);
            }
        } else {
            setExp(0);
        }
    };

    useEffect(() => {
        if (value > 0) {
            AdjustExp();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [energy]);

    return (
        <div className={`grid grid-rows-6 grid-cols-3 row-span-4 border-4 border-black bg-beach bg-cover text-black`}>
            {pingEffect ?
                <div className={`animate-pingSlow flex row-start-1 col-start-${Math.floor(Math.random() * 0) + 1} justify-center items-center text-xl`} onAnimationEnd={() => setPingEffect(false)}>
                    +{value} Exp
                </div>
                : <div></div>
            }
            {fishUrl != '' ?
                <div className='grid grid-cols-5 row-start-2 row-span-4 col-span-full h-full'>
                    <img src={fishUrl} alt='fishImage' className='flex justify-center items-center col-start-2 col-end-5 h-36 w-full'></img>
                </div>
                : <div></div>
            }
            <button
                className={`flex row-start-6 col-start-2 justify-center items-center mb-2 border-2 border-gray-600 ${disabled ? 'bg-gray-500 ' : 'bg-sky-300 hover:bg-sky-400'
                    } rounded-lg text-[.75rem]`}
                disabled={disabled}
                onClick={() => {
                    if (energy > 0) {
                        GetFish();
                    } else {
                        setFishingText('No energy left');
                    }
                }}
            >
                {fishingText}
            </button>
            <div className='row-start-6 col-start-3 flex justify-end items-center pr-4'>level{level}/{maxLevel}</div>
        </div >
    )
}