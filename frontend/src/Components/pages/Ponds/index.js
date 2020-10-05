import React, { useEffect, useState, useContext } from 'react'

import classnames from 'classnames'
import M from 'materialize-css'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import isEmpty from '../../../Context/validations/isEmpty'
import { FarmContext } from '../../../Context/FarmContext'

import {
  createPond,
  getPonds,
  deletePond,
  editPond,
} from '../../../Context/actions/Ponds'
import { getFarms } from '../../../Context/actions/Farms'

export default function Ponds(props) {
  const context = useContext(FarmContext)
  const { errors, ponds, farms } = context.state
  const [name, setName] = useState('')
  const [size, setSize] = useState('')
  const [farm, setFarm] = useState('')
  const [isModalOpen, setModalState] = useState(false)
  const [isEditModalOpen, setEditModalState] = useState(false)
  const [load, setLoad] = useState(false)

  const [currentPondName, setCurrentPondName] = useState('')
  const [currentPondId, setCurrentPondId] = useState('')
  const [currentPondSize, setCurrentPondSize] = useState('')
  const [currentFarmID, setCurrentFarm] = useState('')

  useEffect(() => {
    setLoad(false)
    getPonds(context.dispatch)
    getFarms(context.dispatch)
  }, [load, context.dispatch])

  const onDeletePond = (id, name) => {
    if (window.confirm('Are you sure to delete the pond ' + name + '?')) {
      const pond = {
        id: id,
      }
      deletePond(pond, context.dispatch)
      setLoad(true)
    }
  }

  const onClickEdit = (pond) => {
    setEditModalState(true)
    setCurrentPondId(pond.id)
    setCurrentPondName(pond.name)
    setCurrentPondSize(pond.size)
    setCurrentFarm(pond.farmID)
  }

  const optionsFarms =
    farms.length > 0 &&
    farms.map((farm) => (
      <option key={farm.id} value={farm.id}>
        {farm.name}
      </option>
    ))

  const countPonds = ponds && ponds.length
  const listPonds =
    countPonds > 0 &&
    ponds.map((pond) => (
      <tr key={pond.id}>
        <td>{pond.name}</td>
        <td className={'center-align'}>{pond.size}</td>
        <td className={'center'} style={{ display: 'inline-flex' }}>
          <div className={'waves-effect waves-light white btn'}>
            <i
              onClick={(e) => onClickEdit(pond)}
              className={'material-icons blue-text accent-3 tooltipped'}
              data-position='left'
              data-tooltip='Editar'>
              create
            </i>
          </div>{' '}
          <div
            className={'waves-effect waves-light white btn'}
            onClick={() => onDeletePond(pond.id, pond.name)}>
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
          <th className={'center-align'}>Total Size</th>
          <th className={'center-align'}>Options</th>
        </tr>
      </thead>
      <tbody>{listPonds}</tbody>
    </table>
  )

  const noPonds = (
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col s12 center'}>
          <h4> No Ponds Created</h4>
        </div>
      </div>
    </div>
  )

  const onCreatePond = (e) => {
    const newPond = {
      farmID: farm,
      name: name,
      size: size,
    }
    e.preventDefault()
    if (name !== '') {
      createPond(newPond, context.dispatch)
      setModalState(false)
      let toastHTML = '<span className="rounded">Pond created!</span>'
      M.toast({ html: toastHTML, classes: 'rounded green' })
      getPonds(context.dispatch)
      setLoad(true)
    }
  }

  const onEditPond = (e) => {
    const newPond = {
      id: currentPondId,
      name: currentPondName,
      size: currentPondSize,
      farmID: currentFarmID,
    }
    e.preventDefault()
    editPond(newPond, context.dispatch)
    if (isEmpty(errors)) {
      setEditModalState(false)
      let toastHTML = '<span className="rounded">Pond updated!</span>'
      M.toast({ html: toastHTML, classes: 'rounded green' })
      getPonds(context.dispatch)
      setLoad(true)
    }
  }

  return (
    <div className='container'>
      <div style={{ marginTop: '4rem' }} className='row'>
        <div className='col s12'>
          <div className='col s6 left-align'>
            <h4>Ponds</h4>
            {countPonds > 0 && (
              <p className='grey-text text-darken-1'>
                You have {countPonds} ponds
              </p>
            )}
          </div>
          <div className='col s6 center' style={{ textAlign: 'right' }}>
            <div
              onClick={(e) => setModalState(true)}
              style={{
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem',
              }}
              className='btn btn-large waves-effect green darken-1 hoverable'>
              Create Pond
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
                  <h5>Create Pond</h5>
                </div>
                <div className='input-field col s12'>
                  <select
                    className='browser-default'
                    onChange={(e) => setFarm(e.target.value)}
                    defaultValue={farm}>
                    <option value='' disabled defaultValue>
                      Choose your farm
                    </option>
                    {optionsFarms}
                  </select>
                  <span className='red-text'>{errors.farm}</span>
                </div>
                <div className='input-field col s12'>
                  <input
                    onChange={(e) => setName(e.target.value, true)}
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
                <div className='input-field col s12'>
                  <input
                    onChange={(e) => setSize(e.target.value, true)}
                    value={size}
                    error={errors.size}
                    id='size'
                    type='text'
                    className={classnames('', {
                      invalid: errors.size,
                    })}
                  />
                  <label htmlFor='size' className=''>
                    Pond Size
                  </label>
                  <span className='red-text'>{errors.size}</span>
                </div>
                <div
                  className='col s12 center'
                  style={{ paddingLeft: '11.250px' }}>
                  <button
                    onClick={onCreatePond}
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
                  <h5>Edit Pond</h5>
                  <p className='grey-text text-darken-1'>
                    Pond:
                    {currentPondName}
                  </p>
                </div>
                <div className='input-field col s12 style="margin-top: 8px;"'>
                  <select
                    className='browser-default'
                    onChange={(e) => setFarm(e.target.value)}
                    defaultValue={currentFarmID}>
                    <option value='' disabled defaultValue>
                      Choose your farm
                    </option>
                    {optionsFarms}
                  </select>
                  <span className='red-text'>{errors.farm}</span>
                  <label htmlFor='Name' className='active'>
                    Pond Name
                  </label>
                </div>
                <div className='input-field col s12'>
                  <input
                    onChange={(e) => setCurrentPondName(e.target.value, true)}
                    value={currentPondName}
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
                <div className='input-field col s12'>
                  <input
                    onChange={(e) => setCurrentPondSize(e.target.value, true)}
                    value={currentPondSize}
                    error={errors.currentPondSize}
                    id='name'
                    type='text'
                    className={classnames('active', {
                      invalid: errors.currentPondSize,
                    })}
                  />
                  <label htmlFor='Name' className='active'>
                    Size
                  </label>
                  <span className='red-text'>{errors.name}</span>
                </div>
                <div
                  className='col s12 center'
                  style={{ paddingLeft: '11.250px' }}>
                  <button
                    onClick={onEditPond}
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
            {countPonds > 0 ? table : noPonds}
          </div>
        </div>
      </div>
    </div>
  )
}
