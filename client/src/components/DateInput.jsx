import React, { useRef } from 'react'
import { BsCalendar2Date } from "react-icons/bs";

function DateInput() {
  return (
    <div className='date-picker flex gap-3 items-center bg-seconadryColor px-3'>
      <BsCalendar2Date color='white' /> 
      <div className='py-2 bg-seconadryColor rounded-sm shadow-md text-slate-500'>2018-11-11</div>
    </div>
  )
}

export default DateInput
