import PropTypes from 'prop-types'
import React from 'react'
import ActionMenu from 'common/relationship/ActionMenu'
import AttachLink from 'common/relationship/AttachLink'
import RelationCard from 'common/relationship/RelationCard'
import ScreeningCreateRelationship from 'views/ScreeningCreateRelationship'

const actionsMenu = (
  editRelationship,
  fetchRelationship,
  row,
  pendingPeople,
  person,
  isScreening,
  screeningId,
  onChange,
  onClick,
  onSave
) =>
  <ActionMenu
    editRelationship={editRelationship}
    fetchRelationship={fetchRelationship}
    isScreening={isScreening}
    onChange={onChange}
    onClick={onClick}
    onSave={onSave}
    pendingPeople={pendingPeople}
    person={person}
    relationship ={row}
    screeningId={screeningId}
  />

const createRelationsData = (person, data) => {
  const relationData = []
  data.map((relatedPerson) => relationData.push({focus_person: person, related_person: relatedPerson}))
  return relationData
}

export const Relationships = ({
  editRelationship,
  fetchRelationship,
  people,
  onChange,
  onClick,
  onSave,
  screeningId,
  isScreening,
  pendingPeople = [],
}) => (
  <div className='card-body no-pad-top'>
    {
      isScreening && people.map((person, index) => (
        <div key={index}>
          <div className='row' key={`new-${index}`}>
            <div className='col-md-12'>
              {
                (person.relationships.length > 0) &&
                <span>
                  <RelationCard
                    name={person.name}
                    data={person.relationships}
                    tableActions={(cell, row) => (
                      actionsMenu(
                        editRelationship,
                        fetchRelationship,
                        row,
                        pendingPeople,
                        person,
                        isScreening,
                        screeningId,
                        onChange,
                        onClick,
                        onSave
                      )
                    )}
                    ageDisplayFormatter={(cell, row) => (
                      <div> {row.dateOfBirth || ''} {row.age === '' ? '' : `(${row.age})`}</div>
                    )}
                  />
                </span>
              }
              {
                (person.relationships.length === 0) &&
                <div className='no-relationships well'>
                  <strong>{person.name}</strong> has no known relationships
                </div>
              }
            </div>
          </div>
          <ScreeningCreateRelationship data={createRelationsData(person, person.relationships)}/>
        </div>
      ))
    }
    {
      !isScreening && people.map((person, index) => (
        <div className='row' key={index}>
          <div className='col-md-6 gap-top'>
            <span className='person'>{person.name}</span>
            {
              (person.relationships.length > 0) &&
              <span>
                <strong> is the...</strong>
                <ul className='relationships'>
                  {
                    person.relationships.map((relationship, index) => (
                      <li key={index}>
                        <strong>{ relationship.type }</strong> &nbsp; of { relationship.name }
                        <AttachLink
                          isScreening={isScreening}
                          onClick={onClick}
                          pendingPeople={pendingPeople}
                          relationship={relationship}
                          screeningId={screeningId}
                        />
                      </li>
                    ))
                  }
                </ul>
              </span>
            }
            {
              (person.relationships.length === 0) &&
              <strong className='relationships'> has no known relationships</strong>
            }
            <div id='relationships-list'/>
          </div>
        </div>
      ))
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
Relationships.propTypes = {
  editRelationship: relationshipPropType,
  fetchRelationship: PropTypes.func,
  isScreening: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onSave: PropTypes.func,
  pendingPeople: PropTypes.arrayOf(PropTypes.string),
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    relationships: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      secondaryRelationship: PropTypes.string,
      age: PropTypes.string,
    })),
  })),
  screeningId: PropTypes.string,
}

export const EmptyRelationships = () => (
  <div className='card-body no-pad-top'>
    <div className='row'>
      <div className='col-md-12 empty-relationships'>
        <div className='double-gap-top  centered'>
          <span className='c-dark-grey'>Search for people and add them to see their relationships.</span>
        </div>
      </div>
    </div>
  </div>
)
