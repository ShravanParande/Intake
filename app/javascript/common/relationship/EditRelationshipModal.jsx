import React from 'react'
import PropTypes from 'prop-types'
import EditRelationshipForm from 'common/relationship/EditRelationshipForm'
import {ModalComponent} from 'react-wood-duck'

const renderBody = (onChange, relationship) => (
  <EditRelationshipForm onChange={onChange} relationship={relationship}/>
)

const renderFooter = (closeModal, onSave, id) => (
  <div className='row'>
    <div className='col-md-12'>
      <div className='pull-right'>
        <button className='btn btn-default' onClick={closeModal}>
          Cancel
        </button>
        <button
          className='btn btn-primary'
          onClick={() => {
            onSave(id)
            closeModal()
          }}
        >
          Save Relationship
        </button>
      </div>
    </div>
  </div>
)

const EditRelationshipModal = ({
  closeModal,
  onChange,
  onSave,
  relationship,
  show,
}) => (
  <ModalComponent
    closeModal={closeModal}
    showModal={show}
    modalBody={renderBody(onChange, relationship)}
    modalFooter={renderFooter(closeModal, onSave, relationship.id)}
    modalSize='large'
    modalTitle='Edit Relationship Type'
  />
)

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

EditRelationshipModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  relationship: relationshipPropType,
  show: PropTypes.bool.isRequired,
}

export default EditRelationshipModal
