import React, { useEffect } from 'react'
import Banner from '../components/Banner/Banner'
import CoinTable from '../components/CoinTable/CoinTable'
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/", { replace: true })
    }, [])
    return (
        <>
            <Banner />
            <CoinTable />
        </>
    )
}

export default HomePage