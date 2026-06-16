import { useState } from 'react'
import { flights } from '../data/flights'

function FlightCard({ flight }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`flight-card-full ${open ? 'is-open' : ''}`}>
      <button className="flight-card-header" onClick={() => setOpen(o => !o)}>
        <div className="flight-route-block">
          <span className="fcode">{flight.from.code}</span>
          <span className="flight-arrow">→</span>
          <span className="fcode">{flight.to.code}</span>
        </div>
        <div className="flight-meta-block">
          <span className="flight-number">{flight.flight}</span>
          <span className="flight-date-summary">{flight.departs.split(' ').slice(0,3).join(' ')}</span>
        </div>
        <span className="accordion-chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="flight-detail">
          <div className="flight-times">
            <div className="flight-time-block">
              <div className="ft-code">{flight.from.code}</div>
              <div className="ft-time">{flight.departs.split(' ').slice(-1)[0]}</div>
              <div className="ft-date">{flight.departs.split(' ').slice(0,-1).join(' ')}</div>
              <div className="ft-terminal">Terminal {flight.from.terminal}</div>
            </div>
            <div className="flight-duration-block">
              <div className="ft-duration">{flight.duration}</div>
              <div className="ft-line">──────────✈</div>
              <div className="ft-aircraft">{flight.aircraft}</div>
            </div>
            <div className="flight-time-block right">
              <div className="ft-code">{flight.to.code}</div>
              <div className="ft-time">{flight.arrives.split(' ').slice(-1)[0]}</div>
              <div className="ft-date">{flight.arrives.split(' ').slice(0,-1).join(' ')}</div>
              <div className="ft-terminal">Terminal {flight.to.terminal}</div>
              {flight.arrivalNote && <div className="ft-note">{flight.arrivalNote}</div>}
            </div>
          </div>

          <div className="flight-info-row">
            <div className="fi-item"><span className="fi-label">Class</span><span>{flight.class}</span></div>
            <div className="fi-item"><span className="fi-label">Baggage</span><span>{flight.baggage}</span></div>
          </div>

          <div className="flight-passengers">
            <div className="fp-label">Passengers</div>
            <div className="fp-grid">
              {flight.passengers.map((p, i) => (
                <div key={i} className={`fp-row ${p.seat === 'TBD' ? 'fp-missing' : ''}`}>
                  <span className="fp-name">{p.name}</span>
                  <span className="fp-seat">Seat {p.seat}</span>
                  <span className="fp-ref">Ref: {p.ref}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function FlightsSection() {
  return (
    <section id="flights" className="flights-section">
      <div className="city-header">
        <div className="city-emoji">✈️</div>
        <div className="city-header-text">
          <h2 className="city-name">Flights</h2>
          <p className="city-dates">Korean Air · All passengers</p>
        </div>
      </div>
      <div className="flights-list">
        {flights.map(f => <FlightCard key={f.id} flight={f} />)}
      </div>
    </section>
  )
}
