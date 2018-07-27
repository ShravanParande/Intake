import React from 'react'
import {shallow} from 'enzyme'
import ActionMenu from 'common/relationship/ActionMenu'
import AttachLink from 'common/relationship/AttachLink'
import EditRelationshipModal from 'common/relationship/EditRelationshipModal'

describe('ActionMenu', () => {
  const props = {
    editRelationship: {id: '2'},
    fetchRelationship: () => {},
    isScreening: true,
    onChange: () => {},
    onClick: () => {},
    onSave: () => {},
    pendingPeople: [],
    person: {name: 'Goku'},
    relationship: {id: '1'},
    screeningId: '1',

  }
  const renderActionMenu = (props) => shallow(<ActionMenu {...props}/>)

  it('renders a span', () => {
    expect(renderActionMenu(props).find('span').length).toBe(1)
  })

  it('renders an unordered list', () => {
    expect(renderActionMenu(props).find('ul').length).toBe(1)
  })

  it('renders AttachLink component', () => {
    expect(renderActionMenu(props).find(AttachLink).length).toBe(1)
  })

  it('renders an Edit Relationship link', () => {
    expect(renderActionMenu(props).find('.edit-relationship').length).toBe(1)
  })

  it('renders ModalComponent', () => {
    expect(
      renderActionMenu(props).setState({show: true}).find(EditRelationshipModal).length
    ).toBe(1)
  })

  it('passes the props to EditRelationshipModal', () => {
    expect(
      renderActionMenu(props)
        .setState({show: true})
        .find(EditRelationshipModal)
        .prop('relationship')
    ).toEqual({id: '2'})
  })

  describe('closeModal', () => {
    it('sets the state show to false', () => {
      const instance = renderActionMenu(props).instance()

      instance.setState({show: true})
      expect(instance.state.show).toBe(true)
      instance.closeModal()
      expect(instance.state.show).toBe(false)
    })
  })

  describe('handleShowModal', () => {
    it('sets the state show to true', () => {
      const instance = renderActionMenu(props).instance()

      expect(instance.state.show).toBe(false)
      instance.handleShowModal()
      expect(instance.state.show).toBe(true)
    })
  })
})
