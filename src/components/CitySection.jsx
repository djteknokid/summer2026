import { useState } from 'react'
import DayCard from './DayCard'
import EArrivalCards from './EArrivalCards'

// "Jul 1 (Wed)" → "Jul 1"
function shortDate(dateStr) {
  return dateStr.replace(/\s*\(.*\)/, '').trim()
}

export default function CitySection({ city, weather }) {
  const [todoOpen, setTodoOpen] = useState(false)

  return (
    <section id={city.id} className="city-section">
      <div className="city-header">
        <div className="city-emoji">{city.emoji}</div>
        <div className="city-header-text">
          <h2 className="city-name">
            {city.name}
            {city.subtitle && <span className="city-subtitle"> — {city.subtitle}</span>}
          </h2>
          <p className="city-dates">{city.dates}</p>
        </div>
      </div>

      {city.hotel && (
        <div className="hotel-card">
          <span className="hotel-icon">🏨</span>
          <div>
          <div className="hotel-name">
              {city.hotel.map
                ? <a href={city.hotel.map} target="_blank" rel="noopener noreferrer">{city.hotel.name} 📍</a>
                : city.hotel.name}
            </div>
            {city.hotel.address && <div className="hotel-detail">{city.hotel.address}</div>}
            <div className="hotel-detail">{city.hotel.nights}</div>
            {city.hotel.confirmation && (
              <div className="hotel-detail">Confirmation: {city.hotel.confirmation}</div>
            )}
          </div>
        </div>
      )}

      {city.booking && (
        <div className="hotel-card">
          <span className="hotel-icon">🚢</span>
          <div>
            <div className="hotel-name">{city.booking.ship} · Cabin {city.booking.cabin}</div>
            <div className="hotel-detail">{city.booking.line}</div>
            <div className="hotel-detail">Booking: {city.booking.bookingNumber}</div>
          </div>
        </div>
      )}

      {city.eArrivalCards && <EArrivalCards cards={city.eArrivalCards} />}

      <div className="days-list">
        {city.days.map((day, i) => (
          <DayCard key={i} day={day} weather={weather?.[shortDate(day.date)]} weatherLabel={city.name} />
        ))}
      </div>

      {city.todoList && (
        <div className="todo-block">
          <button className="todo-toggle" onClick={() => setTodoOpen(o => !o)}>
            <span>Tokyo To-Do List</span>
            <span className="todo-chevron">{todoOpen ? '▲' : '▼'}</span>
          </button>
          {todoOpen && (
            <ul className="todo-list">
              {city.todoList.map((item, i) => (
                <li key={i}>
                  {item.map
                    ? <a href={item.map} target="_blank" rel="noopener noreferrer">{item.text} 📍</a>
                    : item.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}
