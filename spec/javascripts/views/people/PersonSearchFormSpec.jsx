import React from 'react'
import {shallow} from 'enzyme'
import PersonSearchForm from 'views/people/PersonSearchForm'
import CreateUnknownPerson from 'screenings/CreateUnknownPerson'
import ShowMoreResults from 'common/ShowMoreResults'
import * as IntakeConfig from 'common/config'

describe('PersonSearchForm', () => {
  beforeEach(() => {
    spyOn(IntakeConfig, 'isFeatureInactive').and.returnValue(true)
    spyOn(IntakeConfig, 'isFeatureActive').and.returnValue(false)
  })

  function renderPersonSearchForm({
    canCreateNewPerson,
    isSelectable,
    onLoadMoreResults,
    onSelect = () => null,
    total,
    results,
  }) {
    return shallow(
      <PersonSearchForm
        canCreateNewPerson={canCreateNewPerson}
        isSelectable={isSelectable}
        onLoadMoreResults={onLoadMoreResults}
        onSelect={onSelect}
        onChange={() => null}
        onClear={() => null}
        onSearch={() => null}
        results={results}
        searchTerm=''
        total={total}
      />
    )
  }

  it('renders the autocompleter', () => {
    const component = renderPersonSearchForm({})
    const autocompleter = component.find('Autocompleter')
    expect(autocompleter.exists()).toEqual(true)
    expect(autocompleter.props().id).toEqual('screening_participants')
  })

  it('passes isSelectable from props to the autocompleter', () => {
    const isSelectable = jasmine.createSpy('isSelectable')
    const component = renderPersonSearchForm({isSelectable})
    const autocompleter = component.find('Autocompleter')
    expect(autocompleter.props().isSelectable).toEqual(isSelectable)
  })

  it('passes the onSelect prop to the autocompleter', () => {
    const onSelect = jasmine.createSpy('onSelect')
    const component = renderPersonSearchForm({onSelect})
    const autocompleter = component.find('Autocompleter')
    expect(autocompleter.props().onSelect).toEqual(onSelect)
  })

  describe('when creating a new person is allowed', () => {
    let onSelect
    let autocompleter
    beforeEach(() => {
      onSelect = jasmine.createSpy('onSelect')
      autocompleter = renderPersonSearchForm({
        canCreateNewPerson: true,
        onSelect,
      }).find('Autocompleter')
    })

    it('renders autocompleter with CreateUnknownPerson footer', () => {
      expect(autocompleter.props().footers).toContain(
        <CreateUnknownPerson key='create-unknown-person' saveCallback={onSelect}/>
      )
    })
  })

  describe('when creating a new person is NOT allowed', () => {
    let autocompleter
    let onSelect
    beforeEach(() => {
      onSelect = jasmine.createSpy('onSelect')
      autocompleter = renderPersonSearchForm({
        canCreateNewPerson: false,
        onSelect,
      }).find('Autocompleter')
    })

    it('does not render autocompleter with CreateUnknownPerson footer', () => {
      expect(autocompleter.props().footers).not.toContain(
        <CreateUnknownPerson key='create-unknown-person' saveCallback={onSelect}/>
      )
    })
  })

  it('renders autocompleter with ShowMoreResults footer', () => {
    const onLoadMoreResults = jasmine.createSpy('onLoadMoreResults')
    const autocompleter = renderPersonSearchForm({
      results: [],
      total: 2,
      onLoadMoreResults,
    }).find('Autocompleter')
    expect(autocompleter.props().footers).toContain(
      <ShowMoreResults key='show-more-results' onSelect={onLoadMoreResults} />
    )
  })

  describe('when the number of results equals the total number of results', () => {
    let autocompleter
    const onLoadMoreResults = jasmine.createSpy('onLoadMoreResults')
    beforeEach(() => {
      const twoResults = [{}, {}]
      autocompleter = renderPersonSearchForm({
        total: 2,
        results: twoResults,
        onLoadMoreResults: onLoadMoreResults,
      }).find('Autocompleter')
    })

    it('does not render autocompleter with ShowMoreResults footer', () => {
      expect(autocompleter.props().footers).not.toContain(
        <ShowMoreResults key='show-more-results' onSelect={onLoadMoreResults} />
      )
    })
  })

  it('renders the card header', () => {
    const component = renderPersonSearchForm({})
    expect(component.children('.card-header').children('span').text()).toContain('Search')
  })

  describe('search card', () => {
    it('is labeled as "search for any person" in hotline', () => {
      const component = renderPersonSearchForm({})
      const searchCard = component.find('#search-card')
      const label = searchCard.children('.card-body').children('div').children('div').children('label')
      expect(label.text()).toContain('Search for any person')
      expect(label.text()).toContain('(Children, parents, collaterals, reporters, alleged perpetrators...)')
    })

    it('is labeled as "search for clients" in snapshot', () => {
      IntakeConfig.isFeatureInactive.and.returnValue(false)
      IntakeConfig.isFeatureActive.and.returnValue(true)
      const component = renderPersonSearchForm({})
      const searchCard = component.find('#search-card')
      const label = searchCard.children('.card-body').children('div').children('div').children('label')
      expect(label.text()).toContain('Search for clients')
    })
  })
})
