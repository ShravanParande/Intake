import AlertErrorMessage from 'common/AlertErrorMessage'
import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'common/SelectField'
import InputField from 'common/InputField'
import FormField from 'common/FormField'

const ScreeningDecisionForm = ({
  accessRestriction,
  accessRestrictionOptions,
  additionalInformation,
  alertErrorMessage,
  decision,
  decisionDetail,
  decisionDetailOptions,
  decisionOptions,
  isAdditionalInfoRequired,
  onBlur,
  onCancel,
  onChange,
  onSave,
  restrictionRationale,
  screeningContactReference,
  sdmPath,
}) => (
  <div className='card-body'>
    { alertErrorMessage && <AlertErrorMessage message={alertErrorMessage} /> }
    <div className='row'>
      <div className='col-md-6'>
        <SelectField
          id='screening_decision'
          label='Screening Decision'
          required
          value={decision.value}
          errors={decision.errors}
          onBlur={() => onBlur('screening_decision')}
          onChange={({target: {value}}) => onChange('screening_decision', value)}
        >
          <option key='' />
          {decisionOptions.map(({label, value}) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </SelectField>
        {decision.value && decisionDetailOptions.length === 0 &&
            <InputField
              id='decision_detail'
              maxLength='64'
              label={decisionDetail.label}
              errors={decisionDetail.errors}
              required={decisionDetail.required}
              value={decisionDetail.value}
              onChange={({target: {value}}) => onChange('screening_decision_detail', value)}
              onBlur={() => onBlur('screening_decision_detail')}
            />
        }
        {decision.value === 'information_to_child_welfare_services' && screeningContactReference &&
            <InputField
              id='screening_contact_reference'
              maxLength='22'
              label='Case or Referral Id'
              errors={screeningContactReference.errors}
              allowCharacters={/[0-9-]/}
              required={screeningContactReference.required}
              value={screeningContactReference.value}
              onChange={({target: {value}}) => onChange('screening_contact_reference', value)}
              onBlur={() => onBlur('screening_contact_reference')}
            />
        }
        {decision.value && decisionDetailOptions.length > 0 &&
              <SelectField
                id='decision_detail'
                label={decisionDetail.label}
                errors={decisionDetail.errors}
                required={decisionDetail.required}
                value={decisionDetail.value}
                onChange={({target: {value}}) => onChange('screening_decision_detail', value)}
                onBlur={() => onBlur('screening_decision_detail')}
              >
                <option key='' />
                {decisionDetailOptions.map(({value, label}) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </SelectField>
        }
        <div>
          <FormField
            htmlFor='additional_information'
            label='Additional Information'
            errors={additionalInformation.errors}
            required = {isAdditionalInfoRequired}
          >
            <textarea
              id='additional_information'
              onChange={({target: {value}}) => onChange('additional_information', value)}
              value={additionalInformation.value}
              onBlur={() => onBlur('additional_information')}
              maxLength='255'
            />
          </FormField>
        </div>
        <SelectField
          id='access_restrictions'
          label= 'Access Restrictions'
          value={accessRestriction.value}
          onChange={({target: {value}}) => onChange('access_restrictions', value)}
          onBlur={() => onBlur('access_restrictions')}
        >
          {accessRestrictionOptions.map(({label, value}) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </SelectField>
        {accessRestriction.value &&
          <div>
            <FormField
              htmlFor='restrictions_rationale'
              label='Restrictions Rationale'
              errors={restrictionRationale.errors}
              required
            >
              <textarea
                id='restrictions_rationale'
                onChange={({target: {value}}) => onChange('restrictions_rationale', value)}
                value={restrictionRationale.value}
                onBlur={() => onBlur('restrictions_rationale')}
                maxLength='255'
              />
            </FormField>
          </div>
        }
      </div>
      <div className='col-md-6'>
        <p className='double-gap-top'><strong>SDM Hotline Tool</strong></p>
        <div>Determine Decision and Response Time by using Structured Decision Making.</div>
        <a href={sdmPath} target='_blank' id='complete_sdm'>Complete SDM</a>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-12'>
        <div className='pull-right'>
          <button className='btn btn-default' onClick={onCancel}>Cancel</button>
          <button className='btn btn-primary' onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  </div>
)

ScreeningDecisionForm.propTypes = {
  accessRestriction: PropTypes.shape({
    value: PropTypes.string,
  }),
  accessRestrictionOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  additionalInformation: PropTypes.shape({
    value: PropTypes.string,
  }),
  alertErrorMessage: PropTypes.string,
  decision: PropTypes.shape({
    value: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
  }),
  decisionDetail: PropTypes.shape({
    errors: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
  }),
  decisionDetailOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  decisionOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  isAdditionalInfoRequired: PropTypes.bool,
  onBlur: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  restrictionRationale: PropTypes.shape({
    value: PropTypes.string,
  }),
  screeningContactReference: PropTypes.shape({
    errors: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
  }),
  sdmPath: PropTypes.string,
}

export default ScreeningDecisionForm
