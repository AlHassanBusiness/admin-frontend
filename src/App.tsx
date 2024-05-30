import './App.css'
import { useAuth } from './Context/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import Home from './screens/Home'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Clients from './screens/Clients'
import AddClient from './screens/AddClient'
import Stores from './screens/Stores'
import EditClient from './screens/EditClient'
import AddInvestment from './screens/AddInvestment'
import Investments from './screens/Investments'
import AddProfit from './screens/AddProfit'
function App() {
    const { loggedIn } = useAuth()
    return (
        <>
            <Toaster position='top-right' />
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/login'
                        element={loggedIn ? <Navigate to='/' /> : <Login />}
                    />
                    <Route
                        path='/'
                        element={
                            loggedIn ? (
                                <Layout>
                                    <Home />
                                </Layout>
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/clients/*'
                        element={
                            loggedIn ? (
                                <Layout>
                                    <Clients />
                                </Layout>
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/add-client'
                        element={
                            loggedIn ? (
                                <Layout>
                                    <AddClient />
                                </Layout>
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/edit-client/:id'
                        element={
                            loggedIn ? (
                                <Layout>
                                    <EditClient />
                                </Layout>
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/stores/*'
                        element={
                            loggedIn ? (
                                <Layout>
                                    <Stores />
                                </Layout>
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/investment/:id'
                        element={
                            loggedIn ? (
                                <Layout>
                                    <AddInvestment />
                                </Layout>
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/investments'
                        element={
                            loggedIn ? (
                                <Layout>
                                    <Investments />
                                </Layout>
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/add-profit'
                        element={
                            loggedIn ? (
                                <Layout>
                                    <AddProfit />
                                </Layout>
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
