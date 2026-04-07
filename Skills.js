function Skills({ skills }) {
  return (
    <section className="section-block">
      <div className="section-head">
        <p className="label">Skills</p>
        <h3>Technical Toolkit</h3>
      </div>
      <div className="skills-grid">
        {skills.map(skill => (
          <div key={skill} className="skill-card">
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
