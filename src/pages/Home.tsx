// import React, {
//   useEffect,
//   useState,
//   useRef,
//   forwardRef,
//   useImperativeHandle,
// } from 'react'
// import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { Layout } from 'components'
import { useQuery } from '@tanstack/react-query'
import { CalendarEvent } from 'types/types'
import { api } from 'utils/axios'

export const getCalendarEvents = async () => {
  const { data } = await api.get<CalendarEvent[]>('/api/calendar_event')
  return data
}

const Home = () => {
  const { data: calendarEvents } = useQuery(
    ['calendarEvents'],
    getCalendarEvents,
  )
  console.log(calendarEvents)
  return (
    <Layout>
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="demo-app-main">
        <FullCalendar
          // ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay,listWeek',
          }}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short',
          }}
          allDayText="終日"
          initialView="timeGridWeek"
          locale="ja"
          editable={true}
          selectable={true}
          dayMaxEvents={true}
          nowIndicator={true}
          initialEvents={calendarEvents} // alternatively, use the events setting to fetch from a feed
          // select={handleDateSelect}
          // eventContent={renderEventContent} // custom render function
          // eventClick={handleEventClick}
          // // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          // eventDrop={handleEventDrop}
          // eventDragStart={handleEventDragStart}
          // eventResize={handleEventResize}
        />
      </div>
    </Layout>
  )
}

export default Home
