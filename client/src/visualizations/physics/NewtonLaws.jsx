import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

const stages = [
  {
    title: "First Law — Inertia",
    subtitle: "An object resists a change in its state of motion.",
    explanation:
      "A stationary object stays at rest and a moving object keeps moving at constant velocity unless an external net force acts on it."
  },
  {
    title: "Force Changes Motion",
    subtitle: "A net force causes an object to accelerate.",
    explanation:
      "When an unbalanced force acts on the object, its velocity changes. The greater the net force, the greater the acceleration."
  },
  {
    title: "Second Law — F = ma",
    subtitle: "Acceleration depends on force and mass.",
    explanation:
      "Newton's Second Law states that force equals mass multiplied by acceleration. For the same mass, doubling the force doubles the acceleration."
  },
  {
    title: "Third Law — Action & Reaction",
    subtitle: "Forces always occur in equal and opposite pairs.",
    explanation:
      "When one object pushes another object, the second object pushes back with an equal force in the opposite direction."
  },
  {
    title: "Newton's Laws Together",
    subtitle: "Force explains why objects change their motion.",
    explanation:
      "Inertia describes resistance to change, F = ma describes how force changes motion, and the Third Law explains the paired forces between interacting objects."
  }
];

function ForceArrow({ direction = "right", label = "F", active = false }) {
  return (
    <motion.div
      className={`force-arrow ${direction} ${
        active ? "force-active" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
    >
      <span className="force-line" />
      <span className="force-head">▶</span>
      <strong>{label}</strong>
    </motion.div>
  );
}

function NewtonLaws({ step = 0, playing = false }) {
  const current = Math.min(step, stages.length - 1);

  const firstLaw = current === 0;
  const secondLaw = current === 1 || current === 2;
  const thirdLaw = current === 3;
  const allLaws = current === 4;

  return (
    <VisualizationShell
      title="Newton's Laws of Motion"
      subtitle="See how force, mass and acceleration control motion."
    >
      <div className="newton-visualization">

        {/* ================= MAIN SCENE ================= */}

        <div className="newton-scene">

          {/* GROUND */}
          <div className="newton-ground">
            <div className="ground-line" />
          </div>

          {/* TITLE */}
          <div className="newton-scene-label">
            {firstLaw && "LAW 1 • INERTIA"}
            {secondLaw && "LAW 2 • FORCE = MASS × ACCELERATION"}
            {thirdLaw && "LAW 3 • ACTION ↔ REACTION"}
            {allLaws && "ALL THREE LAWS"}
          </div>

          {/* ================= FIRST LAW ================= */}

          {firstLaw && (
            <div className="law-one-scene">

              <motion.div
                className="inertia-object"
                animate={
                  playing
                    ? {
                        x: [0, 90, 0]
                      }
                    : {}
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="physics-box">M</div>
              </motion.div>

              <div className="motion-trail">
                <span />
                <span />
                <span />
              </div>

              <div className="inertia-label">
                No net force
              </div>

              <div className="inertia-equation">
                <strong>ΣF = 0</strong>
                <span>→ constant velocity</span>
              </div>

            </div>
          )}

          {/* ================= SECOND LAW ================= */}

          {secondLaw && (
            <div className="law-two-scene">

              <div className="mass-control">

                <div className="mass-card">
                  <span>MASS</span>
                  <strong>10 kg</strong>
                </div>

                <div className="force-card">
                  <span>FORCE</span>
                  <strong>
                    {current === 1 ? "20 N" : "40 N"}
                  </strong>
                </div>

                <div className="acceleration-card">
                  <span>ACCELERATION</span>
                  <strong>
                    {current === 1 ? "2 m/s²" : "4 m/s²"}
                  </strong>
                </div>

              </div>

              <div className="second-law-track">

                <motion.div
                  className="second-law-object"
                  animate={
                    playing
                      ? {
                          x: current === 1
                            ? [0, 170, 0]
                            : [0, 300, 0]
                        }
                      : {
                          x: current === 1 ? 70 : 120
                        }
                  }
                  transition={{
                    duration: current === 1 ? 3 : 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="physics-box">
                    10 kg
                  </div>
                </motion.div>

                <ForceArrow
                  direction="right"
                  label={
                    current === 1
                      ? "20 N"
                      : "40 N"
                  }
                  active
                />

              </div>

              <div className="second-equation">
                <strong>F = m × a</strong>

                <span>
                  {current === 1
                    ? "20 N = 10 kg × 2 m/s²"
                    : "40 N = 10 kg × 4 m/s²"}
                </span>
              </div>

            </div>
          )}

          {/* ================= THIRD LAW ================= */}

          {thirdLaw && (
            <div className="law-three-scene">

              <motion.div
                className="collision-object object-a"
                animate={
                  playing
                    ? {
                        x: [-70, 0, -70]
                      }
                    : {}
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="physics-box">
                  A
                </div>
              </motion.div>

              <motion.div
                className="collision-object object-b"
                animate={
                  playing
                    ? {
                        x: [70, 0, 70]
                      }
                    : {}
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="physics-box">
                  B
                </div>
              </motion.div>

              <ForceArrow
                direction="left"
                label="F₁"
                active
              />

              <ForceArrow
                direction="right"
                label="F₂"
                active
              />

              <div className="equal-force">
                F₁ = −F₂
              </div>

              <div className="action-reaction-label">
                Equal magnitude • Opposite direction
              </div>

            </div>
          )}

          {/* ================= ALL LAWS ================= */}

          {allLaws && (
            <div className="all-laws-scene">

              <div className="law-summary law-one-card">

                <div className="law-number">
                  1
                </div>

                <div>
                  <strong>Inertia</strong>
                  <span>
                    Objects resist changes in motion.
                  </span>
                </div>

              </div>

              <div className="law-summary law-two-card">

                <div className="law-number">
                  2
                </div>

                <div>
                  <strong>F = ma</strong>
                  <span>
                    Force produces acceleration.
                  </span>
                </div>

              </div>

              <div className="law-summary law-three-card">

                <div className="law-number">
                  3
                </div>

                <div>
                  <strong>Action & Reaction</strong>
                  <span>
                    Forces come in opposite pairs.
                  </span>
                </div>

              </div>

              <motion.div
                className="final-object"
                animate={
                  playing
                    ? {
                        x: [-80, 80, -80]
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                🚗
              </motion.div>

            </div>
          )}

        </div>

        {/* ================= INFORMATION ================= */}

        <div className="newton-info">

          <div className="newton-step">
            STEP {current + 1} / {stages.length}
          </div>

          <h2>{stages[current].title}</h2>

          <p className="newton-subtitle">
            {stages[current].subtitle}
          </p>

          <div className="newton-explanation">

            <div className="newton-icon">
              {firstLaw && "🧱"}
              {secondLaw && "🚀"}
              {thirdLaw && "💥"}
              {allLaws && "⚙️"}
            </div>

            <div>
              <strong>What's happening?</strong>

              <p>
                {stages[current].explanation}
              </p>
            </div>

          </div>

          {/* PROCESS */}

          <div className="newton-process">

            {stages.map((stage, index) => (
              <div
                key={stage.title}
                className={`newton-process-step ${
                  index === current ? "active" : ""
                } ${
                  index < current ? "completed" : ""
                }`}
              >

                <div className="newton-process-dot">
                  {index < current
                    ? "✓"
                    : index + 1}
                </div>

                <span>
                  {index === 0 && "Inertia"}
                  {index === 1 && "Force"}
                  {index === 2 && "F = ma"}
                  {index === 3 && "Action / Reaction"}
                  {index === 4 && "Together"}
                </span>

              </div>
            ))}

          </div>

          {/* LAW CARDS */}

          <div className="newton-laws">

            <div
              className={`newton-law-card ${
                firstLaw || allLaws ? "selected" : ""
              }`}
            >
              <div className="law-card-number">1</div>

              <div>
                <strong>First Law</strong>

                <p>
                  An object maintains its state of motion
                  unless a net external force acts on it.
                </p>
              </div>
            </div>

            <div
              className={`newton-law-card ${
                secondLaw || allLaws ? "selected" : ""
              }`}
            >
              <div className="law-card-number">2</div>

              <div>
                <strong>Second Law</strong>

                <p>
                  F = ma. More force means more
                  acceleration for the same mass.
                </p>
              </div>
            </div>

            <div
              className={`newton-law-card ${
                thirdLaw || allLaws ? "selected" : ""
              }`}
            >
              <div className="law-card-number">3</div>

              <div>
                <strong>Third Law</strong>

                <p>
                  Every action force has an equal and
                  opposite reaction force.
                </p>
              </div>
            </div>

          </div>

          {/* FORMULA */}

          <div className="newton-formula">

            <span>NEWTON'S SECOND LAW</span>

            <strong>F = m × a</strong>

            <div>
              Force = Mass × Acceleration
            </div>

          </div>

        </div>

      </div>
    <style>{`.newton-visualization {
  width: 100%;
}

.newton-scene {
  position: relative;
  height: 470px;
  overflow: hidden;
  border-radius: 22px;
  background:
    radial-gradient(
      circle at 50% 40%,
      rgba(80,120,180,0.12),
      transparent 50%
    ),
    #101722;
  border: 1px solid rgba(255,255,255,0.08);
}

.newton-scene-label {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 15px;
  border-radius: 20px;
  background: rgba(255,255,255,0.07);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.3px;
  z-index: 50;
}

/* GROUND */

.newton-ground {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 100px;
  height: 3px;
}

.ground-line {
  width: 100%;
  height: 3px;
  background: rgba(255,255,255,0.18);
}

/* OBJECT */

.physics-box {
  width: 65px;
  height: 65px;
  border-radius: 12px;
  background: #293746;
  border: 2px solid #8fa1b1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 14px;
  box-shadow: 0 12px 25px rgba(0,0,0,0.25);
}

/* LAW 1 */

.law-one-scene {
  position: absolute;
  inset: 0;
}

.inertia-object {
  position: absolute;
  left: 35%;
  bottom: 103px;
}

.motion-trail {
  position: absolute;
  left: 18%;
  bottom: 125px;
  display: flex;
  gap: 12px;
}

.motion-trail span {
  width: 28px;
  height: 3px;
  border-radius: 4px;
  background: rgba(255,255,255,0.18);
}

.inertia-label {
  position: absolute;
  left: 50%;
  bottom: 190px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 700;
  opacity: 0.65;
}

.inertia-equation {
  position: absolute;
  left: 50%;
  bottom: 55px;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  align-items: center;
}

.inertia-equation strong {
  font-size: 24px;
}

.inertia-equation span {
  opacity: 0.55;
}

/* LAW 2 */

.law-two-scene {
  position: absolute;
  inset: 0;
}

.mass-control {
  position: absolute;
  top: 95px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}

.mass-card,
.force-card,
.acceleration-card {
  min-width: 110px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  text-align: center;
}

.mass-card span,
.force-card span,
.acceleration-card span {
  display: block;
  font-size: 8px;
  opacity: 0.5;
  letter-spacing: 1px;
}

.mass-card strong,
.force-card strong,
.acceleration-card strong {
  display: block;
  margin-top: 6px;
  font-size: 15px;
}

.second-law-track {
  position: absolute;
  left: 18%;
  right: 18%;
  bottom: 120px;
  height: 80px;
}

.second-law-object {
  position: absolute;
  left: 10%;
  bottom: 0;
}

.force-arrow {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  z-index: 20;
}

.force-arrow.right {
  left: 25%;
  bottom: 25px;
}

.force-arrow.left {
  right: 25%;
  bottom: 25px;
  transform: rotate(180deg);
}

.force-line {
  width: 70px;
  height: 4px;
  border-radius: 4px;
  background: currentColor;
}

.force-head {
  font-size: 17px;
}

.force-arrow strong {
  font-size: 12px;
}

.second-equation {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 15px;
}

.second-equation strong {
  font-size: 23px;
}

.second-equation span {
  font-size: 12px;
  opacity: 0.55;
}

/* LAW 3 */

.law-three-scene {
  position: absolute;
  inset: 0;
}

.collision-object {
  position: absolute;
  top: 190px;
}

.object-a {
  left: 32%;
}

.object-b {
  right: 32%;
}

.law-three-scene .force-arrow.left {
  left: 24%;
  top: 150px;
  bottom: auto;
}

.law-three-scene .force-arrow.right {
  right: 24%;
  left: auto;
  top: 270px;
  bottom: auto;
}

.equal-force {
  position: absolute;
  left: 50%;
  top: 320px;
  transform: translateX(-50%);
  font-size: 25px;
  font-weight: 900;
}

.action-reaction-label {
  position: absolute;
  left: 50%;
  top: 365px;
  transform: translateX(-50%);
  font-size: 11px;
  opacity: 0.55;
  white-space: nowrap;
}

/* ALL LAWS */

.all-laws-scene {
  position: absolute;
  inset: 0;
}

.law-summary {
  position: absolute;
  width: 230px;
  padding: 15px;
  display: flex;
  gap: 13px;
  align-items: center;
  border-radius: 14px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
}

.law-one-card {
  left: 10%;
  top: 120px;
}

.law-two-card {
  right: 10%;
  top: 120px;
}

.law-three-card {
  left: 50%;
  bottom: 70px;
  transform: translateX(-50%);
}

.law-number {
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.1);
  font-weight: 900;
}

.law-summary strong {
  display: block;
  font-size: 13px;
}

.law-summary span {
  display: block;
  margin-top: 4px;
  font-size: 10px;
  opacity: 0.55;
}

.final-object {
  position: absolute;
  left: 50%;
  top: 250px;
  font-size: 45px;
  transform: translateX(-50%);
}

/* INFORMATION */

.newton-info {
  padding: 25px 5px 5px;
}

.newton-step {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  opacity: 0.5;
}

.newton-info h2 {
  margin: 7px 0;
  font-size: 28px;
}

.newton-subtitle {
  margin: 0 0 20px;
  opacity: 0.65;
}

.newton-explanation {
  display: flex;
  gap: 15px;
  padding: 18px;
  border-radius: 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
}

.newton-icon {
  font-size: 28px;
}

.newton-explanation strong {
  font-size: 14px;
}

.newton-explanation p {
  margin: 6px 0 0;
  line-height: 1.6;
  opacity: 0.7;
}

/* PROCESS */

.newton-process {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  gap: 8px;
}

.newton-process-step {
  flex: 1;
  text-align: center;
  opacity: 0.35;
}

.newton-process-step.active {
  opacity: 1;
}

.newton-process-step.completed {
  opacity: 0.7;
}

.newton-process-dot {
  width: 30px;
  height: 30px;
  margin: auto;
  border-radius: 50%;
  background: rgba(255,255,255,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
}

.newton-process-step.active .newton-process-dot {
  transform: scale(1.15);
  background: rgba(255,255,255,0.18);
}

.newton-process-step span {
  display: block;
  margin-top: 7px;
  font-size: 9px;
}

/* LAW CARDS */

.newton-laws {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 25px;
}

.newton-law-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  opacity: 0.55;
  transition: 0.3s;
}

.newton-law-card.selected {
  opacity: 1;
  transform: translateY(-2px);
  border-color: rgba(255,255,255,0.2);
}

.law-card-number {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.newton-law-card strong {
  font-size: 13px;
}

.newton-law-card p {
  margin: 7px 0 0;
  font-size: 10px;
  line-height: 1.5;
  opacity: 0.65;
}

/* FORMULA */

.newton-formula {
  margin-top: 20px;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  background: rgba(255,255,255,0.05);
}

.newton-formula span {
  display: block;
  font-size: 9px;
  letter-spacing: 1.5px;
  opacity: 0.5;
}

.newton-formula strong {
  display: block;
  margin: 7px 0;
  font-size: 30px;
}

.newton-formula div {
  font-size: 11px;
  opacity: 0.55;
}

@media (max-width: 800px) {
  .newton-laws {
    grid-template-columns: 1fr;
  }

  .mass-control {
    transform: translateX(-50%) scale(0.8);
  }

  .law-summary {
    width: 190px;
  }
}`}</style>
    </VisualizationShell>
  );
}

export default NewtonLaws;