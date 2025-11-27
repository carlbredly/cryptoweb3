import { IoIosArrowDown } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'

const Header = () => {
  return (
    <div className='flex items-center justify-between w-full bg-[#222222] px-4 py-3 flex-shrink-0'>
      <div className='flex items-center gap-2'>
        {/* Trois cercles vides */}
        <div className='flex items-center gap-1'>
          <div className='w-1.5 h-1.5 rounded-full border border-[#FFFFFF80]'></div>
          <div className='w-1.5 h-1.5 rounded-full border border-[#FFFFFF80]'></div>
          <div className='w-1.5 h-1.5 rounded-full border border-[#FFFFFF80]'></div>
        </div>
        <IoIosArrowDown size={16} className='text-[#FFFFFF80]' />
      </div>
      
      <h2 className='text-[#FFFFFF80] text-sm font-medium'>Mini App</h2>
      
      <button className='flex items-center justify-center'>
        <IoClose size={20} className='text-[#FFFFFF80]' />
      </button>
    </div>
  )
}

export default Header