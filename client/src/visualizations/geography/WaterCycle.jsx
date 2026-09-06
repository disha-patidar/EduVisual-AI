import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

const stages = [
  {
    title: "Evaporation",
    subtitle: "The Sun heats water and turns it into water vapor.",
    explanation:
      "Solar energy heats water in oceans, lakes and rivers. Some of the liquid water changes into invisible water vapor and rises into the atmosphere."
  },
  {
    title: "Condensation",
    subtitle: "Water vapor cools and forms tiny droplets.",
    explanation:
      "As warm water vapor rises into cooler air, it loses heat and changes back into tiny liquid water droplets."
  },
  {
    title: "Cloud Formation",
    subtitle: "Millions of tiny droplets gather to form clouds.",
    explanation:
      "The tiny water droplets collect around particles in the atmosphere. Together they form visible clouds."
  },
  {
    title: "Precipitation",
    subtitle: "Water falls back to Earth's surface.",
    explanation:
      "When cloud droplets become large and heavy enough, water falls as rain, snow, sleet or hail."
  },
  {
    title: "Collection & Runoff",
    subtitle: "Water returns to rivers, lakes and oceans.",
    explanation:
      "Water collects in rivers, lakes, glaciers and oceans. Some water flows over the land as runoff and some enters the ground."
  },
  {
    title: "The Cycle Continues",
    subtitle: "Collected water is heated again by the Sun.",
    explanation:
      "The water cycle has no true beginning or end. Water continuously moves between Earth's surface, underground and the atmosphere."
  }
];

