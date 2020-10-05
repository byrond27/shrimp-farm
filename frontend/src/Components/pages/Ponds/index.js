import React, { useEffect, useState, useContext } from 'react'

import classnames from 'classnames'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { FarmContext } from '../../../Context/FarmContext'
import toast from '../../../Components/toast'
import noItems from '../../../Components/noItems'

import {
  createPond,
  getPonds,
  deletePond,
  editPond,
} from '../../../Context/actions/Ponds'
import { getFarms } from '../../../Context/actions/Farms'

export default function Ponds() {
  const context = useContext(FarmContext)
  const { errors, ponds, farms } = context.state
  const [name, setName] = useState('')
  const [size, setSize] = useState('')
  const [farm, setFarm] = useState('')

  const [isModalOpen, setModalState] = useState(false)
  const [isEdit, setIsEdit] = useState('false')

  const [currentPondName, setCurrentPondName] = useState('')
  const [currentPondId, setCurrentPondId] = useState('')
  const [currentPondSize, setCurrentPondSize] = useState('')
  const [currentFarmID, setCurrentFarm] = useState('')
  const countPonds = ponds && ponds.length

  useEffect(() => {
    getPonds(context.dispatch)
    getFarms(context.dispatch)
  }, [isModalOpen, context.dispatch])

  const onDeletePond = (id, name) => {
    if (window.confirm('Are you sure to delete the pond ' + name + '?')) {
      const pond = {
        id: id,
      }
      deletePond(pond, context.dispatch)
      getPonds(context.dispatch)
      getFarms(context.dispatch)
    }
  }

  const onClickEdit = (pond) => {
    setModalState(true)
    setIsEdit(true)
    setCurrentPondId(pond.id)
    setCurrentPondName(pond.name)
    setCurrentPondSize(pond.size)
    setCurrentFarm(pond.farmID)
  }

  const openModal = () => {
    setModalState(true)
    setIsEdit(false)
  }

  const onCreatePond = (e) => {
    const newPond = {
      farmID: farm,
      name: name,
      size: size,
    }
    e.preventDefault()
    if (name !== '' && size !== '' && farm !== '') {
      createPond(newPond, context.dispatch)
      setModalState(false)
      toast('Pond created!')
      getPonds(context.dispatch)
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
    setModalState(false)
    toast('Pond updated!')
    getPonds(context.dispatch)
  }

  const optionsFarms =
    farms.length > 0 &&
    farms.map((farm) => (
      <option key={farm.id} value={farm.id}>
        {farm.name}
      </option>
    ))

  const listPonds =
    countPonds > 0 &&
    ponds.map((pond) => (
      <tr key={pond.id}>
        <td>{pond.name}</td>
        <td className={'center-align'}>
          {farms.length > 0 &&
            farms.find((farm) => farm.id === pond.farmID).name}
        </td>
        <td className={'center-align'}>{pond.size}</td>
        <td className={'center d-flex-inline'}>
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
          <th className={'center-align'}>Farm Name</th>
          <th className={'center-align'}>Size</th>
          <th className={'center-align'}>Options</th>
        </tr>
      </thead>
      <tbody>{listPonds}</tbody>
    </table>
  )

  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col s12 header-page'>
          <div>
            <h4>Ponds</h4>
            {countPonds > 0 && (
              <p className='grey-text text-darken-1'>
                You have {countPonds} ponds
              </p>
            )}
          </div>
          <div
            onClick={() => openModal()}
            className='btn btn-large waves-effect green darken-1 hoverable custom-button'>
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
                <h5>{isEdit ? 'Edit Pond' : 'Create Pond'}</h5>
                {isEdit ? (
                  <p className='grey-text text-darken-1'>
                    Pond:
                    {currentPondName}
                  </p>
                ) : null}
              </div>
              <div className='input-field col s12'>
                <select
                  className='browser-default'
                  onChange={(e) =>
                    isEdit
                      ? setCurrentFarm(e.target.value)
                      : setFarm(e.target.value)
                  }
                  defaultValue={isEdit ? currentFarmID : farm}>
                  <option value='' disabled defaultValue>
                    Choose your farm
                  </option>
                  {optionsFarms}
                </select>
                <span className='red-text'>{errors.farm}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={(e) =>
                    isEdit
                      ? setCurrentPondName(e.target.value, true)
                      : setName(e.target.value, true)
                  }
                  value={isEdit ? currentPondName : name}
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
                  onChange={(e) =>
                    isEdit
                      ? setCurrentPondSize(e.target.value, true)
                      : setSize(e.target.value, true)
                  }
                  value={isEdit ? currentPondSize : size}
                  error={errors.size}
                  id='size'
                  type='number'
                  className={classnames('', {
                    invalid: errors.size,
                  })}
                />
                <label htmlFor='size' className=''>
                  Pond Size
                </label>
                <span className='red-text'>{errors.size}</span>
              </div>
              <div className='col s12 center'>
                <button
                  onClick={isEdit ? onEditPond : onCreatePond}
                  type='submit'
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3 custom-button'>
                  {isEdit ? 'Update' : 'Create'}
                  <i className='material-icons right'>
                    {isEdit ? 'create' : 'add_circle'}
                  </i>
                </button>
              </div>
            </div>
          </Modal>
          {countPonds > 0 ? table : noItems('Ponds')}
        </div>
      </div>
    </div>
  )
}
