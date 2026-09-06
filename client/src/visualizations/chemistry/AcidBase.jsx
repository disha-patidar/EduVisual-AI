import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function AcidBase({ step, playing }) {
  const stages = [
    "🧪 Acid",
    "🔴 H⁺ ions",
    "🔵 OH⁻ ions",
    "💧 Neutralization",
    "⚖️ Neutral solution"
  ];

  const active = (n) => step >= n;

  return (
    <VisualizationShell
      title="Acids & Bases"
      subtitle="See how H⁺ and OH⁻ ions interact during neutralization."
    >
      <div className="sim-scene acid-base-scene">

        {/* =========================
            TITLE
        ========================== */}

        <div className="ab-title">
          Acid + Base Neutralization
        </div>

        {/* =========================
            BEAKERS
        ========================== */}

        <div className="beakers-container">

          {/* ACID BEAKER */}

          <motion.div
            className="chemical-beaker acid-beaker"
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: active(0) ? 1 : 0,
              y: active(0) ? 0 : 30
            }}
            transition={{
              duration: 0.7
            }}
          >

            <div className="beaker-label">
              Acid
            </div>

            <div className="beaker-glass">
              <div className="acid-liquid" />

              {/* H+ ions */}
              {active(1) &&
                [0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={`h-${i}`}
                    className="h-ion"
                    style={{
                      left: `${20 + i * 15}%`,
                      bottom: `${25 + (i % 3) * 18}px`
                    }}
                    animate={
                      active(3)
                        ? {
                            x: [0, 90, 180],
                            y: [
                              0,
                              -15,
                              10
                            ],
                            opacity: [
                              1,
                              1,
                              0
                            ]
                          }
                        : {
                            y: [
                              0,
                              -15,
                              0
                            ],
                            x: [
                              0,
                              8,
                              -8,
                              0
                            ]
                          }
                    }
                    transition={{
                      duration: active(3)
                        ? 2.5
                        : 1.8,
                      repeat: active(3)
                        ? Infinity
                        : Infinity,
                      delay: i * 0.25
                    }}
                  >
                    H⁺
                  </motion.div>
                ))}

              {/* Acid molecules */}
              {active(0) && (
                <motion.div
                  className="acid-molecule"
                  animate={{
                    rotate: [0, 8, -8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  HCl
                </motion.div>
              )}
            </div>

            <div className="ph-value acid-ph">
              pH 2
            </div>
          </motion.div>

          {/* =========================
              PLUS SIGN
          ========================== */}

          {active(0) && (
            <motion.div
              className="plus-sign"
              initial={{
                opacity: 0,
                scale: 0
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
            >
              +
            </motion.div>
          )}

          {/* =========================
              BASE BEAKER
          ========================== */}

          <motion.div
            className="chemical-beaker base-beaker"
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: active(2) ? 1 : 0.3,
              y: active(2) ? 0 : 30
            }}
            transition={{
              duration: 0.7
            }}
          >

            <div className="beaker-label">
              Base
            </div>

            <div className="beaker-glass">
              <div className="base-liquid" />

              {/* OH- ions */}
              {active(2) &&
                [0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={`oh-${i}`}
                    className="oh-ion"
                    style={{
                      right: `${18 + i * 15}%`,
                      bottom: `${25 + (i % 3) * 18}px`
                    }}
                    animate={
                      active(3)
                        ? {
                            x: [0, -90, -180],
                            y: [
                              0,
                              15,
                              -10
                            ],
                            opacity: [
                              1,
                              1,
                              0
                            ]
                          }
                        : {
                            y: [
                              0,
                              12,
                              0
                            ],
                            x: [
                              0,
                              -8,
                              8,
                              0
                            ]
                          }
                    }
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.25
                    }}
                  >
                    OH⁻
                  </motion.div>
                ))}

              {/* Base molecule */}
              {active(2) && (
                <motion.div
                  className="base-molecule"
                  animate={{
                    rotate: [0, -8, 8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  NaOH
                </motion.div>
              )}
            </div>

            <div className="ph-value base-ph">
              pH 12
            </div>
          </motion.div>

        </div>

        {/* =========================
            ION COLLISION
        ========================== */}

        {active(3) && !active(4) && (
          <motion.div
            className="neutralization-animation"
            initial={{
              opacity: 0,
              scale: 0
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [
                0.5,
                1,
                1.3,
                0.5
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <div className="collision-h">
              H⁺
            </div>

            <div className="collision-oh">
              OH⁻
            </div>

            <div className="collision-arrow">
              →
            </div>

            <div className="water-result">
              💧 H₂O
            </div>
          </motion.div>
        )}

        {/* =========================
            WATER MOLECULES
        ========================== */}

        {active(3) && (
          <div className="water-particles">

            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={`water-${i}`}
                className="water-particle"
                initial={{
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5],
                  x: [
                    0,
                    30,
                    60,
                    90
                  ],
                  y: [
                    0,
                    -15,
                    10,
                    -5
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.35
                }}
              >
                💧
              </motion.div>
            ))}

          </div>
        )}

        {/* =========================
            FINAL RESULT
        ========================== */}

        {active(4) && (
          <motion.div
            className="final-neutralization"
            initial={{
              opacity: 0,
              scale: 0.7
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 1
            }}
          >

            <motion.div
              className="final-water"
              animate={{
                y: [0, -8, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              💧
            </motion.div>

            <div>
              <strong>
                Neutralization
              </strong>

              <span>
                H⁺ + OH⁻ → H₂O
              </span>
            </div>

            <div className="neutral-ph">
              pH 7
            </div>

          </motion.div>
        )}

        {/* =========================
            PH SCALE
        ========================== */}

        <div className="ph-scale">

          <span>0</span>
          <div className="ph-bar">
            <motion.div
              className="ph-indicator"
              animate={{
                left:
                  step === 0
                    ? "8%"
                    : step === 1
                    ? "8%"
                    : step === 2
                    ? "88%"
                    : "50%"
              }}
              transition={{
                duration: 1
              }}
            />
          </div>
          <span>14</span>

        </div>

        <div className="ph-labels">
          <span>Acidic</span>
          <span>Neutral</span>
          <span>Basic</span>
        </div>

        {/* =========================
            PROCESS STEPS
        ========================== */}

        <div className="process-row">

          {stages.map((stage, index) => (
            <motion.div
              key={stage}
              className={`process-node ${
                index === step
                  ? "selected"
                  : ""
              }`}
              animate={
                index === step
                  ? {
                      scale: [
                        1,
                        1.05,
                        1
                      ]
                    }
                  : {}
              }
              transition={{
                duration: 1,
                repeat:
                  index === step
                    ? Infinity
                    : 0
              }}
            >

              <span className="node-number">
                {index + 1}
              </span>

              <b>{stage}</b>

              {index < step && (
                <span className="node-check">
                  ✓
                </span>
              )}

            </motion.div>
          ))}

        </div>

        {/* =========================
            EXPLANATION
        ========================== */}

        <motion.div
          className="ab-explanation"
          key={step}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
        >

          {step === 0 && (
            <>
              <strong>
                Step 1 — Acid
              </strong>

              <span>
                Acids have a higher concentration
                of hydrogen ions (H⁺). Strong acids
                have a low pH.
              </span>
            </>
          )}

          {step === 1 && (
            <>
              <strong>
                Step 2 — H⁺ ions
              </strong>

              <span>
                The acid releases hydrogen ions (H⁺)
                into the solution.
              </span>
            </>
          )}

          {step === 2 && (
            <>
              <strong>
                Step 3 — OH⁻ ions
              </strong>

              <span>
                A base provides hydroxide ions (OH⁻).
                These ions move freely through the solution.
              </span>
            </>
          )}

          {step === 3 && (
            <>
              <strong>
                Step 4 — Neutralization
              </strong>

              <span>
                H⁺ and OH⁻ ions move toward each other
                and combine to form water.
              </span>
            </>
          )}

          {step === 4 && (
            <>
              <strong>
                Step 5 — Neutral solution
              </strong>

              <span>
                When equivalent amounts of H⁺ and OH⁻
                react, the solution approaches neutral
                pH 7.
              </span>
            </>
          )}

        </motion.div>

        {/* =========================
            EQUATION
        ========================== */}

        <div className="mini-formula">
          H⁺ + OH⁻ → H₂O
        </div>

      </div>

      {/* =========================
          CSS
      ========================== */}

      <style>{`

        .acid-base-scene {
          min-height: 650px;
          position: relative;
          overflow: hidden;
        }

        .ab-title {
          text-align: center;
          color: #dce8ff;
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        /* BEAKERS */

        .beakers-container {
          width: 700px;
          max-width: 95%;
          height: 270px;
          margin: 10px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 35px;
        }

        .chemical-beaker {
          position: relative;
          width: 180px;
          height: 230px;
        }

        .beaker-glass {
          position: absolute;
          bottom: 0;
          left: 10px;
          width: 160px;
          height: 190px;
          border: 3px solid rgba(210,225,255,.5);
          border-top: 0;
          border-radius: 0 0 25px 25px;
          overflow: hidden;
          background: rgba(255,255,255,.04);
        }

        .acid-liquid,
        .base-liquid {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 130px;
        }

        .acid-liquid {
          background:
            linear-gradient(
              to top,
              rgba(255,75,105,.55),
              rgba(255,100,130,.18)
            );
        }

        .base-liquid {
          background:
            linear-gradient(
              to top,
              rgba(70,170,255,.55),
              rgba(80,190,255,.18)
            );
        }

        .beaker-label {
          position: absolute;
          top: -5px;
          left: 0;
          width: 100%;
          text-align: center;
          color: #e5edff;
          font-weight: 700;
          font-size: 15px;
        }

        .ph-value {
          position: absolute;
          bottom: -25px;
          width: 100%;
          text-align: center;
          font-size: 13px;
          font-weight: 700;
        }

        .acid-ph {
          color: #ff7695;
        }

        .base-ph {
          color: #68caff;
        }

        /* MOLECULES */

        .acid-molecule,
        .base-molecule {
          position: absolute;
          left: 50%;
          top: 55px;
          transform: translateX(-50%);
          font-weight: 800;
          font-size: 20px;
          z-index: 4;
        }

        .acid-molecule {
          color: #ff8da6;
        }

        .base-molecule {
          color: #76d2ff;
        }

        /* IONS */

        .h-ion,
        .oh-ion {
          position: absolute;
          z-index: 10;
          padding: 4px 6px;
          border-radius: 50%;
          font-size: 10px;
          font-weight: 800;
        }

        .h-ion {
          color: #ff4f78;
          background: rgba(255,70,110,.15);
          border: 1px solid rgba(255,70,110,.5);
        }

        .oh-ion {
          color: #58caff;
          background: rgba(60,190,255,.15);
          border: 1px solid rgba(60,190,255,.5);
        }

        /* PLUS */

        .plus-sign {
          font-size: 35px;
          font-weight: 800;
          color: #8e9bb7;
        }

        /* COLLISION */

        .neutralization-animation {
          position: absolute;
          left: 50%;
          top: 240px;
          transform: translateX(-50%);
          width: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          z-index: 50;
        }

        .collision-h,
        .collision-oh {
          padding: 9px 12px;
          border-radius: 50%;
          font-weight: 800;
        }

        .collision-h {
          color: #ff6386;
          background: rgba(255,70,100,.15);
        }

        .collision-oh {
          color: #5bcaff;
          background: rgba(70,190,255,.15);
        }

        .collision-arrow {
          color: #d5deef;
          font-size: 25px;
        }

        .water-result {
          color: #62d5ff;
          font-weight: 800;
        }

        /* WATER PARTICLES */

        .water-particles {
          position: absolute;
          left: 50%;
          top: 280px;
          z-index: 20;
        }

        .water-particle {
          position: absolute;
          font-size: 20px;
        }

        /* FINAL */

        .final-neutralization {
          width: 380px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 16px;
          background: rgba(30,55,80,.7);
          border: 1px solid rgba(90,190,255,.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          text-align: center;
        }

        .final-water {
          font-size: 45px;
        }

        .final-neutralization div:nth-child(2) {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .final-neutralization strong {
          color: white;
        }

        .final-neutralization span {
          color: #6bd7ff;
          font-family: monospace;
        }

        .neutral-ph {
          padding: 8px 12px;
          border-radius: 8px;
          background: rgba(100,220,160,.15);
          color: #65e3a5;
          font-weight: 800;
        }

        /* PH SCALE */

        .ph-scale {
          width: 550px;
          max-width: 90%;
          margin: 20px auto 4px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #aab8d0;
          font-size: 12px;
        }

        .ph-bar {
          position: relative;
          flex: 1;
          height: 12px;
          border-radius: 20px;
          background:
            linear-gradient(
              90deg,
              #ef5277,
              #d77af0,
              #8c7cff,
              #62dba5,
              #8cd96b,
              #ffd05c,
              #ff8b5c
            );
        }

        .ph-indicator {
          position: absolute;
          top: -5px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          border: 3px solid #17233b;
          box-shadow: 0 0 12px rgba(255,255,255,.7);
        }

        .ph-labels {
          width: 550px;
          max-width: 90%;
          margin: auto;
          display: flex;
          justify-content: space-between;
          color: #8997b2;
          font-size: 11px;
        }

        /* EXPLANATION */

        .ab-explanation {
          width: min(700px, 90%);
          margin: 15px auto;
          padding: 15px 18px;
          border-radius: 12px;
          background: rgba(30,45,70,.65);
          border: 1px solid rgba(100,150,210,.2);
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: center;
        }

        .ab-explanation strong {
          color: white;
          font-size: 15px;
        }

        .ab-explanation span {
          color: #aab8d0;
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 750px) {

          .beakers-container {
            transform: scale(.75);
            transform-origin: center;
            margin-bottom: -40px;
          }

          .process-row {
            flex-wrap: wrap;
          }

          .final-neutralization {
            width: 85%;
          }

        }

      `}</style>
    </VisualizationShell>
  );
}