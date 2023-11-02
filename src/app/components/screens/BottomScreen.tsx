import { Dispatch, SetStateAction } from "react"

interface BottomScreenProps {
    pet: {
        name: string,
        url: string,
        urlShiny: string,
        evolvesTo: string | string[],
        evolutionPhase: string,
    },
    hunger: number,
    setHunger: Dispatch<SetStateAction<number>>,
    energy: number,
    setEnergy: Dispatch<SetStateAction<number>>,
    setCurScreen: Dispatch<SetStateAction<string>>,
}
const s = 'flex justify-center items-center col-span-1 border-r-2 w-full h-full hover:bg-green-100'

export default function BottomScreen({ pet, hunger, setHunger, energy, setEnergy, setCurScreen }: BottomScreenProps) {
    function eat() {
        if (energy > 0 && hunger < 100) {
            if (hunger + 25 <= 100) {

                setHunger(hunger + 25)
            }
            else {
                setHunger(100)
            }
            setEnergy(energy - 1)
        }
        else {
            setHunger(hunger)
        }
    }
    return (
        <>
            {
                pet.name != 'egg' ?
                    <div className='grid grid-cols-5 row-span-1 border-2 border-black text-center text-2xl'>
                        <button className={s} onClick={() => setCurScreen('default')}>🏠</button>
                        <button className={s} onClick={() => eat()}>🍕</button>
                        <button className={s}>💪</button>
                        <button className={s} onClick={() => setCurScreen('fishing')}>🎣</button>
                        <button className={s} onClick={() => setEnergy(25)}>💤</button>
                    </div >
                    : <></>
            }
        </>
    )
}

