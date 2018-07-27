import React from 'react'
import PropTypes from 'prop-types'
import CheckboxField from 'common/CheckboxField'
import DateField from 'common/DateField'
import {RELATIONSHIP_TYPES} from 'enums/RelationshipTypes'

const isAbsentParentDisabled = (type) => (
  !type.toLowerCase().match(/\bfather\b|\bmother\b|\bparent\b/)
)

const tableRelationship = (
  onChange, {
    clientName,
    clientAge,
    clientGender,
    relationshipType,
    relativeName,
    relativeAge,
    relativeGender,
  }) => (
  <table className='table'>
    <thead>
      <tr>
        <th className='col-md-3'>Person 1</th>
        <th className='col-md-6'>
          Relationship
          <div className='text-helper'>
            Person 1/ Person 2
          </div>
        </th>
        <th className='col-md-3'>Person 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <ul className='unstyled-list'>
            <li>{clientName}</li>
            <li>{clientAge}</li>
            <li>{clientGender}</li>
          </ul>
        </td>
        <td>
          <select
            id='edit_relationship'
            label='Relationship Type'
            value={relationshipType}
            aria-label='Relationship Type'
            onChange={({target}) => onChange('relationship_type', parseInt(target.value, 10))}
          >
            <option key=''/>
            {RELATIONSHIP_TYPES.map((relationship) =>
              <option key={relationship.value} value={relationship.value}>
                {relationship.label}
              </option>
            )}
          </select>
        </td>
        <td>
          <ul className='unstyled-list'>
            <li>{relativeName}</li>
            <li>{relativeAge}</li>
            <li>{relativeGender}</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
)
const displayText = (relationship) => (
  <div className='row gap-top pad-left'>
    <div className='col-md-12'>
      <span>
        <b>
          {relationship.clientName}</b> is the {relationship.index} of&nbsp;
        {relationship.secondaryRelationship} <b>{relationship.relativeName}
        </b>
      </span>
    </div>
  </div>
)
const editRelationshipFields = (
  onChange, {
    absentParentIndicator,
    endDate,
    sameHomeStatus,
    secondaryRelationship,
    startDate,
  }) => (
  <div>
    <div className='row pad-left'>
      <div className='col-md-4'>
        <CheckboxField
          checked={sameHomeStatus === 'Y'}
          id='same_home_status'
          label='Live at the Same Location'
          onChange={({target}) => {
            onChange('same_home_status', (target.value === 'Y') ? 'N' : 'Y')
          }}
          value={sameHomeStatus}
        />
      </div>
      <div className='col-md-4'>
        <CheckboxField
          checked={absentParentIndicator}
          disabled={isAbsentParentDisabled(secondaryRelationship)}
          id='absent_parent_indicator'
          label='Parents Whereabouts Unknown'
          onChange={({target}) => {
            onChange('absent_parent_indicator', target.checked)
          }}
          value={absentParentIndicator.toString()}
        />
      </div>
    </div>
    <div className='row pad-left'>
      <DateField
        gridClassName='col-md-4'
        id='start_date'
        label='Start Date'
        value={startDate}
        onChange={(value) => onChange('start_date', (value))}
        hasTime={false}
      />
      <DateField
        gridClassName='col-md-4'
        id='end_date'
        label='End Date'
        value={endDate}
        onChange={(value) => onChange('end_date', (value))}
        hasTime={false}
      />
    </div>
  </div>
)

const EditRelationshipForm = ({onChange, relationship}) => (
  <div>
    {relationship.id &&
      <div>
        {tableRelationship(onChange, relationship)}
        {displayText(relationship)}
        {editRelationshipFields(onChange, relationship)}
      </div>
    }
  </div>
)

const relationshipPropType = PropTypes.shape({
  absentParentIndicator: PropTypes.bool,
  clientAge: PropTypes.string,
  clientDateOfBirth: PropTypes.string,
  clientGender: PropTypes.string,
  clientName: PropTypes.string,
  endDate: PropTypes.string,
  id: PropTypes.string,
  legacyId: PropTypes.string,
  relationshipType: PropTypes.string,
  relativeAge: PropTypes.string,
  relativeDateOfBirth: PropTypes.string,
  relativeGender: PropTypes.string,
  relativeName: PropTypes.string,
  sameHomeStatus: PropTypes.string,
  startDate: PropTypes.string,
})

EditRelationshipForm.propTypes = {
  onChange: PropTypes.func,
  relationship: relationshipPropType,
}

export default EditRelationshipForm
