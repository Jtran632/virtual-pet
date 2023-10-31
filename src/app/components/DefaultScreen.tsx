/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
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
    useEffect(() => {
        const intervalRandPos = setInterval(() => {
            let temp = Math.floor(Math.random() * 3) + 1
            setPosition(`col-start-${String(temp)}`)
        }, 3000);
        return () => clearInterval(intervalRandPos);
    }, [position]);
    function changeBG() {
        setBgChoice(backgrounds[(Math.floor(Math.random() * backgrounds.length))])
    }
    function getBaseMons() {
        let base: string[] = [];
        for (var key in poke) {
            if (poke[key as keyof object]['evolutionPhase'] === 'base') {
                base.push(poke[key as keyof object]['name'])
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
        setMaxLevel(10)
    }
    function evolve() {
        let choice = Math.floor(Math.random() * pet.evolvesTo.length)
        if (typeof pet.evolvesTo == typeof []) {
            setPet(poke[pet.evolvesTo[choice] as keyof object])
        }
        else {
            setPet(poke[pet.evolvesTo as keyof object])
        }
        setMaxLevel(maxLevel + 5)
        setCanEvolve(false)
    }
    console.log(pet)
    return (
        <div className={`grid grid-rows-5 grid-cols-3 row-span-4 border-4 border-black ${bgChoice} bg-cover text-black`}>
            <div className='flex justify-end col-start-1 col-span-full space-x-2'>
                <div className='flex justify-center items-center'>Position: {position}</div>
                <div className='flex items-center'>
                    <div className='flex justify-center items-center'>
                        {canEvolve ? <button className='flex items-center h-fit mr-2 text-xl text-red-700 border-2 border-red-500 bg-white' onClick={() => evolve()}>‼️</button> : <></>}
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
                <div>{isShiny ? '✨ ' : ''}Level: {level}/{maxLevel} </div>
            </div>
        </div>
    )
}