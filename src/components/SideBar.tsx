import { NavLink } from 'react-router-dom'
import { api } from '../api/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
const SideBar = () => {
    const navigate = useNavigate()
    const { setUser, setLoggedIn } = useAuth()
    const handleLogout = async () => {
        try {
            const response = await api.post('/api/auth/admin/logout')

            if (response.status === 200) {
                localStorage.removeItem('user')
                toast.success('Logged out')
                setUser(null)
                setLoggedIn(false)
                navigate('/login')
            }
        } catch (error: object | any) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    return (
        <div className='flex flex-col py-5  gap-y-16'>
            <h1 className='text-white font-bold text-2xl text-center mt-3'>
                ADMIN
            </h1>
            <div className='flex flex-col'>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        isActive
                            ? 'active font-bold text-lg pl-3 py-2'
                            : 'font-bold text-lg pl-3 py-2 text-white'
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to='/clients'
                    className={({ isActive }) =>
                        isActive
                            ? 'active font-bold text-lg pl-3 py-2'
                            : 'font-bold text-lg  py-2 pl-3 text-white'
                    }
                >
                    Clients
                </NavLink>
                <NavLink
                    to='/add-client'
                    className={({ isActive }) =>
                        isActive
                            ? 'active font-bold text-lg pl-3 py-2'
                            : 'font-bold text-lg  py-2 text-white pl-3'
                    }
                >
                    Add Client
                </NavLink>
                <NavLink
                    to='/stores'
                    className={({ isActive }) =>
                        isActive
                            ? 'active font-bold text-lg  py-2 pl-3'
                            : 'font-bold text-lg  py-2 text-white pl-3'
                    }
                >
                    Stores
                </NavLink>
                <NavLink
                    to='/investments'
                    className={({ isActive }) =>
                        isActive
                            ? 'active font-bold text-lg  py-2 pl-3'
                            : 'font-bold text-lg  py-2 text-white pl-3'
                    }
                >
                    Investments
                </NavLink>
                <NavLink
                    to='/add-profit'
                    className={({ isActive }) =>
                        isActive
                            ? 'active font-bold text-lg  py-2 pl-3'
                            : 'font-bold text-lg  py-2 text-white pl-3'
                    }
                >
                    Add Profit
                </NavLink>
                <button
                    className='font-bold bg-red-400 text-lg  py-2 text-white hover:bg-red-500 mt-10'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default SideBar
