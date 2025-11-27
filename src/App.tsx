import './App.css'
import Connect from './components/Connect'
import PriceChart from './components/PriceChart'
import Header from './components/Header'


function App() {

  return (
    <div className='flex flex-col w-full h-full overflow-hidden'>
      <Header />
      <Connect  />
      <PriceChart/>
    </div>
  )
}

export default App
