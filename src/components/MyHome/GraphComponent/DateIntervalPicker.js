import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import '../../../styles/DateIntervalPicker.css'

function DateIntervalPicker({ interval, setInterval }) {
  const handleDateChange = (item) => {
    setInterval(item.selection);
  }

  return (
    <div className='mx-auto' data-testid="date-interval-picker">
      <DateRangePicker
        onChange={handleDateChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={[interval]}
        direction="horizontal"
      />
    </div>
  )
}

export default DateIntervalPicker
