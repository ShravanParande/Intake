import * as matchers from 'jasmine-immutable-matchers'
import relationshipReducer from 'reducers/relationshipReducer'
import {
  fetchRelationshipSuccess,
  fetchRelationshipFailure,
  setRelationship,
} from 'actions/relationshipActions'
import {List, fromJS} from 'immutable'

describe('relationshipReducer', () => {
  const relationship = fromJS({
    absent_parent_indicator: false,
    client_id: 'ZXY123',
    id: '1',
    legacy_id: 'A1b2x',
    relationship_type: 190,
    relative_id: 'ABC987',
    same_home_status: 'Y',
    start_date: '1999-10-01',
    end_date: '2010-10-01',
  })

  beforeEach(() => jasmine.addMatchers(matchers))

  describe('on FETCH_RELATIONSHIP_COMPLETE', () => {
    it('returns a relationship from the action on success', () => {
      const action = fetchRelationshipSuccess(relationship.toJS())
      expect(relationshipReducer(List(), action)).toEqualImmutable(relationship)
    })

    it('returns the last state on failure', () => {
      const oldState = fromJS({id: 2})
      const action = fetchRelationshipFailure()
      expect(relationshipReducer(oldState, action)).toEqual(oldState)
    })
  })

  describe('on SET_RELATIONSHIP_FORM_FIELD', () => {
    it('returns the update form state', () => {
      const lastState = relationship
      const action = setRelationship('relationship_type', 191)
      expect(relationshipReducer(lastState, action)).toEqualImmutable(
        fromJS({
          absent_parent_indicator: false,
          client_id: 'ZXY123',
          id: '1',
          legacy_id: 'A1b2x',
          relationship_type: 191,
          relative_id: 'ABC987',
          same_home_status: 'Y',
          start_date: '1999-10-01',
          end_date: '2010-10-01',
        })
      )
    })
  })
})
