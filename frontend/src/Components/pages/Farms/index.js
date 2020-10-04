import React, { useEffect, useState, useContext } from 'react'

import classnames from 'classnames'
import M from 'materialize-css'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import isEmpty from '../../../Context/validations/isEmpty'
import { FarmContext } from '../../../Context/FarmContext'

import {
  createFarm,
  getFarms,
  deleteFarm,
  editFarm,
} from '../../../Context/actions/Farms'

export default function Farms(props) {
  const context = useContext(FarmContext)
  const { errors, farms } = context.state
  const [name, setname] = useState('')
  const [isModalOpen, setModalState] = useState(false)
  const [isEditModalOpen, setEditModalState] = useState(false)
  const [load, setload] = useState(false)

  const [currentFarmName, setcurrentFarmName] = useState('')
  const [currentFarmId, setcurrentFarmId] = useState('')

  useEffect(() => {
    setload(false)
    getFarms(context.dispatch)
  }, [load, context.dispatch])

  const ondeleteFarm = (id, name) => {
    if (window.confirm('Are you sure to delete the farm ' + name + '?')) {
      const farm = {
        id: id,
      }
      deleteFarm(farm, context.dispatch)
      setload(true)
    }
  }

  const onClickEdit = (farm) => {
    setEditModalState(true)
    setcurrentFarmId(farm.id)
    setcurrentFarmName(farm.name)
  }

  const countFarms = farms && farms.length
  const listFarms =
    countFarms > 0 &&
    farms.map((farm) => (
      <tr key={farm.id}>
        <td>{farm.name}</td>
        <td>{farm.total_size}</td>
        <td className={'center'} style={{ display: 'inline-flex' }}>
          <div className={'waves-effect waves-light white btn'}>
            <i
              onClick={(e) => onClickEdit(farm)}
              className={'material-icons blue-text accent-3 tooltipped'}
              data-position='left'
              data-tooltip='Editar'>
              create
            </i>
          </div>{' '}
          <div
            className={'waves-effect waves-light white btn'}
            onClick={() => ondeleteFarm(farm.id, farm.name)}>
            <i
              className={' material-icons red-text accent-3 tooltipped'}
              data-position='right'
              data-tooltip='Delete'>
              delete
            </i>
          </div>
        </td>
      </tr>
    ))

  const table = (
    <table className={'highlight'}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Total Size</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>{listFarms}</tbody>
    </table>
  )

  const noFarms = (
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col s12 center'}>
          <h4> No Farms Created</h4>
        </div>
      </div>
    </div>
  )

  const onCreateFarm = (e) => {
    const newFarm = {
      name: name,
    }
    e.preventDefault()
    if (name !== '') {
      createFarm(newFarm, context.dispatch)
      setModalState(false)
      let toastHTML = '<span className="rounded">Farm created!</span>'
      M.toast({ html: toastHTML, classes: 'rounded green' })
      getFarms(context.dispatch)
      setload(true)
    }
  }

  const onEditFarm = (e) => {
    const newFarm = {
      id: currentFarmId,
      name: currentFarmName,
    }
    e.preventDefault()
    editFarm(newFarm, context.dispatch)
    if (isEmpty(errors)) {
      setEditModalState(false)
      let toastHTML = '<span className="rounded">Farm updated!</span>'
      M.toast({ html: toastHTML, classes: 'rounded green' })
      getFarms(context.dispatch)
      setload(true)
    }
  }

  return (
    <div className='container'>
      <div style={{ marginTop: '4rem' }} className='row'>
        <div className='col s12'>
          <div className='col s6 left-align'>
            <h4>Farms</h4>
            {countFarms > 0 && (
              <p className='grey-text text-darken-1'>
                You have {countFarms} farms created
              </p>
            )}
          </div>
          <div
            className='col s6 center'
            style={{ paddingLeft: '11.250px', textAlign: 'right' }}>
            <div
              onClick={(e) => setModalState(true)}
              style={{
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem',
              }}
              className='btn btn-large waves-effect green darken-1 hoverable'>
              Create Farm
              <i className='material-icons right'>add</i>
            </div>
          </div>
          <div>
            <Modal
              open={isModalOpen}
              onClose={(e) => setModalState(false)}
              center>
              <div className={'row'}>
                <div className='center col s12'>
                  <h5>Create Farm</h5>
                </div>
                <div className='input-field col s12'>
                  <input
                    onChange={(e) => setname(e.target.value, true)}
                    value={name}
                    error={errors.name}
                    id='name'
                    type='text'
                    className={classnames('', {
                      invalid: errors.name,
                    })}
                  />
                  <label htmlFor='name' className=''>
                    Name
                  </label>
                  <span className='red-text'>{errors.name}</span>
                </div>
                <div
                  className='col s12 center'
                  style={{ paddingLeft: '11.250px' }}>
                  <button
                    onClick={onCreateFarm}
                    style={{
                      width: '200px',
                      borderRadius: '3px',
                      letterSpacing: '1.5px',
                      marginTop: '1rem',
                    }}
                    type='submit'
                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                    Create
                    <i className='material-icons right'>add_circle</i>
                  </button>
                </div>
              </div>
            </Modal>
            <Modal
              open={isEditModalOpen}
              onClose={(e) => setEditModalState(false)}
              center>
              <div className={'row'}>
                <div className='center col s12'>
                  <h5>Edit Farm</h5>
                  <p className='grey-text text-darken-1'>
                    Farm:
                    {currentFarmName}
                  </p>
                </div>
                <div className='input-field col s12'>
                  <input
                    onChange={(e) => setcurrentFarmName(e.target.value, true)}
                    value={currentFarmName}
                    error={errors.name}
                    id='name'
                    type='text'
                    className={classnames('active', {
                      invalid: errors.name,
                    })}
                  />
                  <label htmlFor='Name' className='active'>
                    Name
                  </label>
                  <span className='red-text'>{errors.name}</span>
                </div>
                <div
                  className='col s12 center'
                  style={{ paddingLeft: '11.250px' }}>
                  <button
                    onClick={onEditFarm}
                    style={{
                      width: '200px',
                      borderRadius: '3px',
                      letterSpacing: '1.5px',
                      marginTop: '1rem',
                    }}
                    type='submit'
                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                    Update
                    <i className='material-icons right'>create</i>
                  </button>
                </div>
              </div>
            </Modal>
            {countFarms > 0 ? table : noFarms}
          </div>
        </div>
      </div>
    </div>
  )
}
