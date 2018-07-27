import {
  FETCH_RELATIONSHIP,
  FETCH_RELATIONSHIP_COMPLETE,
  UPDATE_RELATIONSHIP,
  SET_RELATIONSHIP_FORM,
} from 'actions/actionTypes'

export function fetchRelationship(id) {
  return {type: FETCH_RELATIONSHIP, payload: {id}}
}
export function fetchRelationshipSuccess(relationship) {
  return {type: FETCH_RELATIONSHIP_COMPLETE, payload: {relationship}}
}
export function fetchRelationshipFailure(error) {
  return {type: FETCH_RELATIONSHIP_COMPLETE, payload: {error}, error: true}
}
export function updateRelationship(id) {
  return {type: UPDATE_RELATIONSHIP, payload: {id}}
}
export function setRelationship(field, value) {
  return {type: SET_RELATIONSHIP_FORM, payload: {field, value}}
}

