import Crypto from './Crypto'
import { useState } from 'react'

const Connect = () => {
  const [isConnected, setIsConnected] = useState(false)
  const mockAddress = "0xAbC...1234" // Adresse tronquée pour la simulation

  return (
    <div className='flex justify-between w-full items-center gap-2 sm:gap-4 mx-4'>
        <Crypto />
        {isConnected ? (
          <button 
            onClick={() => setIsConnected(false)}
            className='bg-gradient-to-t from-[#ffcc003d] to-[#97fca621] text-gradient-to-t from-[#ffcc00] to-[#97fca6] px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap'
          >
            {mockAddress}
          </button>
        ) : (
          <button 
            onClick={() => setIsConnected(true)}
            className='bg-gradient-to-t from-[#ffcc003d] to-[#97fca621] text-gradient-to-t from-[#ffcc00] to-[#97fca6] px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap'
          >
            Connect Wallet
          </button>
        )}
    </div>
  )
}

export default Connect