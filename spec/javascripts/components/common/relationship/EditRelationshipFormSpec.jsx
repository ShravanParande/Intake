import React from 'react'
import CheckboxField from 'common/CheckboxField'
import EditRelationshipForm from 'common/relationship/EditRelationshipForm'
import DateField from 'common/DateField'
import {shallow} from 'enzyme'

describe('EditRelationshipForm', () => {
  const props = {
    onChange: () => {},
    relationship: {
      absentParentIndicator: false,
      clientAge: '20 yrs',
      clientDateOfBirth: '12/03/1936',
      clientGender: 'Male',
      clientName: 'Luke Skywalker',
      endDate: '2010-10-01',
      id: '174',
      index: 'Father',
      legacyId: '4SWZ8mw0Bv',
      relationshipType: '211',
      relativeAge: '30 yrs',
      relativeDateOfBirth: '11/25/1966',
      relativeGender: 'Male',
      relativeName: 'Darth Vader',
      sameHomeStatus: 'Y',
      secondaryRelationship: 'Son',
      startDate: '11/25/1966',
    },
  }
  const renderEditRelationshipForm = (props) => shallow(<EditRelationshipForm {...props}/>)

  it('renders a table', () => {
    expect(renderEditRelationshipForm(props).find('table').length).toBe(1)
  })

  it('renders a select field', () => {
    expect(renderEditRelationshipForm(props).find('select').length).toBe(1)
  })

  it('renders two checkboxes', () => {
    expect(renderEditRelationshipForm(props).find(CheckboxField).length).toBe(2)
  })

  it('renders two date fields', () => {
    expect(renderEditRelationshipForm(props).find(DateField).length).toBe(2)
  })

  it('renders the person props and relationship props in the table with the gender key map', () => {
    const component = renderEditRelationshipForm(props).find('ul')

    expect(component.first().find('li').first().text()).toEqual('Luke Skywalker')
    expect(component.first().find('li').at(1).text()).toEqual('20 yrs')
    expect(component.first().find('li').last().text()).toEqual('Male')
    expect(component.last().find('li').first().text()).toEqual('Darth Vader')
    expect(component.last().find('li').at(1).text()).toEqual('30 yrs')
    expect(component.last().find('li').last().text()).toEqual('Male')
  })

  describe('absent parent checkbox', () => {
    it('disables the absent parent checkbox when it does not matches father/mother/parent', () => {
      expect(
        renderEditRelationshipForm(props)
          .find('#absent_parent_indicator')
          .prop('disabled'))
        .toBe(true)
    })
    it('enables the absent parent checkbox when it matches father/mother/parent', () => {
      const relationship = {...props.relationship, secondaryRelationship: 'Father (Birth)'}

      expect(renderEditRelationshipForm({...props, relationship: relationship})
        .find('#absent_parent_indicator')
        .prop('disabled'))
        .toBe(false)
    })
  })
})
