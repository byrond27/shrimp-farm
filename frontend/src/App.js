import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Farms from './Components/pages/Farms'
import Ponds from './Components/pages/Ponds'
import Navbar from './Components/layout/NavBar'
import Sidebar from './Components/dashboard/Sidebar'
import Dashboard from './Components/dashboard/Dashboard'
import FarmContextProvider from './Context/FarmContext'
import './App.css'

function App() {
  return (
    <FarmContextProvider>
      <Router>
        <div className='App'>
          <Navbar />
          <Sidebar />
          <Route exact path='/' component={Dashboard} />
          <Switch>
            <Route exact path='/farms' component={Farms} />
            <Route exact path='/ponds' component={Ponds} />
          </Switch>
        </div>
      </Router>
    </FarmContextProvider>
  )
}

export default App
