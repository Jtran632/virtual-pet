import Screen from './components/Screen'
const poke = {
  'egg': {
      name: 'egg',
      url: '',
      urlShiny: '',
      evolvesTo: 'none',
      evolutionPhase: 'egg',
  },
  'bulbasaur': {
      name: 'bulbasaur',
      url: '/mons/1/0.png',
      urlShiny: '/mons/1/1.png',
      evolvesTo: 'ivysaur',
      evolutionPhase: 'base',
  },
  'ivysaur': {
      name: 'ivysaur',
      url: '/mons/2/0.png',
      urlShiny: '/mons/2/1.png',
      evolvesTo: 'venusaur',
      evolutionPhase: 'middle',
  },
  'venusaur': {
      name: 'venusaur',
      url: '/mons/3/0.png',
      urlShiny: '/mons/3/1.png',
      evolvesTo: 'venusaur-m',
      evolutionPhase: 'final',
  },
  'venusaur-m': {
      name: 'venusaur-m',
      url: '/mons/3-M/0.png',
      urlShiny: '/mons/3-M/1.png',
      evolvesTo: 'none',
      evolutionPhase: 'mega',
  },
  'charmander': {
      name: 'charmander',
      url: '/mons/4/0.png',
      urlShiny: '/mons/4/1.png',
      evolvesTo: 'charmeleon',
      evolutionPhase: 'base',
  },
  'charmeleon': {
      name: 'charmeleon',
      url: '/mons/5/0.png',
      urlShiny: '/mons/5/1.png',
      evolvesTo: 'charizard',
      evolutionPhase: 'middle',
  },
  'charizard': {
      name: 'charizard',
      url: '/mons/6/0.png',
      urlShiny: '/mons/6/1.png',
      evolvesTo: ['charizard-mx', 'charizard-my'],
      evolutionPhase: 'final',
  },
  'charizard-mx': {
      name: 'charizard-mx',
      url: '/mons/6-MX/0.png',
      urlShiny: '/mons/6-MX/1.png',
      evolvesTo: 'none',
      evolutionPhase: 'mega',
  },
  'charizard-my': {
      name: 'charizard-my',
      url: '/mons/6-MY/0.png',
      urlShiny: '/mons/6-MY/1.png',
      evolvesTo: 'none',
      evolutionPhase: 'mega',
  },
  'squirtle': {
      name: 'squirtle',
      url: '/mons/7/0.png',
      urlShiny: '/mons/7/1.png',
      evolvesTo: 'wartortle',
      evolutionPhase: 'base',
  },
  'wartortle': {
      name: 'wartortle',
      url: '/mons/8/0.png',
      urlShiny: '/mons/8/1.png',
      evolvesTo: 'blaustoise',
      evolutionPhase: 'middle',
  },
  'blaustoise': {
      name: 'blaustoise',
      url: '/mons/9/0.png',
      urlShiny: '/mons/9/1.png',
      evolvesTo: 'blaustoise-m',
      evolutionPhase: 'final',
  },
  'blaustoise-m': {
      name: 'blaustoise-m',
      url: '/mons/9-M/0.png',
      urlShiny: '/mons/9-M/1.png',
      evolvesTo: 'none',
      evolutionPhase: 'mega',
  },
}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className='flex flex-col items-center justify-center border-8 border-green-500 bg-green-400 h-[30rem] w-[30rem] rounded-x font-pixel'>
        <div>V-Pet</div>
        <Screen poke={poke}/>
      </div>
      <div className='text-white text-xs'>
        Images by <a href="https://www.freepik.com/free-vector/pixel-art-rural-landscape-background_49661322.htm#query=pixel%20scenery&position=6&from_view=search&track=ais">Freepik</a>
      </div>
    </main>
  )
}
