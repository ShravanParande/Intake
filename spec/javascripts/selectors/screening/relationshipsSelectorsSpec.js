import {fromJS} from 'immutable'
import {
  genderFormat,
  getPeopleSelector,
} from 'selectors/screening/relationshipsSelectors'
import * as matchers from 'jasmine-immutable-matchers'

describe('relationshipsSelectors', () => {
  beforeEach(() => jasmine.addMatchers(matchers))

  const emptyState = fromJS({relationships: []})

  describe('getPeopleSelector', () => {
    it('returns a list of people or an empty list if there are no people', () => {
      const relationships = [
        {legacy_id: '10', first_name: 'Ricky', last_name: 'Robinson', gender: 'M', date_of_birth: '1986-01-15', age: 20, age_unit: 'Y'},
        {legacy_id: '20', first_name: 'Johny', last_name: 'Robinson', gender: 'M', date_of_birth: '1990-03-15', age: 30, age_unit: 'Y'},
        {legacy_id: '30', first_name: 'Will', last_name: 'Carlson', gender: 'M', date_of_birth: '1991-02-15', age: 40, age_unit: 'Y'},
      ]
      const state = fromJS({relationships})
      expect(getPeopleSelector(state)).toEqualImmutable(fromJS([
        {
          dateOfBirth: '01/15/1986',
          legacy_id: '10',
          name: 'Ricky Robinson',
          relationships: [],
          gender: 'Male',
          age: '20 yrs',
        },
        {
          dateOfBirth: '03/15/1990',
          legacy_id: '20',
          name: 'Johny Robinson',
          relationships: [],
          gender: 'Male',
          age: '30 yrs',
        },
        {
          dateOfBirth: '02/15/1991',
          legacy_id: '30',
          name: 'Will Carlson',
          relationships: [],
          gender: 'Male',
          age: '40 yrs',
        },
      ]))
      expect(getPeopleSelector(emptyState)).toEqualImmutable(fromJS([]))
    })

    it('returns a list of people with an empty gender', () => {
      const relationships = [
        {legacy_id: '10', first_name: 'Ricky', last_name: 'Robinson', gender: '', date_of_birth: '1986-01-15', age: 20, age_unit: 'Y'},
      ]
      const state = fromJS({relationships})
      expect(getPeopleSelector(state)).toEqualImmutable(fromJS(
        [{dateOfBirth: '01/15/1986', legacy_id: '10', name: 'Ricky Robinson', relationships: [], gender: '', age: '20 yrs'}]
      ))
    })

    it('returns a list of relationships for each person', () => {
      const participants = [
        {
          first_name: 'Ricky',
          last_name: 'Robinson',
          legacy_id: '3',
        },
        {
          first_name: 'Johny',
          last_name: 'Robinson',
          legacy_id: '2',
        },
      ]
      const relationships = [
        {
          date_of_birth: '1986-01-15',
          first_name: 'Ricky',
          gender: 'M',
          last_name: 'Robinson',
          legacy_id: '3',
          age: 20,
          age_unit: 'Y',
          relationships: [
            {
              absent_parent_code: 'Y',
              related_person_date_of_birth: '1990-03-15',
              related_person_gender: 'M',
              related_person_first_name: 'Johny',
              related_person_last_name: 'Robinson',
              related_person_relationship: '17',
              indexed_person_relationship: '17',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              relationship_id: 1,
              legacy_descriptor: {
                legacy_id: '2',
              },
              same_home_code: 'Y',
            },
            {
              absent_parent_code: 'N',
              related_person_date_of_birth: '1991-02-15',
              related_person_gender: 'M',
              related_person_first_name: 'Will',
              related_person_last_name: 'Carlson',
              related_person_relationship: '297',
              indexed_person_relationship: '258',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              relationship_id: 2,
              legacy_descriptor: {
                legacy_id: '1',
              },
              same_home_code: 'N',
            },
          ],
        },
        {
          first_name: 'Johny',
          gender: 'M',
          last_name: 'Robinson',
          legacy_id: '2',
          date_of_birth: '1990-03-15',
          age: 20,
          age_unit: 'Y',
          relationships: [
            {
              absent_parent_code: 'Y',
              related_person_date_of_birth: '1986-01-15',
              related_person_gender: 'M',
              related_person_first_name: 'Ricky',
              related_person_last_name: 'Robinson',
              related_person_relationship: '17',
              indexed_person_relationship: '17',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              relationship_id: 1,
              legacy_descriptor: {
                legacy_id: '3',
              },
              same_home_code: 'Y',
            },
            {
              absent_parent_code: 'N',
              related_person_date_of_birth: '1991-02-15',
              related_person_gender: 'M',
              related_person_first_name: 'Will',
              related_person_last_name: 'Carlson',
              related_person_relationship: '297',
              indexed_person_relationship: '258',
              related_person_age: 30,
              related_person_age_unit: 'Y',
              relationship_id: 2,
              legacy_descriptor: {
                legacy_id: '1',
              },
              same_home_code: 'N',
            },
          ],
        },
      ]

      const relationshipTypes = [
        {code: '17', value: 'Brother'},
        {code: '258', value: 'Nephew (Paternal)'},
        {code: '297', value: 'Uncle (Paternal)'},
      ]
      const state = fromJS({relationships, systemCodes: {relationshipTypes}, participants})

      expect(getPeopleSelector(state)).toEqualImmutable(fromJS([
        {
          dateOfBirth: '01/15/1986',
          legacy_id: '3',
          name: 'Ricky Robinson',
          gender: 'Male',
          age: '20 yrs',
          relationships: [
            {
              id: 1,
              absent_parent_code: 'Y',
              dateOfBirth: '03/15/1990',
              gender: 'Male',
              name: 'Johny Robinson',
              legacy_descriptor: {legacy_id: '2'},
              type: 'Brother',
              secondaryRelationship: 'Brother',
              person_card_exists: false,
              same_home_code: 'Y',
              type_code: '17',
              age: '30 yrs',
            },
            {
              id: 2,
              absent_parent_code: 'N',
              dateOfBirth: '02/15/1991',
              gender: 'Male',
              name: 'Will Carlson',
              legacy_descriptor: {legacy_id: '1'},
              type: 'Nephew (Paternal)',
              secondaryRelationship: 'Uncle (Paternal)',
              person_card_exists: true,
              same_home_code: 'N',
              type_code: '258',
              age: '30 yrs',
            },
          ],
        },
        {
          dateOfBirth: '03/15/1990',
          legacy_id: '2',
          name: 'Johny Robinson',
          gender: 'Male',
          age: '20 yrs',
          relationships: [
            {
              id: 1,
              absent_parent_code: 'Y',
              dateOfBirth: '01/15/1986',
              gender: 'Male',
              name: 'Ricky Robinson',
              legacy_descriptor: {legacy_id: '3'},
              type: 'Brother',
              secondaryRelationship: 'Brother',
              person_card_exists: false,
              same_home_code: 'Y',
              type_code: '17',
              age: '30 yrs',
            },
            {
              id: 2,
              absent_parent_code: 'N',
              dateOfBirth: '02/15/1991',
              gender: 'Male',
              name: 'Will Carlson',
              legacy_descriptor: {legacy_id: '1'},
              type: 'Nephew (Paternal)',
              secondaryRelationship: 'Uncle (Paternal)',
              person_card_exists: true,
              same_home_code: 'N',
              type_code: '258',
              age: '30 yrs',
            },
          ],
        },
      ]))
    })
  })

  describe('genderFormat', () => {
    it('displays gender as Male if the data is male', () => {
      expect(genderFormat('male')).toEqual('Male')
    })
    it('displays gender if the data is M/F/U/I', () => {
      expect(genderFormat('M')).toEqual('Male')
      expect(genderFormat('F')).toEqual('Female')
    })
    it('displays empty string if no key is map', () => {
      expect(genderFormat('W')).toEqual('')
    })
  })
})
