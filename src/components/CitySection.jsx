import { useState } from 'react'
import DayCard from './DayCard'

export default function CitySection({ city }) {
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
            <div className="hotel-name">{city.hotel.name}</div>
            {city.hotel.address && <div className="hotel-detail">{city.hotel.address}</div>}
            <div className="hotel-detail">{city.hotel.nights}</div>
            {city.hotel.confirmation && (
              <div className="hotel-detail">Confirmation: {city.hotel.confirmation}</div>
            )}
          </div>
        </div>
      )}

      <div className="days-list">
        {city.days.map((day, i) => (
          <DayCard key={i} day={day} />
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
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}
