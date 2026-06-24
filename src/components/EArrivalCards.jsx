export default function EArrivalCards({ cards }) {
  return (
    <div className="earrival-block">
      <div className="earrival-header">
        <span className="earrival-title">🛂 e-Arrival Cards</span>
        <span className="earrival-subtitle">Korea Immigration · KE024</span>
      </div>
      <div className="earrival-grid">
        {cards.map((card, i) => (
          <div key={i} className={`earrival-card ${card.status}`}>
            <div className="earrival-card-top">
              <span className="earrival-name">{card.name}</span>
              <span className={`earrival-badge ${card.status}`}>
                {card.status === 'confirmed' ? '✓ Done' : 'Pending'}
              </span>
            </div>
            {card.status === 'confirmed' ? (
              <div className="earrival-details">
                <div className="earrival-row">
                  <span className="earrival-label">Issue No</span>
                  <span className="earrival-value mono">{card.issueNo}</span>
                </div>
                <div className="earrival-row">
                  <span className="earrival-label">Arrival</span>
                  <span className="earrival-value">{card.arrival} · {card.flight}</span>
                </div>
                <div className="earrival-row">
                  <span className="earrival-label">Expires</span>
                  <span className="earrival-value">{card.expires}</span>
                </div>
              </div>
            ) : (
              <div className="earrival-pending-msg">Not yet submitted</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
