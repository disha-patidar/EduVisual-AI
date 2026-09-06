import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function StatesOfMatter({ step, playing }) {
  const stages = [
    "Solid",
    "Heating",
    "Liquid",
    "More Energy",
    "Gas"
  ];

  const particles = [
    [20, 20],
    [50, 20],
    [80, 20],
    [20, 50],
    [50, 50],
    [80, 50],
    [20, 80],
    [50, 80],
    [80, 80]
  ];

  const state = step < 1
    ? "solid"
    : step < 3
    ? "liquid"
    : "gas";

  return (
    <VisualizationShell
      title="States of Matter"
      subtitle="See how particle movement and spacing change in solids, liquids and gases."
    >
      <div className="matter-scene">

        {/* STEP TITLE */}
        <motion.div
          className="matter-title"
          key={step}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {stages[Math.min(step, stages.length - 1)]}
        </motion.div>

        {/* ENERGY INDICATOR */}
        <div className="energy-panel">
          <span>Particle Energy</span>

          <div className="energy-bar">
            <motion.div
              className="energy-fill"
              animate={{
                width:
                  step === 0
                    ? "20%"
                    : step === 1
                    ? "40%"
                    : step === 2
                    ? "55%"
                    : step === 3
                    ? "75%"
                    : "95%"
              }}
              transition={{ duration: 0.7 }}
            />
          </div>

          <span>
            {step === 0
              ? "Low"
              : step === 1
              ? "Increasing"
              : step === 2
              ? "Medium"
              : step === 3
              ? "High"
              : "Very High"}
          </span>
        </div>

        {/* CONTAINER */}
        <div className={`matter-container ${state}`}>

          {particles.map(([x, y], index) => {

            let targetX = x;
            let targetY = y;

            if (state === "liquid") {
              const liquidPositions = [
                [18, 65],
                [35, 72],
                [52, 60],
                [70, 75],
                [82, 62],
                [25, 84],
                [45, 88],
                [63, 83],
                [78, 90]
              ];

              targetX = liquidPositions[index][0];
              targetY = liquidPositions[index][1];
            }

            if (state === "gas") {
              const gasPositions = [
                [12, 15],
                [72, 12],
                [42, 28],
                [88, 40],
                [20, 50],
                [60, 55],
                [35, 72],
                [80, 78],
                [15, 88]
              ];

              targetX = gasPositions[index][0];
              targetY = gasPositions[index][1];
            }

            return (
              <motion.div
                key={index}
                className="matter-particle"
                animate={{
                  left: `${targetX}%`,
                  top: `${targetY}%`,
                  x:
                    playing && state === "solid"
                      ? [0, 3, -3, 0]
                      : playing && state === "liquid"
                      ? [0, 10, -8, 0]
                      : playing
                      ? [0, 20, -15, 0]
                      : 0,
                  y:
                    playing && state === "solid"
                      ? [0, -3, 3, 0]
                      : playing && state === "liquid"
                      ? [0, -12, 8, 0]
                      : playing
                      ? [0, -20, 15, 0]
                      : 0
                }}
                transition={{
                  left: {
                    duration: 1,
                    delay: index * 0.04
                  },
                  top: {
                    duration: 1,
                    delay: index * 0.04
                  },
                  x: {
                    duration:
                      state === "solid"
                        ? 0.5
                        : state === "liquid"
                        ? 1.1
                        : 1.7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  y: {
                    duration:
                      state === "solid"
                        ? 0.5
                        : state === "liquid"
                        ? 1.1
                        : 1.7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
            );
          })}

          {/* CONTAINER LABEL */}
          <div className="container-label">
            Matter
          </div>
        </div>

        {/* STATE DESCRIPTION */}
        <motion.div
          className="state-description"
          key={`description-${step}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >

          {step === 0 && (
            <>
              <strong>Solid — particles are tightly packed</strong>
              <p>
                Particles are very close together and arranged in a
                relatively fixed structure. They mainly vibrate in place.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <strong>Heating adds energy</strong>
              <p>
                As energy is added, the particles vibrate more strongly.
                Eventually they can move out of their fixed positions.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <strong>Liquid — particles can flow</strong>
              <p>
                Particles remain relatively close together, but they can
                move past one another. This allows liquids to flow.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <strong>More energy → faster particles</strong>
              <p>
                Adding more energy increases particle motion. Particles
                begin moving much farther apart.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <strong>Gas — particles spread out</strong>
              <p>
                Gas particles are far apart and move freely in all
                directions, filling the available container.
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

        {/* STATE CARDS */}
        <div className="state-cards">

          <div className={state === "solid" ? "state-card active" : "state-card"}>
            <div className="mini-particles solid-mini">
              <i />
              <i />
              <i />
              <i />
            </div>
            <strong>Solid</strong>
            <span>Fixed arrangement</span>
          </div>

          <div className={state === "liquid" ? "state-card active" : "state-card"}>
            <div className="mini-particles liquid-mini">
              <i />
              <i />
              <i />
              <i />
            </div>
            <strong>Liquid</strong>
            <span>Particles flow</span>
          </div>

          <div className={state === "gas" ? "state-card active" : "state-card"}>
            <div className="mini-particles gas-mini">
              <i />
              <i />
              <i />
              <i />
            </div>
            <strong>Gas</strong>
            <span>Particles spread out</span>
          </div>

        </div>

        <style>{`

          .matter-scene {
            min-height: 650px;
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

          .matter-title {
            text-align: center;
            font-size: 19px;
            font-weight: 700;
            margin-bottom: 12px;
          }

          .energy-panel {
            width: min(500px, 90%);
            margin: auto;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 11px;
            color: #94a3b8;
          }

          .energy-bar {
            flex: 1;
            height: 7px;
            border-radius: 10px;
            overflow: hidden;
            background: rgba(255,255,255,.1);
          }

          .energy-fill {
            height: 100%;
            border-radius: inherit;
            background: #f59e0b;
          }

          .matter-container {
            width: 390px;
            height: 280px;
            position: relative;
            margin: 25px auto 15px;
            border: 2px solid rgba(255,255,255,.35);
            border-radius: 18px;
            overflow: hidden;
            background: rgba(255,255,255,.025);
          }

          .matter-container::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              linear-gradient(
                90deg,
                transparent 49.8%,
                rgba(255,255,255,.03) 50%,
                transparent 50.2%
              );
            pointer-events: none;
          }

          .matter-particle {
            position: absolute;
            width: 28px;
            height: 28px;
            margin-left: -14px;
            margin-top: -14px;
            border-radius: 50%;
            background: #3b82f6;
            box-shadow:
              0 0 12px rgba(59,130,246,.65);
          }

          .solid .matter-particle {
            background: #60a5fa;
          }

          .liquid .matter-particle {
            background: #38bdf8;
          }

          .gas .matter-particle {
            background: #a78bfa;
          }

          .container-label {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            color: #64748b;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .state-description {
            max-width: 720px;
            margin: auto;
            padding: 16px 20px;
            border-radius: 15px;
            background: rgba(255,255,255,.06);
            border: 1px solid rgba(255,255,255,.08);
          }

          .state-description strong {
            display: block;
            font-size: 15px;
            margin-bottom: 5px;
          }

          .state-description p {
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
            margin: 20px 0 15px;
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

          .state-cards {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-top: 12px;
          }

          .state-card {
            width: 130px;
            padding: 10px;
            border-radius: 13px;
            background: rgba(255,255,255,.04);
            border: 1px solid rgba(255,255,255,.06);
            text-align: center;
            transition: .25s;
          }

          .state-card.active {
            background: rgba(59,130,246,.14);
            border-color: rgba(96,165,250,.4);
            transform: translateY(-3px);
          }

          .state-card strong {
            display: block;
            font-size: 12px;
          }

          .state-card span {
            display: block;
            margin-top: 3px;
            font-size: 10px;
            color: #94a3b8;
          }

          .mini-particles {
            width: 70px;
            height: 45px;
            margin: 0 auto 6px;
            position: relative;
          }

          .mini-particles i {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #60a5fa;
            position: absolute;
          }

          .solid-mini i:nth-child(1) {
            left: 18px;
            top: 10px;
          }

          .solid-mini i:nth-child(2) {
            left: 38px;
            top: 10px;
          }

          .solid-mini i:nth-child(3) {
            left: 18px;
            top: 28px;
          }

          .solid-mini i:nth-child(4) {
            left: 38px;
            top: 28px;
          }

          .liquid-mini i:nth-child(1) {
            left: 10px;
            top: 25px;
          }

          .liquid-mini i:nth-child(2) {
            left: 28px;
            top: 12px;
          }

          .liquid-mini i:nth-child(3) {
            left: 42px;
            top: 27px;
          }

          .liquid-mini i:nth-child(4) {
            left: 55px;
            top: 17px;
          }

          .gas-mini i:nth-child(1) {
            left: 4px;
            top: 5px;
          }

          .gas-mini i:nth-child(2) {
            left: 53px;
            top: 8px;
          }

          .gas-mini i:nth-child(3) {
            left: 25px;
            top: 30px;
          }

          .gas-mini i:nth-child(4) {
            left: 62px;
            top: 35px;
          }

          @media (max-width: 600px) {

            .matter-container {
              width: 90%;
              height: 240px;
            }

            .energy-panel {
              font-size: 9px;
            }

            .state-cards {
              gap: 5px;
            }

            .state-card {
              width: 105px;
            }

          }

        `}</style>

      </div>
    </VisualizationShell>
  );
}