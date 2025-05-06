import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Register from '../pages/Register'
import Layout from '../components/Layout'
import Login from '../pages/Login'
import MovieDetail from '../pages/MovieDetail'
import PrivateRouter from './PrivateRouter'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="details/:id" element={
                        <PrivateRouter>
                            <MovieDetail />
                        </PrivateRouter>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
