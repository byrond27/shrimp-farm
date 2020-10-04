import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Farms from './Components/pages/Farms'
import Navbar from './Components/layout/NavBar'
import Sidebar from './Components/dashboard/Sidebar'

import Dashboard from './Components/dashboard/Dashboard'
import './App.css'
import FarmContextProvider from './Context/FarmContext'

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
          </Switch>
        </div>
      </Router>
    </FarmContextProvider>
  )
}

export default App
