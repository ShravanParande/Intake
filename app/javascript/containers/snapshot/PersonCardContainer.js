import {connect} from 'react-redux'
import PersonCard from 'views/people/PersonCard'
import {
  getPersonNamesSelector,
  getPersonInformationFlagValuesSelector,
  selectDeceased,
} from 'selectors/screening/personCardSelectors'
import {deleteSnapshotPerson} from 'actions/personCardActions'
import {SHOW_MODE} from 'actions/screeningPageActions'

const mapStateToProps = (state, {personId}) => ({
  mode: SHOW_MODE,
  editable: false,
  deletable: true,
  informationFlag: getPersonInformationFlagValuesSelector(state).get(personId),
  personName: getPersonNamesSelector(state).get(personId),
  informationPill: selectDeceased(state).get(personId) ? 'Deceased' : null,
})

const mapDispatchToProps = (dispatch, {personId}) => ({
  onDelete: () => dispatch(deleteSnapshotPerson(personId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonCard)
