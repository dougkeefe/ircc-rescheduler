import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'lingui-react'
import FieldAdapterPropTypes from './_Field'
import DayPicker, { DateUtils } from 'react-day-picker'
import { css } from 'emotion'
import Time, { makeGMTDate } from './Time'
import ErrorMessage from './ErrorMessage'

const dayPickerDefault = css`
  /* DayPicker styles */

  display: inline-block;

  .DayPicker-wrapper {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-bottom: 1rem;
    flex-direction: row;
  }

  .DayPicker-Months {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .DayPicker-Month {
    display: table;
    border-collapse: collapse;
    border-spacing: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin: 0 1rem;
    margin-top: 1rem;
  }

  .DayPicker-NavBar {
  }

  .DayPicker-NavButton {
    position: absolute;
    cursor: pointer;
    top: 1rem;
    right: 1.5rem;
    margin-top: 2px;
    color: #8b9898;
    width: 1.25rem;
    height: 1.25rem;
    display: inline-block;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .DayPicker-NavButton:hover {
    opacity: 0.8;
  }

  .DayPicker-NavButton--prev {
    margin-right: 1.5rem;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC');
  }

  .DayPicker-NavButton--next {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==');
  }

  .DayPicker-NavButton--interactionDisabled {
    display: none;
  }

  .DayPicker-Caption {
    padding: 0 0.5rem;
    display: table-caption;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  .DayPicker-Caption > div {
    font-size: 1.15rem;
    font-weight: 500;
  }

  .DayPicker-Weekdays {
    margin-top: 1rem;
    display: table-header-group;
  }

  .DayPicker-WeekdaysRow {
    display: table-row;
  }

  .DayPicker-Weekday {
    display: table-cell;
    padding: 0.5rem;
    font-size: 0.875em;
    text-align: center;
    color: #8b9898;
  }

  .DayPicker-Weekday abbr[title] {
    border-bottom: none;
    text-decoration: none;
  }

  .DayPicker-Body {
    display: table-row-group;
  }

  .DayPicker-Week {
    display: table-row;
  }

  .DayPicker-Day {
    display: table-cell;
    padding: 0.5rem;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
    outline: none;
  }

  .DayPicker-WeekNumber {
    display: table-cell;
    padding: 0.5rem;
    text-align: right;
    vertical-align: middle;
    min-width: 1rem;
    font-size: 0.75em;
    cursor: pointer;
    color: #8b9898;
    border-right: 1px solid #eaecec;
  }

  .DayPicker--interactionDisabled .DayPicker-Day {
    cursor: default;
  }

  .DayPicker-Footer {
    padding-top: 0.5rem;
  }

  .DayPicker-TodayButton {
    border: none;
    background-image: none;
    background-color: transparent;
    box-shadow: none;
    cursor: pointer;
    color: #4a90e2;
    font-size: 0.875em;
  }

  /* Default modifiers */

  .DayPicker-Day--today {
    color: #d0021b;
    font-weight: 700;
  }

  .DayPicker-Day--outside {
    cursor: default;
    color: #8b9898;
  }

  .DayPicker-Day--disabled {
    color: #dce0e0;
    cursor: default;
    /* background-color: #eff1f1; */
  }

  /* Example modifiers */

  .DayPicker-Day--sunday {
    background-color: #f7f8f8;
  }

  .DayPicker-Day--sunday:not(.DayPicker-Day--today) {
    color: #dce0e0;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    position: relative;
    color: #f0f8ff;
    background-color: #4a90e2;
    border-radius: 100%;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background-color: #51a0fa;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background-color: #f0f8ff;
    border-radius: 50%;
  }

  /* DayPickerInput */

  .DayPickerInput {
    display: inline-block;
  }

  .DayPickerInput-OverlayWrapper {
    position: relative;
  }

  .DayPickerInput-Overlay {
    left: 0;
    z-index: 1;
    position: absolute;
    background: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
`

