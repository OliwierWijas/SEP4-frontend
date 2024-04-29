import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import '../../../css/DateIntervalPicker.css'


interface intervalState {
  interval: []
  setInterval: (interval: [any]) => void
}

function DateIntervalPicker({ interval, setInterval }: intervalState) {
  const handleDateChange = (item : any) => {
    setInterval([item.selection]);
  }

  return (
    <div className='mx-auto'>
      <DateRangePicker
        onChange={handleDateChange}
        //showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={interval}
        direction="horizontal"
      />
    </div>
  )
}

export default DateIntervalPicker
