import { useContext } from 'react'
import { ExpContext } from '../MainScreen'
export default function GameScreen() {
    const { setCurScreen } = useContext(ExpContext)
    const s = 'grid grid-cols-2 items-center col-span-full border-4 border-opacity-100 bg-contain m-0.5 opacity-70 hover:opacity-100'
    return (
        <div className={`grid grid-rows-3 grid-cols-3 row-span-4 border-4 border-black bg-black text-black`}>
            <div className={`row-start-1 bg-beach ${s}`} onClick={() => setCurScreen('rpsGame')}>
                <div className='text-[.85rem] col-start-1 pl-2 underline border-2'>Rock-Paper-Scissors: </div>
                <div className='flex justify-end col-start-2 text-2xl pr-10'>✊ ✋ ✌️</div>
            </div>
            <div className={`row-start-2 bg-fields ${s}`} onClick={() => setCurScreen('rpsGame')}>
                <div className='text-[.85rem] col-start-1 pl-2 underline border-2'>Rock-Paper-Scissors: </div>
                <div className='flex justify-end col-start-2 text-2xl pr-10'>✊ ✋ ✌️</div>
            </div>
            <div className={`row-start-3 bg-meadow ${s}`} onClick={() => setCurScreen('rpsGame')}>
                <div className='text-[.85rem] col-start-1 pl-2 underline border-2'>Rock-Paper-Scissors: </div>
                <div className='flex justify-end col-start-2 text-2xl pr-10'>✊ ✋ ✌️</div>
            </div>
        </div>
    )
}