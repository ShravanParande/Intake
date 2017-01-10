import EditLink from 'components/common/EditLink'
import GENDER from 'Gender'
import React from 'react'
import ShowField from 'components/common/ShowField'
import {Link} from 'react-router'

const ParticipantShowView = ({participant, onEdit}) => {
  const name = [participant.get('first_name'), participant.get('last_name')].filter(Boolean).join(' ')
  return (
  <div className='card show double-gap-top' id={`participants-card-${participant.get('id')}`}>
    <div className='card-header'>
      {name && <span>{name}</span>}
      <Link aria-label='Delete participant' className='pull-right' href='#'>
        <i className='fa fa-times' />
      </Link>
      <EditLink ariaLabel='Edit participant' onClick={onEdit} />
    </div>
    <div className='card-body'>
      <div className='row'>
        <div className='col-md-2'>
          <img src='/assets/default-profile.svg' />
        </div>
        <div className='col-md-5'>
          <ShowField labelClassName='no-gap' label='Name'>
            {name}
          </ShowField>
          <ShowField label='Gender'>
            {GENDER[participant.get('gender')]}
          </ShowField>
        </div>
        <div className='col-md-5'>
          <ShowField labelClassName='no-gap-top-desktop' label='Date of birth'>
            {participant.get('date_of_birth')}
          </ShowField>
          <ShowField label='Social security number'>
            {participant.get('ssn')}
          </ShowField>
        </div>
      </div>
    </div>
  </div>
  )
}

ParticipantShowView.propTypes = {
  onEdit: React.PropTypes.func.isRequired,
  participant: React.PropTypes.object.isRequired,
}
export default ParticipantShowView
