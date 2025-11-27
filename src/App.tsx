import './App.css'
import Connect from './components/Connect'
import PriceChart from './components/PriceChart'
import Nav from './components/Nav'
import Header from './components/Header'


function App() {

  return (
    <div className='flex flex-col gap-4 items-center justify-center w-full min-h-screen '>
      <Header />
      <Connect  />
      <PriceChart/>
    </div>
  )
}

export default App
