import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function Photosynthesis({ step, playing }) {
  const isPlaying = playing;

  const stages = [
    "☀️ Sunlight",
    "💧 Water",
    "CO₂",
    "🍃 Photosynthesis",
    "O₂",
  ];

  const pulseTransition = {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <VisualizationShell
      title="Photosynthesis"
      subtitle="Watch how plants convert light energy into chemical energy."
    >
      <div className="photo-scene">

        {/* =====================================================
            SKY
        ====================================================== */}

        <div className="photo-sky">

          {/* SUN */}
          <motion.div
            className="photo-sun"
            animate={
              isPlaying && step >= 0
                ? {
                    scale: [1, 1.08, 1],
                    rotate: [0, 3, -3, 0],
                  }
                : { scale: 1 }
            }
            transition={pulseTransition}
          >
            <div className="sun-core">☀</div>
          </motion.div>

          {/* SUN RAYS */}
          {step >= 0 &&
            [0, 1, 2, 3, 4].map((ray) => (
              <motion.div
                key={ray}
                className={`sun-beam beam-${ray}`}
                animate={
                  isPlaying
                    ? {
                        opacity: [0.2, 1, 0.2],
                        scaleY: [0.8, 1, 0.8],
                      }
                    : {
                        opacity: 0.7,
                        scaleY: 1,
                      }
                }
                transition={{
                  duration: 1.4,
                  delay: ray * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* CLOUDS */}
          <div className="cloud cloud-one">☁️</div>
          <div className="cloud cloud-two">☁️</div>


          {/* CO2 MOLECULES IN AIR */}
          {step >= 2 &&
            [0, 1, 2].map((item) => (
              <motion.div
                key={`co2-${item}`}
                className="co2-molecule"
                animate={
                  isPlaying
                    ? {
                        x: [0, 80, 160, 230],
                        y: [0, -10, 8, -5],
                        opacity: [0, 1, 1, 0],
                      }
                    : {
                        opacity: 1,
                      }
                }
                transition={{
                  duration: 3,
                  delay: item * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="molecule-red" />
                <span className="molecule-black" />
                <span className="molecule-red" />

                <b>CO₂</b>
              </motion.div>
            ))}


          {/* OXYGEN MOLECULES */}
          {step >= 4 &&
            [0, 1, 2].map((item) => (
              <motion.div
                key={`oxygen-${item}`}
                className="oxygen-molecule"
                animate={
                  isPlaying
                    ? {
                        x: [0, 50, 100, 160],
                        y: [0, -25, -45, -65],
                        opacity: [0, 1, 1, 0],
                      }
                    : {
                        opacity: 1,
                      }
                }
                transition={{
                  duration: 2.8,
                  delay: item * 0.7,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                <span className="oxygen-ball" />
                <span className="oxygen-ball" />

                <b>O₂</b>
              </motion.div>
            ))}
        </div>


        {/* =====================================================
            MAIN PLANT AREA
        ====================================================== */}

        <div className="plant-world">

          {/* GROUND */}
          <div className="ground">
            <div className="soil-layer" />

            <div className="grass">
              🌱 🌿 🌱 🌿 🌱
            </div>
          </div>


          {/* =================================================
              WATER PARTICLES IN SOIL
          ================================================== */}

          {step >= 1 &&
            [0, 1, 2, 3, 4, 5].map((item) => (
              <motion.div
                key={`water-${item}`}
                className="water-particle"
                animate={
                  isPlaying
                    ? {
                        x: [
                          0,
                          10,
                          -5,
                          5,
                        ],
                        y: [
                          0,
                          -45,
                          -100,
                          -155,
                          -205,
                        ],
                        opacity: [
                          0,
                          1,
                          1,
                          1,
                          0,
                        ],
                      }
                    : {
                        opacity: 1,
                      }
                }
                transition={{
                  duration: 3,
                  delay: item * 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💧
              </motion.div>
            ))}


          {/* =================================================
              ROOTS
          ================================================== */}

          <svg
            className="root-system"
            viewBox="0 0 400 260"
            preserveAspectRatio="none"
          >

            {/* MAIN ROOT */}
            <motion.path
              d="M200 0 C200 50 200 100 200 150 C190 190 180 220 160 260"
              fill="none"
              stroke="#d49a6a"
              strokeWidth="9"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: step >= 1 ? 1 : 0,
              }}
              transition={{ duration: 2 }}
            />

            {/* ROOT BRANCHES */}
            {[1, 2, 3, 4, 5].map((root) => (
              <motion.path
                key={root}
                d={`M200 ${40 + root * 35}
                    C${150 - root * 8} ${70 + root * 30},
                    ${110 - root * 10} ${90 + root * 30},
                    ${80 - root * 5} ${120 + root * 20}`}
                fill="none"
                stroke="#c88b5a"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: step >= 1 ? 1 : 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: root * 0.12,
                }}
              />
            ))}

          </svg>


          {/* =================================================
              PLANT STEM
          ================================================== */}

          <motion.div
            className="plant-stem"
            animate={{
              height:
                step >= 4
                  ? 250
                  : step >= 2
                  ? 210
                  : step >= 1
                  ? 150
                  : 100,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />


          {/* =================================================
              LEAVES
          ================================================== */}

          <motion.div
            className="leaf leaf-left"
            initial={{ scale: 0 }}
            animate={{
              scale: step >= 1 ? 1 : 0,
              rotate:
                step >= 3
                  ? -12
                  : -5,
            }}
            transition={{
              duration: 1.2,
            }}
          >
            🍃
          </motion.div>


          <motion.div
            className="leaf leaf-right"
            initial={{ scale: 0 }}
            animate={{
              scale: step >= 2 ? 1 : 0,
              rotate:
                step >= 3
                  ? 12
                  : 5,
            }}
            transition={{
              duration: 1.2,
              delay: 0.2,
            }}
          >
            🍃
          </motion.div>


          {/* TOP LEAVES */}

          <motion.div
            className="top-leaf"
            initial={{ scale: 0 }}
            animate={{
              scale: step >= 3 ? 1 : 0,
            }}
            transition={{
              duration: 1,
            }}
          >
            🍃
          </motion.div>


          {/* =================================================
              WATER FLOW INSIDE STEM
          ================================================== */}

          {step >= 1 &&
            [0, 1, 2].map((item) => (
              <motion.div
                key={`stem-water-${item}`}
                className="stem-water"
                animate={
                  isPlaying
                    ? {
                        y: [0, -70, -150, -220],
                        opacity: [0, 1, 1, 0],
                      }
                    : {
                        opacity: 1,
                      }
                }
                transition={{
                  duration: 2.5,
                  delay: item * 0.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                💧
              </motion.div>
            ))}


          {/* =================================================
              CHLOROPHYLL GLOW
          ================================================== */}

          {step >= 3 && (
            <motion.div
              className="chlorophyll-glow"
              animate={
                isPlaying
                  ? {
                      scale: [1, 1.25, 1],
                      opacity: [0.3, 1, 0.3],
                    }
                  : {
                      scale: 1,
                      opacity: 0.8,
                    }
              }
              transition={pulseTransition}
            >
              CHLOROPHYLL
            </motion.div>
          )}


          {/* =================================================
              PHOTOSYNTHESIS REACTION
          ================================================== */}

          {step >= 3 && (
            <motion.div
              className="reaction-center"
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale:
                  isPlaying
                    ? [0.8, 1.15, 1]
                    : 1,
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
              }}
            >
              <div className="reaction-title">
                PHOTOSYNTHESIS
              </div>

              <div className="reaction-inputs">
                <span>☀️</span>
                <span>+</span>
                <span>💧</span>
                <span>+</span>
                <span>CO₂</span>
              </div>

              <div className="reaction-arrow">
                ↓
              </div>

              <motion.div
                className="glucose"
                animate={
                  isPlaying
                    ? {
                        scale: [0.7, 1.2, 1],
                        opacity: [0.3, 1, 1],
                      }
                    : {
                        scale: 1,
                        opacity: 1,
                      }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                🍬 Glucose
              </motion.div>
            </motion.div>
          )}


          {/* =================================================
              GROWTH INDICATOR
          ================================================== */}

          <motion.div
            className="growth-label"
            animate={{
              opacity: step >= 2 ? 1 : 0,
            }}
          >
            🌱 Plant is growing
          </motion.div>


          {/* =================================================
              PROCESS PIPELINE
          ================================================== */}

          <div className="photo-process">

            {stages.map((stage, index) => (
              <div
                key={stage}
                className={`photo-process-item ${
                  index === step
                    ? "current"
                    : index < step
                    ? "completed"
                    : ""
                }`}
              >
                <div className="process-number">
                  {index < step
                    ? "✓"
                    : index + 1}
                </div>

                <span>
                  {stage}
                </span>
              </div>
            ))}

          </div>


          {/* =================================================
              FORMULA
          ================================================== */}

          <motion.div
            className="photo-formula"
            animate={
              step >= 3
                ? {
                    scale: [1, 1.03, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <span>6CO₂</span>

            <b>+</b>

            <span>6H₂O</span>

            <b>+</b>

            <span>☀️ Light</span>

            <b>→</b>

            <strong>
              C₆H₁₂O₆
            </strong>

            <b>+</b>

            <strong>
              6O₂
            </strong>
          </motion.div>

        </div>

      </div>
    </VisualizationShell>
  );
}