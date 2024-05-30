import { useState, useEffect, createContext, useContext } from 'react'

interface SideBarContextType {
    openSideBar: boolean
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBarContext = createContext<SideBarContextType | null>(null)

export const SideBarProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [openSideBar, setOpenSideBar] = useState<boolean>(false)

    useEffect(() => {
        const open = localStorage.getItem('openSideBar')
        if (open) {
            setOpenSideBar(JSON.parse(open))
        } else {
            setOpenSideBar(false)
            localStorage.setItem('openSideBar', 'false')
        }

        return () => {}
    }, [openSideBar])

    return (
        <SideBarContext.Provider value={{ openSideBar, setOpenSideBar }}>
            {children}
        </SideBarContext.Provider>
    )
}

export const useSideBar = (): SideBarContextType => {
    const context = useContext(SideBarContext)
    if (!context) {
        throw new Error('useSideBar must be used within an SideBarProvider')
    }
    return context
}
