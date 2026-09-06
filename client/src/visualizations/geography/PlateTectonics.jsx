import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

const stages = [
  {
    title: "Tectonic Plates",
    subtitle: "Earth's crust is divided into large moving plates.",
    explanation:
      "The rigid outer layer of Earth, called the lithosphere, is broken into tectonic plates."
  },
  {
    title: "Plates Move",
    subtitle: "Heat inside Earth drives slow plate movement.",
    explanation:
      "Convection and other forces in Earth's interior contribute to the movement of tectonic plates."
  },
  {
    title: "Plates Collide",
    subtitle: "Two plates move toward each other.",
    explanation:
      "At a convergent boundary, plates move toward one another. One plate may be forced beneath the other."
  },
  {
    title: "Subduction",
    subtitle: "One plate sinks beneath the other.",
    explanation:
      "The denser oceanic plate can sink into the mantle. This process is called subduction."
  },
  {
    title: "Earthquake & Mountains",
    subtitle: "Plate movement reshapes Earth's surface.",
    explanation:
      "Collisions can produce earthquakes and build mountains as rocks are compressed and uplifted."
  }
];

function PlateTectonics({ step = 0, playing = false }) {
  const current = Math.min(step, stages.length - 1);

  const isMoving = current >= 1;
  const isCollision = current >= 2;
  const isSubduction = current >= 3;
  const isFinal = current >= 4;

  return (
    <VisualizationShell
      title="Plate Tectonics"
      subtitle="Watch Earth's tectonic plates move, collide and reshape the surface."
    >
      <div className="plate-tectonics">

        {/* MAIN VISUALIZATION */}
        <div className="tectonic-scene">

          {/* Mantle */}
          <div className="mantle-background">
            <div className="mantle-label">
              MANTLE
            </div>

            {/* Convection currents */}
            {isMoving && (
              <>
                <motion.div
                  className="convection convection-left"
                  animate={
                    playing
                      ? { y: [0, 35, 0], rotate: [0, 180, 360] }
                      : {}
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <motion.div
                  className="convection convection-right"
                  animate={
                    playing
                      ? { y: [0, -35, 0], rotate: [0, -180, -360] }
                      : {}
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </>
            )}
          </div>

          {/* Surface */}
          <div className="earth-surface">
            <div className="surface-text">
              EARTH'S SURFACE
            </div>
          </div>

          {/* LEFT PLATE */}
          <motion.div
            className="tectonic-plate plate-left"
            animate={
              isCollision
                ? { x: 70 }
                : isMoving
                ? { x: 25 }
                : { x: 0 }
            }
            transition={{
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <div className="plate-label">
              OCEANIC PLATE
            </div>

            <div className="plate-arrows">
              ← ←
            </div>
          </motion.div>

          {/* RIGHT PLATE */}
          <motion.div
            className="tectonic-plate plate-right"
            animate={
              isCollision
                ? { x: -35 }
                : isMoving
                ? { x: -15 }
                : { x: 0 }
            }
            transition={{
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <div className="plate-label">
              CONTINENTAL PLATE
            </div>

            <div className="plate-arrows">
              → →
            </div>
          </motion.div>

          {/* SUBDUCTING PLATE */}
          {isSubduction && (
            <motion.div
              className="subducting-plate"
              initial={{
                x: 0,
                y: 0,
                rotate: 0
              }}
              animate={{
                x: 35,
                y: 85,
                rotate: 25
              }}
              transition={{
                duration: 1.8,
                ease: "easeInOut"
              }}
            >
              <span>SUBDUCTING PLATE</span>
            </motion.div>
          )}

          {/* MOUNTAINS */}
          {isFinal && (
            <motion.div
              className="mountains"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut"
              }}
            >
              <div className="mountain mountain-1" />
              <div className="mountain mountain-2" />
              <div className="mountain mountain-3" />
            </motion.div>
          )}

          {/* EARTHQUAKE */}
          {isFinal && (
            <motion.div
              className="earthquake-zone"
              animate={
                playing
                  ? {
                      x: [-3, 3, -3, 3, 0]
                    }
                  : {}
              }
              transition={{
                duration: 0.3,
                repeat: Infinity
              }}
            >
              ⚡
            </motion.div>
          )}

          {/* Boundary */}
          {isCollision && (
            <motion.div
              className="plate-boundary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              CONVERGENT BOUNDARY
            </motion.div>
          )}
        </div>

        {/* STAGE INFORMATION */}
        <div className="tectonic-info">

          <div className="stage-number">
            STEP {current + 1} / {stages.length}
          </div>

          <h2>{stages[current].title}</h2>

          <p className="stage-subtitle">
            {stages[current].subtitle}
          </p>

          <div className="explanation-card">
            <div className="explanation-icon">
              🌎
            </div>

            <div>
              <strong>What's happening?</strong>
              <p>{stages[current].explanation}</p>
            </div>
          </div>

          {/* PROCESS */}
          <div className="tectonic-process">

            {stages.map((item, index) => (
              <div
                key={item.title}
                className={`process-step ${
                  index === current ? "active" : ""
                } ${index < current ? "completed" : ""}`}
              >
                <div className="process-dot">
                  {index < current ? "✓" : index + 1}
                </div>

                <span>{item.title}</span>
              </div>
            ))}

          </div>

          {/* CONCEPT CARDS */}
          <div className="concept-grid">

            <div className="concept-card">
              <span>🌍</span>
              <strong>Lithosphere</strong>
              <p>
                Rigid outer layer divided into tectonic plates.
              </p>
            </div>

            <div className="concept-card">
              <span>🔥</span>
              <strong>Mantle</strong>
              <p>
                Hot layer beneath the lithosphere.
              </p>
            </div>

            <div className="concept-card">
              <span>⚡</span>
              <strong>Earthquakes</strong>
              <p>
                Sudden release of energy caused by movement along faults.
              </p>
            </div>

            <div className="concept-card">
              <span>⛰️</span>
              <strong>Mountains</strong>
              <p>
                Can form when continental plates collide.
              </p>
            </div>

          </div>

        </div>
      </div>
      <style>{
        `.plate-tectonics {
  width: 100%;
}

.tectonic-scene {
  position: relative;
  height: 440px;
  overflow: hidden;
  border-radius: 22px;
  background: linear-gradient(
    to bottom,
    #dff4ff 0%,
    #dff4ff 25%,
    #9c6845 25%,
    #8b573a 100%
  );
  border: 1px solid rgba(255,255,255,0.1);
}

/* Surface */

.earth-surface {
  position: absolute;
  top: 110px;
  left: 0;
  right: 0;
  height: 20px;
  background: #596b4d;
  z-index: 5;
}

.surface-text {
  position: absolute;
  right: 20px;
  top: -28px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  opacity: 0.7;
}

/* Mantle */

.mantle-background {
  position: absolute;
  inset: 130px 0 0;
  background:
    radial-gradient(
      circle at 50% 20%,
      rgba(255,180,60,0.3),
      transparent 35%
    ),
    linear-gradient(
      to bottom,
      #9b6040,
      #653b2c
    );
}

.mantle-label {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  opacity: 0.45;
}

/* Plates */

.tectonic-plate {
  position: absolute;
  top: 92px;
  height: 45px;
  background: linear-gradient(
    to bottom,
    #697c5c,
    #455342
  );
  border: 2px solid #313c30;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.7px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}

.plate-left {
  left: -30px;
  width: 52%;
  border-radius: 0 18px 18px 0;
}

.plate-right {
  right: -30px;
  width: 52%;
  border-radius: 18px 0 0 18px;
}

.plate-arrows {
  font-size: 18px;
  opacity: 0.8;
}

/* Convection */

.convection {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 5px dashed rgba(255,180,70,0.4);
  border-radius: 50%;
}

.convection-left {
  left: 20%;
  top: 120px;
}

.convection-right {
  right: 20%;
  top: 190px;
}

/* Subduction */

.subducting-plate {
  position: absolute;
  top: 110px;
  left: 43%;
  width: 150px;
  height: 30px;
  background: #4b5d48;
  border: 2px solid #29352a;
  transform-origin: left center;
  z-index: 8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 800;
  color: white;
}

/* Boundary */

.plate-boundary {
  position: absolute;
  top: 65px;
  left: 50%;
  transform: translateX(-50%);
  padding: 7px 12px;
  border-radius: 20px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  font-size: 10px;
  font-weight: 800;
  z-index: 20;
}

/* Mountains */

.mountains {
  position: absolute;
  left: 48%;
  top: 35px;
  width: 130px;
  height: 100px;
  transform-origin: bottom;
  z-index: 15;
}

.mountain {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  border-bottom: 80px solid #6f7569;
}

.mountain-1 {
  left: 0;
}

.mountain-2 {
  left: 35px;
  border-left-width: 45px;
  border-right-width: 45px;
  border-bottom-width: 105px;
}

.mountain-3 {
  left: 80px;
  border-bottom-width: 70px;
}

/* Earthquake */

.earthquake-zone {
  position: absolute;
  top: 135px;
  left: 50%;
  z-index: 30;
  font-size: 30px;
}

/* Information */

.tectonic-info {
  padding: 25px 5px 5px;
}

.stage-number {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  opacity: 0.55;
}

.tectonic-info h2 {
  margin: 7px 0;
  font-size: 28px;
}

.stage-subtitle {
  margin: 0 0 20px;
  opacity: 0.65;
}

.explanation-card {
  display: flex;
  gap: 15px;
  padding: 18px;
  border-radius: 16px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
}

.explanation-icon {
  font-size: 28px;
}

.explanation-card strong {
  font-size: 14px;
}

.explanation-card p {
  margin: 6px 0 0;
  line-height: 1.6;
  opacity: 0.75;
}

/* Process */

.tectonic-process {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 25px;
}

.process-step {
  flex: 1;
  text-align: center;
  opacity: 0.4;
}

.process-step.active {
  opacity: 1;
}

.process-step.completed {
  opacity: 0.75;
}

.process-dot {
  width: 30px;
  height: 30px;
  margin: auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.08);
  font-size: 12px;
  font-weight: 800;
}

.process-step.active .process-dot {
  transform: scale(1.15);
  background: rgba(255,255,255,0.2);
}

.process-step span {
  display: block;
  margin-top: 8px;
  font-size: 10px;
}

/* Concept cards */

.concept-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 25px;
}

.concept-card {
  padding: 16px;
  border-radius: 14px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
}

.concept-card span {
  font-size: 22px;
}

.concept-card strong {
  display: block;
  margin-top: 8px;
  font-size: 13px;
}

.concept-card p {
  margin: 6px 0 0;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}

@media (max-width: 800px) {
  .concept-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .tectonic-process {
    overflow-x: auto;
  }

  .process-step {
    min-width: 100px;
  }
}`}</style>
    </VisualizationShell>
  );
}

export default PlateTectonics;