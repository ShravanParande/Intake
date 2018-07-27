import {connect} from 'react-redux'
import {Relationships} from 'common/Relationships'
import {getPeopleSelector} from 'selectors/screening/relationshipsSelectors'
import {getRelationshipSelector} from 'selectors/screening/relationshipSelectors'
import {createPerson} from 'actions/personCardActions'
import {getScreeningIdValueSelector} from 'selectors/screeningSelectors'
import {fetchRelationship, setRelationship, updateRelationship} from 'actions/relationshipActions'

const mapStateToProps = (state, _ownProps) => ({
  people: getPeopleSelector(state).toJS(),
  screeningId: getScreeningIdValueSelector(state),
  isScreening: true,
  pendingPeople: state.get('pendingParticipants').toJS(),
  editRelationship: getRelationshipSelector(state).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
  fetchRelationship: (id) => dispatch(fetchRelationship(id)),
  onChange: (field, value) => dispatch(setRelationship(field, value)),
  onClick: (relationship, screeningId) => {
    const relationshipsPerson = {
      screening_id: screeningId,
      legacy_descriptor: {
        legacy_id: relationship.legacy_descriptor && relationship.legacy_descriptor.legacy_id,
        legacy_source_table: relationship.legacy_descriptor && relationship.legacy_descriptor.legacy_table_name,
      },
    }
    dispatch(createPerson(relationshipsPerson))
  },
  onSave: (id) => dispatch(updateRelationship(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Relationships)
