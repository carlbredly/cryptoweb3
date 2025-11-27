import { IoIosArrowDown } from "react-icons/io";
import Tabs from './Tabs'

const Controls = () => {
  return (
    <div className='flex flex-col w-full px-4 sm:px-6 pt-4 pb-0'>
        <div className='flex justify-between items-start mb-4 gap-2'>
            <p className='text-[#FFFFFF80] text-xs sm:text-sm'>Position details</p>
            <div className='flex gap-1 sm:gap-2 items-center'>
                <button className='bg-[#222222] text-white px-2 sm:px-3 py-1 sm:py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap'>Margin $10</button>
                <button className='bg-[#222222] text-white px-2 sm:px-3 py-1 sm:py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap'>Leverage 10x</button>
                <IoIosArrowDown size={14} className='sm:w-4 sm:h-4 text-[#FFFFFF80]'/>
            </div>
        </div>
        <Tabs />
    </div>
  )
}

export default Controls