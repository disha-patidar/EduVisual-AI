import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

const stages = [
  {
    title: "Magma Chamber",
    subtitle: "Molten rock collects beneath the volcano.",
    explanation:
      "Deep beneath Earth's surface, intense heat melts rock and forms magma. The magma collects in a chamber beneath the volcano."
  },
  {
    title: "Magma Rises",
    subtitle: "Buoyant magma moves upward through cracks.",
    explanation:
      "Magma is less dense than the surrounding solid rock, so it can rise through fractures and pathways toward the surface."
  },
  {
    title: "Pressure Builds",
    subtitle: "Gas and magma increase pressure inside the volcano.",
    explanation:
      "As magma rises, dissolved gases expand. Increasing pressure can eventually force magma toward the volcanic vent."
  },
  {
    title: "Eruption",
    subtitle: "Magma reaches the surface as lava.",
    explanation:
      "When pressure becomes strong enough, magma erupts through the vent. Once magma reaches the surface, it is called lava."
  },
  {
    title: "Lava & Ash Flow",
    subtitle: "Hot lava spreads while ash rises into the atmosphere.",
    explanation:
      "An eruption can release flowing lava, volcanic gases and ash. Lava cools as it moves away from the vent."
  },
  {
    title: "Cooling",
    subtitle: "Lava cools and becomes solid volcanic rock.",
    explanation:
      "After the eruption, exposed lava loses heat and solidifies, forming new igneous rock."
  }
];

