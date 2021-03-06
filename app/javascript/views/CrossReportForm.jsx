import AlertInfoMessage from 'common/AlertInfoMessage'
import CountySelectField from 'common/CountySelectField'
import DateField from 'common/DateField'
import InlineHeader from 'common/InlineHeader'
import PropTypes from 'prop-types'
import React from 'react'
import SelectField from 'common/SelectField'
import CrossReportAgencyField from 'views/CrossReportAgencyField'
import {
  ALLEGATIONS_REQUIRE_CROSS_REPORTS_MESSAGE,
  COMMUNICATION_METHODS,
  COMMUNITY_CARE_LICENSING,
  COUNTY_LICENSING,
  DISTRICT_ATTORNEY,
  LAW_ENFORCEMENT,
} from 'enums/CrossReport'
import {SHOW_MODE} from 'actions/screeningPageActions'
import {setHash} from 'utils/navigation'

const CrossReportForm = ({
  allegationsRequireCrossReports,
  areCrossReportsRequired,
  cardName,
  communityCareLicensing,
  counties,
  county_id,
  countyAgencies,
  countyLicensing,
  districtAttorney,
  hasAgencies,
  errors,
  inform_date,
  lawEnforcement,
  method,
  screeningWithEdits,
  userCounty,
  actions: {
    clearAllAgencyFields,
    clearAllFields,
    fetchCountyAgencies,
    clearCardEdits,
    saveCrossReport,
    saveCard,
    setAgencyField,
    setAgencyTypeField,
    setCardMode,
    setField,
    touchAgencyField,
    touchAllFields,
    touchField,
  },
}) => {
  const cancel = () => {
    clearCardEdits(cardName)
    setCardMode(cardName, SHOW_MODE)
    setHash('#cross-report-card-anchor')
  }
  const save = () => {
    saveCard(cardName)
    saveCrossReport(screeningWithEdits)
    touchAllFields()
    setCardMode(cardName, SHOW_MODE)
    setHash('#cross-report-card-anchor')
  }
  const agencyFieldActions = {
    setAgencyTypeField,
    setAgencyField,
    clearAllAgencyFields,
    touchField,
    touchAgencyField,
  }

  if (county_id === '' && counties.some((county) => county.code === userCounty)) {
    fetchCountyAgencies(userCounty)
    setField('county_id', userCounty)
  }

  return (
    <div className='card-body no-pad-top'>
      { areCrossReportsRequired && <AlertInfoMessage message={ALLEGATIONS_REQUIRE_CROSS_REPORTS_MESSAGE} /> }
      <div className='row col-md-12'>
        <label>This report has cross reported to:</label>
      </div>
      <div className='row'>
        <CountySelectField
          gridClassName='col-md-6'
          id='cross_report_county'
          onChange={({target: {value}}) => {
            if (value && value !== '') {
              fetchCountyAgencies(value)
            }
            setField('county_id', value)
            clearAllFields()
          }}
          onBlur={() => touchField('county_id')}
          counties={counties}
          value={county_id === '' ? userCounty : county_id}
        />
      </div>
      {
        county_id &&
        <div className='row gap-top'>
          <div className='col-md-6'>
            <ul className='unstyled-list'>
              <li key={DISTRICT_ATTORNEY}>
                <CrossReportAgencyField
                  type={DISTRICT_ATTORNEY}
                  selected={districtAttorney.selected}
                  value={districtAttorney.agency.value}
                  countyAgencies={countyAgencies[DISTRICT_ATTORNEY]}
                  errors={errors[DISTRICT_ATTORNEY]}
                  actions={agencyFieldActions}
                  required={allegationsRequireCrossReports}
                />
              </li>
              <li key={LAW_ENFORCEMENT}>
                <CrossReportAgencyField
                  type={LAW_ENFORCEMENT}
                  selected={lawEnforcement.selected}
                  value={lawEnforcement.agency.value}
                  countyAgencies={countyAgencies[LAW_ENFORCEMENT]}
                  errors={errors[LAW_ENFORCEMENT]}
                  actions={agencyFieldActions}
                  required={allegationsRequireCrossReports}
                />
              </li>
            </ul>
          </div>
          <div className='col-md-6'>
            <ul className='unstyled-list'>
              <li key={COUNTY_LICENSING}>
                <CrossReportAgencyField
                  type={COUNTY_LICENSING}
                  selected={countyLicensing.selected}
                  value={countyLicensing.agency.value}
                  countyAgencies={countyAgencies[COUNTY_LICENSING]}
                  errors={errors[COUNTY_LICENSING]}
                  actions={agencyFieldActions}
                />
              </li>
              <li key={COMMUNITY_CARE_LICENSING}>
                <CrossReportAgencyField
                  type={COMMUNITY_CARE_LICENSING}
                  selected={communityCareLicensing.selected}
                  value={communityCareLicensing.agency.value}
                  countyAgencies={countyAgencies[COMMUNITY_CARE_LICENSING]}
                  errors={errors[COMMUNITY_CARE_LICENSING]}
                  actions={agencyFieldActions}
                />
              </li>
            </ul>
          </div>
        </div>
      }
      <div className='row double-gap-top'>
        {
          hasAgencies &&
          <fieldset className='fieldset-inputs'>
            <InlineHeader heading='Communication Time and Method' />
            <DateField
              gridClassName='col-md-6'
              id='cross_report_inform_date'
              label='Cross Reported on Date'
              errors={errors.inform_date}
              onChange={(value) => {
                setField('inform_date', value)
              }}
              onBlur={() => touchField('inform_date')}
              required
              value={inform_date}
            />
            <SelectField
              gridClassName='col-md-6'
              id='cross_report_method'
              errors={errors.method}
              label='Communication Method'
              onChange={({target: {value}}) => {
                setField('method', value)
              }}
              onBlur={() => touchField('method')}
              required
              value={method}
            >
              <option key='' />
              {COMMUNICATION_METHODS.map((item) => <option key={item} value={item}>{item}</option>)}
            </SelectField>
          </fieldset>
        }
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <div className='pull-right'>
            <button className='btn btn-default' onClick={cancel}>Cancel</button>
            <button className='btn btn-primary' onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

CrossReportForm.propTypes = {
  actions: PropTypes.object.isRequired,
  allegationsRequireCrossReports: PropTypes.bool.isRequired,
  areCrossReportsRequired: PropTypes.bool.isRequired,
  cardName: PropTypes.string,
  communityCareLicensing: PropTypes.object.isRequired,
  counties: PropTypes.array.isRequired,
  countyAgencies: PropTypes.object,
  countyLicensing: PropTypes.object.isRequired,
  county_id: PropTypes.string.isRequired,
  districtAttorney: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  hasAgencies: PropTypes.bool.isRequired,
  inform_date: PropTypes.string,
  lawEnforcement: PropTypes.object.isRequired,
  method: PropTypes.string,
  screeningWithEdits: PropTypes.object,
  userCounty: PropTypes.string,
}

export default CrossReportForm
