import { cities } from './data/itinerary'
import CitySection from './components/CitySection'
import FlightsSection from './components/FlightsSection'
import useWeather from './hooks/useWeather'
import './App.css'

export default function App() {
  const weather = useWeather()

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <div className="route">SFO → ICN → KIX → KYO → TYO → ICN → SFO</div>
          <h1>Summer 2026</h1>
          <p className="header-sub">Jun 26 – Jul 19</p>
        </div>
      </header>

      <nav className="city-nav">
        <a href="#flights" className="city-nav-item">
          <span className="city-nav-emoji">✈️</span>
          <span className="city-nav-name">Flights</span>
        </a>
        {cities.map(city => (
          <a key={city.id} href={`#${city.id}`} className="city-nav-item">
            <span className="city-nav-emoji">{city.emoji}</span>
            <span className="city-nav-name">{city.name}</span>
          </a>
        ))}
      </nav>

      <main>
        <FlightsSection />
        {cities.map(city => (
          <CitySection key={city.id} city={city} weather={weather[city.id]} />
        ))}
      </main>

      <footer className="site-footer">
        <p>✈️ Korean Air &nbsp;·&nbsp; 🏨 Expedia &nbsp;·&nbsp; Jun 26 – Jul 19, 2026</p>
      </footer>
    </div>
  )
}
