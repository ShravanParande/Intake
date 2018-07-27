import {fromJS} from 'immutable'
import * as matchers from 'jasmine-immutable-matchers'
import {getRelationshipSelector} from 'selectors/screening/relationshipSelectors'

describe('relationshipSelector', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  describe('getRelationshipSelector', () => {
    const state = fromJS({
      relationship: {
        id: '12345',
        client_id: 'ZXY456',
        relative_id: 'ABC987',
        relationship_type: 296,
        absent_parent_indicator: true,
        same_home_status: 'Y',
        start_date: '1999-10-01',
        end_date: '2010-10-01',
        legacy_id: 'A1b2x',
      },
      relationships: [
        {
          id: 'ZXY123',
          date_of_birth: '1986-01-15',
          first_name: 'Ricky',
          gender: 'M',
          last_name: 'Robinson',
          legacy_id: '3',
          age: 20,
          age_unit: 'Y',
          relationships: [
            {
              relationship_id: '12345',
              absent_parent_code: 'Y',
              related_person_date_of_birth: '1990-03-15',
              related_person_gender: 'M',
              related_person_first_name: 'Johny',
              related_person_last_name: 'Robinson',
              related_person_relationship: '17',
              indexed_person_relationship: '17',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              legacy_descriptor: {
                legacy_id: '2',
              },
              same_home_code: 'Y',
            },
            {
              relationship_id: '46',
              absent_parent_code: 'N',
              related_person_date_of_birth: '1991-02-15',
              related_person_gender: 'M',
              related_person_first_name: 'Will',
              related_person_last_name: 'Carlson',
              related_person_relationship: '297',
              indexed_person_relationship: '258',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              legacy_descriptor: {
                legacy_id: '1',
              },
              same_home_code: 'N',
            },
          ],
        },
        {
          id: 'ZXY456',
          first_name: 'Johny',
          gender: 'M',
          last_name: 'Robinson',
          legacy_id: '2',
          date_of_birth: '1990-03-15',
          age: 20,
          age_unit: 'Y',
          relationships: [
            {
              relationship_id: '12345',
              absent_parent_code: 'Y',
              related_person_date_of_birth: '1986-01-15',
              related_person_gender: 'M',
              related_person_first_name: 'Ricky',
              related_person_last_name: 'Robinson',
              related_person_relationship: '17',
              indexed_person_relationship: '17',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              legacy_descriptor: {
                legacy_id: '3',
              },
              same_home_code: 'Y',
            },
            {
              relationship_id: '3',
              absent_parent_code: 'N',
              related_person_date_of_birth: '1991-02-15',
              related_person_gender: 'M',
              related_person_first_name: 'Will',
              related_person_last_name: 'Carlson',
              related_person_relationship: '297',
              indexed_person_relationship: '258',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              legacy_descriptor: {
                legacy_id: '1',
              },
              same_home_code: 'N',
            },
          ],
        },
      ],
    })

    it('returns a relationship between two people', () => {
      expect(getRelationshipSelector(state)).toEqualImmutable(fromJS({
        id: '12345',
        clientAge: '20 yrs',
        clientDateOfBirth: '03/15/1990',
        clientGender: 'Male',
        clientName: 'Johny Robinson',
        relativeAge: '30 yrs',
        relativeDateOfBirth: '01/15/1986',
        relativeGender: 'Male',
        relativeName: 'Ricky Robinson',
        relationshipType: '296',
        absentParentIndicator: true,
        sameHomeStatus: 'Y',
        startDate: '10/01/1999',
        endDate: '10/01/2010',
        legacyId: 'A1b2x',
        index: 'Uncle',
        secondaryRelationship: 'Nephew (Maternal)',
      }))
    })

    it('return an empty Map when no relationship id in state', () => {
      const state = fromJS({relationship: {}, relationships: [{id: 'ZXY123'}]})

      expect(getRelationshipSelector(state)).toEqualImmutable(fromJS({}))
    })
  })
})
