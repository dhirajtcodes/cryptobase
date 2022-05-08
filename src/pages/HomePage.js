import React from 'react'
import Banner from '../components/Banner/Banner'
import CoinTable from '../components/CoinTable/CoinTable'
import Header from '../components/Header'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    App: {
        backgroundColor: '#14161a',
        color: 'white',
        minHeight: '100vh'
    }
}))


const HomePage = () => {
    const classes = useStyles()


    return (
        <><div className={classes.App}>
            <Header />
            <Banner />
            <CoinTable />
        </div>
        </>
    )
}

export default HomePage