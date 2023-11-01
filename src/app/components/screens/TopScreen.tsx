import { useContext } from "react"
import { ExpContext } from "../MainScreen"
interface TopScreenProps {
    happiness: number,
    hunger: number,
    stats: {
        strength: number,
        defence: number,
        speed: number,
    },
    energy: any
}
export default function TopScreen({ happiness, hunger, stats, energy }: TopScreenProps) {
    const { exp } = useContext(ExpContext)
    return (
        <div className='status grid grid-cols-5 row-span-1 border-2 border-black'>
            <div className='flex-col justify-center items-center col-span-1 border-r-2 text-xs text-center bg-yellow-300'>
                <div>Happiness</div>
                <div>{happiness}/100</div>
                <div>
                    {happiness >= 66
                        ? '😁'
                        : happiness >= 33
                            ? '😀'
                            : '😢'
                    }
                </div>
            </div>
            <div className='flex-col justify-center items-center col-span-1 border-r-2 text-center bg-red-300'>
                <div>Hunger</div>
                <div>{hunger}/100</div>
                <div>
                    {hunger >= 66
                        ? '😁'
                        : hunger >= 33
                            ? '😀'
                            : '😢'
                    }
                </div>
            </div>
            <div className='flex-col justify-center items-center col-span-1 border-r-2 text-xs text-center bg-blue-300'>
                <div>Exp</div>
                <div>{exp}/10</div>
                <div></div>
            </div>
            <div className='flex-col justify-center items-center col-span-1 border-r-2 text-xs text-center bg-purple-300'>
                <div className='flex justify-between px-2'>
                    <div>Str</div>
                    <div>{stats.strength}</div>
                </div>
                <div className='flex justify-between px-2'>
                    <div>Def</div>
                    <div>{stats.defence}</div>
                </div>
                <div className='flex justify-between px-2'>
                    <div>Spd</div>
                    <div>{stats.speed}</div>
                </div>
            </div>
            <div className='flex justify-center items-center col-span-1 border-r-2 text-xs text-center bg-green-300'>
                <div>
                    <div className='text-lg'>🧃</div>
                    <div>{energy}/10</div>
                </div>
            </div>
        </div>
    )
}