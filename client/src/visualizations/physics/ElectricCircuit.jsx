import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

const stages = [
  {
    title: "The Circuit",
    subtitle: "A battery, wires and bulb form a closed path.",
    explanation:
      "An electric circuit provides a complete conducting path. The battery creates a potential difference that can drive electric current through the circuit."
  },
  {
    title: "Potential Difference",
    subtitle: "The battery provides energy to the circuit.",
    explanation:
      "A battery creates a potential difference between its terminals. This provides the energy needed to move charge through the circuit."
  },
  {
    title: "Current Flows",
    subtitle: "Electric charge moves through the conducting path.",
    explanation:
      "When the circuit is closed, charge flows through the wire. The moving charge constitutes electric current."
  },
  {
    title: "Bulb Receives Energy",
    subtitle: "Current passes through the bulb's filament.",
    explanation:
      "As current passes through the bulb, electrical energy is transferred to the filament, which becomes hot."
  },
  {
    title: "Bulb Lights",
    subtitle: "The filament becomes hot enough to emit light.",
    explanation:
      "The filament's electrical resistance causes it to heat up. At sufficiently high temperature, it emits visible light."
  }
];

function Electron({ delay = 0, reverse = false }) {
  return (
    <motion.div
      className="electron"
      animate={{
        x: reverse
          ? [0, -80, -160, -240]
          : [0, 80, 160, 240],
        opacity: [0, 1, 1, 0.2]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
    >
      −
    </motion.div>
  );
}

function ElectricCircuit({ step = 0, playing = false }) {
  const current = Math.min(step, stages.length - 1);

  const circuitActive = current >= 1;
  const currentFlowing = current >= 2;
  const bulbActive = current >= 3;
  const bulbLit = current >= 4;

  return (
    <VisualizationShell
      title="Electric Circuit"
      subtitle="Watch how a battery drives current through a complete circuit."
    >
      <div className="electric-circuit">

        {/* ================= CIRCUIT SCENE ================= */}

        <div className="circuit-scene">

          {/* TOP LABEL */}
          <div className="circuit-status">
            {!circuitActive && "CIRCUIT READY"}
            {circuitActive && !currentFlowing && "BATTERY ACTIVE"}
            {currentFlowing && !bulbLit && "CURRENT FLOWING"}
            {bulbLit && "💡 CIRCUIT WORKING"}
          </div>

          {/* WIRES */}

          <div className="wire wire-top" />
          <div className="wire wire-left" />
          <div className="wire wire-right" />
          <div className="wire wire-bottom" />

          {/* BATTERY */}

          <div className="battery">

            <div className="battery-terminal positive">
              +
            </div>

            <div className="battery-body">
              <div className="battery-line long" />
              <div className="battery-line short" />

              <span>BATTERY</span>
              <small>9V</small>
            </div>

            <div className="battery-terminal negative">
              −
            </div>

          </div>

          {/* BULB */}

          <motion.div
            className={`bulb ${
              bulbLit ? "bulb-lit" : ""
            }`}
            animate={
              bulbLit && playing
                ? {
                    scale: [1, 1.05, 1],
                    filter: [
                      "drop-shadow(0 0 5px rgba(255,190,50,0.2))",
                      "drop-shadow(0 0 30px rgba(255,190,50,0.8))",
                      "drop-shadow(0 0 5px rgba(255,190,50,0.2))"
                    ]
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          >

            <div className="bulb-glass">

              <div className="bulb-filament">
                <span />
                <span />
              </div>

            </div>

            <div className="bulb-base">
              <span />
              <span />
              <span />
            </div>

          </motion.div>

          {/* ELECTRON FLOW */}

          {currentFlowing && (
            <div className="electron-path">

              <Electron delay={0} />
              <Electron delay={0.5} />
              <Electron delay={1} />
              <Electron delay={1.5} />

            </div>
          )}

          {/* CURRENT ARROWS */}

          {currentFlowing && (
            <>
              <motion.div
                className="current-arrow arrow-top-wire"
                animate={
                  playing
                    ? { x: [0, 20, 0] }
                    : {}
                }
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              >
                →
              </motion.div>

              <motion.div
                className="current-arrow arrow-right-wire"
                animate={
                  playing
                    ? { y: [0, 20, 0] }
                    : {}
                }
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              >
                ↓
              </motion.div>

              <motion.div
                className="current-arrow arrow-bottom-wire"
                animate={
                  playing
                    ? { x: [0, -20, 0] }
                    : {}
                }
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              >
                ←
              </motion.div>

              <motion.div
                className="current-arrow arrow-left-wire"
                animate={
                  playing
                    ? { y: [0, -20, 0] }
                    : {}
                }
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              >
                ↑
              </motion.div>
            </>
          )}

          {/* ELECTRIC FIELD */}

          {circuitActive && (
            <motion.div
              className="electric-field"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ELECTRIC POTENTIAL
            </motion.div>
          )}

          {/* BULB ENERGY */}

          {bulbActive && (
            <motion.div
              className="energy-transfer"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
            >
              ⚡ Electrical Energy → 💡 Light + Heat
            </motion.div>
          )}

          {/* OPEN/CLOSED INDICATOR */}

          <div className="circuit-loop-label">
            {circuitActive
              ? "CLOSED CIRCUIT"
              : "COMPLETE THE CIRCUIT"}
          </div>

        </div>

        {/* ================= INFORMATION ================= */}

        <div className="circuit-info">

          <div className="circuit-step">
            STEP {current + 1} / {stages.length}
          </div>

          <h2>{stages[current].title}</h2>

          <p className="circuit-subtitle">
            {stages[current].subtitle}
          </p>

          <div className="circuit-explanation">

            <div className="circuit-info-icon">
              {current === 0 && "🔋"}
              {current === 1 && "⚡"}
              {current === 2 && "➖"}
              {current === 3 && "💡"}
              {current === 4 && "✨"}
            </div>

            <div>
              <strong>What's happening?</strong>

              <p>
                {stages[current].explanation}
              </p>
            </div>

          </div>

          {/* PROCESS */}

          <div className="circuit-process">

            {stages.map((stage, index) => (
              <div
                key={stage.title}
                className={`circuit-process-step ${
                  index === current ? "active" : ""
                } ${
                  index < current ? "completed" : ""
                }`}
              >

                <div className="circuit-process-dot">
                  {index < current ? "✓" : index + 1}
                </div>

                <span>
                  {stage.title}
                </span>

              </div>
            ))}

          </div>

          {/* CONCEPT CARDS */}

          <div className="circuit-concepts">

            <div className="circuit-concept">
              <span>🔋</span>
              <strong>Voltage</strong>
              <p>
                Potential difference that provides energy per unit charge.
              </p>
            </div>

            <div className="circuit-concept">
              <span>⚡</span>
              <strong>Current</strong>
              <p>
                The rate at which electric charge flows.
              </p>
            </div>

            <div className="circuit-concept">
              <span>💡</span>
              <strong>Resistance</strong>
              <p>
                Opposition to the flow of electric charge.
              </p>
            </div>

          </div>

          {/* OHM'S LAW */}

          <div className="ohm-law">
            <div>
              <span>OHM'S LAW</span>
              <strong>V = I × R</strong>
            </div>

            <p>
              Voltage = Current × Resistance
            </p>
          </div>

        </div>

      </div>]
      <style>{`.electric-circuit {
  width: 100%;
}

.circuit-scene {
  position: relative;
  height: 470px;
  overflow: hidden;
  border-radius: 22px;
  background:
    radial-gradient(
      circle at 50% 45%,
      rgba(70,130,180,0.08),
      transparent 45%
    ),
    #101722;
  border: 1px solid rgba(255,255,255,0.08);
}

/* STATUS */

.circuit-status {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 15px;
  border-radius: 20px;
  background: rgba(255,255,255,0.07);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
  z-index: 50;
}

/* WIRES */

.wire {
  position: absolute;
  background: #8c9aa8;
  z-index: 5;
}

.wire-top {
  top: 145px;
  left: 25%;
  width: 50%;
  height: 5px;
}

.wire-bottom {
  bottom: 115px;
  left: 25%;
  width: 50%;
  height: 5px;
}

.wire-left {
  top: 145px;
  bottom: 115px;
  left: 25%;
  width: 5px;
}

.wire-right {
  top: 145px;
  bottom: 115px;
  right: 25%;
  width: 5px;
}

/* BATTERY */

.battery {
  position: absolute;
  left: calc(25% - 48px);
  top: 215px;
  width: 95px;
  height: 90px;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
}

.battery-body {
  width: 65px;
  height: 65px;
  border-radius: 8px;
  background: #263342;
  border: 2px solid #9aa8b5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.battery-body span {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
}

.battery-body small {
  margin-top: 4px;
  opacity: 0.6;
}

.battery-line {
  position: absolute;
  left: 50%;
  top: 12px;
  transform: translateX(-50%);
  background: #d9e1e7;
}

.battery-line.long {
  width: 22px;
  height: 4px;
}

.battery-line.short {
  width: 4px;
  height: 14px;
  top: 8px;
}

.battery-terminal {
  position: absolute;
  font-size: 20px;
  font-weight: 900;
}

.positive {
  top: -22px;
}

.negative {
  bottom: -22px;
}

/* BULB */

.bulb {
  position: absolute;
  right: calc(25% - 48px);
  top: 190px;
  width: 100px;
  height: 120px;
  z-index: 25;
  text-align: center;
}

.bulb-glass {
  position: relative;
  margin: auto;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(210,225,235,0.08);
  border: 3px solid #9aa8b5;
}

.bulb-lit .bulb-glass {
  background: rgba(255,200,60,0.25);
  border-color: #ffd166;
}

.bulb-filament {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
  width: 35px;
  height: 35px;
}

.bulb-filament span {
  position: absolute;
  width: 3px;
  height: 35px;
  background: #a9b4bd;
}

.bulb-filament span:first-child {
  left: 8px;
  transform: rotate(25deg);
}

.bulb-filament span:last-child {
  right: 8px;
  transform: rotate(-25deg);
}

.bulb-lit .bulb-filament span {
  background: #fff2a8;
  box-shadow: 0 0 15px #ffd166;
}

.bulb-base {
  width: 40px;
  height: 30px;
  margin: -3px auto 0;
  background: #8996a1;
  border-radius: 3px 3px 10px 10px;
}

.bulb-base span {
  display: block;
  height: 2px;
  margin: 6px 3px;
  background: #4b555e;
}

/* ELECTRONS */

.electron-path {
  position: absolute;
  inset: 0;
  z-index: `}</style>
    </VisualizationShell>
  );
}

export default ElectricCircuit;