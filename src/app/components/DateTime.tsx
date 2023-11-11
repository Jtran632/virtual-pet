'use client'
import { useState, useEffect } from 'react'
interface ITime {
    time: String
}
export default function DateTime({ time }: ITime) {
    const [curTime, setCurTime] = useState(time)
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurTime(new Date().toLocaleTimeString())
        }, 1000);
        return () => clearInterval(timeInterval)
    }, [])
    return (
        <div>{curTime}</div>
    )
}