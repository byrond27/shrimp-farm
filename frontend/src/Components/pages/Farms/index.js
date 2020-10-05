import React, { useEffect, useState, useContext } from 'react'

import classnames from 'classnames'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { FarmContext } from '../../../Context/FarmContext'
import toast from '../../../Components/toast'
import noItems from '../../../Components/noItems'

import {
  createFarm,
  getFarms,
  deleteFarm,
  editFarm,
} from '../../../Context/actions/Farms'

export default function Farms() {
  const context = useContext(FarmContext)
  const { errors, farms } = context.state

  const [name, setName] = useState('')
  const [isModalOpen, setModalState] = useState(false)
  const [isEdit, setIsEdit] = useState('false')
  const [currentFarmName, setCurrentFarmName] = useState('')
  const [currentFarmId, setCurrentFarmId] = useState('')
  const [currentFarmSize, setCurrentFarmSize] = useState('')

  useEffect(() => {
    getFarms(context.dispatch)
  }, [context.dispatch])

  const onDeleteFarm = (id, name) => {
    if (window.confirm('Are you sure to delete the farm ' + name + '?')) {
      const farm = {
        id: id,
      }
      deleteFarm(farm, context.dispatch)
      getFarms(context.dispatch)
    }
  }

  const onClickEdit = (farm) => {
    setModalState(true)
    setIsEdit(true)
    setCurrentFarmId(farm.id)
    setCurrentFarmName(farm.name)
    setCurrentFarmSize(farm.total_size)
  }

  const countFarms = farms && farms.length

  const onCreateFarm = (e) => {
    const newFarm = {
      name: name,
    }
    e.preventDefault()
    if (name !== '') {
      createFarm(newFarm, context.dispatch)
      setModalState(false)
      toast('Farm created!')
      getFarms(context.dispatch)
    }
  }

  const onEditFarm = (e) => {
    const newFarm = {
      id: currentFarmId,
      name: currentFarmName,
      size: currentFarmSize,
    }
    e.preventDefault()
    editFarm(newFarm, context.dispatch)
    setModalState(false)
    toast('Farm updated!')
  }

  const openModal = () => {
    setModalState(true)
    setIsEdit(false)
  }

  const listFarms =
    countFarms > 0 &&
    farms.map((farm) => (
      <tr key={farm.id}>
        <td>{farm.name}</td>
        <td className={'center-align'}>{farm.total_size}</td>
        <td className={'center d-flex-inline'}>
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
            onClick={() => onDeleteFarm(farm.id, farm.name)}>
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
      <tbody>{listFarms}</tbody>
    </table>
  )

  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col s12 header-page'>
          <div>
            <h4>Farms</h4>
            {countFarms > 0 && (
              <p className='grey-text text-darken-1'>
                You have {countFarms} farms
              </p>
            )}
          </div>
          <div
            onClick={() => openModal()}
            className='btn btn-large waves-effect green darken-1 hoverable custom-button'>
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
                <h5>{isEdit ? 'Edit Farm' : 'Create Farm'}</h5>
                {isEdit ? (
                  <p className='grey-text text-darken-1'>
                    Farm:
                    {currentFarmName}
                  </p>
                ) : null}
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={(e) =>
                    isEdit
                      ? setCurrentFarmName(e.target.value, true)
                      : setName(e.target.value, true)
                  }
                  value={isEdit ? currentFarmName : name}
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
              <div className='col s12 center'>
                <button
                  onClick={isEdit ? onEditFarm : onCreateFarm}
                  type='submit'
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3 custom-button'>
                  {isEdit ? 'Update' : 'Create'}
                  <i className='material-icons right'>
                    {isEdit ? 'create' : 'add_circle'}{' '}
                  </i>
                </button>
              </div>
            </div>
          </Modal>
          {countFarms > 0 ? table : noItems('Farms')}
        </div>
      </div>
    </div>
  )
}
