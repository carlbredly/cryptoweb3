import Controls from './Controls'
import TabsNav from './TabsNav'

const Nav = () => {
  return (    <div className='flex flex-col border-t border-[#FFFFFF4D] bg-[#1E1E1E] rounded-t-3xl mt-0' >
        <Controls />
        <TabsNav />
    </div>
  )
}

export default Nav