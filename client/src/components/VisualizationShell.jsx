function VisualizationShell({
  title,
  subtitle,
  children
}) {

  return (

    <div className="visual-shell">

      <div className="visual-top">

        <div>

          <span className="live-dot" />

          Interactive simulation

        </div>

        <span className="visual-badge">
          2D visualization
        </span>

      </div>

      <div className="visual-title">

        <h2>
          {title}
        </h2>

        <p>
          {subtitle}
        </p>

      </div>

      <div className="visual-stage">

        {children}

      </div>

    </div>
  );
}

export default VisualizationShell;