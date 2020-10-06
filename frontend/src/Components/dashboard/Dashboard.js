import React, { useContext } from 'react'
import { FarmContext } from '../../Context/FarmContext'
import { Link } from 'react-router-dom'
export default function Dashboard() {
  const context = useContext(FarmContext)
  const { farms, ponds } = context.state

  const sizeFarms = farms.map((farm) => farm.total_size)
  const sizePonds = ponds.map((pond) => pond.size)

  const average = (total, number) => {
    return total / number
  }

  const totalSize = (sizeArray) => {
    return sizeArray.reduce((a, b) => a + b, 0)
  }

  const maximum = (array) => {
    return array.sort((a, b) => b - a)[0]
  }
  const minimum = (array) => {
    return array.sort((a, b) => a - b)[0]
  }

  return (
    <div style={{ height: '75vh' }} className='container valign-wrapper'>
      <div className='row'>
        <div className='col s12 center-align'>
          <h4>
            <b>Dashboard Shrimp Farm</b>
          </h4>
          <div className='d-flex justify-content-space-around'>
            <div className='card blue-grey darken-1'>
              <div className='card-content white-text'>
                <span className='card-title'>Farms Info</span>
                <p>
                  Total Farms<span className='badge'>{farms.length}</span>
                </p>
                <p>
                  Total Size Farms
                  <span className='badge'>{totalSize(sizeFarms).toFixed(2)}</span>
                </p>
                {farms.length > 0 && (
                  <>
                    <p>
                      Farms average size
                      <span className='badge'>
                        {average(totalSize(sizeFarms), farms.length).toFixed(2)}
                      </span>
                    </p>
                    <p>
                      Maximum Size Farm
                      <span className='badge'>{maximum(sizeFarms).toFixed(2)}</span>
                    </p>
                    <p>
                      Minimum Size Farm
                      <span className='badge'>{minimum(sizeFarms).toFixed(2)}</span>
                    </p>
                  </>
                )}
              </div>
              <div className='card-action'>
                <Link to='farms' className='margin-0 center-align'>
                  Farms
                </Link>
              </div>
            </div>
            <div className='card blue-grey darken-1'>
              <div className='card-content white-text'>
                <span className='card-title'>Ponds Info</span>
                <p>
                  Total Ponds<span className='badge'>{ponds.length}</span>
                </p>
                <p>
                  Total Ponds Size
                  <span className='badge'>{totalSize(sizePonds).toFixed(2)}</span>
                </p>
                {ponds.length > 0 && (
                  <>
                    <p>
                      Ponds average size
                      <span className='badge'>
                        {average(totalSize(sizeFarms), ponds.length).toFixed(2)}
                      </span>
                    </p>
                    <p>
                      Maximum size pond
                      <span className='badge'>{maximum(sizePonds).toFixed(2)}</span>
                    </p>
                    <p>
                      Minimum size pond
                      <span className='badge'>{minimum(sizePonds).toFixed(2)}</span>
                    </p>
                  </>
                )}
              </div>
              <div className='card-action'>
                <Link to='ponds' className='margin-0 center-align'>
                  Ponds
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
