function Hero({ name, title, intro, stats }) {
  return (
    <header className="hero">
      <div className="hero-panel hero-copy">
        <p className="label">Student Portfolio</p>
        <h1>{name}</h1>
        <h2>{title}</h2>
        <p className="intro">{intro}</p>
      </div>
      <div className="hero-panel stats-panel">
        {stats.map(stat => (
          <div key={stat.label} className="stat-item">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>
    </header>
  );
}

export default Hero;
