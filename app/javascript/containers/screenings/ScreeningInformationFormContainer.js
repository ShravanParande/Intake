import {connect} from 'react-redux'
import ScreeningInformationForm from 'views/ScreeningInformationForm'
import COMMUNICATION_METHOD from 'enums/CommunicationMethod'
import REPORT_TYPE from 'enums/ReportType'
import {setField, touchField, touchAllFields} from 'actions/screeningInformationFormActions'
import {
  getScreeningInformationFormSelector,
  getVisibleErrorsSelector,
} from 'selectors/screening/screeningInformationFormSelectors'
import {saveCard, clearCardEdits} from 'actions/screeningActions'
import {setCardMode, SHOW_MODE} from 'actions/screeningPageActions'
import {getScreeningSelector} from 'selectors/screeningSelectors'

export const cardName = 'screening-information-card'

const communicationMethods = Object.keys(COMMUNICATION_METHOD)
  .map((value) => ({value, label: COMMUNICATION_METHOD[value]}))

const reportTypes = Object.keys(REPORT_TYPE)
  .map((value) => ({value, label: REPORT_TYPE[value]}))

const mapStateToProps = (state) => {
  const screening = getScreeningSelector(state)
  const screeningInformationForm = getScreeningInformationFormSelector(state)
  return {
    assignee: screeningInformationForm.getIn(['assignee', 'value']),
    assigneeDisabled: Boolean(screening.get('assignee_staff_id')),
    communicationMethod: screeningInformationForm.getIn(['communication_method', 'value']),
    communicationMethods,
    endedAt: screeningInformationForm.getIn(['ended_at', 'value']),
    errors: getVisibleErrorsSelector(state).toJS(),
    name: screeningInformationForm.getIn(['name', 'value']),
    prevReportType: screening.get('report_type'),
    reportType: screeningInformationForm.getIn(['report_type', 'value']),
    reportTypes,
    screeningId: screening.get('id'),
    startedAt: screeningInformationForm.getIn(['started_at', 'value']),
  }
}

const mapDispatchToProps = (dispatch) => ({
  onBlur: (fieldName) => dispatch(touchField(fieldName)),
  onCancel: () => {
    dispatch(clearCardEdits(cardName))
    dispatch(touchAllFields())
    dispatch(setCardMode(cardName, SHOW_MODE))
  },
  onChange: (fieldName, value) => dispatch(setField(fieldName, value)),
  dispatch,
})

export const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSave: () => {
    dispatchProps.dispatch(saveCard(cardName))
    dispatchProps.dispatch(touchAllFields())
    dispatchProps.dispatch(setCardMode(cardName, SHOW_MODE))
    if (stateProps.reportType === 'ssb' && stateProps.prevReportType !== 'ssb') {
      dispatchProps.dispatch({type: 'TRIGGER_SSB', payload: stateProps.screeningId})
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ScreeningInformationForm)
