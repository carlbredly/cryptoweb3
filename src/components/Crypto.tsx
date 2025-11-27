import crypto from '../assets/Bitcoin.png'
import { ChevronDown } from 'lucide-react';

const Crypto = () => {
  return (
    <div className='flex items-center gap-2 bg-[#222222] px-3 sm:px-4 py-2 rounded-xl'>
        <img src={crypto} alt="crypto" className='w-5 h-5 sm:w-6 sm:h-6 rounded-full' />
        <p className='text-xs sm:text-sm'>BTCDEGEN/USDC</p>
        <p className='text-xs sm:text-sm text-gray-400'>100x</p>
        <ChevronDown size={16} className='sm:w-5 sm:h-5' />
    </div>
  )
}

export default Crypto