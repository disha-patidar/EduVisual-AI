import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function DNAReplication({ step, playing }) {
  const stages = [
    "🧬 DNA",
    "🔓 Unwinding",
    "✂️ Strands separate",
    "🔗 Bases pair",
    "🧬 Two DNA molecules"
  ];

  const active = (n) => step >= n;

  return (
    <VisualizationShell
      title="DNA Replication"
      subtitle="Watch how DNA copies itself before a cell divides."
    >
      <div className="sim-scene dna-scene">

        {/* TITLE INSIDE ANIMATION */}
        <div className="dna-process-title">
          DNA Replication
        </div>

        {/* =========================
            DNA MOLECULE
        ========================== */}

        <div className="dna-container">

          {/* ORIGINAL DNA */}
          <motion.div
            className="dna-original"
            initial={{
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              opacity: active(0) ? 1 : 0,
              scale: active(0) ? 1 : 0.5
            }}
            transition={{
              duration: 0.8
            }}
          >

            {/* LEFT STRAND */}
            <motion.div
              className="dna-strand-left"
              animate={
                active(1)
                  ? {
                      x: -55,
                      rotate: -8
                    }
                  : {
                      x: 0,
                      rotate: 0
                    }
              }
              transition={{
                duration: 1
              }}
            />

            {/* RIGHT STRAND */}
            <motion.div
              className="dna-strand-right"
              animate={
                active(1)
                  ? {
                      x: 55,
                      rotate: 8
                    }
                  : {
                      x: 0,
                      rotate: 0
                    }
              }
              transition={{
                duration: 1
              }}
            />

            {/* BASE PAIRS */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="base-pair"
                style={{
                  top: `${20 + i * 38}px`
                }}
                animate={
                  active(1)
                    ? {
                        scaleX: 0
                      }
                    : {
                        scaleX: 1
                      }
                }
                transition={{
                  duration: 0.7,
                  delay: i * 0.05
                }}
              >
                <span className="base left-base">
                  {["A", "T", "G", "C", "A", "G", "T"][i]}
                </span>

                <span className="base-connector" />

                <span className="base right-base">
                  {["T", "A", "C", "G", "T", "C", "A"][i]}
                </span>
              </motion.div>
            ))}

          </motion.div>

          {/* =========================
              NEW COMPLEMENTARY BASES
          ========================== */}

          {active(2) && (
            <>
              <motion.div
                className="new-strand new-left"
                initial={{
                  opacity: 0,
                  x: 0
                }}
                animate={{
                  opacity: 1,
                  x: -105
                }}
                transition={{
                  duration: 1
                }}
              />

              <motion.div
                className="new-strand new-right"
                initial={{
                  opacity: 0,
                  x: 0
                }}
                animate={{
                  opacity: 1,
                  x: 105
                }}
                transition={{
                  duration: 1
                }}
              />
            </>
          )}

          {/* NEW BASE PAIRS */}

          {active(3) && (
            <>
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={`new-base-${i}`}
                  className="new-base-pair"
                  style={{
                    top: `${20 + i * 38}px`
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.15
                  }}
                >
                  <span className="floating-base left-new-base">
                    {["T", "A", "C", "G", "T", "C", "A"][i]}
                  </span>

                  <span className="floating-base right-new-base">
                    {["A", "T", "G", "C", "A", "G", "T"][i]}
                  </span>
                </motion.div>
              ))}
            </>
          )}

          {/* =========================
              FINAL TWO DNA MOLECULES
          ========================== */}

          {active(4) && (
            <motion.div
              className="final-dna-container"
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

              {/* DNA COPY 1 */}
              <motion.div
                className="final-dna dna-copy-one"
                animate={{
                  y: [0, -6, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <span>🧬</span>
                <b>DNA Copy 1</b>
              </motion.div>

              {/* DNA COPY 2 */}
              <motion.div
                className="final-dna dna-copy-two"
                animate={{
                  y: [0, 6, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                <span>🧬</span>
                <b>DNA Copy 2</b>
              </motion.div>

            </motion.div>
          )}

          {/* =========================
              ENZYME
          ========================== */}

          {active(1) && !active(4) && (
            <motion.div
              className="helicase"
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [-20, 0, 20, 40]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              ✂️
              <small>Helicase</small>
            </motion.div>
          )}

        </div>

        {/* =========================
            BASE LEGEND
        ========================== */}

        {active(3) && !active(4) && (
          <motion.div
            className="base-legend"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
          >
            <span>A ↔ T</span>
            <span>G ↔ C</span>
          </motion.div>
        )}

        {/* =========================
            PROCESS STEPS
        ========================== */}

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

        {/* =========================
            STEP EXPLANATION
        ========================== */}

        <motion.div
          className="dna-explanation"
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
              <strong>Step 1 — DNA molecule</strong>
              <span>
                DNA contains genetic information stored
                in the sequence of its bases.
              </span>
            </>
          )}

          {step === 1 && (
            <>
              <strong>Step 2 — DNA unwinds</strong>
              <span>
                The DNA double helix begins to unwind.
                Helicase separates the two strands.
              </span>
            </>
          )}

          {step === 2 && (
            <>
              <strong>Step 3 — Strands separate</strong>
              <span>
                The two original DNA strands separate,
                exposing their bases.
              </span>
            </>
          )}

          {step === 3 && (
            <>
              <strong>Step 4 — Complementary bases pair</strong>
              <span>
                New bases attach to the exposed bases:
                A pairs with T, while G pairs with C.
              </span>
            </>
          )}

          {step === 4 && (
            <>
              <strong>Step 5 — Two DNA molecules</strong>
              <span>
                The result is two DNA molecules, each
                containing one original strand and one
                newly synthesized strand.
              </span>
            </>
          )}

        </motion.div>

        {/* SUMMARY */}

        <div className="mini-formula">
          DNA → Unwind → Separate → Complementary bases → 2 DNA molecules
        </div>

      </div>

      {/* =========================
          CSS
      ========================== */}

      <style>{`

        .dna-scene {
          min-height: 620px;
          overflow: hidden;
          position: relative;
        }

        .dna-process-title {
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          color: #dce8ff;
          margin-bottom: 5px;
        }

        .dna-container {
          position: relative;
          width: 650px;
          height: 330px;
          margin: 15px auto;
        }

        /* ORIGINAL DNA */

        .dna-original {
          position: absolute;
          left: 50%;
          top: 20px;
          width: 160px;
          height: 275px;
          transform: translateX(-50%);
        }

        .dna-strand-left,
        .dna-strand-right {
          position: absolute;
          width: 10px;
          height: 275px;
          border-radius: 10px;
          top: 0;
        }

        .dna-strand-left {
          left: 35px;
          background: linear-gradient(
            to bottom,
            #56c7ff,
            #687cff,
            #56c7ff
          );
          box-shadow:
            0 0 15px rgba(80,190,255,.45);
        }

        .dna-strand-right {
          right: 35px;
          background: linear-gradient(
            to bottom,
            #ff6d91,
            #ff3f70,
            #ff6d91
          );
          box-shadow:
            0 0 15px rgba(255,80,120,.45);
        }

        /* BASE PAIRS */

        .base-pair {
          position: absolute;
          left: 22px;
          width: 116px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transform-origin: center;
          z-index: 3;
        }

        .base {
          width: 27px;
          height: 27px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          font-weight: 800;
          color: white;
        }

        .left-base {
          background: #3ca9dd;
          box-shadow: 0 0 10px rgba(60,170,230,.5);
        }

        .right-base {
          background: #ef5277;
          box-shadow: 0 0 10px rgba(240,80,120,.5);
        }

        .base-connector {
          width: 65px;
          height: 3px;
          background: #aab8d2;
          opacity: .8;
        }

        /* NEW STRANDS */

        .new-strand {
          position: absolute;
          top: 20px;
          width: 9px;
          height: 275px;
          border-radius: 10px;
          z-index: 1;
        }

        .new-left {
          left: 225px;
          background: linear-gradient(
            to bottom,
            #71e0ad,
            #40bd8b,
            #71e0ad
          );
          box-shadow:
            0 0 15px rgba(70,220,160,.4);
        }

        .new-right {
          right: 225px;
          background: linear-gradient(
            to bottom,
            #b77cff,
            #8554db,
            #b77cff
          );
          box-shadow:
            0 0 15px rgba(150,100,255,.4);
        }

        /* NEW BASES */

        .new-base-pair {
          position: absolute;
          left: 50%;
          width: 430px;
          transform: translateX(-50%);
          height: 28px;
          z-index: 5;
        }

        .floating-base {
          position: absolute;
          width: 27px;
          height: 27px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 12px;
        }

        .left-new-base {
          left: 45px;
          background: #4ed6a0;
          box-shadow: 0 0 10px rgba(70,220,160,.6);
        }

        .right-new-base {
          right: 45px;
          background: #a16df0;
          box-shadow: 0 0 10px rgba(160,100,255,.6);
        }

        /* HELICASE */

        .helicase {
          position: absolute;
          left: 50%;
          top: 130px;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #ffd166;
          font-size: 28px;
          z-index: 20;
        }

        .helicase small {
          font-size: 11px;
          color: #c4cce0;
        }

        /* FINAL */

        .final-dna-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 130px;
          z-index: 50;
        }

        .final-dna {
          width: 130px;
          height: 170px;
          border-radius: 18px;
          background: rgba(20,35,60,.95);
          border: 1px solid rgba(100,180,255,.3);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 15px;
          box-shadow:
            0 15px 35px rgba(0,0,0,.25);
        }

        .final-dna span {
          font-size: 75px;
        }

        .final-dna b {
          font-size: 12px;
          color: #dce7ff;
        }

        /* LEGEND */

        .base-legend {
          width: 220px;
          margin: 5px auto 15px;
          padding: 10px;
          border-radius: 10px;
          background: rgba(25,40,65,.65);
          border: 1px solid rgba(100,150,210,.2);
          display: flex;
          justify-content: space-around;
          color: #d9e4ff;
          font-weight: 700;
        }

        /* EXPLANATION */

        .dna-explanation {
          width: min(700px, 90%);
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

        .dna-explanation strong {
          color: white;
          font-size: 15px;
        }

        .dna-explanation span {
          color: #aab8d0;
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 750px) {

          .dna-container {
            transform: scale(.75);
            transform-origin: center;
            margin-bottom: -50px;
          }

          .process-row {
            flex-wrap: wrap;
          }

        }

      `}</style>
    </VisualizationShell>
  );
}