function Volcano({ step = 0, playing = false }) {
  const current = Math.min(step, stages.length - 1);

  const showRising = current >= 1;
  const showPressure = current >= 2;
  const erupting = current >= 3;
  const showLava = current >= 4;
  const cooled = current >= 5;

  return (
    <VisualizationShell
      title="Volcano"
      subtitle="Follow magma from deep underground to a volcanic eruption."
    >
      <div className="volcano-visualization">

        {/* ================= SCENE ================= */}

        <div className="volcano-scene">

          {/* SKY */}
          <div className="volcano-sky">

            <div className="volcano-sun">☀️</div>

            {showLava && (
              <>
                <motion.div
                  className="ash-cloud ash-cloud-1"
                  animate={
                    playing
                      ? {
                          x: [-10, 15, -10],
                          scale: [1, 1.05, 1]
                        }
                      : {}
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}
                />

                <motion.div
                  className="ash-cloud ash-cloud-2"
                  animate={
                    playing
                      ? {
                          x: [10, -15, 10],
                          scale: [1, 1.08, 1]
                        }
                      : {}
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity
                  }}
                />

                <div className="ash-label">
                  VOLCANIC ASH
                </div>
              </>
            )}
          </div>

          {/* GROUND */}
          <div className="volcano-ground">

            {/* Underground layers */}
            <div className="underground-layer layer-1" />
            <div className="underground-layer layer-2" />
            <div className="underground-layer layer-3" />

            {/* MAGMA CHAMBER */}
            <motion.div
              className="magma-chamber"
              animate={
                playing
                  ? {
                      scale: [1, 1.03, 1]
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              <div className="chamber-label">
                MAGMA CHAMBER
              </div>

              <div className="magma-bubbles">
                {[...Array(10)].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={
                      playing
                        ? {
                            y: [0, -20, 0],
                            x: [0, i % 2 ? 5 : -5, 0]
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.4 + (i % 3) * 0.3,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            </motion.div>

          </div>

          {/* VOLCANO MOUNTAIN */}

          <div className="volcano-mountain">

            <div className="volcano-cone" />

            <div className="volcano-snow" />

            {/* Crater */}
            <div className="volcano-crater">
              <div className="crater-inner" />
            </div>

          </div>

          {/* MAGMA PATH */}

          {showRising && (
            <motion.div
              className="magma-path"
              initial={{
                height: 0
              }}
              animate={{
                height: current >= 3 ? 190 : 120
              }}
              transition={{
                duration: 1.3
              }}
            >
              <div className="magma-column">

                {[...Array(7)].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={
                      playing
                        ? {
                            y: [-8, 8, -8],
                            x: [0, i % 2 ? 4 : -4, 0]
                          }
                        : {}
                    }
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.12
                    }}
                  />
                ))}

              </div>
            </motion.div>
          )}

          {/* PRESSURE */}

          {showPressure && !erupting && (
            <div className="pressure-indicator">

              <motion.div
                className="pressure-arrow"
                animate={
                  playing
                    ? {
                        y: [5, -8, 5]
                      }
                    : {}
                }
                transition={{
                  duration: 0.8,
                  repeat: Infinity
                }}
              >
                ↑
              </motion.div>

              <div>
                <strong>PRESSURE BUILDING</strong>
                <span>Gas + magma</span>
              </div>

            </div>
          )}

          {/* ERUPTION */}

          {erupting && (
            <>
              {/* Eruption column */}
              <motion.div
                className="eruption-column"
                initial={{
                  height: 0,
                  opacity: 0
                }}
                animate={{
                  height: showLava ? 155 : 120,
                  opacity: 1
                }}
                transition={{
                  duration: 1
                }}
              />

              {/* Lava droplets */}
              {[...Array(14)].map((_, i) => (
                <motion.div
                  key={i}
                  className="lava-droplet"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0
                  }}
                  animate={{
                    x:
                      Math.sin(i * 2) * 60 +
                      (i % 3) * 15,
                    y:
                      -70 -
                      (i % 5) * 20,
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 1.7,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}

              {/* Ash particles */}
              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={`ash-${i}`}
                  className="ash-particle"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0
                  }}
                  animate={{
                    x:
                      (i % 6) * 30 - 75,
                    y:
                      -80 -
                      (i % 5) * 18,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.08
                  }}
                />
              ))}

              <div className="eruption-label">
                🌋 ERUPTION
              </div>
            </>
          )}

          {/* LAVA FLOWS */}

          {showLava && (
            <>

              <motion.div
                className="lava-flow lava-flow-left"
                initial={{
                  height: 0
                }}
                animate={{
                  height: cooled ? 105 : 80
                }}
                transition={{
                  duration: 1.5
                }}
              />

              <motion.div
                className="lava-flow lava-flow-right"
                initial={{
                  height: 0
                }}
                animate={{
                  height: cooled ? 85 : 65
                }}
                transition={{
                  duration: 1.5
                }}
              />

              {/* Flow particles */}
              {playing &&
                [...Array(8)].map((_, i) => (
                  <motion.span
                    key={`flow-${i}`}
                    className="lava-flow-particle"
                    animate={{
                      y: [0, 100],
                      opacity: [1, 0]
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      delay: i * 0.15
                    }}
                  />
                ))}

            </>
          )}

          {/* COOLING */}

          {cooled && (
            <motion.div
              className="cooling-zone"
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
            >
              <div className="cooling-smoke">
                ♨
              </div>

              <div className="cooling-label">
                COOLED LAVA
                <span>New volcanic rock</span>
              </div>
            </motion.div>
          )}

          {/* FLOW ARROWS */}

          {showLava && (
            <>
              <motion.div
                className="flow-arrow flow-arrow-left"
                animate={
                  playing
                    ? {
                        y: [0, 25, 0]
                      }
                    : {}
                }
                transition={{
                  duration: 1.2,
                  repeat: Infinity
                }}
              >
                ↓
              </motion.div>

              <motion.div
                className="flow-arrow flow-arrow-right"
                animate={
                  playing
                    ? {
                        y: [0, 25, 0]
                      }
                    : {}
                }
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: 0.3
                }}
              >
                ↓
              </motion.div>
            </>
          )}

        </div>

        {/* ================= INFORMATION ================= */}

        <div className="volcano-info">

          <div className="volcano-step">
            STEP {current + 1} / {stages.length}
          </div>

          <h2>{stages[current].title}</h2>

          <p className="volcano-subtitle">
            {stages[current].subtitle}
          </p>

          <div className="volcano-explanation">

            <div className="volcano-info-icon">
              {current === 0 && "🔥"}
              {current === 1 && "⬆️"}
              {current === 2 && "⚠️"}
              {current === 3 && "🌋"}
              {current === 4 && "🌊"}
              {current === 5 && "🪨"}
            </div>

            <div>
              <strong>What's happening?</strong>

              <p>
                {stages[current].explanation}
              </p>
            </div>

          </div>

          {/* PROCESS */}

          <div className="volcano-process">

            {stages.map((stage, index) => (
              <div
                key={stage.title}
                className={`volcano-process-step ${
                  index === current ? "active" : ""
                } ${
                  index < current ? "completed" : ""
                }`}
              >

                <div className="volcano-process-dot">
                  {index < current ? "✓" : index + 1}
                </div>

                <span>
                  {stage.title}
                </span>

              </div>
            ))}

          </div>

          {/* CONCEPTS */}

          <div className="volcano-concepts">

            <div className="volcano-concept">
              <span>🔥</span>
              <strong>Magma</strong>
              <p>
                Molten rock beneath Earth's surface.
              </p>
            </div>

            <div className="volcano-concept">
              <span>🌋</span>
              <strong>Lava</strong>
              <p>
                Magma that has reached the surface.
              </p>
            </div>

            <div className="volcano-concept">
              <span>💨</span>
              <strong>Volcanic Ash</strong>
              <p>
                Tiny rock and mineral particles released during eruptions.
              </p>
            </div>

          </div>

        </div>

      </div>
      <style>{

`.volcano-visualization {
  width: 100%;
}

.volcano-scene {
  position: relative;
  height: 480px;
  overflow: hidden;
  border-radius: 22px;
  background: #bfe5f5;
  border: 1px solid rgba(255,255,255,0.1);
}

/* SKY */

.volcano-sky {
  position: absolute;
  inset: 0 0 52% 0;
}

.volcano-sun {
  position: absolute;
  right: 35px;
  top: 25px;
  font-size: 36px;
}

.ash-cloud {
  position: absolute;
  width: 120px;
  height: 65px;
  border-radius: 50%;
  background: rgba(80,80,80,0.7);
  filter: blur(5px);
}

.ash-cloud-1 {
  left: 43%;
  top: 35px;
}

.ash-cloud-2 {
  left: 53%;
  top: 65px;
  width: 150px;
}

.ash-label {
  position: absolute;
  top: 140px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  opacity: 0.7;
}

/* GROUND */

.volcano-ground {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 55%;
  background: #73503c;
  overflow: hidden;
}

.underground-layer {
  position: absolute;
  left: 0;
  right: 0;
}

.layer-1 {
  top: 0;
  height: 25px;
  background: #566148;
}

.layer-2 {
  top: 25px;
  height: 85px;
  background: #815d45;
}

.layer-3 {
  top: 110px;
  bottom: 0;
  background: #54392e;
}

/* VOLCANO */

.volcano-mountain {
  position: absolute;
  left: 50%;
  bottom: 45%;
  transform: translateX(-50%);
  width: 390px;
  height: 260px;
  z-index: 8;
}

.volcano-cone {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 195px solid transparent;
  border-right: 195px solid transparent;
  border-bottom: 245px solid #66534a;
}

.volcano-snow {
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  width: 70px;
  height: 65px;
  background: #e9f0f0;
  clip-path: polygon(
    50% 0,
    100% 100%,
    70% 80%,
    50% 100%,
    30% 80%,
    0 100%
  );
}

/* CRATER */

.volcano-crater {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 95px;
  height: 30px;
  border-radius: 50%;
  background: #30231f;
  z-index: 10;
}

.crater-inner {
  position: absolute;
  inset: 5px 18px;
  border-radius: 50%;
  background: #d54e25;
}

/* MAGMA CHAMBER */

.magma-chamber {
  position: absolute;
  left: 32%;
  bottom: 15px;
  width: 36%;
  height: 100px;
  border-radius: 50%;
  background: #c84c26;
  border: 5px solid #6c2d20;
  z-index: 3;
  box-shadow: 0 0 35px rgba(255,100,30,0.3);
}

.chamber-label {
  margin-top: 28px;
  text-align: center;
  color: white;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
}

.magma-bubbles span {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ffd166;
}

.magma-bubbles span:nth-child(1) {
  left: 20%;
  top: 50%;
}

.magma-bubbles span:nth-child(2) {
  left: 32%;
  top: 70%;
}

.magma-bubbles span:nth-child(3) {
  left: 45%;
  top: 45%;
}

.magma-bubbles span:nth-child(4) {
  left: 60%;
  top: 65%;
}

.magma-bubbles span:nth-child(5) {
  left: 75%;
  top: 50%;
}

/* MAGMA PATH */

.magma-path {
  position: absolute;
  left: calc(50% - 14px);
  bottom: 38%;
  width: 28px;
  z-index: 20;
  overflow: hidden;
}

.magma-column {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #d95527;
  box-shadow: 0 0 20px rgba(255,100,30,0.45);
}

.magma-column span {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffd166;
}

.magma-column span:nth-child(1) {
  left: 5px;
  top: 20%;
}

.magma-column span:nth-child(2) {
  left: 17px;
  top: 35%;
}

.magma-column span:nth-child(3) {
  left: 8px;
  top: 50%;
}

.magma-column span:nth-child(4) {
  left: 16px;
  top: 65%;
}

/* PRESSURE */

.pressure-indicator {
  position: absolute;
  left: 55%;
  bottom: 37%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 12px;
  background: rgba(0,0,0,0.5);
  color: white;
  z-index: 30;
}

.pressure-arrow {
  font-size: 32px;
  font-weight: 900;
}

.pressure-indicator strong {
  display: block;
  font-size: 10px;
}

.pressure-indicator span {
  display: block;
  margin-top: 3px;
  font-size: 9px;
  opacity: 0.65;
}

/* ERUPTION */

.eruption-column {
  position: absolute;
  left: calc(50% - 15px);
  bottom: 49%;
  width: 30px;
  background: linear-gradient(
    to top,
    #e24e24,
    #ef7628,
    rgba(239,118,40,0)
  );
  border-radius: 50% 50% 0 0;
  z-index: 30;
}

.lava-droplet {
  position: absolute;
  left: 50%;
  bottom: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f26b24;
  z-index: 35;
}

.ash-particle {
  position: absolute;
  left: 50%;
  bottom: 52%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #55504c;
  z-index: 35;
}

.eruption-label {
  position: absolute;
  left: 50%;
  bottom: 73%;
  transform: translateX(-50%);
  padding: 8px 14px;
  border-radius: 20px;
  background: rgba(0,0,0,0.6);
  color: white;
  font-size: 10px;
  font-weight: 800;
  z-index: 40;
}

/* LAVA FLOWS */

.lava-flow {
  position: absolute;
  bottom: 42%;
  width: 22px;
  background: linear-gradient(
    to bottom,
    #ee5b25,
    #c53b22
  );
  border-radius: 0 0 15px 15px;
  z-index: 18;
  box-shadow: 0 0 15px rgba(240,80,20,0.35);
}

.lava-flow-left {
  left: 43%;
  transform: rotate(15deg);
  transform-origin: top;
}

.lava-flow-right {
  right: 43%;
  transform: rotate(-15deg);
  transform-origin: top;
}

.lava-flow-particle {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ffb52e;
  left: 45%;
  bottom: 46%;
  z-index: 35;
}

.flow-arrow {
  position: absolute;
  bottom: 40%;
  font-size: 30px;
  font-weight: 900;
  z-index: 40;
}

.flow-arrow-left {
  left: 41%;
}

.flow-arrow-right {
  right: 41%;
}

/* COOLING */

.cooling-zone {
  position: absolute;
  left: 50%;
  bottom: 43%;
  transform: translateX(-50%);
  z-index: 45;
  text-align: center;
}

.cooling-smoke {
  font-size: 28px;
  opacity: 0.6;
}

.cooling-label {
  padding: 7px 12px;
  border-radius: 10px;
  background: rgba(0,0,0,0.6);
  color: white;
  font-size: 9px;
  font-weight: 800;
}

.cooling-label span {
  display: block;
  margin-top: 3px;
  opacity: 0.65;
}

/* INFORMATION */

.volcano-info {
  padding: 25px 5px 5px;
}

.volcano-step {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  opacity: 0.55;
}

.volcano-info h2 {
  margin: 7px 0;
  font-size: 28px;
}

.volcano-subtitle {
  margin: 0 0 20px;
  opacity: 0.65;
}

.volcano-explanation {
  display: flex;
  gap: 15px;
  padding: 18px;
  border-radius: 16px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
}

.volcano-info-icon {
  font-size: 28px;
}

.volcano-explanation strong {
  font-size: 14px;
}

.volcano-explanation p {
  margin: 6px 0 0;
  line-height: 1.6;
  opacity: 0.75;
}

/* PROCESS */

.volcano-process {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 25px;
}

.volcano-process-step {
  flex: 1;
  text-align: center;
  opacity: 0.4;
}

.volcano-process-step.active {
  opacity: 1;
}

.volcano-process-step.completed {
  opacity: 0.75;
}

.volcano-process-dot {
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

.volcano-process-step.active .volcano-process-dot {
  transform: scale(1.15);
  background: rgba(255,255,255,0.2);
}

.volcano-process-step span {
  display: block;
  margin-top: 8px;
  font-size: 10px;
}

/* CONCEPTS */

.volcano-concepts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 25px;
}

.volcano-concept {
  padding: 16px;
  border-radius: 14px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
}

.volcano-concept span {
  font-size: 23px;
}

.volcano-concept strong {
  display: block;
  margin-top: 7px;
  font-size: 13px;
}

.volcano-concept p {
  margin: 6px 0 0;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}

@media (max-width: 800px) {
  .volcano-concepts {
    grid-template-columns: 1fr;
  }

  .volcano-process {
    overflow-x: auto;
  }

  .volcano-process-step {
    min-width: 110px;
  }
}`}</style>
    </VisualizationShell>
  );
}

export default Volcano;