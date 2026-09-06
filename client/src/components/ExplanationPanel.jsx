function ExplanationPanel({ lesson, step }) {
  if (!lesson || !lesson.steps || lesson.steps.length === 0) {
    return (
      <div className="explanation-card">
        <h3>No explanation available</h3>
        <p>Generate a lesson to see the explanation.</p>
      </div>
    );
  }

  const currentStep = lesson.steps[step];

  return (
    <div className="explanation-card">
      <div className="step-number">
        Step {step + 1} of {lesson.steps.length}
      </div>

      <h3>{currentStep.title}</h3>

      <p>{currentStep.description}</p>

      {currentStep.formula && (
        <div className="formula-box">
          {currentStep.formula}
        </div>
      )}
    </div>
  );
}

export default ExplanationPanel;