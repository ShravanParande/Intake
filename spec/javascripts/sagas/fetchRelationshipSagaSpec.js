import 'babel-polyfill'
import {call, put, takeLatest} from 'redux-saga/effects'
import {get} from 'utils/http'
import {fetchRelationship, fetchRelationshipSaga} from 'sagas/fetchRelationshipSaga'
import {FETCH_RELATIONSHIP} from 'actions/actionTypes'
import * as actions from 'actions/relationshipActions'

describe('fetchRelationshipSaga', () => {
  it('fetches a relationship on FETCH_RELATIONSHIP', () => {
    const gen = fetchRelationshipSaga()
    expect(gen.next().value).toEqual(
      takeLatest(FETCH_RELATIONSHIP, fetchRelationship)
    )
  })
})

describe('fetchRelationship', () => {
  const id = '123'
  const action = actions.fetchRelationship(id)

  it('should fetch a relationship', () => {
    const gen = fetchRelationship(action)
    const response = {
      id: id,
      client_id: 'ZXY123',
      relative_id: 'ABC987',
      relationship_type: '191',
      absent_parent_indicator: false,
      same_home_status: 'Y',
      start_date: '1999-10-01',
      end_date: '2010-10-01',
      legacy_id: 'A1b2x',
    }

    expect(gen.next().value).toEqual(
      call(get, '/api/v1/relationships/123')
    )
    expect(gen.next(response).value).toEqual(
      put(actions.fetchRelationshipSuccess(response))
    )
  })

  it('should put errors when errors are thrown', () => {
    const gen = fetchRelationship(action)
    const error = {responseJSON: 'some error'}

    expect(gen.next().value).toEqual(
      call(get, '/api/v1/relationships/123')
    )
    expect(gen.throw(error).value).toEqual(
      put(actions.fetchRelationshipFailure('some error'))
    )
  })
})
