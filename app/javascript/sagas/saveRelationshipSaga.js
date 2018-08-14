import {call, select, put, takeEvery} from 'redux-saga/effects'
import {fetchRelationships} from 'actions/relationshipsActions'
import {getScreeningIdValueSelector} from 'selectors/screeningSelectors'
import {selectClientIds} from 'selectors/participantSelectors'
import {getRelationship} from 'selectors/screening/relationshipSelectors'
import {UPDATE_RELATIONSHIP} from 'actions/actionTypes'
import {updatePersonFailure} from 'actions/personCardActions'
import * as Utils from 'utils/http'

export function* saveRelationship({payload: {id}}) {
  try {
    const relationship = yield select(getRelationship)
    yield call(Utils.put, `/api/v1/relationships/${id}`, relationship)
    const screeningId = yield select(getScreeningIdValueSelector)
    const clientIds = yield select(selectClientIds)
    yield put(fetchRelationships(clientIds, screeningId))
  } catch (error) {
    yield put(updatePersonFailure(error.responseJSON))
  }
}

export function* saveRelationshipSaga() {
  yield takeEvery(UPDATE_RELATIONSHIP, saveRelationship)
}
