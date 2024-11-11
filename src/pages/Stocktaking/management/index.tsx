import React from 'react'
import StocktakingCalendar from './components/StocktakingCalendar'
import WeeklyCalendar from './components/PlannedCalendar'

type Props = {}

const StocktakingManagement = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
        <StocktakingCalendar/>
    </div>
  )
}

export default StocktakingManagement