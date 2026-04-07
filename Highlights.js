function Highlights({ summary, cards }) {
  return (
    <section className="section-block section-wide">
      <div className="section-head">
        <p className="label">Overview</p>
        <h3>Viraj at a Glance</h3>
      </div>
      <p className="summary-text">{summary}</p>
      <div className="highlight-grid">
        {cards.map(card => (
          <article key={card.title} className="highlight-card">
            <h4>{card.title}</h4>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Highlights;
