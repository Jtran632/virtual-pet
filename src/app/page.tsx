import Screen from './components/Screen'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className='flex flex-col items-center justify-center border-8 border-green-500 bg-green-400 h-[30rem] w-[30rem] rounded-x font-pixel'>
        <div>V-Pet</div>
        <Screen />
      </div>
      <div className='text-white text-xs'>
        Images by <a href="https://www.freepik.com/free-vector/pixel-art-rural-landscape-background_49661322.htm#query=pixel%20scenery&position=6&from_view=search&track=ais">Freepik</a>
      </div>
    </main>
  )
}
