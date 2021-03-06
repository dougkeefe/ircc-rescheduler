import React from 'react'
import { mount } from 'enzyme'
import CalendarAdapter from '../Calendar'
import {
  getMonthNameAndYear,
  getStartMonth,
  getStartDate,
  getValidDays,
  getEndDate,
} from '../../utils/calendarDates'

import parse from 'date-fns/parse'
import addMonths from 'date-fns/add_months'
import format from 'date-fns/format'

const clickDate = (wrapper, index) => {
  return wrapper
    .find('.DayPicker-Day[aria-disabled=false]')
    .at(index)
    .simulate('click')
}

const clickFirstDate = wrapper => {
  return clickDate(wrapper, 0)
}

const getDateStrings = wrapper => {
  return wrapper
    .find('#selectedDays-list time')
    .map(time => time.text())
    .join(' ')
}

const getErrorMessageString = wrapper => {
  return wrapper
    .find('#selectedDays-error')
    .first()
    .text()
}

const defaultProps = ({ value = '', dayLimit = 3 } = {}) => {
  const startMonth = getStartMonth(new Date())
  return {
    input: { value: value, onChange: () => {} },
    dayLimit: dayLimit,
    initialMonth: startMonth,
    fromMonth: startMonth,
  }
}

const dayMonthYear = date => {
  return format(parse(date), 'dddd, MMMM D, YYYY')
}

const calDays = () => {
  const startDate = parse(getStartDate())
  const endDate = parse(getEndDate())
  return getValidDays(startDate, endDate)
}

describe('<CalendarAdapter />', () => {
  let days

  beforeEach(async () => {
    days = calDays()
  })

  it('renders current month', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
    const monthYear = getMonthNameAndYear(getStartMonth(new Date()), 'en')
    expect(wrapper.text()).toMatch(monthYear)
  })

  it('renders next month', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
    wrapper.find('.DayPicker-NavButton--next').simulate('click')

    const currentMonthYear = getMonthNameAndYear(
      getStartMonth(new Date()),
      'en',
    )

    const nextMonth = addMonths(parse(getStartDate(new Date())), 1)
    const nextMonthYear = getMonthNameAndYear(nextMonth, 'en')

    expect(wrapper.text()).toMatch(nextMonthYear)
    expect(wrapper.text()).not.toMatch(currentMonthYear)
  })

  it('will prefill a date if an initial value is provided', () => {
    const wrapper = mount(
      <CalendarAdapter {...defaultProps({ value: [new Date(days[0])] })} />,
    )

    expect(getDateStrings(wrapper)).toEqual(dayMonthYear(days[0]))
  })

  it('will prefill multiple dates if multiple initial values are provided', () => {
    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [new Date(days[0]), new Date(days[1])],
        })}
      />,
    )

    const day1 = dayMonthYear(days[0])
    const day2 = dayMonthYear(days[1])

    expect(getDateStrings(wrapper)).toEqual(`${day1} ${day2}`)
  })

  it('selects a date when it is clicked', () => {
    const days = calDays()
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)

    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual(dayMonthYear(days[0]))
  })

  it('orders selected dates chronologically', () => {
    const day1 = dayMonthYear(days[0])
    const day2 = dayMonthYear(days[1])
    const day3 = dayMonthYear(days[2])

    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)

    clickDate(wrapper, 2)

    expect(getDateStrings(wrapper)).toEqual(day3)

    clickDate(wrapper, 1)

    expect(getDateStrings(wrapper)).toEqual(`${day2} ${day3}`)

    clickDate(wrapper, 0)

    expect(getDateStrings(wrapper)).toEqual(`${day1} ${day2} ${day3}`)
  })

  it('unselects a date when it is clicked twice', () => {
    const wrapper = mount(<CalendarAdapter {...defaultProps()} />)

    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)

    // click the first available day (July 17th, 2018) twice
    clickFirstDate(wrapper)
    clickFirstDate(wrapper)
    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)
  })

  it('will not select more days once the limit is reached', () => {
    const day2 = dayMonthYear(days[1])

    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({ value: [new Date(days[1])], dayLimit: 1 })}
      />,
    )
    expect(getDateStrings(wrapper)).toEqual(day2)

    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual(day2)
    expect(getErrorMessageString(wrapper)).toEqual(
      'You can’t select more than 3 days. To change your selections, remove some days first.',
    )
  })

  it('will remove maximum date error message if a date is unselected', () => {
    const day2 = dayMonthYear(days[1])

    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [new Date(days[1])],
          dayLimit: 1,
        })}
      />,
    )
    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual(day2)
    expect(getErrorMessageString(wrapper)).toEqual(
      'You can’t select more than 3 days. To change your selections, remove some days first.',
    )

    // click first "Remove date" button
    wrapper
      .find('#selectedDays-list button')
      .first()
      .simulate('click')
    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)
    expect(getErrorMessageString(wrapper)).toEqual('')
  })

  it('will allow more days to be selected once a day is unselected', () => {
    const day1 = dayMonthYear(days[0])
    const day2 = dayMonthYear(days[1])

    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [new Date(days[1])],
          dayLimit: 1,
        })}
      />,
    )
    expect(getDateStrings(wrapper)).toEqual(day2)

    clickDate(wrapper, 1)
    expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)

    // click the first available day (Aug 9th, 2018)
    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual(day1)
  })

  it('will keep pre-filled dates when clicking new ones', () => {
    const day1 = dayMonthYear(days[0])
    const day2 = dayMonthYear(days[1])
    const day3 = dayMonthYear(days[2])

    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [new Date(days[1]), new Date(days[2])],
        })}
      />,
    )
    expect(getDateStrings(wrapper)).toEqual(`${day2} ${day3}`)

    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual(`${day1} ${day2} ${day3}`)
  })

  it('will un-click pre-filled dates when clicking new ones', () => {
    const day1 = dayMonthYear(days[0])
    const day2 = dayMonthYear(days[1])

    const wrapper = mount(
      <CalendarAdapter
        {...defaultProps({
          value: [new Date(days[1]), new Date(days[0])],
        })}
      />,
    )
    expect(getDateStrings(wrapper)).toEqual(`${day1} ${day2}`)

    clickFirstDate(wrapper)
    expect(getDateStrings(wrapper)).toEqual(day2)
  })

  const events = [
    { eventType: 'click', options: {}, toString: 'click event' },
    {
      eventType: 'keypress',
      options: { key: ' ' },
      toString: 'keypress event with spacebar',
    },
    {
      eventType: 'keypress',
      options: { key: 'Enter' },
      toString: 'keypress event with enter key',
    },
  ]

  events.map(({ eventType, options, toString }) => {
    days = calDays()
    const day1 = dayMonthYear(days[0])

    it(`will remove a date when its "Remove date" button is triggered by a ${toString}`, () => {
      const wrapper = mount(<CalendarAdapter {...defaultProps()} />)
      expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)

      clickFirstDate(wrapper)
      expect(getDateStrings(wrapper)).toEqual(day1)

      wrapper
        .find('#selectedDays-list button')
        .first()
        .simulate(eventType, options)
      expect(wrapper.find('#selectedDays .day-box').every('.empty')).toBe(true)
    })
  })
})
