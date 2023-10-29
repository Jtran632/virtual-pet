import Screen from './components/screen'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className='flex flex-col items-center justify-center border-8 border-green-500 bg-green-400 h-[30rem] w-[30rem] rounded-xl'>
        <div>V-Pet</div>
        <Screen />
      </div>
    </main>
  )
}