const dayPicker = css`
  .DayPicker-wrapper {
    background-color: white;
  }
`

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.updateFieldParams = this.updateFieldParams.bind(this)
    this.removeDayOnClickOrKeyPress = this.removeDayOnClickOrKeyPress.bind(this)
    this.state = {
      selectedDays: this.props.input.value || [],
      errorMessage: null,
    }
    this.props.input.value = this.state.selectedDays
  }

  removeDayOnClickOrKeyPress = day => e => {
    /*
      Remove the selected day from the internal state when
      - there has been a real click event (ie, e.detail > 0)
      - the spacebar or enter key is pressed
    */
    if (
      (e.type === 'click' && e.detail !== 0) ||
      ((e.type === 'keypress' && e.key === 'Enter') || e.key === ' ')
    ) {
      this.handleDayClick(day, { selected: true })
    }
  }

  /*
    'selected' is a boolean field
    - true if the day being passed in has already been selected on the calendar
    - false if the day being passed in is not already on the calendar

    'disabled' is a boolean field as well
    - true if the day being passed in is disabled (not able to be selected)
    - else false

    These properties are part of the DayPicker API
    http://react-day-picker.js.org/examples/selected-multiple
  */
  async handleDayClick(day, { selected, disabled }) {
    if (disabled) {
      return
    }

    /* Cast all Dates to 12 noon GMT */
    day = makeGMTDate(day)

    /*
      The first time we return to this page with pre-populated dates,
      - this.props.input.value will contain all of the pre-poulated dates
      - this.state.selectedDates will be empty

      So let's update the state with the prepopulated dates
    */
    let {
      input: { value },
      dayLimit,
    } = this.props

    if (!this.state.selectedDays.length && value && value.length) {
      await this.setState({ selectedDays: value })
    }

    const { selectedDays } = this.state

    // !selected means that this current day is not marked as 'selected' on the calendar
    if (!selected) {
      // If we have already selected the maximum number of days,
      // add an error message to the internal state and then return early
      if (selectedDays.length >= dayLimit) {
        await this.setState({
          errorMessage: (
            <Trans>
              You have already selected the maximum number of dates!
            </Trans>
          ),
        })
        return
      }

      // push new day into array of selectedDays
      selectedDays.push(day)
    } else {
      // If we have already selected this day, unselect it
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day),
      )
      selectedDays.splice(selectedIndex, 1)
    }

    await this.setState({ selectedDays, errorMessage: null })
    this.updateFieldParams()
  }

  updateFieldParams() {
    this.props.input.value = this.state.selectedDays
    this.props.input.onChange(this.props.input.value)
  }

  render() {
    let {
      input: { onBlur, onFocus, value },
    } = this.props
    return (
      <div>
        <DayPicker
          className={css`
            ${dayPickerDefault} ${dayPicker};
          `}
          month={new Date(2018, 5)}
          fromMonth={new Date(2018, 5)}
          toMonth={new Date(2018, 6)}
          numberOfMonths={2}
          disabledDays={[{ daysOfWeek: [0, 1, 3, 4, 6] }]}
          onDayClick={this.handleDayClick}
          selectedDays={value || []}
          onFocus={v => onFocus(v)}
          onBlur={v => onBlur(v)}
        />
        {/*
          This code demonstrates how to update the page as dates are selected.
          It should be replaced as we fine-tune the interaction.
        */}
        <div>
          <h3>Dates selected:</h3>
          <ErrorMessage
            message={this.state.errorMessage}
            id="selectedDays-error"
          />
          <div id="selectedDays">
            {value && value.length > 0 ? (
              <ol>
                {value.map((day, index) => (
                  <li key={index}>
                    {`${index + 1}. `}
                    <Time date={day} />{' '}
                    <button
                      type="button"
                      onClick={this.removeDayOnClickOrKeyPress(day)}
                      onKeyPress={this.removeDayOnClickOrKeyPress(day)}
                    >
                      <Trans>Remove date</Trans>
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              'No dates selected'
            )}
          </div>
        </div>
      </div>
    )
  }
}
Calendar.propTypes = {
  ...FieldAdapterPropTypes,
  dayLimit: PropTypes.number.isRequired,
}

export { Calendar as CalendarAdapter }