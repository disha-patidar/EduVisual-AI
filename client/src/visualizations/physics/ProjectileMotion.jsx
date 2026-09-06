import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

const stages = [
  {
    title: "Launch",
    subtitle: "The projectile starts with an initial velocity.",
    explanation:
      "A projectile is launched with an initial velocity at an angle to the horizontal. That velocity can be separated into horizontal and vertical components."
  },
  {
    title: "Vertical Motion",
    subtitle: "Gravity continuously pulls the projectile downward.",
    explanation:
      "Gravity produces a constant downward acceleration of approximately 9.8 m/s². The upward vertical velocity decreases as the projectile rises."
  },
  {
    title: "Maximum Height",
    subtitle: "Vertical velocity becomes zero at the highest point.",
    explanation:
      "At the top of the trajectory, the vertical component of velocity becomes zero momentarily. Gravity is still acting, so the projectile then begins to descend."
  },
  {
    title: "Horizontal Motion",
    subtitle: "The projectile continues moving forward.",
    explanation:
      "Ignoring air resistance, horizontal velocity remains constant because there is no horizontal acceleration."
  },
  {
    title: "Landing",
    subtitle: "The projectile returns to the launch height.",
    explanation:
      "The projectile follows a curved, parabolic trajectory and lands when it returns to the same vertical level from which it was launched."
  }
];

