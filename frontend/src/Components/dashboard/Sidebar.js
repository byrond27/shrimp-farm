import React, { useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
  useEffect(() => {
    let sidenav = document.querySelector('#slide-out')
    M.Sidenav.init(sidenav, {})
    let elems = document.querySelectorAll('.tooltipped')
    M.Tooltip.init(elems)
  })

  return (
    <div>
      <ul id='slide-out' className='sidenav'>
        <li>
          <div className='user-view center'>
            <div className='background'>
              <img src='https://picsum.photos/300/?blur' alt={'backgroud'} />
            </div>
            <img
              className='circle'
              src='https://picsum.photos/200'
              alt={'profile_picture'}
            />
          </div>
        </li>
        <li>
          <Link to={'/farms'} className={'sidenav-close'}>
            <i className='material-icons'>agriculture</i>Farms
          </Link>
        </li>
        <li>
          <Link to='/ponds' className={'sidenav-close'}>
            <i className='material-icons'>waves</i>Ponds
          </Link>
        </li>
      </ul>
    </div>
  )
}
