import React from 'react'

const noItems = (name) => (
  <div className={'container'}>
    <div className={'row'}>
      <div className={'col s12 center'}>
        <h5> No {name} Created</h5>
      </div>
    </div>
  </div>
)
export default noItems