function ProjectileMotion({ step = 0, playing = false }) {
  const current = Math.min(step, stages.length - 1);

  const showVertical =
    current >= 1;

  const showPeak =
    current >= 2;

  const showHorizontal =
    current >= 3;

  const showLanding =
    current >= 4;

  return (
    <VisualizationShell
      title="Projectile Motion"
      subtitle="See how velocity, angle and gravity determine a projectile's path."
    >
      <div className="projectile-visualization">

        {/* ================= SCENE ================= */}

        <div className="projectile-scene">

          <div className="projectile-stage-label">
            {current === 0 && "LAUNCH"}
            {current === 1 && "GRAVITY ACTS DOWNWARD"}
            {current === 2 && "MAXIMUM HEIGHT"}
            {current === 3 && "HORIZONTAL MOTION"}
            {current === 4 && "PROJECTILE LANDS"}
          </div>

          {/* SKY */}

          <div className="projectile-sky">
            <div className="sun">
              ☀
            </div>

            <div className="cloud cloud-one" />
            <div className="cloud cloud-two" />
          </div>

          {/* GROUND */}

          <div className="projectile-ground">
            <div className="ground-surface" />

            <div className="ground-label">
              x — horizontal distance
            </div>
          </div>

          {/* LAUNCH PLATFORM */}

          <div className="launch-platform">

            <div className="launcher">
              <div className="launcher-barrel" />
              <div className="launcher-base" />
            </div>

            <span>
              Launch point
            </span>

          </div>

          {/* TRAJECTORY */}

          <svg
            className="trajectory"
            viewBox="0 0 900 420"
            preserveAspectRatio="none"
          >

            <path
              d="M 120 335 Q 450 30 780 335"
              className="trajectory-path"
            />

            <path
              d="M 120 335 Q 450 30 780 335"
              className={`trajectory-progress ${
                current >= 1 ? "visible" : ""
              }`}
            />

          </svg>

          {/* PROJECTILE */}

          <motion.div
            className="projectile-ball"

            animate={
              playing
                ? {
                    left:
                      current === 0
                        ? ["12%", "20%"]
                        : current === 1
                        ? ["20%", "42%"]
                        : current === 2
                        ? ["42%", "50%"]
                        : current === 3
                        ? ["50%", "70%"]
                        : ["70%", "83%"],

                    top:
                      current === 0
                        ? ["78%", "65%"]
                        : current === 1
                        ? ["65%", "25%"]
                        : current === 2
                        ? ["25%", "18%"]
                        : current === 3
                        ? ["18%", "42%"]
                        : ["42%", "78%"]
                  }
                : {}
            }

            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            🏀
          </motion.div>

          {/* LAUNCH VELOCITY */}

          {current === 0 && (
            <motion.div
              className="velocity-vector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="velocity-line" />
              <div className="velocity-head">
                ▶
              </div>

              <span>
                v₀
              </span>
            </motion.div>
          )}

          {/* VELOCITY COMPONENTS */}

          {showVertical && (
            <>
              <motion.div
                className="vertical-vector"
                initial={{
                  opacity: 0,
                  scaleY: 0
                }}
                animate={{
                  opacity: 1,
                  scaleY: 1
                }}
              />

              <div className="vertical-label">
                vᵧ
              </div>
            </>
          )}

          {showHorizontal && (
            <>
              <motion.div
                className="horizontal-vector"
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
              />

              <div className="horizontal-label">
                vₓ = constant
              </div>
            </>
          )}

          {/* GRAVITY */}

          {showVertical && (
            <motion.div
              className="gravity-arrow"
              initial={{
                opacity: 0,
                y: -15
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
            >
              <span>↓</span>
              <strong>g = 9.8 m/s²</strong>
            </motion.div>
          )}

          {/* MAX HEIGHT */}

          {showPeak && (
            <motion.div
              className="max-height-marker"
              initial={{
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
            >
              <div className="height-line" />

              <span>
                Hₘₐₓ
              </span>

              <small>
                Maximum height
              </small>
            </motion.div>
          )}

          {/* RANGE */}

          {showLanding && (
            <motion.div
              className="range-marker"
              initial={{
                opacity: 0,
                scaleX: 0
              }}
              animate={{
                opacity: 1,
                scaleX: 1
              }}
            >
              <div className="range-line" />

              <span>
                R — Range
              </span>
            </motion.div>
          )}

          {/* FLIGHT TIME */}

          {showLanding && (
            <motion.div
              className="flight-time"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ⏱ T = Flight Time
            </motion.div>
          )}

        </div>

        {/* ================= INFORMATION ================= */}

        <div className="projectile-info">

          <div className="projectile-step">
            STEP {current + 1} / {stages.length}
          </div>

          <h2>
            {stages[current].title}
          </h2>

          <p className="projectile-subtitle">
            {stages[current].subtitle}
          </p>

          <div className="projectile-explanation">

            <div className="projectile-icon">
              {current === 0 && "🚀"}
              {current === 1 && "⬇️"}
              {current === 2 && "🔝"}
              {current === 3 && "➡️"}
              {current === 4 && "🎯"}
            </div>

            <div>

              <strong>
                What's happening?
              </strong>

              <p>
                {stages[current].explanation}
              </p>

            </div>

          </div>

          {/* PROCESS */}

          <div className="projectile-process">

            {stages.map((stage, index) => (

              <div
                key={stage.title}
                className={`projectile-process-step ${
                  index === current
                    ? "active"
                    : ""
                } ${
                  index < current
                    ? "completed"
                    : ""
                }`}
              >

                <div className="projectile-process-dot">

                  {index < current
                    ? "✓"
                    : index + 1}

                </div>

                <span>
                  {index === 0 && "Launch"}
                  {index === 1 && "Gravity"}
                  {index === 2 && "Peak"}
                  {index === 3 && "Motion"}
                  {index === 4 && "Landing"}
                </span>

              </div>

            ))}

          </div>

          {/* FORMULAS */}

          <div className="projectile-formulas">

            <div className="projectile-formula">

              <span>
                HORIZONTAL VELOCITY
              </span>

              <strong>
                vₓ = v₀ cos θ
              </strong>

            </div>

            <div className="projectile-formula">

              <span>
                VERTICAL VELOCITY
              </span>

              <strong>
                vᵧ = v₀ sin θ
              </strong>

            </div>

            <div className="projectile-formula">

              <span>
                ACCELERATION
              </span>

              <strong>
                aᵧ = −g
              </strong>

            </div>

          </div>

          {/* KEY CONCEPTS */}

          <div className="projectile-concepts">

            <div className="projectile-concept">

              <strong>
                🎯 Range
              </strong>

              <p>
                Horizontal distance travelled by
                the projectile.
              </p>

            </div>

            <div className="projectile-concept">

              <strong>
                🔝 Maximum Height
              </strong>

              <p>
                Highest vertical position reached.
              </p>

            </div>

            <div className="projectile-concept">

              <strong>
                ⏱ Flight Time
              </strong>

              <p>
                Total time the projectile remains
                in the air.
              </p>

            </div>

          </div>

        </div>

      </div>
      <style>
        {
          `.projectile-visualization {
  width: 100%;
}

.projectile-scene {
  position: relative;
  height: 470px;
  overflow: hidden;
  border-radius: 22px;
  background:
    linear-gradient(
      to bottom,
      #101a2b 0%,
      #18263b 65%,
      #202d32 100%
    );
  border: 1px solid rgba(255,255,255,0.08);
}

/* LABEL */

.projectile-stage-label {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;

  padding: 8px 16px;
  border-radius: 20px;

  background: rgba(255,255,255,0.07);

  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.4px;
}

/* SKY */

.projectile-sky {
  position: absolute;
  inset: 0;
}

.sun {
  position: absolute;
  top: 55px;
  right: 12%;
  font-size: 45px;
  opacity: 0.85;
}

.cloud {
  position: absolute;
  width: 100px;
  height: 30px;
  border-radius: 30px;
  background: rgba(255,255,255,0.06);
}

.cloud::before,
.cloud::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: inherit;
}

.cloud::before {
  width: 45px;
  height: 45px;
  left: 15px;
  top: -20px;
}

.cloud::after {
  width: 55px;
  height: 55px;
  right: 10px;
  top: -28px;
}

.cloud-one {
  top: 105px;
  left: 10%;
}

.cloud-two {
  top: 160px;
  right: 20%;
  transform: scale(0.7);
}

/* GROUND */

.projectile-ground {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 65px;
  height: 3px;
}

.ground-surface {
  width: 100%;
  height: 3px;
  background: rgba(255,255,255,0.22);
}

.ground-label {
  position: absolute;
  right: 0;
  top: 10px;
  font-size: 9px;
  opacity: 0.4;
}

/* LAUNCHER */

.launch-platform {
  position: absolute;
  left: 10%;
  bottom: 68px;
  z-index: 15;
}

.launcher {
  position: relative;
  width: 70px;
  height: 50px;
}

.launcher-base {
  position: absolute;
  left: 5px;
  bottom: 0;
  width: 60px;
  height: 15px;
  border-radius: 5px;
  background: #657483;
}

.launcher-barrel {
  position: absolute;
  left: 30px;
  bottom: 12px;
  width: 45px;
  height: 12px;
  border-radius: 5px;
  background: #91a1af;
  transform: rotate(-28deg);
  transform-origin: left center;
}

.launch-platform > span {
  display: block;
  margin-top: 5px;
  font-size: 9px;
  opacity: 0.45;
}

/* TRAJECTORY */

.trajectory {
  position: absolute;
  inset: 30px 0 50px;
  width: 100%;
  height: calc(100% - 80px);
  z-index: 4;
}

.trajectory-path {
  fill: none;
  stroke: rgba(255,255,255,0.13);
  stroke-width: 3;
  stroke-dasharray: 8 8;
}

.trajectory-progress {
  fill: none;
  stroke: rgba(255,255,255,0.5);
  stroke-width: 4;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transition: stroke-dashoffset 1s ease;
}

.trajectory-progress.visible {
  stroke-dashoffset: 0;
}

/* BALL */

.projectile-ball {
  position: absolute;
  z-index: 25;

  left: 12%;
  top: 78%;

  font-size: 30px;

  transform: translate(-50%, -50%);
}

/* VELOCITY */

.velocity-vector {
  position: absolute;
  left: 13%;
  bottom: 175px;

  display: flex;
  align-items: center;

  z-index: 20;
}

.velocity-line {
  width: 90px;
  height: 4px;
  background: rgba(255,255,255,0.7);
}

.velocity-head {
  font-size: 15px;
}

.velocity-vector span {
  margin-left: 8px;
  font-size: 16px;
  font-weight: 800;
}

/* VERTICAL VELOCITY */

.vertical-vector {
  position: absolute;

  left: 48%;
  top: 115px;

  width: 3px;
  height: 130px;

  background: rgba(255,255,255,0.4);

  transform-origin: bottom;
}

.vertical-label {
  position: absolute;
  left: 50%;
  top: 170px;
  font-size: 13px;
  font-weight: 800;
}

/* HORIZONTAL VELOCITY */

.horizontal-vector {
  position: absolute;

  left: 48%;
  top: 280px;

  width: 130px;
  height: 3px;

  background: rgba(255,255,255,0.4);
}

.horizontal-label {
  position: absolute;
  left: 53%;
  top: 290px;

  font-size: 11px;
  font-weight: 700;
  opacity: 0.7;
}

/* GRAVITY */

.gravity-arrow {
  position: absolute;
  right: 25%;
  top: 205px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  font-size: 26px;
}

.gravity-arrow strong {
  font-size: 10px;
  white-space: nowrap;
  opacity: 0.65;
}

/* MAX HEIGHT */

.max-height-marker {
  position: absolute;
  left: 49%;
  top: 75px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.height-line {
  width: 90px;
  height: 2px;
  border-top: 2px dashed rgba(255,255,255,0.4);
}

.max-height-marker span {
  margin-top: 6px;
  font-size: 14px;
  font-weight: 900;
}

.max-height-marker small {
  margin-top: 4px;
  font-size: 9px;
  opacity: 0.5;
}

/* RANGE */

.range-marker {
  position: absolute;
  left: 12%;
  right: 15%;
  bottom: 42px;

  transform-origin: left;
}

.range-line {
  width: 100%;
  height: 2px;
  border-top: 2px dashed rgba(255,255,255,0.3);
}

.range-marker span {
  display: block;
  margin-top: 4px;
  text-align: center;
  font-size: 10px;
  opacity: 0.6;
}

/* FLIGHT TIME */

.flight-time {
  position: absolute;
  right: 10%;
  bottom: 95px;

  padding: 8px 12px;

  border-radius: 10px;
  background: rgba(255,255,255,0.06);

  font-size: 10px;
}

/* INFORMATION */

.projectile-info {
  padding: 25px 5px 5px;
}

.projectile-step {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  opacity: 0.5;
}

.projectile-info h2 {
  margin: 7px 0;
  font-size: 28px;
}

.projectile-subtitle {
  margin: 0 0 20px;
  opacity: 0.65;
}

.projectile-explanation {
  display: flex;
  gap: 15px;

  padding: 18px;

  border-radius: 16px;

  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
}

.projectile-icon {
  font-size: 28px;
}

.projectile-explanation strong {
  font-size: 14px;
}

.projectile-explanation p {
  margin: 6px 0 0;
  line-height: 1.6;
  opacity: 0.7;
}

/* PROCESS */

.projectile-process {
  display: flex;
  justify-content: space-between;
  gap: 8px;

  margin-top: 25px;
}

.projectile-process-step {
  flex: 1;
  text-align: center;
  opacity: 0.35;
}

.projectile-process-step.active {
  opacity: 1;
}

.projectile-process-step.completed {
  opacity: 0.7;
}

.projectile-process-dot {
  width: 30px;
  height: 30px;

  margin: auto;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255,255,255,0.07);

  font-size: 11px;
  font-weight: 800;
}

.projectile-process-step.active
.projectile-process-dot {
  transform: scale(1.15);
  background: rgba(255,255,255,0.18);
}

.projectile-process-step span {
  display: block;
  margin-top: 7px;
  font-size: 9px;
}

/* FORMULAS */

.projectile-formulas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  margin-top: 25px;
}

.projectile-formula {
  padding: 17px;

  border-radius: 14px;

  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);

  text-align: center;
}

.projectile-formula span {
  display: block;
  font-size: 8px;
  letter-spacing: 1px;
  opacity: 0.45;
}

.projectile-formula strong {
  display: block;
  margin-top: 8px;
  font-size: 19px;
}

/* CONCEPTS */

.projectile-concepts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  margin-top: 15px;
}

.projectile-concept {
  padding: 16px;

  border-radius: 14px;

  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
}

.projectile-concept strong {
  font-size: 13px;
}

.projectile-concept p {
  margin: 7px 0 0;

  font-size: 10px;
  line-height: 1.5;
  opacity: 0.6;
}

@media (max-width: 800px) {
  .projectile-formulas,
  .projectile-concepts {
    grid-template-columns: 1fr;
  }

  .projectile-process-step span {
    font-size: 8px;
  }

  .projectile-scene {
    height: 400px;
  }
}`
        }
      </style>
    </VisualizationShell>
  );
}

export default ProjectileMotion;