function WaterDroplets({ count = 10, className = "" }) {
  return (
    <div className={className}>
      {[...Array(count)].map((_, i) => (
        <motion.span
          key={i}
          className="water-droplet"
          animate={{
            y: [0, 18, 0],
            x: [0, i % 2 === 0 ? 5 : -5, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.8 + (i % 3) * 0.3,
            repeat: Infinity,
            delay: i * 0.12
          }}
        />
      ))}
    </div>
  );
}

function WaterCycle({ step = 0, playing = false }) {
  const current = Math.min(step, stages.length - 1);

  const showEvaporation = current >= 0;
  const showCondensation = current >= 1;
  const showCloud = current >= 2;
  const showRain = current >= 3;
  const showCollection = current >= 4;

  return (
    <VisualizationShell
      title="Water Cycle"
      subtitle="Follow water as it moves between Earth's surface and atmosphere."
    >
      <div className="water-cycle">

        {/* ================= MAIN SCENE ================= */}

        <div className="water-cycle-scene">

          {/* SKY */}
          <div className="water-sky">

            {/* SUN */}
            <motion.div
              className="water-sun"
              animate={
                playing
                  ? {
                      scale: [1, 1.08, 1],
                      rotate: [0, 5, 0]
                    }
                  : {}
              }
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >
              ☀️
            </motion.div>

            <div className="sun-rays">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            {/* CLOUDS */}
            {showCloud && (
              <>
                <motion.div
                  className="water-cloud cloud-main"
                  initial={{
                    opacity: 0,
                    scale: 0.5
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    duration: 1
                  }}
                >
                  <div className="cloud-part cloud-p1" />
                  <div className="cloud-part cloud-p2" />
                  <div className="cloud-part cloud-p3" />
                  <div className="cloud-part cloud-p4" />
                </motion.div>

                <motion.div
                  className="water-cloud cloud-small"
                  animate={
                    playing
                      ? {
                          x: [0, 20, 0]
                        }
                      : {}
                  }
                  transition={{
                    duration: 6,
                    repeat: Infinity
                  }}
                >
                  <div className="cloud-part cloud-s1" />
                  <div className="cloud-part cloud-s2" />
                </motion.div>
              </>
            )}

            {/* WATER VAPOR */}
            {showEvaporation && (
              <div className="vapor-container">

                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="vapor-particle"
                    animate={
                      playing
                        ? {
                            y: [-5, -100, -5],
                            x: [
                              0,
                              i % 2 === 0 ? 15 : -15,
                              0
                            ],
                            opacity: [0, 1, 0]
                          }
                        : {
                            y: [-5, -70, -5],
                            opacity: [0.3, 1, 0.3]
                          }
                    }
                    transition={{
                      duration: 2.5 + (i % 3) * 0.3,
                      repeat: Infinity,
                      delay: i * 0.18
                    }}
                  />
                ))}

                {current === 0 && (
                  <div className="cycle-label evaporation-label">
                    ↑ EVAPORATION
                  </div>
                )}

              </div>
            )}

            {/* CONDENSATION */}
            {showCondensation && (
              <motion.div
                className="condensation-zone"
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
              >

                {[...Array(8)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="condensation-particle"
                    animate={
                      playing
                        ? {
                            x: [0, 15, -10, 0],
                            y: [0, -8, 8, 0]
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15
                    }}
                  />
                ))}

                {current === 1 && (
                  <div className="cycle-label condensation-label">
                    ❄ CONDENSATION
                  </div>
                )}

              </motion.div>
            )}

            {/* RAIN */}
            {showRain && (
              <div className="rain-container">

                {[...Array(18)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="rain-drop"
                    initial={{
                      y: -30,
                      opacity: 0
                    }}
                    animate={
                      playing
                        ? {
                            y: [0, 130],
                            opacity: [0, 1, 0]
                          }
                        : {
                            y: 100,
                            opacity: 0.7
                          }
                    }
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.08
                    }}
                    style={{
                      left: `${10 + (i % 9) * 10}%`
                    }}
                  />
                ))}

                {current === 3 && (
                  <div className="cycle-label precipitation-label">
                    ↓ PRECIPITATION
                  </div>
                )}

              </div>
            )}

          </div>

          {/* ================= LAND ================= */}

          <div className="water-land">

            {/* MOUNTAINS */}
            <div className="water-mountains">
              <div className="water-mountain mountain-one" />
              <div className="water-mountain mountain-two" />
              <div className="water-mountain mountain-three" />

              <div className="mountain-snow-cap" />
            </div>

            {/* RIVER */}
            <div className="river">

              <motion.div
                className="river-current"
                animate={
                  playing
                    ? {
                        x: [-20, 20, -20]
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />

            </div>

            {/* OCEAN */}
            <div className="ocean">

              <div className="ocean-wave wave-1" />
              <div className="ocean-wave wave-2" />
              <div className="ocean-wave wave-3" />

              {showCollection && (
                <WaterDroplets
                  count={8}
                  className="ocean-droplets"
                />
              )}

              <div className="ocean-label">
                OCEAN / LAKE
              </div>

            </div>

            {/* RUNOFF */}
            {showCollection && (
              <motion.div
                className="runoff"
                initial={{
                  height: 0
                }}
                animate={{
                  height: 105
                }}
                transition={{
                  duration: 1.2
                }}
              >
                <div className="runoff-water" />

                {current === 4 && (
                  <div className="cycle-label runoff-label">
                    ↓ RUNOFF
                  </div>
                )}
              </motion.div>
            )}

            {/* INFILTRATION */}
            {current >= 4 && (
              <div className="groundwater">

                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={
                      playing
                        ? {
                            x: [0, 20, 0]
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}

                <span className="groundwater-label">
                  GROUNDWATER
                </span>

              </div>
            )}

            {/* VEGETATION */}
            <div className="trees">
              <span>🌲</span>
              <span>🌲</span>
              <span>🌳</span>
              <span>🌲</span>
            </div>

          </div>

          {/* CYCLE ARROWS */}

          <div className="water-cycle-arrow arrow-evaporation">
            ↑
          </div>

          <div className="water-cycle-arrow arrow-condensation">
            →
          </div>

          <div className="water-cycle-arrow arrow-precipitation">
            ↓
          </div>

          <div className="water-cycle-arrow arrow-runoff">
            ←
          </div>

        </div>

        {/* ================= INFORMATION ================= */}

        <div className="water-cycle-info">

          <div className="water-step">
            STEP {current + 1} / {stages.length}
          </div>

          <h2>{stages[current].title}</h2>

          <p className="water-subtitle">
            {stages[current].subtitle}
          </p>

          <div className="water-explanation">

            <div className="water-info-icon">
              {current === 0 && "☀️"}
              {current === 1 && "☁️"}
              {current === 2 && "☁️"}
              {current === 3 && "🌧️"}
              {current === 4 && "💧"}
              {current === 5 && "🔄"}
            </div>

            <div>
              <strong>What's happening?</strong>

              <p>
                {stages[current].explanation}
              </p>
            </div>

          </div>

          {/* PROCESS */}

          <div className="water-process">

            {stages.map((stage, index) => (
              <div
                key={stage.title}
                className={`water-process-step ${
                  index === current ? "active" : ""
                } ${
                  index < current ? "completed" : ""
                }`}
              >

                <div className="water-process-dot">
                  {index < current ? "✓" : index + 1}
                </div>

                <span>
                  {stage.title}
                </span>

              </div>
            ))}

          </div>

          {/* CONCEPT CARDS */}

          <div className="water-concepts">

            <div className="water-concept">
              <span>☀️</span>
              <strong>Evaporation</strong>
              <p>
                Liquid water changes into water vapor.
              </p>
            </div>

            <div className="water-concept">
              <span>☁️</span>
              <strong>Condensation</strong>
              <p>
                Water vapor cools and forms droplets.
              </p>
            </div>

            <div className="water-concept">
              <span>🌧️</span>
              <strong>Precipitation</strong>
              <p>
                Water falls back to Earth's surface.
              </p>
            </div>

            <div className="water-concept">
              <span>🌊</span>
              <strong>Collection</strong>
              <p>
                Water gathers in oceans, lakes and rivers.
              </p>
            </div>

          </div>

        </div>

      </div>
      <style>{`.water-cycle {
  width: 100%;
}

.water-cycle-scene {
  position: relative;
  height: 500px;
  overflow: hidden;
  border-radius: 22px;
  background: #b9e4f5;
  border: 1px solid rgba(255,255,255,0.1);
}

/* SKY */

.water-sky {
  position: absolute;
  inset: 0 0 45% 0;
  background: linear-gradient(
    to bottom,
    #9dd8f0,
    #d9f2fa
  );
}

.water-sun {
  position: absolute;
  right: 40px;
  top: 25px;
  font-size: 42px;
  z-index: 4;
}

.sun-rays {
  position: absolute;
  right: 54px;
  top: 65px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.sun-rays span {
  position: absolute;
  width: 2px;
  height: 15px;
  background: rgba(255,190,40,0.7);
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
}

.sun-rays span:nth-child(1) {
  transform: rotate(0deg) translateY(-48px);
}

.sun-rays span:nth-child(2) {
  transform: rotate(60deg) translateY(-48px);
}

.sun-rays span:nth-child(3) {
  transform: rotate(120deg) translateY(-48px);
}

.sun-rays span:nth-child(4) {
  transform: rotate(180deg) translateY(-48px);
}

.sun-rays span:nth-child(5) {
  transform: rotate(240deg) translateY(-48px);
}

.sun-rays span:nth-child(6) {
  transform: rotate(300deg) translateY(-48px);
}

/* CLOUDS */

.water-cloud {
  position: absolute;
  z-index: 8;
}

.cloud-main {
  left: 45%;
  top: 55px;
  width: 160px;
  height: 70px;
}

.cloud-part {
  position: absolute;
  background: rgba(255,255,255,0.9);
  border-radius: 50%;
}

.cloud-p1 {
  width: 65px;
  height: 55px;
  left: 15px;
  top: 15px;
}

.cloud-p2 {
  width: 75px;
  height: 65px;
  left: 48px;
  top: 3px;
}

.cloud-p3 {
  width: 60px;
  height: 50px;
  right: 10px;
  top: 20px;
}

.cloud-p4 {
  left: 20px;
  right: 20px;
  bottom: 0;
  height: 35px;
  border-radius: 30px;
}

.cloud-small {
  left: 15%;
  top: 90px;
  width: 105px;
  height: 55px;
}

.cloud-s1 {
  width: 45px;
  height: 38px;
  left: 15px;
  top: 14px;
}

.cloud-s2 {
  width: 60px;
  height: 45px;
  right: 10px;
  top: 10px;
}

/* VAPOR */

.vapor-container {
  position: absolute;
  left: 27%;
  bottom: 5px;
  width: 110px;
  height: 160px;
  z-index: 15;
}

.vapor-particle {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(255,255,255,0.8);
}

.vapor-particle:nth-child(1) {
  left: 10%;
}

.vapor-particle:nth-child(2) {
  left: 25%;
}

.vapor-particle:nth-child(3) {
  left: 40%;
}

.vapor-particle:nth-child(4) {
  left: 55%;
}

.vapor-particle:nth-child(5) {
  left: 70%;
}

/* CONDENSATION */

.condensation-zone {
  position: absolute;
  left: 45%;
  top: 75px;
  width: 150px;
  height: 70px;
  z-index: 20;
}

.condensation-particle {
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #d7f4ff;
}

.condensation-particle:nth-child(1) {
  left: 20px;
  top: 20px;
}

.condensation-particle:nth-child(2) {
  left: 50px;
  top: 10px;
}

.condensation-particle:nth-child(3) {
  left: 80px;
  top: 25px;
}

.condensation-particle:nth-child(4) {
  left: 110px;
  top: 15px;
}

/* RAIN */

.rain-container {
  position: absolute;
  left: 43%;
  top: 145px;
  width: 190px;
  height: 170px;
  z-index: 25;
}

.rain-drop {
  position: absolute;
  top: 0;
  width: 3px;
  height: 17px;
  border-radius: 3px;
  background: #4c9ed8;
}

/* LAND */

.water-land {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55%;
  background: #7d6048;
}

/* MOUNTAINS */

.water-mountains {
  position: absolute;
  top: -105px;
  left: 8%;
  width: 420px;
  height: 170px;
}

.water-mountain {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 95px solid transparent;
  border-right: 95px solid transparent;
  border-bottom: 150px solid #667064;
}

.mountain-one {
  left: 0;
}

.mountain-two {
  left: 130px;
  border-left-width: 110px;
  border-right-width: 110px;
  border-bottom-width: 175px;
}

.mountain-three {
  left: 270px;
  border-bottom-width: 125px;
}

.mountain-snow-cap {
  position: absolute;
  left: 198px;
  top: 0;
  width: 45px;
  height: 55px;
  background: white;
  clip-path: polygon(
    50% 0,
    100% 100%,
    65% 75%,
    50% 100%,
    30% 75%,
    0 100%
  );
}

/* RIVER */

.river {
  position: absolute;
  left: 32%;
  top: 20px;
  width: 100px;
  height: 220px;
  background: #4b9fc5;
  clip-path: polygon(
    30% 0,
    65% 0,
    55% 30%,
    75% 55%,
    48% 100%,
    15% 100%,
    35% 55%,
    20% 30%
  );
  z-index: 5;
}

.river-current {
  position: absolute;
  left: 20%;
  top: 15%;
  width: 60%;
  height: 4px;
  border-radius: 4px;
  background: rgba(255,255,255,0.45);
}

/* OCEAN */

.ocean {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 80px;
  background: #3988ad;
  z-index: 10;
  overflow: hidden;
}

.ocean-wave {
  position: absolute;
  width: 120%;
  height: 20px;
  border-top: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
}

.wave-1 {
  top: 15px;
  left: -10%;
}

.wave-2 {
  top: 40px;
  left: -20%;
}

.wave-3 {
  top: 65px;
  left: -5%;
}

.ocean-label {
  position: absolute;
  right: 20px;
  bottom: 10px;
  color: white;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
}

/* RUNOFF */

.runoff {
  position: absolute;
  left: 29%;
  top: 75px;
  width: 15px;
  background: #4b9fc5;
  z-index: 12;
  border-radius: 10px;
}

.runoff-water {
  width: 100%;
  height: 100%;
  background: #4b9fc5;
}

.runoff-label {
  position: absolute;
  left: 25px;
  top: 35px;
}

/* GROUNDWATER */

.groundwater {
  position: absolute;
  left: 15%;
  bottom: 10px;
  width: 170px;
  height: 35px;
  border-radius: 50%;
  background: #447b91;
  z-index: 3;
}

.groundwater span:not(.groundwater-label) {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 12px 5px;
  border-radius: 50%;
  background: #a8e4fa;
}

.groundwater-label {
  position: absolute;
  top: 38px;
  left: 20px;
  color: rgba(255,255,255,0.55);
  font-size: 9px;
  font-weight: 800;
}

/* TREES */

.trees {
  position: absolute;
  left: 8%;
  bottom: 55px;
  z-index: 20;
  display: flex;
  gap: 8px;
  font-size: 25px;
}

/* LABELS */

.cycle-label {
  padding: 7px 12px;
  border-radius: 20px;
  background: rgba(0,0,0,0.55);
  color: white;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
  white-space: nowrap;
}

.evaporation-label {
  position: absolute;
  left: 65px;
  bottom: 55px;
}

.condensation-label {
  position: absolute;
  left: 35px;
  top: 65px;
}

.precipitation-label {
  position: absolute;
  left: 25px;
  top: 70px;
}

.runoff-label {
  position: absolute;
  white-space: nowrap;
}

/* CYCLE ARROWS */

.water-cycle-arrow {
  position: absolute;
  z-index: 50;
  font-size: 35px;
  font-weight: 900;
  opacity: 0.6;
}

.arrow-evaporation {
  left: 24%;
  bottom: 27%;
}

.arrow-condensation {
  left: 58%;
  top: 23%;
}

.arrow-precipitation {
  right: 27%;
  top: 39%;
}

.arrow-runoff {
  left: 22%;
  bottom: 18%;
}

/* DROPLETS */

.water-droplet {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 4px;
  border-radius: 50%;
  background: #bceeff;
}

.ocean-droplets {
  position: absolute;
  left: 30%;
  top: 25px;
}

/* INFORMATION */

.water-cycle-info {
  padding: 25px 5px 5px;
}

.water-step {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  opacity: 0.55;
}

.water-cycle-info h2 {
  margin: 7px 0;
  font-size: 28px;
}

.water-subtitle {
  margin: 0 0 20px;
  opacity: 0.65;
}

.water-explanation {
  display: flex;
  gap: 15px;
  padding: 18px;
  border-radius: 16px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
}

.water-info-icon {
  font-size: 28px;
}

.water-explanation strong {
  font-size: 14px;
}

.water-explanation p {
  margin: 6px 0 0;
  line-height: 1.6;
  opacity: 0.75;
}

/* PROCESS */

.water-process {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 25px;
}

.water-process-step {
  flex: 1;
  text-align: center;
  opacity: 0.4;
}

.water-process-step.active {
  opacity: 1;
}

.water-process-step.completed {
  opacity: 0.75;
}

.water-process-dot {
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

.water-process-step.active .water-process-dot {
  transform: scale(1.15);
  background: rgba(255,255,255,0.2);
}

.water-process-step span {
  display: block;
  margin-top: 8px;
  font-size: 10px;
}

/* CONCEPT CARDS */

.water-concepts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 25px;
}

.water-concept {
  padding: 16px;
  border-radius: 14px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
}

.water-concept span {
  font-size: 23px;
}

.water-concept strong {
  display: block;
  margin-top: 7px;
  font-size: 13px;
}

.water-concept p {
  margin: 6px 0 0;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}

@media (max-width: 800px) {
  .water-concepts {
    grid-template-columns: repeat(2, 1fr);
  }

  .water-process {
    overflow-x: auto;
  }

  .water-process-step {
    min-width: 110px;
  }
}`}</style>
    </VisualizationShell>
  );
}

export default WaterCycle;