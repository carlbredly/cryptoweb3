import { useState } from 'react'
import { HiShoppingBag } from 'react-icons/hi2'
import { BsGraphUp } from 'react-icons/bs'
import { FaGift, FaUser } from 'react-icons/fa'


const TabsNav = () => {
  const [activeTab, setActiveTab] = useState<string>('Trade')

  const tabs = [
    { id: 'Trade', label: 'Trade', icon: HiShoppingBag, activeColor: '#97FCA6' },
    { id: 'Positions', label: 'Positions', icon: BsGraphUp, activeColor: '#FFFFFF80' },
    { id: 'Rewards', label: 'Rewards', icon: FaGift, activeColor: '#D4A574', badge: '345,29k' },
    { id: 'Profile', label: 'Profile', icon: FaUser, activeColor: '#FFFFFF80' },
  ]

  return (
      <div className='flex justify-around items-center py-2 sm:py-3 px-2 sm:px-4 w-full'>
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className='flex flex-col items-center gap-1 relative'
            >
              {tab.badge && (
                <div className='absolute -top-2 -right-2 bg-[#D4A574] text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold z-10'>
                  {tab.badge}
                </div>
              )}
              <div 
                className={`relative flex items-center justify-center ${
                  isActive 
                    ? 'w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg' 
                    : ''
                }`}
                style={isActive ? {
                  background: 'linear-gradient(to bottom, #2D3225 0%, #34301D 100%)'
                } : {}}
              >
                {isActive ? (
                  <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                    <svg width="0" height="0" style={{ position: 'absolute' }}>
                      <defs>
                        <linearGradient id={`gradient-${tab.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#97FCA6" />
                          <stop offset="100%" stopColor="#F6C90F" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <Icon 
                      size={20}
                      className="sm:w-6 sm:h-6"
                      style={{ 
                        fill: `url(#gradient-${tab.id})`,
                        color: `url(#gradient-${tab.id})`
                      }}
                    />
                  </div>
                ) : (
                  <Icon 
                    size={20}
                    className="sm:w-6 sm:h-6"
                    color="#FFFFFF80"
                  />
                )}
              </div>
              <span 
                className={`text-[10px] sm:text-xs ${
                  isActive ? 'text-white' : 'text-[#FFFFFF80]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
  )
}

export default TabsNav