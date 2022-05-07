import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CoinBase from './pages/CoinBase'
import HomePage from './pages/HomePage'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh'
  }
}))

const App = () => {
  const classes = useStyles()
  return (
    <>
      <Router>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/coin/:id" element={<CoinBase />} exact />
          </Routes>
        </div>
      </Router>

    </>
  );
}

export default App;
