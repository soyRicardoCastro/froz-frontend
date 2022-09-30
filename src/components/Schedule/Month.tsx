import { Dayjs } from 'dayjs'
import React from 'react'
import { Day } from '.'

interface Props {
  body: {
    month: Dayjs[][]
  }
}

export default function Month ({ month }: Props['body']) {
  return (
    <div className='flex-1 grid grid-cols-7 grid-rows-5'>
      {month.map((row, i) => {
        return (
        <React.Fragment key={`month-key-${i}`}>
          {row.map((day, idx) => (
            <Day day={day} key={`day-key-${idx}`} rowIdx={i} />
          ))}
        </React.Fragment>
        )
      })}
    </div>
  )
}
