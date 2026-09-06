import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function AtomicStructure({ step, playing }) {
  const stages = [
    "Atom",
    "Nucleus",
    "Protons & Neutrons",
    "Electrons",
    "Complete Atom"
  ];

  const electrons = [
    { shell: 1, angle: 0 },
    { shell: 1, angle: 180 },
    { shell: 2, angle: 0 },
    { shell: 2, angle: 60 },
    { shell: 2, angle: 120 },
    { shell: 2, angle: 180 },
    { shell: 2, angle: 240 },
    { shell: 2, angle: 300 }
  ];

  return (
    <VisualizationShell
      title="Atomic Structure"
      subtitle="Explore how protons, neutrons and electrons form an atom."
    >
      <div className="atom-scene">

        {/* TOP LABEL */}
        <div className="atom-stage-label">
          {stages[Math.min(step, stages.length - 1)]}
        </div>

        {/* ATOM */}
        <div className="atom-wrapper">

          {/* ELECTRON SHELLS */}
          {step >= 3 && (
            <>
              <motion.div
                className="electron-shell shell-one"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
              />

              <motion.div
                className="electron-shell shell-two"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
            </>
          )}

          {/* MOVING ELECTRONS */}
          {step >= 3 &&
            electrons.map((electron, index) => {
              const radius = electron.shell === 1 ? 82 : 135;

              return (
                <motion.div
                  key={index}
                  className="electron-orbit"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                    marginLeft: -radius,
                    marginTop: -radius
                  }}
                  animate={{
                    rotate: playing ? 360 : 0
                  }}
                  transition={{
                    duration: electron.shell === 1 ? 3 : 5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.15
                  }}
                >
                  <motion.div
                    className="electron"
                    style={{
                      transform: `rotate(${electron.angle}deg) translateX(${radius}px)`
                    }}
                  >
                    e⁻
                  </motion.div>
                </motion.div>
              );
            })}

          {/* NUCLEUS */}
          {step >= 1 && (
            <motion.div
              className="nucleus"
              initial={{ scale: 0 }}
              animate={{
                scale: step >= 2 ? 1 : 0.8
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 12
              }}
            >

              {/* PROTONS */}
              {step >= 2 &&
                [0, 1, 2, 3].map((item) => (
                  <motion.div
                    key={`p-${item}`}
                    className="particle proton"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: item * 0.15
                    }}
                  >
                    +
                  </motion.div>
                ))}

              {/* NEUTRONS */}
              {step >= 2 &&
                [0, 1, 2, 3].map((item) => (
                  <motion.div
                    key={`n-${item}`}
                    className="particle neutron"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.6 + item * 0.15
                    }}
                  >
                    n
                  </motion.div>
                ))}

              {step === 1 && (
                <motion.div
                  className="nucleus-core"
                  animate={{
                    scale: [1, 1.08, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity
                  }}
                />
              )}
            </motion.div>
          )}

          {/* EMPTY ATOM */}
          {step === 0 && (
            <motion.div
              className="atom-outline"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="atom-symbol">Atom</div>
            </motion.div>
          )}

        </div>

        {/* LEGEND */}
        <div className="atom-legend">

          <div className="legend-item">
            <span className="legend-dot proton-dot">+</span>
            <span>Proton</span>
          </div>

          <div className="legend-item">
            <span className="legend-dot neutron-dot">n</span>
            <span>Neutron</span>
          </div>

          <div className="legend-item">
            <span className="legend-dot electron-dot">e⁻</span>
            <span>Electron</span>
          </div>

        </div>

        {/* PROCESS */}
        <div className="process-row">
          {stages.map((stage, index) => (
            <div
              key={stage}
              className={`process-step ${
                step === index ? "active" : ""
              } ${step > index ? "completed" : ""}`}
            >
              <div className="process-number">
                {index + 1}
              </div>
              <span>{stage}</span>
            </div>
          ))}
        </div>

        {/* EXPLANATION */}
        <motion.div
          className="explanation-box"
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {step === 0 && (
            <>
              <strong>What is an atom?</strong>
              <p>
                An atom is the basic unit of matter. Everything around
                us is made from atoms.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <strong>The nucleus forms</strong>
              <p>
                At the center of an atom is a tiny, dense nucleus.
                It contains most of the atom's mass.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <strong>Protons and neutrons</strong>
              <p>
                Protons have a positive charge, while neutrons have
                no electrical charge. Both are found inside the nucleus.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <strong>Electrons surround the nucleus</strong>
              <p>
                Negatively charged electrons occupy regions around
                the nucleus called electron shells.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <strong>The complete atom</strong>
              <p>
                An atom consists of a nucleus containing protons and
                neutrons, surrounded by electrons.
              </p>
            </>
          )}
        </motion.div>

        {/* CSS */}
        <style>{`
          .atom-scene {
            min-height: 620px;
            position: relative;
            overflow: hidden;
            padding: 25px;
            border-radius: 24px;
            background:
              radial-gradient(
                circle at center,
                rgba(99, 102, 241, 0.12),
                transparent 45%
              ),
              #0b1020;
            color: white;
          }

          .atom-stage-label {
            text-align: center;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
          }

          .atom-wrapper {
            width: 340px;
            height: 340px;
            position: relative;
            margin: 20px auto 5px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .electron-shell {
            position: absolute;
            border: 2px dashed rgba(255,255,255,0.25);
            border-radius: 50%;
            left: 50%;
            top: 50%;
            pointer-events: none;
          }

          .shell-one {
            width: 165px;
            height: 165px;
            margin-left: -82.5px;
            margin-top: -82.5px;
          }

          .shell-two {
            width: 270px;
            height: 270px;
            margin-left: -135px;
            margin-top: -135px;
          }

          .electron-orbit {
            position: absolute;
            left: 50%;
            top: 50%;
            border-radius: 50%;
            pointer-events: none;
          }

          .electron {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 34px;
            height: 34px;
            margin-left: -17px;
            margin-top: -17px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 800;
            background: #2563eb;
            box-shadow:
              0 0 12px rgba(37, 99, 235, 0.8),
              0 0 30px rgba(37, 99, 235, 0.35);
          }

          .nucleus {
            width: 105px;
            height: 105px;
            border-radius: 50%;
            position: relative;
            z-index: 5;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 2px;
            padding: 12px;
            background: rgba(255,255,255,0.08);
            box-shadow:
              0 0 25px rgba(244,63,94,0.35);
          }

          .particle {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: 800;
          }

          .proton {
            background: #ef4444;
          }

          .neutron {
            background: #64748b;
          }

          .nucleus-core {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: rgba(244,63,94,0.25);
          }

          .atom-outline {
            width: 150px;
            height: 150px;
            border: 2px dashed rgba(255,255,255,0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .atom-symbol {
            font-size: 22px;
            font-weight: 700;
          }

          .atom-legend {
            display: flex;
            justify-content: center;
            gap: 28px;
            margin: 5px 0 25px;
          }

          .legend-item {
            display: flex;
            align-items: center;
            gap: 7px;
            font-size: 13px;
            color: #cbd5e1;
          }

          .legend-dot {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
          }

          .proton-dot {
            background: #ef4444;
          }

          .neutron-dot {
            background: #64748b;
          }

          .electron-dot {
            background: #2563eb;
          }

          .process-row {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin: 15px 0 20px;
            flex-wrap: wrap;
          }

          .process-step {
            display: flex;
            align-items: center;
            gap: 7px;
            padding: 7px 11px;
            border-radius: 20px;
            background: rgba(255,255,255,0.05);
            color: #94a3b8;
            font-size: 12px;
          }

          .process-step.active {
            background: rgba(99,102,241,0.2);
            color: white;
          }

          .process-step.completed {
            color: #cbd5e1;
          }

          .process-number {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,0.1);
            font-size: 11px;
          }

          .explanation-box {
            max-width: 720px;
            margin: auto;
            padding: 16px 20px;
            border-radius: 15px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.08);
          }

          .explanation-box strong {
            display: block;
            font-size: 15px;
            margin-bottom: 5px;
          }

          .explanation-box p {
            margin: 0;
            color: #aeb8ca;
            line-height: 1.5;
            font-size: 13px;
          }

          @media (max-width: 600px) {
            .atom-wrapper {
              width: 290px;
              height: 290px;
              transform: scale(0.85);
              margin: 5px auto -15px;
            }

            .atom-legend {
              gap: 12px;
            }

            .process-row {
              gap: 5px;
            }
          }
        `}</style>

      </div>
    </VisualizationShell>
  );
}