import MainScreen from './components/MainScreen'
import poke from '../../public/poke.json'
import DateTime from './components/DateTime'
const time = new Date().toLocaleTimeString()
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className='flex flex-col items-center justify-center border-8 border-green-500 bg-green-400 h-[30rem] w-[30rem] rounded-x font-pixel'>
        <div className='grid grid-cols-3 items-center w-full'>
          <div className='flex justify-center col-start-2'>V-Pet</div>
          <div className='flex justify-center col-start-3 pl-6 text-xs'>
            <DateTime {...{ time }} />
          </div>
        </div>
        <MainScreen poke={poke} />
      </div>
      <div className='text-white text-xs'>
        Images by <a href="https://www.freepik.com/free-vector/pixel-art-rural-landscape-background_49661322.htm#query=pixel%20scenery&position=6&from_view=search&track=ais">Freepik</a>
      </div>
    </main>
  )
}
