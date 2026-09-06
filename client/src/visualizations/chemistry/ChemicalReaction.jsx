import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function ChemicalReaction({ step, playing }) {
  const stages = [
    "Reactants",
    "Collision",
    "Bonds Break",
    "Atoms Rearrange",
    "Products"
  ];

  return (
    <VisualizationShell
      title="Chemical Reaction"
      subtitle="Watch reactant molecules collide, rearrange and form new products."
    >
      <div className="reaction-scene">

        {/* STEP TITLE */}
        <motion.div
          className="reaction-title"
          key={step}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {stages[Math.min(step, stages.length - 1)]}
        </motion.div>

        {/* REACTION AREA */}
        <div className="reaction-area">

          {/* STEP 0 / 1 / 2 / 3 */}
          {step < 4 && (
            <>
              {/* MOLECULE A : H-H */}
              <motion.div
                className="molecule molecule-h2"
                animate={
                  step === 1
                    ? {
                        x: [0, 70, 0],
                        scale: [1, 1.08, 1]
                      }
                    : step >= 2
                    ? {
                        x: -80,
                        scale: 0.9
                      }
                    : {
                        x: 0
                      }
                }
                transition={{
                  duration: 1.5,
                  repeat: step === 1 && playing ? Infinity : 0
                }}
              >
                <Atom label="H" type="hydrogen" />
                <Bond active={step < 2} />
                <Atom label="H" type="hydrogen" />
              </motion.div>

              {/* PLUS */}
              <motion.div className="reaction-plus">
                +
              </motion.div>

              {/* MOLECULE B : Cl-Cl */}
              <motion.div
                className="molecule molecule-cl2"
                animate={
                  step === 1
                    ? {
                        x: [0, -70, 0],
                        scale: [1, 1.08, 1]
                      }
                    : step >= 2
                    ? {
                        x: 80,
                        scale: 0.9
                      }
                    : {
                        x: 0
                      }
                }
                transition={{
                  duration: 1.5,
                  repeat: step === 1 && playing ? Infinity : 0
                }}
              >
                <Atom label="Cl" type="chlorine" />
                <Bond active={step < 2} />
                <Atom label="Cl" type="chlorine" />
              </motion.div>

              {/* COLLISION ENERGY */}
              {step === 1 && (
                <motion.div
                  className="collision-effect"
                  animate={{
                    scale: [0.7, 1.25, 0.7],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1,
                    repeat: playing ? Infinity : 0
                  }}
                >
                  ⚡
                </motion.div>
              )}

              {/* BROKEN BONDS */}
              {step === 2 && (
                <>
                  <motion.div
                    className="broken-bond broken-one"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                  />

                  <motion.div
                    className="broken-bond broken-two"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                  />

                  <motion.div
                    className="break-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Bonds break
                  </motion.div>
                </>
              )}

              {/* REARRANGING ATOMS */}
              {step === 3 && (
                <div className="rearrangement">

                  <motion.div
                    className="free-atom h-one"
                    animate={{
                      x: playing ? [0, 35, 0] : 20
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity
                    }}
                  >
                    H
                  </motion.div>

                  <motion.div
                    className="free-atom h-two"
                    animate={{
                      x: playing ? [0, -35, 0] : -20
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity
                    }}
                  >
                    H
                  </motion.div>

                  <motion.div
                    className="free-atom cl-one"
                    animate={{
                      y: playing ? [0, -20, 0] : -10
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity
                    }}
                  >
                    Cl
                  </motion.div>

                  <motion.div
                    className="free-atom cl-two"
                    animate={{
                      y: playing ? [0, 20, 0] : 10
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity
                    }}
                  >
                    Cl
                  </motion.div>

                  <div className="rearrange-label">
                    Atoms rearrange
                  </div>

                </div>
              )}
            </>
          )}

          {/* FINAL PRODUCTS */}
          {step === 4 && (
            <motion.div
              className="products"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 160
              }}
            >

              {/* HCl */}
              <motion.div
                className="product-molecule"
                animate={{
                  y: playing ? [0, -8, 0] : 0
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                <Atom label="H" type="hydrogen" />
                <Bond active />
                <Atom label="Cl" type="chlorine" />
              </motion.div>

              <div className="product-plus">+</div>

              {/* HCl */}
              <motion.div
                className="product-molecule"
                animate={{
                  y: playing ? [0, 8, 0] : 0
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                <Atom label="H" type="hydrogen" />
                <Bond active />
                <Atom label="Cl" type="chlorine" />
              </motion.div>

            </motion.div>
          )}

          {/* FORMULA */}
          <motion.div
            className="reaction-formula"
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {step < 4 ? (
              <>
                <span>H₂</span>
                <span>+</span>
                <span>Cl₂</span>
                <span>→</span>
                <span>2HCl</span>
              </>
            ) : (
              <>
                <strong>H₂ + Cl₂ → 2HCl</strong>
              </>
            )}
          </motion.div>

        </div>

        {/* EXPLANATION */}
        <motion.div
          className="reaction-explanation"
          key={`explanation-${step}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >

          {step === 0 && (
            <>
              <strong>1. Reactants</strong>
              <p>
                Hydrogen (H₂) and chlorine (Cl₂) are the reactants.
                They contain atoms that will participate in the reaction.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <strong>2. Collision</strong>
              <p>
                Reactant molecules collide with enough energy.
                This can allow their existing chemical bonds to change.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <strong>3. Bonds break</strong>
              <p>
                The H–H and Cl–Cl bonds are broken. The atoms are now
                available to form new bonds.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <strong>4. Atoms rearrange</strong>
              <p>
                The atoms move into a new arrangement. Hydrogen atoms
                pair with chlorine atoms to create new H–Cl bonds.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <strong>5. New products form</strong>
              <p>
                Two molecules of hydrogen chloride (HCl) are produced.
                The atoms are conserved — they have simply been
                rearranged into new molecules.
              </p>
            </>
          )}

        </motion.div>

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

        {/* CSS */}
        <style>{`

          .reaction-scene {
            min-height: 620px;
            position: relative;
            overflow: hidden;
            padding: 25px;
            border-radius: 24px;
            background:
              radial-gradient(
                circle at center,
                rgba(59,130,246,.13),
                transparent 48%
              ),
              #0b1020;
            color: white;
          }

          .reaction-title {
            text-align: center;
            font-size: 19px;
            font-weight: 700;
            margin-bottom: 5px;
          }

          .reaction-area {
            height: 315px;
            max-width: 850px;
            margin: auto;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
          }

          .molecule {
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
          }

          .atom {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 19px;
            font-weight: 800;
            position: relative;
            z-index: 2;
          }

          .hydrogen {
            background: #3b82f6;
            box-shadow: 0 0 25px rgba(59,130,246,.4);
          }

          .chlorine {
            background: #22c55e;
            box-shadow: 0 0 25px rgba(34,197,94,.4);
          }

          .bond {
            width: 35px;
            height: 7px;
            border-radius: 10px;
            background: #cbd5e1;
            position: relative;
          }

          .bond::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            background: rgba(255,255,255,.45);
            top: 2px;
          }

          .reaction-plus,
          .product-plus {
            font-size: 28px;
            color: #94a3b8;
            font-weight: 700;
          }

          .collision-effect {
            position: absolute;
            font-size: 50px;
            z-index: 10;
          }

          .broken-bond {
            position: absolute;
            width: 75px;
            height: 4px;
            background: #ef4444;
            top: 145px;
            border-radius: 10px;
          }

          .broken-one {
            left: 250px;
            transform: rotate(20deg);
          }

          .broken-two {
            right: 250px;
            transform: rotate(-20deg);
          }

          .break-label,
          .rearrange-label {
            position: absolute;
            bottom: 45px;
            font-size: 13px;
            color: #fca5a5;
          }

          .rearrangement {
            width: 300px;
            height: 200px;
            position: relative;
          }

          .free-atom {
            position: absolute;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
          }

          .h-one {
            left: 40px;
            top: 50px;
            background: #3b82f6;
          }

          .h-two {
            right: 40px;
            top: 50px;
            background: #3b82f6;
          }

          .cl-one {
            left: 105px;
            top: 5px;
            background: #22c55e;
          }

          .cl-two {
            right: 105px;
            top: 95px;
            background: #22c55e;
          }

          .rearrange-label {
            bottom: -5px;
            left: 100px;
            color: #93c5fd;
          }

          .products {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 45px;
          }

          .product-molecule {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .reaction-formula {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 15px;
            align-items: center;
            font-size: 18px;
            font-weight: 600;
            color: #cbd5e1;
          }

          .reaction-formula strong {
            color: white;
            font-size: 20px;
          }

          .reaction-explanation {
            max-width: 720px;
            margin: 5px auto 20px;
            padding: 16px 20px;
            border-radius: 15px;
            background: rgba(255,255,255,.06);
            border: 1px solid rgba(255,255,255,.08);
          }

          .reaction-explanation strong {
            display: block;
            font-size: 15px;
            margin-bottom: 5px;
          }

          .reaction-explanation p {
            margin: 0;
            color: #aeb8ca;
            line-height: 1.5;
            font-size: 13px;
          }

          .process-row {
            display: flex;
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
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

          @media (max-width: 700px) {

            .reaction-area {
              transform: scale(.78);
            }

            .reaction-explanation {
              margin-top: -20px;
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


/* ATOM COMPONENT */

function Atom({ label, type }) {
  return (
    <motion.div
      className={`atom ${type}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 180
      }}
    >
      {label}
    </motion.div>
  );
}


/* BOND COMPONENT */

function Bond({ active }) {
  return (
    <motion.div
      className="bond"
      animate={{
        scaleX: active ? 1 : 0
      }}
      transition={{
        duration: 0.5
      }}
    />
  );
}