import {createSelector} from 'reselect'
import {Map} from 'immutable'
import nameFormatter from 'utils/nameFormatter'
import {dateFormatter} from 'utils/dateFormatter'
import {ageFormatter} from 'utils/ageFormatter'
import {genderFormat} from 'selectors/screening/relationshipsSelectors'
import {getScreeningRelationships} from 'selectors/screening/relationshipsSelectors'
import {RELATIONSHIP_TYPES} from 'enums/RelationshipTypes'

export const getRelationship = (state) => state.get('relationship')

const selectClient = (people, relationship) => (
  people.find((relationship_to) =>
    relationship_to.get('id') === relationship.get('client_id'))
)

const selectRelative = (client, relationship) => (
  (client.get('relationships')) ? client.get('relationships').find((relationship_to) =>
    (relationship_to.get('relationship_id') === relationship.get('id'))) : undefined
)

const findTypeLabel = (typeCode) => {
  const types = (RELATIONSHIP_TYPES.find(
    (type) => type.value === typeCode
  ).label).split('/')
  return {
    secondary: types.pop(),
    index: types.pop(),
  }
}

const getRelationshipEditSelector = (relationship) => {
  const typeCode = (relationship.get('relationship_type')).toString()
  const typeLabel = findTypeLabel(typeCode)

  return Map({
    absentParentIndicator: relationship.get('absent_parent_indicator'),
    endDate: dateFormatter(relationship.get('end_date')),
    id: relationship.get('id'),
    index: typeLabel.index,
    legacyId: relationship.get('legacy_id'),
    relationshipType: typeCode,
    sameHomeStatus: relationship.get('same_home_status'),
    startDate: dateFormatter(relationship.get('start_date')),
    secondaryRelationship: typeLabel.secondary,
  })
}

const getClientSelector = (client) => (
  Map({
    clientAge: ageFormatter({
      age: client.get('age'),
      ageUnit: client.get('age_unit'),
    }),
    clientDateOfBirth: dateFormatter(client.get('date_of_birth')),
    clientGender: genderFormat(client.get('gender')),
    clientName: nameFormatter({...client.toJS()}),
  })
)

const getRelatedSelector = (related) => (
  Map({
    relativeAge: ageFormatter({
      age: related.get('related_person_age'),
      ageUnit: related.get('related_person_age_unit'),
    }),
    relativeDateOfBirth: dateFormatter(related.get('related_person_date_of_birth')),
    relativeGender: genderFormat(related.get('related_person_gender')),
    relativeName: nameFormatter({
      first_name: related.get('related_person_first_name'),
      last_name: related.get('related_person_last_name'),
      middle_name: related.get('related_person_middle_name'),
      name_suffix: related.get('related_person_name_suffix'),
    }),
  })
)

const formatRelationship = (people, relationship) => {
  const client = selectClient(people, relationship)
  const related = selectRelative(client, relationship)
  const relationshipEdit = getRelationshipEditSelector(relationship)

  return relationshipEdit.merge(getClientSelector(client), getRelatedSelector(related))
}

export const getRelationshipSelector = createSelector(
  getScreeningRelationships,
  getRelationship,
  (people, relationship) => (
    relationship.get('id') ? formatRelationship(people, relationship) : Map()
  )
)
