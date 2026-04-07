function Projects({ projects }) {
  return (
    <section className="section-block section-wide">
      <div className="section-head">
        <p className="label">Projects</p>
        <h3>Practice Work</h3>
      </div>
      <div className="project-list">
        {projects.map(project => (
          <article key={project.title} className="project-row">
            <div>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
            </div>
            <p className="project-detail">{project.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
