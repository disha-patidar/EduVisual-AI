import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function DigestiveSystem({ step, playing }) {
  const stages = [
    "👄 Mouth",
    "⬇️ Esophagus",
    "🫃 Stomach",
    "〰️ Small intestine",
    "🟤 Large intestine"
  ];

  const active = (n) => step >= n;

  return (
    <VisualizationShell
      title="Digestive System"
      subtitle="Follow food as it travels through the digestive system."
    >
      <div className="sim-scene digestion-scene">

        {/* BODY / DIGESTIVE SYSTEM */}
        <div className="digestive-body">

          {/* Head */}
          <motion.div
            className="digestive-head"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: active(0) ? 1 : 0,
              scale: active(0) ? 1 : 0
            }}
            transition={{ duration: 0.7 }}
          >
            <div className="mouth">
              👄
            </div>
          </motion.div>

          {/* Esophagus */}
          <motion.div
            className="esophagus"
            initial={{ opacity: 0 }}
            animate={{
              opacity: active(1) ? 1 : 0
            }}
          />

          {/* Stomach */}
          <motion.div
            className="stomach"
            initial={{
              opacity: 0,
              scale: 0
            }}
            animate={{
              opacity: active(2) ? 1 : 0.35,
              scale: active(2) ? 1 : 0.8
            }}
            transition={{ duration: 0.7 }}
          >
            🫃
          </motion.div>

          {/* Small intestine */}
          <motion.div
            className="small-intestine"
            initial={{ opacity: 0 }}
            animate={{
              opacity: active(3) ? 1 : 0.3
            }}
          >
            <div className="intestine-line line1" />
            <div className="intestine-line line2" />
            <div className="intestine-line line3" />
            <div className="intestine-line line4" />
            <div className="intestine-line line5" />
          </motion.div>

          {/* Large intestine */}
          <motion.div
            className="large-intestine"
            initial={{ opacity: 0 }}
            animate={{
              opacity: active(4) ? 1 : 0.3
            }}
          >
            <div className="large-left" />
            <div className="large-top" />
            <div className="large-right" />
          </motion.div>

          {/* Food particles */}
          {active(0) && (
            <motion.div
              className="food-particle food-mouth"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.6],
                y: [0, 5, 10, 20]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            >
              🍎
            </motion.div>
          )}

          {/* Food moving through esophagus */}
          {active(1) && (
            <motion.div
              className="food-particle food-esophagus"
              animate={{
                y: [0, 70, 140, 200],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity
              }}
            >
              🍎
            </motion.div>
          )}

          {/* Food inside stomach */}
          {active(2) && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`stomach-food-${i}`}
                  className="food-particle stomach-food"
                  style={{
                    left: `${47 + i * 3}%`,
                    top: `${43 + i * 3}%`
                  }}
                  animate={{
                    x: [-8, 8, -8],
                    y: [-5, 8, -5],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.25
                  }}
                >
                  🍎
                </motion.div>
              ))}

              <motion.div
                className="stomach-acid"
                animate={{
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                🧪
              </motion.div>
            </>
          )}

          {/* Nutrients moving through small intestine */}
          {active(3) && (
            <>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={`nutrient-${i}`}
                  className="nutrient"
                  animate={{
                    x: [
                      0,
                      50,
                      100,
                      150,
                      200
                    ],
                    y: [
                      0,
                      -20,
                      15,
                      -15,
                      5
                    ],
                    opacity: [0, 1, 1, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                >
                  ●
                </motion.div>
              ))}

              <motion.div
                className="nutrient-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Nutrients absorbed
              </motion.div>
            </>
          )}

          {/* Waste moving through large intestine */}
          {active(4) && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`waste-${i}`}
                  className="waste-particle"
                  animate={{
                    x: [0, 80, 160],
                    y: [0, 20, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.7
                  }}
                >
                  ●
                </motion.div>
              ))}

              <motion.div
                className="water-label"
                animate={{
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                💧 Water absorbed
              </motion.div>
            </>
          )}

          {/* Labels */}

          {active(0) && (
            <motion.div
              className="digest-label mouth-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Mouth
            </motion.div>
          )}

          {active(1) && (
            <motion.div
              className="digest-label esophagus-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Esophagus
            </motion.div>
          )}

          {active(2) && (
            <motion.div
              className="digest-label stomach-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Stomach
            </motion.div>
          )}

          {active(3) && (
            <motion.div
              className="digest-label small-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Small intestine
            </motion.div>
          )}

          {active(4) && (
            <motion.div
              className="digest-label large-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Large intestine
            </motion.div>
          )}

        </div>

        {/* PROCESS STEPS */}

        <div className="process-row">

          {stages.map((stage, index) => (
            <motion.div
              key={stage}
              className={`process-node ${
                index === step ? "selected" : ""
              }`}
              animate={
                index === step
                  ? {
                      scale: [1, 1.05, 1]
                    }
                  : {}
              }
              transition={{
                duration: 1,
                repeat:
                  index === step ? Infinity : 0
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

        {/* STEP EXPLANATION */}

        <motion.div
          className="digest-explanation"
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
              <strong>Step 1 — Mouth</strong>
              <span>
                Digestion begins in the mouth. Teeth break
                food into smaller pieces and saliva starts
                breaking down food.
              </span>
            </>
          )}

          {step === 1 && (
            <>
              <strong>Step 2 — Esophagus</strong>
              <span>
                The esophagus uses rhythmic muscle
                contractions called peristalsis to push
                food toward the stomach.
              </span>
            </>
          )}

          {step === 2 && (
            <>
              <strong>Step 3 — Stomach</strong>
              <span>
                The stomach churns food and mixes it with
                digestive juices, breaking it down further.
              </span>
            </>
          )}

          {step === 3 && (
            <>
              <strong>Step 4 — Small intestine</strong>
              <span>
                Most nutrients are digested and absorbed
                into the bloodstream in the small intestine.
              </span>
            </>
          )}

          {step === 4 && (
            <>
              <strong>Step 5 — Large intestine</strong>
              <span>
                The large intestine absorbs water and
                prepares the remaining waste for removal.
              </span>
            </>
          )}

        </motion.div>

        <div className="mini-formula">
          Food → Digestion → Nutrients → Absorption → Waste
        </div>

      </div>

      <style>{`

        .digestion-scene {
          min-height: 600px;
          overflow: hidden;
        }

        .digestive-body {
          position: relative;
          width: 560px;
          height: 410px;
          margin: 10px auto 15px;
        }

        /* HEAD */

        .digestive-head {
          position: absolute;
          left: 225px;
          top: 5px;
          width: 100px;
          height: 80px;
          border-radius: 50%;
          background: #f2b7a0;
          border: 3px solid rgba(255,255,255,.15);
          z-index: 4;
        }

        .mouth {
          position: absolute;
          right: -15px;
          top: 35px;
          font-size: 25px;
        }

        /* ESOPHAGUS */

        .esophagus {
          position: absolute;
          left: 267px;
          top: 70px;
          width: 26px;
          height: 105px;
          border-radius: 15px;
          background: linear-gradient(
            90deg,
            #f08b80,
            #ffb29d,
            #e77970
          );
          z-index: 3;
          box-shadow: 0 0 15px rgba(255,100,100,.25);
        }

        /* STOMACH */

        .stomach {
          position: absolute;
          left: 220px;
          top: 145px;
          font-size: 105px;
          z-index: 5;
          filter: drop-shadow(
            0 0 15px rgba(255,80,100,.25)
          );
        }

        /* SMALL INTESTINE */

        .small-intestine {
          position: absolute;
          left: 190px;
          top: 255px;
          width: 210px;
          height: 105px;
          z-index: 3;
        }

        .intestine-line {
          position: absolute;
          width: 170px;
          height: 27px;
          border: 10px solid #e9b27c;
          border-radius: 30px;
        }

        .line1 {
          top: 0;
          left: 20px;
        }

        .line2 {
          top: 25px;
          left: 0;
        }

        .line3 {
          top: 50px;
          left: 20px;
        }

        .line4 {
          top: 75px;
          left: 0;
        }

        .line5 {
          top: 100px;
          left: 20px;
        }

        /* LARGE INTESTINE */

        .large-intestine {
          position: absolute;
          left: 170px;
          top: 240px;
          width: 250px;
          height: 155px;
          border: 15px solid #9a674b;
          border-radius: 40px;
          z-index: 2;
          pointer-events: none;
        }

        .large-left,
        .large-right,
        .large-top {
          position: absolute;
          background: #9a674b;
          border-radius: 20px;
        }

        .large-left {
          width: 15px;
          height: 110px;
          left: -15px;
          top: 20px;
        }

        .large-right {
          width: 15px;
          height: 110px;
          right: -15px;
          top: 20px;
        }

        .large-top {
          width: 220px;
          height: 15px;
          top: -15px;
          left: 0;
        }

        /* FOOD */

        .food-particle {
          position: absolute;
          z-index: 20;
          font-size: 25px;
        }

        .food-mouth {
          left: 315px;
          top: 55px;
        }

        .food-esophagus {
          left: 263px;
          top: 75px;
        }

        .stomach-food {
          font-size: 18px;
          z-index: 20;
        }

        .stomach-acid {
          position: absolute;
          left: 270px;
          top: 205px;
          font-size: 25px;
          z-index: 20;
        }

        /* NUTRIENTS */

        .nutrient {
          position: absolute;
          left: 210px;
          top: 300px;
          color: #53e6a4;
          font-size: 20px;
          z-index: 30;
          text-shadow:
            0 0 10px rgba(80,230,160,.8);
        }

        .nutrient-label {
          position: absolute;
          left: 405px;
          top: 300px;
          color: #63e6a8;
          font-size: 13px;
          white-space: nowrap;
          z-index: 20;
        }

        /* WASTE */

        .waste-particle {
          position: absolute;
          left: 250px;
          top: 365px;
          color: #b87952;
          font-size: 20px;
          z-index: 30;
        }

        .water-label {
          position: absolute;
          right: 15px;
          bottom: 25px;
          color: #67c8ff;
          font-size: 13px;
          z-index: 30;
        }

        /* LABELS */

        .digest-label {
          position: absolute;
          padding: 7px 11px;
          border-radius: 8px;
          background: rgba(8,16,35,.92);
          border: 1px solid rgba(120,160,210,.25);
          color: #e8efff;
          font-size: 13px;
          z-index: 40;
          white-space: nowrap;
        }

        .mouth-label {
          left: 335px;
          top: 25px;
        }

        .esophagus-label {
          left: 305px;
          top: 100px;
        }

        .stomach-label {
          left: 350px;
          top: 180px;
        }

        .small-label {
          left: 410px;
          top: 265px;
        }

        .large-label {
          left: 420px;
          top: 350px;
        }

        /* EXPLANATION */

        .digest-explanation {
          width: min(680px, 90%);
          margin: 10px auto 18px;
          padding: 14px 18px;
          border-radius: 12px;
          background: rgba(30,45,70,.65);
          border: 1px solid rgba(100,150,210,.2);
          display: flex;
          flex-direction: column;
          gap: 5px;
          text-align: center;
        }

        .digest-explanation strong {
          color: white;
          font-size: 15px;
        }

        .digest-explanation span {
          color: #aab8d0;
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 700px) {

          .digestive-body {
            transform: scale(.75);
            transform-origin: center;
            margin-bottom: -60px;
          }

          .process-row {
            flex-wrap: wrap;
          }

        }

      `}</style>
    </VisualizationShell>
  );
}