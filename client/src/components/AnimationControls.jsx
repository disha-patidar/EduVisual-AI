import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";

function AnimationControls({
  step,
  totalSteps,
  playing,
  setPlaying,
  setStep,
}) {
  const previous = () => {
    setStep((current) => Math.max(0, current - 1));
  };

  const next = () => {
    setStep((current) =>
      Math.min(totalSteps - 1, current + 1)
    );
  };

  const restart = () => {
    setStep(0);
    setPlaying(true);
  };

  const progress =
    totalSteps > 0
      ? ((step + 1) / totalSteps) * 100
      : 0;

  return (
    <div className="animation-controls">

      <button
        className="control-btn"
        onClick={restart}
        title="Restart"
      >
        <RotateCcw size={18} />
      </button>

      <button
        className="control-btn"
        onClick={previous}
        disabled={step === 0}
        title="Previous"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        className="control-btn play-btn"
        onClick={() => setPlaying(!playing)}
        title={playing ? "Pause" : "Play"}
      >
        {playing ? (
          <Pause size={19} />
        ) : (
          <Play size={19} />
        )}
      </button>

      <button
        className="control-btn"
        onClick={next}
        disabled={step === totalSteps - 1}
        title="Next"
      >
        <ChevronRight size={20} />
      </button>

      <div className="progress-container">

        <div className="progress-top">
          <span>
            Step {step + 1} / {totalSteps}
          </span>

          <span>
            {Math.round(progress)}%
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default AnimationControls;