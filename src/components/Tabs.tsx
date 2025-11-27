import { useState } from 'react'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<'Long' | 'Short'>('Long')

  return (
    <div className='flex gap-2 w-full'>
        <button 
          onClick={() => setActiveTab('Long')}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'Long'
              ? 'bg-[#97FCA61A] text-[#97fca6]'
              : 'bg-[#222222] text-white'
          }`}
        >
          Long
        </button>
        <button 
          onClick={() => setActiveTab('Short')}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'Short'
              ? 'bg-[#FF583A1A] text-[#ff573a]'
              : 'bg-[#222222] text-white'
          }`}
        >
          Short
        </button>
    </div>
  )
}

export default Tabs