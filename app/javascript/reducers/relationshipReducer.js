import {FETCH_RELATIONSHIP_COMPLETE, SET_RELATIONSHIP_FORM} from 'actions/actionTypes'
import {createReducer} from 'utils/createReducer'
import {Map, fromJS} from 'immutable'

export default createReducer(Map(), {
  [FETCH_RELATIONSHIP_COMPLETE](state, {payload: {relationship}, error}) {
    return (error) ? state : fromJS(relationship)
  },
  [SET_RELATIONSHIP_FORM](state, {payload: {field, value}}) {
    return state.setIn([field], fromJS(value))
  },
})
