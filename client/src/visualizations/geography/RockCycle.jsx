import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

const stages = [
  {
    title: "Magma",
    subtitle: "Hot molten rock exists beneath Earth's surface.",
    explanation:
      "Deep inside Earth, extremely hot material can exist as molten rock called magma."
  },
  {
    title: "Cooling & Crystallization",
    subtitle: "Magma cools and forms crystals.",
    explanation:
      "When magma cools, minerals crystallize and solidify. This forms igneous rock."
  },
  {
    title: "Weathering & Erosion",
    subtitle: "Rocks break down into sediments.",
    explanation:
      "Wind, water, ice and temperature changes break rocks into smaller pieces called sediments."
  },
  {
    title: "Compaction & Cementation",
    subtitle: "Sediments become sedimentary rock.",
    explanation:
      "Sediments accumulate in layers. Pressure compacts them and minerals cement them together."
  },
  {
    title: "Heat & Pressure",
    subtitle: "Existing rock changes into metamorphic rock.",
    explanation:
      "Heat and pressure deep inside Earth can change an existing rock without completely melting it."
  },
  {
    title: "Melting",
    subtitle: "Rock melts and becomes magma again.",
    explanation:
      "If rocks become hot enough, they melt and return to the molten magma state."
  }
];

function Rock({ type, x, y, scale = 1 }) {
  const colors = {
    magma: "#e56b32",
    igneous: "#66707a",
    sedimentary: "#b58a58",
    metamorphic: "#786b82"
  };

  return (
    <motion.div
      className={`rock rock-${type}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        scale
      }}
      animate={{
        rotate:
          type === "magma"
            ? [0, 4, -4, 0]
            : [0, 1, -1, 0]
      }}
      transition={{
        duration: type === "magma" ? 2 : 4,
        repeat: Infinity
      }}
    >
      <div
        className="rock-body"
        style={{
          background: colors[type]
        }}
      />

      {type === "sedimentary" && (
        <div className="rock-layers">
          <span />
          <span />
          <span />
        </div>
      )}

      {type === "metamorphic" && (
        <div className="metamorphic-lines">
          <span />
          <span />
          <span />
        </div>
      )}

      {type === "igneous" && (
        <div className="crystals">
          <i />
          <i />
          <i />
        </div>
      )}
    </motion.div>
  );
}

function RockCycle({ step = 0, playing = false }) {
  const current = Math.min(step, stages.length - 1);

  const showMagma = current === 0 || current === 5;
  const showIgneous = current === 1 || current >= 2;
  const showSediments = current === 2;
  const showSedimentary = current === 3 || current >= 4;
  const showMetamorphic = current === 4 || current === 5;

  return (
    <VisualizationShell
      title="Rock Cycle"
      subtitle="Watch how rocks continuously transform through Earth's internal and surface processes."
    >
      <div className="rock-cycle">

        {/* ================= SCENE ================= */}

        <div className="rock-cycle-scene">

          {/* SKY */}
          <div className="rock-sky">
            <div className="sun">☀️</div>

            <motion.div
              className="cloud cloud-1"
              animate={
                playing
                  ? { x: [0, 35, 0] }
                  : {}
              }
              transition={{
                duration: 7,
                repeat: Infinity
              }}
            >
              ☁️
            </motion.div>

            <motion.div
              className="cloud cloud-2"
              animate={
                playing
                  ? { x: [0, -25, 0] }
                  : {}
              }
              transition={{
                duration: 8,
                repeat: Infinity
              }}
            >
              ☁️
            </motion.div>
          </div>

          {/* MOUNTAIN */}
          <div className="rock-mountain">
            <div className="mountain-shape mountain-a" />
            <div className="mountain-shape mountain-b" />
            <div className="mountain-snow" />
          </div>

          {/* GROUND */}
          <div className="rock-ground">

            {/* Soil layers */}
            <div className="soil-layer soil-top" />
            <div className="soil-layer soil-middle" />
            <div className="soil-layer soil-deep" />

            {/* Underground magma */}
            <motion.div
              className="magma-zone"
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
              <div className="magma-label">
                MAGMA
              </div>

              <div className="magma-particles">
                {[...Array(14)].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={
                      playing
                        ? {
                            y: [0, -15, 0],
                            x: [0, i % 2 ? 8 : -8, 0]
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.5 + (i % 3) * 0.3,
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>
            </motion.div>

          </div>

          {/* ================= PROCESS ANIMATIONS ================= */}

          {/* Cooling */}
          {current === 1 && (
            <div className="cooling-animation">

              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="cooling-particle"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0
                  }}
                  animate={{
                    x: (i % 4) * 25 - 35,
                    y: -30 - (i % 3) * 15,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}

              <div className="process-label">
                ❄️ COOLING
              </div>

            </div>
          )}

          {/* Igneous Rock */}
          {showIgneous && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.4
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              className="scene-rock igneous-scene-rock"
            >
              <Rock
                type="igneous"
                x={32}
                y={43}
                scale={1.1}
              />

              <div className="scene-rock-label">
                IGNEOUS ROCK
              </div>
            </motion.div>
          )}

          {/* Weathering particles */}
          {current === 2 && (
            <div className="weathering-animation">

              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="sediment-particle"
                  initial={{
                    x: 0,
                    y: 0
                  }}
                  animate={{
                    x: 90 + (i * 7),
                    y: 60 + (i % 4) * 15
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.08
                  }}
                />
              ))}

              <div className="weathering-label">
                🌧️ WEATHERING + EROSION
              </div>

            </div>
          )}

          {/* Sediments */}
          {showSediments && (
            <motion.div
              className="sediment-bed"
              initial={{
                opacity: 0,
                y: -20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
            >
              <div />
              <div />
              <div />
              <span>SEDIMENTS</span>
            </motion.div>
          )}

          {/* Compaction arrows */}
          {current === 3 && (
            <div className="compaction-animation">

              <motion.div
                animate={
                  playing
                    ? { y: [0, 15, 0] }
                    : {}
                }
                transition={{
                  duration: 1.2,
                  repeat: Infinity
                }}
                className="pressure-arrow pressure-top"
              >
                ↓
              </motion.div>

              <motion.div
                animate={
                  playing
                    ? { y: [0, -15, 0] }
                    : {}
                }
                transition={{
                  duration: 1.2,
                  repeat: Infinity
                }}
                className="pressure-arrow pressure-bottom"
              >
                ↑
              </motion.div>

              <div className="process-label">
                PRESSURE
              </div>

            </div>
          )}

          {/* Sedimentary rock */}
          {showSedimentary && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              className="scene-rock sedimentary-scene-rock"
            >
              <Rock
                type="sedimentary"
                x={57}
                y={49}
                scale={1}
              />

              <div className="scene-rock-label">
                SEDIMENTARY ROCK
              </div>
            </motion.div>
          )}

          {/* Heat */}
          {current === 4 && (
            <div className="heat-animation">

              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="heat-wave"
                  animate={{
                    y: [-5, -25, -5],
                    opacity: [0.2, 1, 0.2]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.12,
                    repeat: Infinity
                  }}
                >
                  🔥
                </motion.div>
              ))}

              <div className="process-label">
                🔥 HEAT + PRESSURE
              </div>

            </div>
          )}

          {/* Metamorphic rock */}
          {showMetamorphic && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              className="scene-rock metamorphic-scene-rock"
            >
              <Rock
                type="metamorphic"
                x={72}
                y={62}
                scale={1}
              />

              <div className="scene-rock-label">
                METAMORPHIC ROCK
              </div>
            </motion.div>
          )}

          {/* Melting */}
          {current === 5 && (
            <div className="melting-animation">

              <motion.div
                className="melting-arrow"
                animate={
                  playing
                    ? {
                        y: [0, 30, 0]
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                🔥
              </motion.div>

              <div className="process-label">
                MELTING
              </div>

            </div>
          )}

          {/* Cycle arrows */}
          <div className="cycle-arrow arrow-top">
            ↓
          </div>

          <div className="cycle-arrow arrow-right">
            →
          </div>

          <div className="cycle-arrow arrow-bottom">
            ↑
          </div>

        </div>

        {/* ================= INFO ================= */}

        <div className="rock-cycle-info">

          <div className="stage-number">
            STEP {current + 1} / {stages.length}
          </div>

          <h2>{stages[current].title}</h2>

          <p className="stage-subtitle">
            {stages[current].subtitle}
          </p>

          <div className="rock-explanation">

            <div className="rock-explanation-icon">
              🪨
            </div>

            <div>
              <strong>What's happening?</strong>

              <p>
                {stages[current].explanation}
              </p>
            </div>

          </div>

          {/* Process timeline */}

          <div className="rock-process">

            {stages.map((stage, index) => (
              <div
                key={stage.title}
                className={`rock-process-step ${
                  index === current ? "active" : ""
                } ${index < current ? "completed" : ""}`}
              >

                <div className="rock-process-dot">
                  {index < current ? "✓" : index + 1}
                </div>

                <span>
                  {stage.title}
                </span>

              </div>
            ))}

          </div>

          {/* Rock types */}

          <div className="rock-types">

            <div className="rock-type-card">
              <div className="rock-type-icon igneous-icon">
                🪨
              </div>
              <strong>Igneous</strong>
              <p>
                Formed when magma or lava cools.
              </p>
            </div>

            <div className="rock-type-card">
              <div className="rock-type-icon sedimentary-icon">
                🏔️
              </div>
              <strong>Sedimentary</strong>
              <p>
                Formed from compacted and cemented sediments.
              </p>
            </div>

            <div className="rock-type-card">
              <div className="rock-type-icon metamorphic-icon">
                🔥
              </div>
              <strong>Metamorphic</strong>
              <p>
                Formed when existing rocks change under heat and pressure.
              </p>
            </div>

          </div>

        </div>

      </div>
      <style>
        {`
        .rock-cycle {
  width: 100%;
}

.rock-cycle-scene {
  position: relative;
  height: 470px;
  overflow: hidden;
  border-radius: 22px;
  background: #bfe5f5;
  border: 1px solid rgba(255,255,255,0.1);
}

/* SKY */

.rock-sky {
  position: absolute;
  inset: 0 0 55% 0;
}

.sun {
  position: absolute;
  right: 35px;
  top: 25px;
  font-size: 35px;
}

.cloud {
  position: absolute;
  font-size: 42px;
  opacity: 0.8;
}

.cloud-1 {
  top: 55px;
  left: 18%;
}

.cloud-2 {
  top: 95px;
  right: 22%;
}

/* MOUNTAIN */

.rock-mountain {
  position: absolute;
  left: 18%;
  top: 22%;
  width: 300px;
  height: 160px;
  z-index: 2;
}

.mountain-shape {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: 160px solid #596057;
}

.mountain-a {
  left: 0;
}

.mountain-b {
  left: 120px;
  border-left-width: 85px;
  border-right-width: 85px;
  border-bottom-width: 130px;
}

.mountain-snow {
  position: absolute;
  left: 78px;
  top: 20px;
  width: 45px;
  height: 45px;
  background: #e9f3f5;
  clip-path: polygon(
    50% 0,
    100% 100%,
    70% 80%,
    50% 100%,
    30% 75%,
    0 100%
  );
}

/* GROUND */

.rock-ground {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 53%;
  background: #8c684c;
  overflow: hidden;
}

.soil-layer {
  position: absolute;
  left: 0;
  right: 0;
}

.soil-top {
  top: 0;
  height: 18px;
  background: #596448;
}

.soil-middle {
  top: 18px;
  height: 75px;
  background: #8b6549;
}

.soil-deep {
  top: 93px;
  bottom: 0;
  background: #684838;
}

/* MAGMA */

.magma-zone {
  position: absolute;
  left: 28%;
  bottom: -90px;
  width: 44%;
  height: 170px;
  border-radius: 50% 50% 0 0;
  background: #c84e27;
  border: 5px solid #74321f;
  box-shadow: 0 -15px 35px rgba(255,120,40,0.35);
}

.magma-label {
  text-align: center;
  margin-top: 35px;
  color: white;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 2px;
}

.magma-particles span {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ffd166;
}

.magma-particles span:nth-child(1) {
  left: 15%;
  top: 50%;
}

.magma-particles span:nth-child(2) {
  left: 28%;
  top: 65%;
}

.magma-particles span:nth-child(3) {
  left: 42%;
  top: 48%;
}

.magma-particles span:nth-child(4) {
  left: 58%;
  top: 60%;
}

.magma-particles span:nth-child(5) {
  left: 72%;
  top: 45%;
}

/* ROCK */

.rock {
  position: absolute;
  width: 90px;
  height: 70px;
}

.rock-body {
  width: 100%;
  height: 100%;
  clip-path: polygon(
    12% 75%,
    20% 35%,
    45% 10%,
    78% 20%,
    95% 60%,
    75% 90%,
    35% 95%
  );
}

/* CRYSTALS */

.crystals i {
  position: absolute;
  width: 7px;
  height: 7px;
  background: #c8d0d5;
  border-radius: 50%;
}

.crystals i:nth-child(1) {
  left: 30%;
  top: 30%;
}

.crystals i:nth-child(2) {
  left: 60%;
  top: 50%;
}

.crystals i:nth-child(3) {
  left: 42%;
  top: 70%;
}

/* SEDIMENTARY */

.rock-layers {
  position: absolute;
  inset: 20px 10px;
}

.rock-layers span {
  display: block;
  height: 6px;
  margin: 5px 0;
  border-radius: 3px;
  background: rgba(255,255,255,0.25);
}

/* METAMORPHIC */

.metamorphic-lines {
  position: absolute;
  inset: 10px;
  transform: rotate(-15deg);
}

.metamorphic-lines span {
  display: block;
  height: 5px;
  margin: 10px 0;
  background: rgba(255,255,255,0.3);
}

/* SCENE ROCKS */

.scene-rock {
  position: absolute;
  z-index: 20;
}

.igneous-scene-rock {
  left: 30%;
  top: 43%;
}

.sedimentary-scene-rock {
  left: 55%;
  top: 48%;
}

.metamorphic-scene-rock {
  left: 70%;
  top: 58%;
}

.scene-rock-label {
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 5px 9px;
  border-radius: 8px;
  background: rgba(0,0,0,0.45);
  color: white;
  font-size: 9px;
  font-weight: 800;
}

/* COOLING */

.cooling-animation {
  position: absolute;
  left: 35%;
  top: 38%;
  z-index: 30;
}

.cooling-particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d8f3ff;
}

.process-label {
  padding: 8px 13px;
  border-radius: 20px;
  background: rgba(0,0,0,0.55);
  color: white;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  white-space: nowrap;
}

/* WEATHERING */

.weathering-animation {
  position: absolute;
  left: 35%;
  top: 37%;
  z-index: 30;
}

.sediment-particle {
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #c99b64;
}

.weathering-label {
  padding: 8px 13px;
  border-radius: 20px;
  background: rgba(0,0,0,0.55);
  color: white;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

/* SEDIMENT BED */

.sediment-bed {
  position: absolute;
  left: 53%;
  top: 60%;
  width: 130px;
  z-index: 25;
}

.sediment-bed div {
  height: 13px;
  border-radius: 3px;
  margin-bottom: 3px;
  background: #b99160;
}

.sediment-bed div:nth-child(2) {
  background: #98724f;
}

.sediment-bed div:nth-child(3) {
  background: #c4a06f;
}

.sediment-bed span {
  display: block;
  margin-top: 5px;
  text-align: center;
  font-size: 9px;
  font-weight: 800;
  color: white;
}

/* COMPACTION */

.compaction-animation {
  position: absolute;
  left: 57%;
  top: 45%;
  z-index: 40;
  text-align: center;
}

.pressure-arrow {
  font-size: 42px;
  font-weight: 900;
}

.pressure-bottom {
  margin-top: 60px;
}

/* HEAT */

.heat-animation {
  position: absolute;
  left: 68%;
  top: 53%;
  display: flex;
  gap: 7px;
  align-items: center;
  z-index: 40;
}

.heat-wave {
  font-size: 25px;
}

/* MELTING */

.melting-animation {
  position: absolute;
  left: 65%;
  top: 58%;
  z-index: 40;
  text-align: center;
}

.melting-arrow {
  font-size: 40px;
}

/* CYCLE ARROWS */

.cycle-arrow {
  position: absolute;
  z-index: 50;
  font-size: 35px;
  font-weight: 900;
  opacity: 0.7;
}

.arrow-top {
  left: 48%;
  top: 24%;
}

.arrow-right {
  right: 20%;
  top: 47%;
}

.arrow-bottom {
  left: 48%;
  bottom: 15%;
}

/* INFO */

.rock-cycle-info {
  padding: 25px 5px 5px;
}

.stage-number {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  opacity: 0.55;
}

.rock-cycle-info h2 {
  margin: 7px 0;
  font-size: 28px;
}

.stage-subtitle {
  margin-bottom: 20px;
  opacity: 0.65;
}

.rock-explanation {
  display: flex;
  gap: 15px;
  padding: 18px;
  border-radius: 16px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
}

.rock-explanation-icon {
  font-size: 28px;
}

.rock-explanation strong {
  font-size: 14px;
}

.rock-explanation p {
  margin: 6px 0 0;
  line-height: 1.6;
  opacity: 0.75;
}

/* PROCESS */

.rock-process {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 25px;
}

.rock-process-step {
  flex: 1;
  text-align: center;
  opacity: 0.4;
}

.rock-process-step.active {
  opacity: 1;
}

.rock-process-step.completed {
  opacity: 0.75;
}

.rock-process-dot {
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

.rock-process-step.active .rock-process-dot {
  transform: scale(1.15);
  background: rgba(255,255,255,0.2);
}

.rock-process-step span {
  display: block;
  margin-top: 8px;
  font-size: 10px;
}

/* ROCK TYPES */

.rock-types {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 25px;
}

.rock-type-card {
  padding: 16px;
  border-radius: 14px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
}

.rock-type-icon {
  font-size: 24px;
}

.rock-type-card strong {
  display: block;
  margin-top: 7px;
  font-size: 13px;
}

.rock-type-card p {
  margin: 6px 0 0;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}

@media (max-width: 800px) {
  .rock-types {
    grid-template-columns: 1fr;
  }

  .rock-process {
    overflow-x: auto;
  }

  .rock-process-step {
    min-width: 110px;
  }
}`}
      </style>
    </VisualizationShell>
  );
}

export default RockCycle;