import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='navbar-fixed'>
      <nav>
        <div className='nav-wrapper white'>
          <Link
            to='#'
            href='#'
            data-target='slide-out'
            className='sidenav-trigger show-on-large col s3'>
            <i className='material-icons black-text'>menu</i>
          </Link>
        </div>
      </nav>
    </div>
  )
}
