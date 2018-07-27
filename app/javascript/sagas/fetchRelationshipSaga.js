import {call, put, takeLatest} from 'redux-saga/effects'
import {get} from 'utils/http'
import {
  fetchRelationshipSuccess,
  fetchRelationshipFailure,
} from 'actions/relationshipActions'
import {FETCH_RELATIONSHIP} from 'actions/actionTypes'

export function* fetchRelationship({payload: {id}}) {
  try {
    const response = yield call(get, `/api/v1/relationships/${id}`)
    yield put(fetchRelationshipSuccess(response))
  } catch (error) {
    yield put(fetchRelationshipFailure(error.responseJSON))
  }
}

export function* fetchRelationshipSaga() {
  yield takeLatest(FETCH_RELATIONSHIP, fetchRelationship)
}
