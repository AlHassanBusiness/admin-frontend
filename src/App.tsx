import './App.css'
import { useAuth } from './Context/AuthContext'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './screens/Login'
import Home from './screens/Home'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Clients from './screens/Clients'
import AddClient from './screens/AddClient'
import Stores from './screens/Stores'
import EditClient from './screens/EditClient'
import AddInvestment from './screens/AddInvestment'
import Investments from './screens/Investments'
import AddProfit from './screens/AddProfit'
import Sales from './screens/Sales'
import Loader from './components/Loader'

function App() {
    const { loggedIn,loading } = useAuth()

    if(loading){
        return (
            <div className='flex justify-center items-center min-h-screen'>
                 <Loader />
            </div>
        )
    }

    return (
        <>
            <Toaster position='top-right' />
            <BrowserRouter>
                <Routes>
                    {loggedIn ? (
                        <>
                            <Route
                                path='/'
                                element={
                                    <Layout>
                                        <Home />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/clients/*'
                                element={
                                    <Layout>
                                        <Clients />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/add-client'
                                element={
                                    <Layout>
                                        <AddClient />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/edit-client/:id'
                                element={
                                    <Layout>
                                        <EditClient />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/stores/*'
                                element={
                                    <Layout>
                                        <Stores />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/investment/:id'
                                element={
                                    <Layout>
                                        <AddInvestment />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/investments'
                                element={
                                    <Layout>
                                        <Investments />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/add-profit'
                                element={
                                    <Layout>
                                        <AddProfit />
                                    </Layout>
                                }
                            />
                            <Route
                                path='/sales/*'
                                element={
                                    <Layout>
                                        <Sales />
                                    </Layout>
                                }
                                />
                           <Route
                                path='*'
                                element={<Navigate to='/' />}
                            />
                        </>
                    ) : (
                        <>
                            <Route
                                path='/login'
                                element={<Login />}
                            />
                            <Route
                                path='*'
                                element={<Navigate to='/login' />}
                            />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
