import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function ChemicalBonding({ step, playing }) {
  const stages = [
    "Atoms",
    "Valence Electrons",
    "Electron Transfer",
    "Ionic Bond",
    "Covalent Bond"
  ];

  return (
    <VisualizationShell
      title="Chemical Bonding"
      subtitle="See how atoms interact by transferring or sharing electrons."
    >
      <div className="bond-scene">

        {/* STEP TITLE */}
        <motion.div
          className="bond-step-title"
          key={step}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {stages[Math.min(step, stages.length - 1)]}
        </motion.div>

        {/* MAIN VISUAL */}
        <div className="bond-area">

          {/* ATOM A */}
          <motion.div
            className="bond-atom atom-a"
            animate={{
              x: step >= 2 ? -80 : 0,
              scale: step >= 3 ? 0.95 : 1
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="atom-nucleus">
              Na
            </div>

            {/* ELECTRONS */}
            <div className="electron-ring ring-a">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((e) => (
                <span
                  key={e}
                  className={`small-electron ${
                    e === 7 && step >= 2
                      ? "electron-moving"
                      : ""
                  }`}
                  style={{
                    transform: `rotate(${e * 45}deg) translateY(-48px)`
                  }}
                >
                  e⁻
                </span>
              ))}
            </div>

            {/* VALENCE ELECTRON */}
            {step >= 1 && step < 2 && (
              <motion.div
                className="valence-electron"
                animate={{
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 8px rgba(59,130,246,.4)",
                    "0 0 25px rgba(59,130,246,1)",
                    "0 0 8px rgba(59,130,246,.4)"
                  ]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              >
                e⁻
              </motion.div>
            )}
          </motion.div>

          {/* ELECTRON TRANSFER */}
          {step === 2 && (
            <motion.div
              className="transferring-electron"
              initial={{ x: -100, opacity: 0 }}
              animate={{
                x: 100,
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: playing ? Infinity : 0
              }}
            >
              e⁻
            </motion.div>
          )}

          {/* ATOM B */}
          <motion.div
            className="bond-atom atom-b"
            animate={{
              x: step >= 2 ? 80 : 0
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="atom-nucleus chlorine">
              Cl
            </div>

            <div className="electron-ring ring-b">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((e) => (
                <span
                  key={e}
                  className="small-electron"
                  style={{
                    transform: `rotate(${e * 45}deg) translateY(-48px)`
                  }}
                >
                  e⁻
                </span>
              ))}
            </div>

            {/* NEEDS ELECTRON */}
            {step >= 1 && step < 2 && (
              <motion.div
                className="electron-hole"
                animate={{
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              >
                +
              </motion.div>
            )}
          </motion.div>

          {/* IONIC RESULT */}
          {step === 3 && (
            <motion.div
              className="ionic-result"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="ion sodium-ion">
                Na⁺
              </div>

              <motion.div
                className="ionic-attraction"
                animate={{
                  scaleX: [1, 1.15, 1]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity
                }}
              >
                Electrostatic attraction
              </motion.div>

              <div className="ion chloride-ion">
                Cl⁻
              </div>
            </motion.div>
          )}

          {/* COVALENT BOND */}
          {step === 4 && (
            <motion.div
              className="covalent-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="covalent-atom">
                <div className="carbon">H</div>

                <div className="shared-electrons">
                  <motion.span
                    animate={{
                      x: playing ? [0, 15, 0] : 0
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  >
                    e⁻
                  </motion.span>

                  <motion.span
                    animate={{
                      x: playing ? [0, -15, 0] : 0
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  >
                    e⁻
                  </motion.span>
                </div>

                <div className="carbon">H</div>
              </div>

              <div className="shared-label">
                Shared electron pair
              </div>
            </motion.div>
          )}

        </div>

        {/* LEGEND */}
        <div className="bond-legend">

          <div>
            <span className="legend-circle sodium">
              +
            </span>
            Positive ion
          </div>

          <div>
            <span className="legend-circle chlorine">
              −
            </span>
            Negative ion
          </div>

          <div>
            <span className="legend-circle electron">
              e⁻
            </span>
            Electron
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
              <strong>Why do atoms form bonds?</strong>
              <p>
                Atoms form chemical bonds to reach a more stable
                electron arrangement.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <strong>Valence electrons</strong>
              <p>
                The electrons in the outermost shell are called
                valence electrons. They are mainly involved in bonding.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <strong>Electron transfer</strong>
              <p>
                In an ionic bond, one atom transfers an electron to
                another atom. Here sodium gives an electron to chlorine.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <strong>Ionic bonding</strong>
              <p>
                Sodium becomes Na⁺ and chlorine becomes Cl⁻.
                Opposite charges attract, forming an ionic bond.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <strong>Covalent bonding</strong>
              <p>
                In a covalent bond, atoms share electrons. The shared
                electrons help both atoms achieve a more stable
                arrangement.
              </p>
            </>
          )}
        </motion.div>

        <style>{`

          .bond-scene {
            min-height: 620px;
            position: relative;
            overflow: hidden;
            padding: 25px;
            border-radius: 24px;
            background:
              radial-gradient(
                circle at center,
                rgba(59,130,246,.13),
                transparent 45%
              ),
              #0b1020;
            color: white;
          }

          .bond-step-title {
            text-align: center;
            font-size: 19px;
            font-weight: 700;
            margin-bottom: 5px;
          }

          .bond-area {
            height: 300px;
            position: relative;
            max-width: 750px;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 180px;
          }

          .bond-atom {
            width: 100px;
            height: 100px;
            position: relative;
            z-index: 4;
          }

          .atom-nucleus {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 800;
            background: #ef4444;
            box-shadow: 0 0 30px rgba(239,68,68,.35);
          }

          .atom-nucleus.chlorine {
            background: #22c55e;
            box-shadow: 0 0 30px rgba(34,197,94,.35);
          }

          .electron-ring {
            position: absolute;
            width: 130px;
            height: 130px;
            left: -20px;
            top: -20px;
            border: 1px dashed rgba(255,255,255,.25);
            border-radius: 50%;
          }

          .small-electron {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 25px;
            height: 25px;
            margin-left: -12px;
            margin-top: -12px;
            border-radius: 50%;
            background: #3b82f6;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 9px;
            font-weight: bold;
          }

          .valence-electron {
            position: absolute;
            right: -25px;
            top: 38px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #3b82f6;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 9px;
            z-index: 10;
          }

          .electron-hole {
            position: absolute;
            right: -25px;
            top: 38px;
            width: 28px;
            height: 28px;
            border: 2px dashed #60a5fa;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #60a5fa;
            font-weight: bold;
          }

          .transferring-electron {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -15px;
            margin-top: -15px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #3b82f6;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 9px;
            font-weight: bold;
            z-index: 20;
            box-shadow: 0 0 20px rgba(59,130,246,.8);
          }

          .ionic-result {
            position: absolute;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 100px;
          }

          .ion {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 25px;
            font-weight: 800;
          }

          .sodium-ion {
            background: #ef4444;
          }

          .chloride-ion {
            background: #22c55e;
          }

          .ionic-attraction {
            position: absolute;
            top: 185px;
            font-size: 13px;
            color: #cbd5e1;
          }

          .covalent-result {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 25px;
          }

          .covalent-atom {
            display: flex;
            align-items: center;
            gap: 55px;
          }

          .carbon {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background: #64748b;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 25px;
            font-weight: 800;
          }

          .shared-electrons {
            display: flex;
            gap: 4px;
          }

          .shared-electrons span {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #3b82f6;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 9px;
          }

          .shared-label {
            color: #cbd5e1;
            font-size: 14px;
          }

          .bond-legend {
            display: flex;
            justify-content: center;
            gap: 25px;
            margin-bottom: 20px;
            font-size: 12px;
            color: #cbd5e1;
          }

          .bond-legend > div {
            display: flex;
            align-items: center;
            gap: 7px;
          }

          .legend-circle {
            width: 27px;
            height: 27px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
          }

          .legend-circle.sodium {
            background: #ef4444;
          }

          .legend-circle.chlorine {
            background: #22c55e;
          }

          .legend-circle.electron {
            background: #3b82f6;
          }

          .process-row {
            display: flex;
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
            margin: 15px 0 20px;
          }

          .process-step {
            display: flex;
            align-items: center;
            gap: 7px;
            padding: 7px 11px;
            border-radius: 20px;
            background: rgba(255,255,255,.05);
            color: #94a3b8;
            font-size: 12px;
          }

          .process-step.active {
            background: rgba(59,130,246,.2);
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
            background: rgba(255,255,255,.1);
            font-size: 11px;
          }

          .explanation-box {
            max-width: 720px;
            margin: auto;
            padding: 16px 20px;
            border-radius: 15px;
            background: rgba(255,255,255,.06);
            border: 1px solid rgba(255,255,255,.08);
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

          @media (max-width: 650px) {
            .bond-area {
              gap: 80px;
              transform: scale(.8);
            }

            .bond-legend {
              gap: 10px;
            }
          }

        `}</style>

      </div>
    </VisualizationShell>
  );
}