import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AttachLink from 'common/relationship/AttachLink'
import EditRelationshipModal from 'common/relationship/EditRelationshipModal'

export class ActionMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
    this.closeModal = this.closeModal.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
  }

  closeModal() {
    this.setState({show: false})
  }

  handleShowModal() {
    this.props.fetchRelationship(this.props.relationship.id)
    this.setState({show: true})
  }

  renderModal() {
    const {editRelationship, onChange, onSave} = this.props

    return (
      <EditRelationshipModal
        closeModal={this.closeModal}
        onChange={onChange}
        onSave={onSave}
        relationship={editRelationship}
        show={this.state.show}
      />
    )
  }

  render() {
    return (
      <div>
        <div className='dropdown' aria-label='Action Menu'>
          <span className='glyphicon glyphicon-option-vertical' type='button' data-toggle='dropdown' aria-hidden='true'/>
          <ul className='dropdown-menu dropdown-menu-right' role='menu' aria-hidden='true'>
            <li className='dropdown-header'>Actions</li>
            <li role='separator' className='divider'/>
            <li role='menuitem'><AttachLink {...this.props}/></li>
            <li role='menuitem'>
              <a className='edit-relationship' onClick={this.handleShowModal}>
                Edit Relationship
              </a>
            </li>
          </ul>
        </div>
        {this.state.show && this.renderModal()}
      </div>
    )
  }
}

const personPropType = PropTypes.shape({
  age: PropTypes.string,
  dateOfBirth: PropTypes.string,
  legacy_id: PropTypes.string,
  gender: PropTypes.string,
  name: PropTypes.string,
})
const relationshipPropType = PropTypes.shape({
  absentParentIndicator: PropTypes.bool,
  clientAge: PropTypes.string,
  clientDateOfBirth: PropTypes.string,
  clientGender: PropTypes.string,
  clientName: PropTypes.string,
  endDate: PropTypes.string,
  id: PropTypes.string,
  legacyId: PropTypes.string,
  relationshipType: PropTypes.string,
  relativeAge: PropTypes.string,
  relativeDateOfBirth: PropTypes.string,
  relativeGender: PropTypes.string,
  relativeName: PropTypes.string,
  sameHomeStatus: PropTypes.string,
  startDate: PropTypes.string,
})
ActionMenu.propTypes = {
  editRelationship: relationshipPropType,
  fetchRelationship: PropTypes.func,
  isScreening: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onSave: PropTypes.func,
  pendingPeople: PropTypes.arrayOf(PropTypes.string),
  person: personPropType,
  relationship: PropTypes.object,
  screeningId: PropTypes.string,
}

export default ActionMenu
