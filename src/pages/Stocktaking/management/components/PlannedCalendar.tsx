import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  day: number; // 0-6 for Monday-Sunday
  type: 'purple' | 'blue' | 'green';
}

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Client Presentation Preparation',
    startTime: '8:00',
    endTime: '9:00',
    day: 0,
    type: 'purple'
  },
  {
    id: '2',
    title: 'Client Meeting Planning',
    startTime: '8:45',
    endTime: '10:00',
    day: 0,
    type: 'blue'
  },
  {
    id: '3',
    title: 'New Project Kickoff Meeting',
    startTime: '8:00',
    endTime: '9:00',
    day: 1,
    type: 'blue'
  },
  {
    id: '4',
    title: 'Design Reviews',
    startTime: '9:00',
    endTime: '10:00',
    day: 1,
    type: 'purple'
  },
  // Add more events as needed
]

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const timeSlots = Array.from({ length: 6 }, (_, i) => {
  const hour = 8 + i
  return `${hour}:00`
})

export default function WeeklyCalendar() {
  const [currentDate] = useState(new Date(2024, 5, 24)) // June 24, 2024

  const getEventStyle = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'purple':
        return 'bg-purple-100 border-purple-200'
      case 'blue':
        return 'bg-blue-100 border-blue-200'
      case 'green':
        return 'bg-green-100 border-green-200'
      default:
        return 'bg-gray-100 border-gray-200'
    }
  }

  const getEventPosition = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number)
    const topPosition = ((hours - 8) * 60 + minutes) * 1.5 // 1.5px per minute
    return `${topPosition}px`
  }

  const getEventHeight = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number)
    const [endHours, endMinutes] = endTime.split(':').map(Number)
    const duration = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes)
    return `${duration * 1.5}px` // 1.5px per minute
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">June 2024</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Day</Button>
            <Button variant="secondary" size="sm">Week</Button>
            <Button variant="outline" size="sm">Month</Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline">Today</Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-[1px] bg-gray-200">
        {/* Time slots */}
        <div className="bg-white">
          <div className="h-12" /> {/* Header spacer */}
          {timeSlots.map((time) => (
            <div
              key={time}
              className="h-[90px] text-xs text-gray-500 -mt-2 pr-2 text-right"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Days */}
        {weekDays.map((day, index) => (
          <div key={day} className="relative bg-white">
            <div className="h-12 border-b p-2 text-sm font-medium">
              <div>{day}</div>
              <div className="text-xs text-gray-500">
                {new Date(currentDate.getTime() + index * 24 * 60 * 60 * 1000).getDate()}
              </div>
            </div>
            <div className="h-[540px]"> {/* 6 hours * 90px */}
              {timeSlots.map((time) => (
                <div key={time} className="h-[90px] border-b border-gray-100" />
              ))}
            </div>
          </div>
        ))}

        {/* Events */}
        {events.map((event) => (
          <div
            key={event.id}
            className={cn(
              "absolute rounded-lg border p-2 text-sm",
              getEventStyle(event.type)
            )}
            style={{
              top: `calc(48px + ${getEventPosition(event.startTime)})`,
              height: getEventHeight(event.startTime, event.endTime),
              left: `calc(${(event.day + 1) * 100}% + 8px)`,
              right: '8px',
            }}
          >
            <div className="font-medium">{event.title}</div>
            <div className="text-xs text-gray-500">
              {event.startTime} - {event.endTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}