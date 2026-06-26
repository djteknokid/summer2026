import { useState } from 'react'

const typeConfig = {
  flight:    { icon: '✈️', className: 'item-flight' },
  hotel:     { icon: '🏨', className: 'item-hotel' },
  transport: { icon: '🚃', className: 'item-transport' },
  activity:  { icon: '📍', className: 'item-activity' },
  note:      { icon: '·',  className: 'item-note' },
}

function TripItem({ item }) {
  const config = typeConfig[item.type] || typeConfig.note
  return (
    <div className={`trip-item ${config.className}`}>
      <span className="item-icon">{config.icon}</span>
      <div className="item-body">
        {item.time && <span className="item-time">{item.time}</span>}
        {item.map
          ? <a className="item-text item-map-link" href={item.map} target="_blank" rel="noopener noreferrer">{item.text} 📍</a>
          : <span className="item-text">{item.text}</span>
        }
        {item.detail && <span className="item-detail">{item.detail}</span>}
      </div>
    </div>
  )
}

export default function DayCard({ day, weather, weatherLabel }) {
  const hasItems = day.items.length > 0
  const [open, setOpen] = useState(false)

  return (
    <div className={`day-card ${open ? 'is-open' : ''}`}>
      <button
        className="day-header"
        onClick={() => hasItems && setOpen(o => !o)}
        style={{ cursor: hasItems ? 'pointer' : 'default' }}
        aria-expanded={open}
      >
        <span className="day-date">{day.date}</span>
        <span className="day-label">{day.label}</span>
        {weather && (
          <span className="day-weather">
            <span className="day-weather-label">{weatherLabel}</span>
            <span className="day-weather-icon">{weather.icon}</span>
            <span className="day-weather-temp">{weather.high}°/{weather.low}°</span>
          </span>
        )}
        <span className="day-chevron">
          {hasItems ? (open ? '▲' : '▼') : ''}
        </span>
      </button>

      {open && hasItems && (
        <div className="day-items">
          {day.items.map((item, i) => (
            <TripItem key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
