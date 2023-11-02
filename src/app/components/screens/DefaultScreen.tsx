/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react'
interface DefaultScreenProps {
    pet: {
        name: string,
        url: string,
        urlShiny: string,
        evolvesTo: string | string[],
        evolutionPhase: string,
    },
    setPet: Dispatch<SetStateAction<{
        name: string;
        url: string;
        urlShiny: string;
        evolvesTo: string;
        evolutionPhase: string;
    }>>,
    level: number,
    maxLevel: number,
    setLevel: Dispatch<SetStateAction<number>>,
    setMaxLevel: Dispatch<SetStateAction<number>>,
    poke: object,
    canEvolve: boolean,
    setCanEvolve: Dispatch<SetStateAction<boolean>>,
}
export default function DefaultScreen({ pet, setPet, level, maxLevel, setLevel, setMaxLevel, poke, canEvolve, setCanEvolve }: DefaultScreenProps) {

    const eggUrl = `/eggs/${Math.floor(Math.random() * 49) + 1}.png`
    const [isShiny, setIsShiny] = useState(false)
    const [position, setPosition] = useState('col-start-2')
    const backgrounds = [
        'bg-lakeside',
        'bg-desert',
        'bg-campsite',
        'bg-meadow'
    ]
    const [bgChoice, setBgChoice] = useState(backgrounds[0])
    function getBaseMons() {
        let base: string[] = [];
        for (const key in poke) {
            if (poke[key as keyof object]['evolutionPhase'] === 'base') {
                base.push(poke[key as keyof typeof poke]['name']);
            }
        }
        let shinyNumber = Math.floor(Math.random() * 3)
        let shinyPick = Math.floor(Math.random() * 3)
        let randomBase = Math.floor(Math.random() * base.length)
        if (shinyNumber === shinyPick) {
            setIsShiny(true)
        }
        setPet(poke[base[randomBase] as keyof object])
        setLevel(0)
        setMaxLevel(3)
        console.log(base)
    }
    useEffect(() => {
        if (pet.name !== 'egg') {
            const intervalRandPos = setInterval(() => {
                let temp = Math.floor(Math.random() * 3) + 1;
                setPosition(`col-start-${String(temp)}`);
            }, 1000);
            return () => clearInterval(intervalRandPos);
        }
    }, [position, pet.name]);
    function changeBG() {
        setBgChoice(backgrounds[(Math.floor(Math.random() * backgrounds.length))])
    }
    function evolve() {
        let choice = Math.floor(Math.random() * pet.evolvesTo.length)
        if (typeof pet.evolvesTo == typeof []) {
            setPet(poke[pet.evolvesTo[choice] as keyof object])
        }
        else {
            setPet(poke[pet.evolvesTo as keyof object])
        }
        setMaxLevel(maxLevel + 3)
        setCanEvolve(false)
    }
    const fullyEvolved = () => {
        if (pet.evolutionPhase === 'egg'){
            return "🥚"
        }
        if (pet.evolvesTo === 'none' && level == maxLevel){
            return '🎀'
        }
    }
    return (
        <div className={`grid grid-rows-5 grid-cols-3 row-span-4 border-4 border-black ${bgChoice} bg-cover text-black`}>
            <div className='flex justify-end col-start-1 col-span-full space-x-2'>
                {/* <div className='flex justify-center items-center'>Position: {position}</div> */}
                <div className='flex items-center'>
                    <div className='flex justify-center items-center'>
                        {canEvolve ? <button className='flex items-center h-fit mr-2 text-green-700 border-2 border-green-500 bg-green-200 text-xs p-1' onClick={() => evolve()}>Evolve?</button> : <></>}
                    </div>
                    <button className='flex items-center h-fit mr-2 text-xl' onClick={() => changeBG()}>🗺️</button>
                </div>
            </div>
            {pet.name === 'egg'
                ?
                <img src={eggUrl} alt={pet.name} className={`flex row-start-4 col-start-2 ml-10 mt-4 scale-[3]`} onClick={getBaseMons} />
                : <img src={!isShiny ? pet.url : pet.urlShiny} alt={pet.name} className={`flex row-start-3 mt-5 ${position} w-fit h-28 `} />
            }
            <div className='flex justify-between row-start-6 col-span-full w-full text-black px-4'>
                <div>{pet.name} - {pet.evolutionPhase} </div>
                <div>{isShiny ? '✨ ' : ''} {fullyEvolved()} Level: {level}/{maxLevel} </div>
            </div>
        </div>
    )
}