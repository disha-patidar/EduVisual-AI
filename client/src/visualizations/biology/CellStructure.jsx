import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function CellStructure({ step, playing }) {
  const stages = [
    "🫧 Cell membrane",
    "🧬 Nucleus",
    "⚡ Mitochondria",
    "🔵 Ribosomes",
    "🚚 Cell transport"
  ];

  const isActive = (n) => step >= n;

  return (
    <VisualizationShell
      title="Cell Structure"
      subtitle="Explore the major parts of a cell and see how they work together."
    >
      <div className="sim-scene cell-scene">

        {/* =========================
            CELL MEMBRANE
        ========================== */}

        <motion.div
          className="cell-body"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isActive(0) ? 1 : 0.85,
            opacity: isActive(0) ? 1 : 0
          }}
          transition={{
            duration: 1,
            type: "spring"
          }}
        >

          {/* Cell membrane */}
          <motion.div
            className="cell-membrane"
            animate={{
              boxShadow: isActive(0)
                ? [
                    "0 0 15px rgba(80,200,255,.2)",
                    "0 0 35px rgba(80,200,255,.5)",
                    "0 0 15px rgba(80,200,255,.2)"
                  ]
                : "0 0 0 transparent"
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />

          {/* Cytoplasm */}
          <div className="cytoplasm" />

          {/* =========================
              NUCLEUS
          ========================== */}

          {isActive(1) && (
            <motion.div
              className="cell-nucleus"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              transition={{
                duration: 0.8,
                type: "spring"
              }}
            >
              <div className="nucleus-label">
                Nucleus
              </div>

              {/* DNA strands */}
              <motion.div
                className="dna-strand dna-one"
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                🧬
              </motion.div>

              <motion.div
                className="dna-strand dna-two"
                animate={{
                  rotate: [0, -10, 10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3
                }}
              >
                🧬
              </motion.div>
            </motion.div>
          )}

          {/* =========================
              MITOCHONDRIA
          ========================== */}

          {isActive(2) && (
            <>
              <motion.div
                className="mitochondria mitochondria-one"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                <span>⚡</span>
              </motion.div>

              <motion.div
                className="mitochondria mitochondria-two"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                <span>⚡</span>
              </motion.div>

              {/* Energy particles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`energy-${i}`}
                  className="energy-particle"
                  style={{
                    left: `${42 + i * 5}%`,
                    top: `${38 + (i % 2) * 12}%`
                  }}
                  animate={{
                    y: [-5, -35, -5],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  ⚡
                </motion.div>
              ))}
            </>
          )}

          {/* =========================
              RIBOSOMES
          ========================== */}

          {isActive(3) && (
            <>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div
                  key={`ribosome-${i}`}
                  className="ribosome"
                  style={{
                    left: `${25 + ((i * 13) % 50)}%`,
                    top: `${22 + ((i * 17) % 55)}%`
                  }}
                  initial={{
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{
                    scale: [0.7, 1, 0.7],
                    opacity: 1
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                />
              ))}

              {/* Protein being created */}
              <motion.div
                className="protein-chain"
                animate={{
                  x: [0, 15, 30, 45],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity
                }}
              >
                🟣🟢🟡
              </motion.div>
            </>
          )}

          {/* =========================
              TRANSPORT
          ========================== */}

          {isActive(4) && (
            <>
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`transport-${i}`}
                  className="transport-particle"
                  initial={{
                    x: -120,
                    y: 0,
                    opacity: 0
                  }}
                  animate={{
                    x: [-120, -50, 0, 60, 120],
                    y: [
                      0,
                      -20,
                      10,
                      -15,
                      0
                    ],
                    opacity: [0, 1, 1, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                >
                  ●
                </motion.div>
              ))}
            </>
          )}

          {/* =========================
              LABELS
          ========================== */}

          {isActive(0) && (
            <motion.div
              className="cell-label membrane-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Cell membrane
            </motion.div>
          )}

          {isActive(1) && (
            <motion.div
              className="cell-label nucleus-label-out"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Nucleus
            </motion.div>
          )}

          {isActive(2) && (
            <motion.div
              className="cell-label mitochondria-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Mitochondria
            </motion.div>
          )}

          {isActive(3) && (
            <motion.div
              className="cell-label ribosome-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Ribosomes
            </motion.div>
          )}

        </motion.div>

        {/* =========================
            STEP PROCESS
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
            EXPLANATION
        ========================== */}

        <motion.div
          className="cell-explanation"
          key={step}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4
          }}
        >

          {step === 0 && (
            <>
              <strong>Step 1 — Cell membrane</strong>
              <span>
                The cell membrane forms the outer boundary
                and controls what enters and leaves the cell.
              </span>
            </>
          )}

          {step === 1 && (
            <>
              <strong>Step 2 — Nucleus</strong>
              <span>
                The nucleus contains DNA and controls
                many activities of the cell.
              </span>
            </>
          )}

          {step === 2 && (
            <>
              <strong>Step 3 — Mitochondria</strong>
              <span>
                Mitochondria convert nutrients into usable
                energy for the cell.
              </span>
            </>
          )}

          {step === 3 && (
            <>
              <strong>Step 4 — Ribosomes</strong>
              <span>
                Ribosomes build proteins needed for
                growth and cell functions.
              </span>
            </>
          )}

          {step === 4 && (
            <>
              <strong>Step 5 — Cell transport</strong>
              <span>
                Molecules and materials move through the
                cytoplasm to different parts of the cell.
              </span>
            </>
          )}

        </motion.div>

        {/* =========================
            FORMULA / SUMMARY
        ========================== */}

        <div className="mini-formula">
          Cell membrane → Nucleus → Energy → Proteins → Transport
        </div>

      </div>

      {/* =========================
          COMPONENT CSS
      ========================== */}

      <style>{`

        .cell-scene {
          position: relative;
          min-height: 560px;
          overflow: hidden;
        }

        .cell-body {
          position: relative;
          width: 520px;
          height: 390px;
          margin: 25px auto 20px;
        }

        .cell-membrane {
          position: absolute;
          inset: 0;
          border-radius: 48% 52% 50% 45%;
          border: 5px solid rgba(70, 190, 255, 0.8);
          background:
            radial-gradient(
              circle at 45% 45%,
              rgba(75, 110, 180, 0.42),
              rgba(20, 35, 70, 0.9)
            );
          z-index: 1;
        }

        .cytoplasm {
          position: absolute;
          inset: 18px;
          border-radius: 48% 52% 50% 45%;
          background:
            radial-gradient(
              circle at 30% 35%,
              rgba(110, 160, 255, 0.18),
              transparent 25%
            ),
            radial-gradient(
              circle at 70% 60%,
              rgba(120, 80, 255, 0.12),
              transparent 30%
            );
          z-index: 2;
        }

        .cell-nucleus {
          position: absolute;
          width: 145px;
          height: 145px;
          left: 185px;
          top: 120px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 35% 30%,
              #8c7aff,
              #443a9e 55%,
              #25215e
            );
          border: 4px solid rgba(180, 170, 255, 0.7);
          box-shadow:
            0 0 35px rgba(120, 100, 255, 0.45);
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nucleus-label {
          position: absolute;
          bottom: -32px;
          font-size: 13px;
          color: #bfc8df;
          white-space: nowrap;
        }

        .dna-strand {
          position: absolute;
          font-size: 34px;
        }

        .dna-one {
          left: 32px;
          top: 32px;
        }

        .dna-two {
          right: 32px;
          bottom: 30px;
        }

        .mitochondria {
          position: absolute;
          width: 72px;
          height: 40px;
          border-radius: 50%;
          background:
            linear-gradient(
              135deg,
              #ff9f43,
              #d35400
            );
          border: 3px solid #ffbf69;
          z-index: 6;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow:
            0 0 20px rgba(255, 160, 60, 0.45);
        }

        .mitochondria-one {
          left: 65px;
          top: 100px;
        }

        .mitochondria-two {
          right: 70px;
          bottom: 85px;
        }

        .mitochondria span {
          font-size: 20px;
        }

        .energy-particle {
          position: absolute;
          z-index: 8;
          font-size: 15px;
        }

        .ribosome {
          position: absolute;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #53d8ff;
          box-shadow:
            0 0 10px rgba(80, 210, 255, 0.8);
          z-index: 7;
        }

        .protein-chain {
          position: absolute;
          right: 80px;
          top: 155px;
          font-size: 18px;
          z-index: 9;
          white-space: nowrap;
        }

        .transport-particle {
          position: absolute;
          left: 50%;
          top: 205px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #62e6a7;
          color: #62e6a7;
          box-shadow:
            0 0 15px rgba(98, 230, 167, 0.8);
          z-index: 10;
        }

        .cell-label {
          position: absolute;
          z-index: 20;
          padding: 7px 12px;
          border-radius: 8px;
          background: rgba(10, 18, 38, 0.9);
          border: 1px solid rgba(120, 150, 200, 0.3);
          color: #e5edff;
          font-size: 13px;
          white-space: nowrap;
        }

        .membrane-label {
          top: 12px;
          right: -30px;
        }

        .nucleus-label-out {
          top: 105px;
          left: -5px;
        }

        .mitochondria-label {
          bottom: 20px;
          left: 5px;
        }

        .ribosome-label {
          top: 55px;
          right: 5px;
        }

        .cell-explanation {
          width: min(650px, 90%);
          margin: 10px auto 18px;
          padding: 14px 18px;
          border-radius: 12px;
          background: rgba(30, 45, 70, 0.65);
          border: 1px solid rgba(100, 150, 210, 0.2);
          display: flex;
          flex-direction: column;
          gap: 5px;
          text-align: center;
        }

        .cell-explanation strong {
          color: #ffffff;
          font-size: 15px;
        }

        .cell-explanation span {
          color: #aab8d0;
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 700px) {

          .cell-body {
            width: 420px;
            height: 330px;
            transform: scale(0.8);
            transform-origin: center;
            margin-bottom: -30px;
          }

          .process-row {
            flex-wrap: wrap;
          }

        }

      `}</style>

    </VisualizationShell>
  );
}