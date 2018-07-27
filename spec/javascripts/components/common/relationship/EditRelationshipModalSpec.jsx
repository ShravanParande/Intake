import React from 'react'
import {shallow} from 'enzyme'
import {ModalComponent} from 'react-wood-duck'
import EditRelationshipForm from 'common/relationship/EditRelationshipForm'
import EditRelationshipModal from 'common/relationship/EditRelationshipModal'

describe('EditRelationshipModal', () => {
  const props = {
    closeModal: () => {},
    onChange: () => {},
    onSave: () => {},
    relationship: {
      absentParentIndicator: false,
      clientAge: '20 yrs',
      clientDateOfBirth: '12/03/1936',
      clientGender: 'Male',
      clientName: 'Luke Skywalker',
      endDate: '12/20/2018',
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
      startDate: '12/03/1936',
    },
    show: true,
  }
  const renderEditRelationshipModal = (props) => shallow(<EditRelationshipModal {...props}/>)

  describe('rendersModal', () => {
    it('renders a ModalComponent', () => {
      expect(renderEditRelationshipModal(props).find(ModalComponent).length).toBe(1)
    })
  })

  describe('renderFooter', () => {
    it('renders two buttons', () => {
      expect(
        renderEditRelationshipModal(props).find(ModalComponent).shallow().find('button').length
      ).toBe(2)
    })
  })

  describe('renderEditRelationshipForm', () => {
    const render = renderEditRelationshipModal(props)
      .find(ModalComponent)
      .shallow()
      .find(EditRelationshipForm)

    it('renders the EditRelationshipForm', () => {
      expect(render.length).toBe(1)
    })

    it('passes the props to EditRelationshipForm', () => {
      expect(render.prop('relationship')).toEqual({
        absentParentIndicator: false,
        clientAge: '20 yrs',
        clientDateOfBirth: '12/03/1936',
        clientGender: 'Male',
        clientName: 'Luke Skywalker',
        endDate: '12/20/2018',
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
        startDate: '12/03/1936',
      })
    })
  })
})
