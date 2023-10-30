'use client'

interface BottomScreenProps {

}
const s = 'flex justify-center items-center col-span-1 border-r-2 w-full h-full hover:bg-green-100'
export default function BottomScreen() {
    return (
        <div className='grid grid-cols-5 row-span-1 border-2 border-black text-center text-2xl'>
            <button className={s}>💤</button>
            <button className={s}>🍕</button>
            <button className={s}>💪</button>
            <button className={s}>🎣</button>
            <button className={s}>💤</button>
        </div>
    )
}
