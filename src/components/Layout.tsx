import React, { ReactNode } from 'react'
import SideBar from './SideBar'

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <section className='w-full relative'>
            <div className='w-[16%] bg-primary h-screen fixed top-0 left-0'>
                <SideBar />
            </div>
            <div className='w-[84%] p-3 bg-gray-100 absolute top-0 right-0 overflow-auto min-h-screen'>
                {children}
            </div>
        </section>
    )
}

export default Layout
