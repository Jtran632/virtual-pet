import { useState, useEffect } from 'react'
export default function RPSGameScreen() {
    const [choice, setChoice] = useState('')
    const [choice2, setChoice2] = useState('')
    const [resetGame, setResetGame] = useState(false)

    let choiceArr = ['rock', 'paper', 'scissors']
    let choiceDict = {
        'rock': '✊',
        'paper': '✋',
        'scissors': '✌️',
    }
    let [results, setResults] = useState('')
    
    function determineWinner(value: string) {
        let c1 = value
        let c2 = choiceArr[Math.floor(Math.random() * 3)]
        let res = ''
        if (c1 === c2) {
            res = 'draw'
        }
        else if ((c1 === 'rock' && c2 == 'scissors')
            || (c1 === 'paper' && c2 === 'rock')
            || (c1 == 'scissors' && c2 == 'paper')) {
            res = 'winner'
        }
        else {
            res = 'loser'
        }
        setChoice(choiceDict[value as keyof object])
        setChoice2(choiceDict[c2 as keyof object])
        setResults(res)
    }
    
    function reset() {
        setChoice('')
        setChoice2('')
        setResults('')
        setResetGame(true)
    }
    
    useEffect(() => {
        setResetGame(false)
    }, [resetGame])

    return (
        <div className={`grid grid-rows-6 grid-cols-6 row-span-4 border-4 border-black bg-hill bg-cover text-black`}>

            <div className="line1 grid grid-cols-3 row-span-1 col-span-full">
                {choice != '' ?
                    <>
                        <div className='flex justify-center text-3xl col-start-1'>
                            {results === 'winner' ? 'winner' : results != 'draw' ? 'loser' : ''}

                        </div>
                        <div className='flex justify-center text-3xl col-start-2'>
                            {results === 'draw' ? 'draw' : ''}
                        </div>
                        <div className='flex justify-center text-3xl col-start-3'>
                            {results === 'loser' ? 'winner' : results != 'draw' ? 'loser' : ''}
                        </div>
                    </>
                    : <></>}
            </div>
            <div className="line2 grid grid-cols-3 row-span-1 col-span-full">
                {choice === '' ?
                    <div className="col-start-2 text-center text-5xl">
                        <button value={'rock'} className="hover:scale-150" onClick={(e) => determineWinner(e.currentTarget.value)}>✊</button>
                    </div>
                    : <></>
                }
            </div>
            {choice === '' ?
                <div className="line3 grid grid-cols-8 row-span-1 col-span-full">
                </div>

                :
                <div className="line3 grid grid-cols-8 row-span-2 col-span-full">
                    <div className='flex items-center justify-center col-start-2 col-end-4 row-span-2 text-6xl'>{choice}</div>
                    <div className='flex items-center justify-center col-start-6 col-end-8 row-span-2 text-6xl'>{choice2}</div>
                </div>
            }
            {choice === '' ?
                <div className="line4 grid grid-cols-5 row-span-1 col-span-full">
                    <div className="col-start-2 text-center text-5xl">
                        <button value={'paper'} className="hover:scale-150" onClick={(e) => determineWinner(e.currentTarget.value)}>✋</button>
                    </div>
                    <div className="col-start-4 text-center text-5xl">
                        <button value={'scissors'} className="hover:scale-150" onClick={(e) => determineWinner(e.currentTarget.value)}>✌️</button>
                    </div>
                </div>
                : <></>
            }
            <div className="line5 row-span-1 col-span-full"></div>
            <div className="line6 grid grid-cols-3 row-span-1 col-span-full">
                {choice != '' ? <div className='flex items-center justify-center text-xl col-start-2 mb-2 border-2 bg-gray-400 rounded-lg hover:scale-110' onClick={() => reset()}>Reset</div> : <></>}

            </div>
        </div >
    )
}