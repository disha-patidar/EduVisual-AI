import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

const stages = [
  {
    title: "A Wave Begins",
    subtitle: "A disturbance starts the wave motion.",
    explanation:
      "A wave is a disturbance that transfers energy from one place to another. The material itself does not travel with the wave over large distances."
  },
  {
    title: "Particles Oscillate",
    subtitle: "Particles move around their equilibrium positions.",
    explanation:
      "In a transverse wave, particles move up and down while the wave travels horizontally. Each particle oscillates around its equilibrium position."
  },
  {
    title: "Amplitude",
    subtitle: "Amplitude measures the maximum displacement.",
    explanation:
      "Amplitude is the maximum displacement of a particle from its equilibrium position. A larger amplitude means more energy is carried by the wave."
  },
  {
    title: "Wavelength",
    subtitle: "Wavelength is the distance between repeating points.",
    explanation:
      "Wavelength is the distance between two consecutive crests or two consecutive troughs. It is represented by the symbol λ."
  },
  {
    title: "Frequency",
    subtitle: "Frequency tells us how many cycles occur each second.",
    explanation:
      "Frequency is the number of complete oscillations per second. It is measured in hertz (Hz). Higher frequency means more wave cycles occur each second."
  }
];

function WaveMotion({ step = 0, playing = false }) {
  const current = Math.min(step, stages.length - 1);

  const showParticles = current >= 1;
  const showAmplitude = current >= 2;
  const showWavelength = current >= 3;
  const showFrequency = current >= 4;

  /*
   * Generate particles along the equilibrium line.
   */
  const particles = Array.from({ length: 17 }, (_, i) => i);

  return (
    <VisualizationShell
      title="Wave Motion"
      subtitle="Explore amplitude, wavelength and frequency through an animated wave."
    >
      <div className="wave-motion-wrapper">

        {/* =====================================================
            MAIN WAVE SCENE
        ===================================================== */}

        <div className="wave-scene">

          {/* HEADER */}

          <div className="wave-stage-label">
            {current === 0 && "WAVE STARTS"}
            {current === 1 && "PARTICLE OSCILLATION"}
            {current === 2 && "AMPLITUDE"}
            {current === 3 && "WAVELENGTH"}
            {current === 4 && "FREQUENCY"}
          </div>

          {/* GRID */}

          <div className="wave-grid">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="wave-grid-vertical"
                style={{
                  left: `${10 + i * 13.3}%`
                }}
              />
            ))}

            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="wave-grid-horizontal"
                style={{
                  top: `${18 + i * 16}%`
                }}
              />
            ))}
          </div>

          {/* EQUILIBRIUM LINE */}

          <div className="equilibrium-line">
            <span>Equilibrium position</span>
          </div>

          {/* =================================================
              WAVE
          ================================================= */}

          <svg
            className="wave-svg"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
          >
            {/* Faint reference wave */}

            <path
              d="
                M 0 200
                C 80 90, 170 90, 250 200
                S 420 310, 500 200
                S 670 90, 750 200
                S 920 310, 1000 200
              "
              className="wave-reference"
            />

            {/* Main wave */}

            <motion.path
              d="
                M 0 200
                C 80 90, 170 90, 250 200
                S 420 310, 500 200
                S 670 90, 750 200
                S 920 310, 1000 200
              "
              className="wave-path"
              animate={
                playing
                  ? {
                      x: [-25, 0, 25, 0, -25]
                    }
                  : {}
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>

          {/* =================================================
              PARTICLES
          ================================================= */}

          {showParticles && (
            <div className="wave-particles">

              {particles.map((particle) => {

                const left =
                  7 + particle * 5.35;

                /*
                 * Different particles have different phases
                 * so they visibly oscillate.
                 */

                return (
                  <motion.div
                    key={particle}
                    className="wave-particle"
                    style={{
                      left: `${left}%`
                    }}
                    animate={
                      playing
                        ? {
                            y: [-45, 45, -45]
                          }
                        : {
                            y: 0
                          }
                    }
                    transition={{
                      duration: 1.8,
                      delay: particle * 0.08,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="particle-dot" />
                  </motion.div>
                );
              })}

            </div>
          )}

          {/* =================================================
              PARTICLE DIRECTION
          ================================================= */}

          {showParticles && (
            <motion.div
              className="particle-motion-label"
              animate={
                playing
                  ? {
                      opacity: [0.35, 1, 0.35]
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              ↑ ↓ Particles oscillate
            </motion.div>
          )}

          {/* =================================================
              WAVE TRAVEL DIRECTION
          ================================================= */}

          {current >= 1 && (
            <motion.div
              className="wave-direction"
              animate={
                playing
                  ? {
                      x: [0, 25, 0]
                    }
                  : {}
              }
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              → Wave travels →
            </motion.div>
          )}

          {/* =================================================
              AMPLITUDE
          ================================================= */}

          {showAmplitude && (
            <motion.div
              className="amplitude-marker"
              initial={{
                opacity: 0,
                scaleY: 0
              }}
              animate={{
                opacity: 1,
                scaleY: 1
              }}
            >
              <div className="amplitude-line" />

              <div className="amplitude-arrow-top">
                ↑
              </div>

              <div className="amplitude-arrow-bottom">
                ↓
              </div>

              <div className="amplitude-label">
                A
                <small>Amplitude</small>
              </div>
            </motion.div>
          )}

          {/* =================================================
              CREST
          ================================================= */}

          {showAmplitude && (
            <motion.div
              className="crest-label"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
            >
              <strong>Crest</strong>
              <span>Highest point</span>
            </motion.div>
          )}

          {/* =================================================
              TROUGH
          ================================================= */}

          {showAmplitude && (
            <motion.div
              className="trough-label"
              initial={{
                opacity: 0,
                y: -10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
            >
              <strong>Trough</strong>
              <span>Lowest point</span>
            </motion.div>
          )}

          {/* =================================================
              WAVELENGTH
          ================================================= */}

          {showWavelength && (
            <motion.div
              className="wavelength-marker"
              initial={{
                opacity: 0,
                scaleX: 0
              }}
              animate={{
                opacity: 1,
                scaleX: 1
              }}
            >
              <div className="wavelength-line">
                <span className="arrow-left">
                  ←
                </span>

                <span className="arrow-right">
                  →
                </span>
              </div>

              <div className="wavelength-label">
                λ — Wavelength
              </div>
            </motion.div>
          )}

          {/* =================================================
              FREQUENCY
          ================================================= */}

          {showFrequency && (
            <motion.div
              className="frequency-indicator"
              initial={{
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
            >
              <div className="frequency-icon">
                〰
              </div>

              <div>
                <strong>
                  Frequency
                </strong>

                <span>
                  f = cycles / second
                </span>

                <small>
                  Unit: Hertz (Hz)
                </small>
              </div>
            </motion.div>
          )}

          {/* =================================================
              ENERGY
          ================================================= */}

          {showAmplitude && (
            <div className="energy-indicator">

              <span>
                Wave energy
              </span>

              <div className="energy-bars">

                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.i
                    key={i}
                    animate={
                      playing
                        ? {
                            height: [
                              `${10 + i * 5}px`,
                              `${18 + i * 8}px`,
                              `${10 + i * 5}px`
                            ]
                          }
                        : {
                            height:
                              `${10 + i * 5}px`
                          }
                    }
                    transition={{
                      duration: 1,
                      delay: i * 0.08,
                      repeat: Infinity
                    }}
                  />
                ))}

              </div>

              <small>
                Greater amplitude → greater energy
              </small>

            </div>
          )}

        </div>

        {/* =====================================================
            INFORMATION
        ===================================================== */}

        <div className="wave-info">

          <div className="wave-step">
            STEP {current + 1} / {stages.length}
          </div>

          <h2>
            {stages[current].title}
          </h2>

          <p className="wave-subtitle">
            {stages[current].subtitle}
          </p>

          {/* EXPLANATION */}

          <div className="wave-explanation">

            <div className="wave-explanation-icon">
              {current === 0 && "〰️"}
              {current === 1 && "↕️"}
              {current === 2 && "📏"}
              {current === 3 && "↔️"}
              {current === 4 && "⏱️"}
            </div>

            <div>

              <strong>
                What's happening?
              </strong>

              <p>
                {stages[current].explanation}
              </p>

            </div>

          </div>

          {/* PROCESS */}

          <div className="wave-process">

            {stages.map((stage, index) => (

              <div
                key={stage.title}
                className={`wave-process-step ${
                  index === current
                    ? "active"
                    : ""
                } ${
                  index < current
                    ? "completed"
                    : ""
                }`}
              >

                <div className="wave-process-dot">

                  {index < current
                    ? "✓"
                    : index + 1}

                </div>

                <span>
                  {index === 0 && "Start"}
                  {index === 1 && "Particles"}
                  {index === 2 && "Amplitude"}
                  {index === 3 && "Wavelength"}
                  {index === 4 && "Frequency"}
                </span>

              </div>

            ))}

          </div>

          {/* FORMULAS */}

          <div className="wave-formulas">

            <div className="wave-formula">

              <span>
                AMPLITUDE
              </span>

              <strong>
                A
              </strong>

              <small>
                Maximum displacement
              </small>

            </div>

            <div className="wave-formula">

              <span>
                WAVELENGTH
              </span>

              <strong>
                λ
              </strong>

              <small>
                Distance between crests
              </small>

            </div>

            <div className="wave-formula">

              <span>
                FREQUENCY
              </span>

              <strong>
                f = 1/T
              </strong>

              <small>
                Cycles per second
              </small>

            </div>

          </div>

          {/* KEY CONCEPTS */}

          <div className="wave-concepts">

            <div className="wave-concept">

              <strong>
                🏔 Crest
              </strong>

              <p>
                The highest point of a transverse
                wave.
              </p>

            </div>

            <div className="wave-concept">

              <strong>
                🕳 Trough
              </strong>

              <p>
                The lowest point of a transverse
                wave.
              </p>

            </div>

            <div className="wave-concept">

              <strong>
                ⚡ Energy
              </strong>

              <p>
                Waves transfer energy through a
                medium or space.
              </p>

            </div>

          </div>

        </div>

        {/* =====================================================
            ALL CSS INSIDE SAME FILE
        ===================================================== */}

        <style>{`

          /* ==========================================
             WRAPPER
          ========================================== */

          .wave-motion-wrapper {
            width: 100%;
            max-width: 1150px;
            margin: 0 auto;
            box-sizing: border-box;
          }

          /* ==========================================
             SCENE
          ========================================== */

          .wave-scene {
            position: relative;

            width: 100%;
            height: 500px;

            overflow: hidden;

            border-radius: 24px;

            background:
              radial-gradient(
                circle at 50% 50%,
                #172846 0%,
                #0d192e 55%,
                #08101f 100%
              );

            border:
              1px solid
              rgba(255,255,255,0.08);

            box-sizing: border-box;
          }

          /* ==========================================
             STAGE LABEL
          ========================================== */

          .wave-stage-label {
            position: absolute;

            top: 18px;
            left: 50%;

            transform: translateX(-50%);

            z-index: 50;

            padding:
              8px 16px;

            border-radius: 999px;

            background:
              rgba(255,255,255,0.07);

            border:
              1px solid
              rgba(255,255,255,0.09);

            color: white;

            font-size: 10px;
            font-weight: 800;

            letter-spacing: 1.4px;

            white-space: nowrap;
          }

          /* ==========================================
             GRID
          ========================================== */

          .wave-grid {
            position: absolute;

            inset: 0;

            opacity: 0.15;

            pointer-events: none;
          }

          .wave-grid-vertical {
            position: absolute;

            top: 60px;
            bottom: 55px;

            width: 1px;

            background:
              rgba(255,255,255,0.12);
          }

          .wave-grid-horizontal {
            position: absolute;

            left: 5%;
            right: 5%;

            height: 1px;

            background:
              rgba(255,255,255,0.12);
          }

          /* ==========================================
             EQUILIBRIUM
          ========================================== */

          .equilibrium-line {
            position: absolute;

            left: 5%;
            right: 5%;

            top: 50%;

            z-index: 4;

            border-top:
              1px dashed
              rgba(255,255,255,0.2);
          }

          .equilibrium-line span {
            position: absolute;

            right: 0;
            top: 7px;

            color:
              rgba(255,255,255,0.4);

            font-size: 9px;
          }

          /* ==========================================
             SVG
          ========================================== */

          .wave-scene .wave-svg {
            position: absolute;

            left: 0;
            top: 70px;

            width: 100%;
            height: 360px;

            z-index: 8;

            overflow: visible;

            pointer-events: none;
          }

          /*
           IMPORTANT:
           Prevent SVG from rendering the wave as
           a black filled shape.
          */

          .wave-scene .wave-reference,
          .wave-scene .wave-path {
            fill: none !important;

            vector-effect:
              non-scaling-stroke;
          }

          .wave-reference {
            stroke:
              rgba(255,255,255,0.1);

            stroke-width: 2;

            stroke-dasharray:
              8 8;
          }

          .wave-path {
            stroke:
              rgba(80,190,255,0.95);

            stroke-width: 5;

            stroke-linecap: round;

            filter:
              drop-shadow(
                0 0 7px
                rgba(60,180,255,0.4)
              );
          }

          /* ==========================================
             PARTICLES
          ========================================== */

          .wave-particles {
            position: absolute;

            left: 5%;
            right: 5%;

            top: 50%;

            height: 1px;

            z-index: 20;
          }

          .wave-particle {
            position: absolute;

            top: 0;

            width: 12px;
            height: 70px;

            transform:
              translate(-50%, -50%);
          }

          .particle-dot {
            position: absolute;

            left: 50%;
            top: 50%;

            width: 9px;
            height: 9px;

            transform:
              translate(-50%, -50%);

            border-radius: 50%;

            background: #8edbff;

            box-shadow:
              0 0 10px
              rgba(70,190,255,0.8);
          }

          /* ==========================================
             PARTICLE LABEL
          ========================================== */

          .particle-motion-label {
            position: absolute;

            left: 7%;
            top: 80px;

            z-index: 30;

            padding:
              8px 11px;

            border-radius: 9px;

            background:
              rgba(70,180,255,0.08);

            border:
              1px solid
              rgba(70,180,255,0.15);

            color:
              rgba(150,220,255,0.8);

            font-size: 10px;
          }

          /* ==========================================
             WAVE DIRECTION
          ========================================== */

          .wave-direction {
            position: absolute;

            right: 7%;
            top: 90px;

            z-index: 30;

            color:
              rgba(255,255,255,0.7);

            font-size: 11px;
            font-weight: 700;
          }

          /* ==========================================
             AMPLITUDE
          ========================================== */

          .amplitude-marker {
            position: absolute;

            left: 30%;

            top: 110px;

            width: 70px;
            height: 180px;

            z-index: 35;

            transform-origin:
              center center;
          }

          .amplitude-line {
            position: absolute;

            left: 34px;
            top: 0;

            width: 2px;
            height: 180px;

            background:
              rgba(255,190,80,0.75);
          }

          .amplitude-arrow-top,
          .amplitude-arrow-bottom {
            position: absolute;

            left: 23px;

            color:
              #ffc857;

            font-size: 20px;
          }

          .amplitude-arrow-top {
            top: -12px;
          }

          .amplitude-arrow-bottom {
            bottom: -12px;
          }

          .amplitude-label {
            position: absolute;

            left: 48px;
            top: 70px;

            color:
              #ffc857;

            font-size: 18px;
            font-weight: 800;

            white-space: nowrap;
          }

          .amplitude-label small {
            display: block;

            margin-top: 3px;

            font-size: 8px;

            opacity: 0.65;
          }

          /* ==========================================
             CREST
          ========================================== */

          .crest-label {
            position: absolute;

            left: 38%;

            top: 92px;

            z-index: 35;

            display: flex;
            flex-direction: column;

            align-items: center;

            color: white;
          }

          .crest-label strong {
            font-size: 13px;
          }

          .crest-label span {
            margin-top: 3px;

            font-size: 8px;

            color:
              rgba(255,255,255,0.45);
          }

          /* ==========================================
             TROUGH
          ========================================== */

          .trough-label {
            position: absolute;

            left: 62%;

            bottom: 90px;

            z-index: 35;

            display: flex;
            flex-direction: column;

            align-items: center;

            color: white;
          }

          .trough-label strong {
            font-size: 13px;
          }

          .trough-label span {
            margin-top: 3px;

            font-size: 8px;

            color:
              rgba(255,255,255,0.45);
          }

          /* ==========================================
             WAVELENGTH
          ========================================== */

          .wavelength-marker {
            position: absolute;

            left: 28%;
            width: 40%;

            bottom: 65px;

            z-index: 35;

            transform-origin:
              left center;
          }

          .wavelength-line {
            position: relative;

            width: 100%;

            height: 2px;

            background:
              rgba(140,210,255,0.7);
          }

          .arrow-left,
          .arrow-right {
            position: absolute;

            top: -10px;

            color:
              #8edbff;

            font-size: 17px;
          }

          .arrow-left {
            left: -2px;
          }

          .arrow-right {
            right: -2px;
          }

          .wavelength-label {
            margin-top: 7px;

            text-align: center;

            color:
              rgba(140,210,255,0.85);

            font-size: 11px;
            font-weight: 700;
          }

          /* ==========================================
             FREQUENCY
          ========================================== */

          .frequency-indicator {
            position: absolute;

            right: 7%;
            bottom: 125px;

            z-index: 40;

            display: flex;

            align-items: center;

            gap: 10px;

            padding: 11px 13px;

            border-radius: 12px;

            background:
              rgba(180,100,255,0.08);

            border:
              1px solid
              rgba(180,100,255,0.18);

            color: white;
          }

          .frequency-icon {
            font-size: 25px;
          }

          .frequency-indicator strong {
            display: block;

            font-size: 11px;
          }

          .frequency-indicator span {
            display: block;

            margin-top: 3px;

            font-size: 9px;

            color:
              rgba(255,255,255,0.55);
          }

          .frequency-indicator small {
            display: block;

            margin-top: 3px;

            font-size: 8px;

            color:
              rgba(255,255,255,0.35);
          }

          /* ==========================================
             ENERGY
          ========================================== */

          .energy-indicator {
            position: absolute;

            left: 7%;
            bottom: 70px;

            z-index: 40;

            color:
              rgba(255,255,255,0.7);
          }

          .energy-indicator > span {
            display: block;

            margin-bottom: 7px;

            font-size: 9px;
          }

          .energy-bars {
            display: flex;

            align-items: end;

            gap: 4px;

            height: 25px;
          }

          .energy-bars i {
            display: block;

            width: 7px;

            border-radius: 3px 3px 0 0;

            background:
              rgba(255,190,80,0.7);
          }

          .energy-indicator small {
            display: block;

            margin-top: 6px;

            color:
              rgba(255,255,255,0.4);

            font-size: 8px;
          }

          /* ==========================================
             INFORMATION
          ========================================== */

          .wave-info {
            width: 100%;

            padding:
              26px 5px 5px;

            box-sizing: border-box;
          }

          .wave-step {
            color: #55c4ff;

            font-size: 10px;
            font-weight: 800;

            letter-spacing: 1.5px;
          }

          .wave-info h2 {
            margin: 7px 0;

            color: white;

            font-size: 28px;
            line-height: 1.2;
          }

          .wave-subtitle {
            margin: 0 0 20px;

            color:
              rgba(255,255,255,0.6);

            font-size: 14px;
          }

          /* ==========================================
             EXPLANATION
          ========================================== */

          .wave-explanation {
            display: flex;

            gap: 14px;

            padding: 18px;

            border-radius: 16px;

            background:
              rgba(255,255,255,0.045);

            border:
              1px solid
              rgba(255,255,255,0.08);
          }

          .wave-explanation-icon {
            flex-shrink: 0;

            width: 42px;
            height: 42px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 12px;

            background:
              rgba(255,255,255,0.07);

            font-size: 21px;
          }

          .wave-explanation strong {
            color: white;

            font-size: 14px;
          }

          .wave-explanation p {
            margin: 6px 0 0;

            color:
              rgba(255,255,255,0.62);

            font-size: 13px;

            line-height: 1.6;
          }

          /* ==========================================
             PROCESS
          ========================================== */

          .wave-process {
            display: flex;

            width: 100%;

            gap: 8px;

            margin-top: 26px;
          }

          .wave-process-step {
            flex: 1;

            text-align: center;

            opacity: 0.3;

            transition:
              opacity 0.25s ease;
          }

          .wave-process-step.active {
            opacity: 1;
          }

          .wave-process-step.completed {
            opacity: 0.65;
          }

          .wave-process-dot {
            width: 30px;
            height: 30px;

            margin: auto;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            background:
              rgba(255,255,255,0.07);

            color: white;

            font-size: 10px;
            font-weight: 800;
          }

          .wave-process-step.active
          .wave-process-dot {
            background:
              rgba(70,190,255,0.2);

            border:
              1px solid
              rgba(70,190,255,0.7);

            transform: scale(1.1);
          }

          .wave-process-step span {
            display: block;

            margin-top: 7px;

            color:
              rgba(255,255,255,0.7);

            font-size: 9px;
          }

          /* ==========================================
             FORMULAS
          ========================================== */

          .wave-formulas {
            display: grid;

            grid-template-columns:
              repeat(3, minmax(0, 1fr));

            gap: 12px;

            margin-top: 25px;
          }

          .wave-formula {
            padding: 17px;

            border-radius: 14px;

            background:
              rgba(255,255,255,0.04);

            border:
              1px solid
              rgba(255,255,255,0.07);

            text-align: center;
          }

          .wave-formula span {
            display: block;

            color:
              rgba(255,255,255,0.4);

            font-size: 8px;

            letter-spacing: 1px;
          }

          .wave-formula strong {
            display: block;

            margin-top: 8px;

            color: white;

            font-size: 22px;
          }

          .wave-formula small {
            display: block;

            margin-top: 6px;

            color:
              rgba(255,255,255,0.4);

            font-size: 9px;
          }

          /* ==========================================
             CONCEPTS
          ========================================== */

          .wave-concepts {
            display: grid;

            grid-template-columns:
              repeat(3, minmax(0, 1fr));

            gap: 12px;

            margin-top: 15px;
          }

          .wave-concept {
            padding: 16px;

            border-radius: 14px;

            background:
              rgba(255,255,255,0.04);

            border:
              1px solid
              rgba(255,255,255,0.07);
          }

          .wave-concept strong {
            color: white;

            font-size: 13px;
          }

          .wave-concept p {
            margin: 7px 0 0;

            color:
              rgba(255,255,255,0.55);

            font-size: 10px;

            line-height: 1.5;
          }

          /* ==========================================
             RESPONSIVE
          ========================================== */

          @media (max-width: 850px) {

            .wave-scene {
              height: 440px;
            }

            .wave-formulas,
            .wave-concepts {
              grid-template-columns: 1fr;
            }

            .frequency-indicator {
              right: 4%;
            }

            .amplitude-marker {
              left: 25%;
            }

            .crest-label,
            .trough-label {
              display: none;
            }

          }

          @media (max-width: 600px) {

            .wave-scene {
              height: 380px;
            }

            .wave-scene .wave-svg {
              top: 50px;
              height: 300px;
            }

            .particle-motion-label,
            .wave-direction,
            .energy-indicator,
            .frequency-indicator {
              display: none;
            }

            .amplitude-marker {
              top: 90px;
              height: 140px;
            }

            .amplitude-line {
              height: 140px;
            }

            .wavelength-marker {
              bottom: 45px;
            }

          }

        `}</style>
      </div>
    </VisualizationShell>
  );
}

export default WaveMotion;