import {List} from 'immutable'
import {Maybe} from 'utils/maybe'

export const selectParticipants = (state) => state.get('participants', List())

const hasId = (id) => (participant) => participant.get('id') === id

export const selectParticipant = (state, id) => Maybe.of(
  selectParticipants(state).find(hasId(id))
)

export const selectClientIds = (state) =>
  selectParticipants(state).map(
    (client) =>
      client.get('legacy_id') ||
      client.getIn(['legacy_descriptor', 'legacy_id'])
  ).filter(Boolean).toJS()
