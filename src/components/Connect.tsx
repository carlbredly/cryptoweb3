import Crypto from './Crypto'
import { useState } from 'react'
import { DollarSign, Wallet, ChevronDown } from 'lucide-react'

const Connect = () => {
  const [isConnected, setIsConnected] = useState(false)
  const mockBalance = "15,000.00"

  return (
    <div className='flex justify-between px-4 w-full items-center gap-2 sm:gap-4 flex-shrink-0 py-2'>
        <Crypto />
        {isConnected ? (
          <button 
            onClick={() => setIsConnected(false)}
            className='flex items-center rounded-xl border border-white/20 overflow-hidden h-10 sm:h-12'
          >
            {/* Section gauche - Fond noir */}
            <div className='flex items-center gap-2 px-3 sm:px-4 h-full'>
              {/* Icône dollar avec glow bleu */}
              <div className='relative flex items-center justify-center w-7 h-7'>
                <div className='absolute inset-0 bg-blue-400/50  rounded-full'></div>
                <div className='relative w-full h-full bg-blue-500/40 rounded-full flex items-center justify-center border border-blue-400/30'>
                  <DollarSign size={14} className='text-white relative z-10' />
                </div>
              </div>
              {/* Montant */}
              <span className='text-white text-xs sm:text-sm font-medium whitespace-nowrap'>{mockBalance}</span>
              {/* Chevron */}
              <ChevronDown size={14} className='text-white sm:w-4 sm:h-4' />
            </div>
            {/* Section droite - Dégradé vert-jaune */}
            <div className='bg-gradient-to-b from-[#97FCA6] to-[#F6C90F] px-3 sm:px-4 h-full flex items-center justify-center min-w-[44px]'>
              <Wallet size={18} className='text-black/90' strokeWidth={2} />
            </div>
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