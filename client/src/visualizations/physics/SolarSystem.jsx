import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

const stages = [
  {
    title: "The Solar System",
    subtitle: "The Sun is at the center of our planetary system.",
    explanation:
      "The Solar System consists of the Sun and everything gravitationally bound to it, including eight planets, moons, asteroids and comets."
  },
  {
    title: "Planets Orbit the Sun",
    subtitle: "Gravity keeps planets moving around the Sun.",
    explanation:
      "The Sun's gravity continuously pulls planets toward it while their forward motion carries them along their orbital paths."
  },
  {
    title: "Different Orbital Distances",
    subtitle: "Planets closer to the Sun complete orbits faster.",
    explanation:
      "Mercury is much closer to the Sun than Neptune, so it travels around the Sun much more quickly."
  },
  {
    title: "Inner & Outer Planets",
    subtitle: "The planets can be divided into two major groups.",
    explanation:
      "Mercury, Venus, Earth and Mars are rocky inner planets. Jupiter, Saturn, Uranus and Neptune are the outer gas or ice giants."
  },
  {
    title: "A Dynamic Solar System",
    subtitle: "Every planet continuously follows its orbit.",
    explanation:
      "The Solar System is a dynamic gravitational system. Each planet follows an orbit while interacting primarily with the Sun's gravitational field."
  }
];

const planets = [
  {
    name: "Mercury",
    color: "#aaa",
    size: 9,
    orbit: 82,
    duration: 5
  },
  {
    name: "Venus",
    color: "#d8a35c",
    size: 13,
    orbit: 112,
    duration: 8
  },
  {
    name: "Earth",
    color: "#4d8fe8",
    size: 14,
    orbit: 145,
    duration: 11
  },
  {
    name: "Mars",
    color: "#d76545",
    size: 11,
    orbit: 178,
    duration: 14
  },
  {
    name: "Jupiter",
    color: "#d2a679",
    size: 24,
    orbit: 215,
    duration: 19
  },
  {
    name: "Saturn",
    color: "#d7bf7b",
    size: 21,
    orbit: 255,
    duration: 24
  },
  {
    name: "Uranus",
    color: "#7dd5df",
    size: 17,
    orbit: 295,
    duration: 29
  },
  {
    name: "Neptune",
    color: "#4d72d8",
    size: 17,
    orbit: 330,
    duration: 34
  }
];

function Stars() {
  const stars = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    top: `${(i * 61) % 100}%`,
    size: 1 + (i % 3)
  }));

  return (
    <div className="solar-stars">
      {stars.map((star) => (
        <span
          key={star.id}
          className="solar-star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size
          }}
        />
      ))}
    </div>
  );
}

function SolarSystem({ step = 0, playing = false }) {
  const current = Math.min(step, stages.length - 1);

  const showOrbits = current >= 1;
  const showInnerOuter = current >= 3;

  return (
    <VisualizationShell
      title="Solar System"
      subtitle="Explore how planets orbit the Sun through gravity."
    >
      <div className="solar-system-wrapper">

        {/* =====================================================
            SPACE SCENE
        ===================================================== */}

        <div className="solar-scene">

          <Stars />

          <div className="solar-stage-label">
            {current === 0 && "THE SOLAR SYSTEM"}
            {current === 1 && "PLANETARY ORBITS"}
            {current === 2 && "ORBITAL DISTANCE"}
            {current === 3 && "INNER & OUTER PLANETS"}
            {current === 4 && "DYNAMIC SYSTEM"}
          </div>

          {/* SUN */}

          <motion.div
            className="solar-sun"
            animate={
              playing
                ? {
                    scale: [1, 1.05, 1]
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="sun-core">
              ☀
            </div>

            <div className="sun-label">
              SUN
            </div>
          </motion.div>

          {/* ORBIT SYSTEM */}

          <div className="solar-orbit-system">

            {planets.map((planet, index) => {

              const orbitSize = planet.orbit * 2;

              return (
                <div
                  key={planet.name}
                  className="solar-orbit-container"
                  style={{
                    width: orbitSize,
                    height: orbitSize
                  }}
                >

                  {/* ORBIT PATH */}

                  {showOrbits && (
                    <motion.div
                      className={`solar-orbit ${
                        current >= 2
                          ? "orbit-visible"
                          : ""
                      }`}
                      style={{
                        width: orbitSize,
                        height: orbitSize
                      }}
                      initial={{
                        opacity: 0
                      }}
                      animate={{
                        opacity: 1
                      }}
                    />
                  )}

                  {/* PLANET */}

                  <motion.div
                    className={`solar-planet planet-${index}`}
                    style={{
                      width: planet.size,
                      height: planet.size,
                      background: planet.color,
                      left: `calc(50% + ${planet.orbit}px - ${
                        planet.size / 2
                      }px)`,
                      top: `calc(50% - ${
                        planet.size / 2
                      }px)`
                    }}
                    animate={
                      playing || current === 4
                        ? {
                            rotate: 360
                          }
                        : {}
                    }
                    transition={{
                      duration: planet.duration,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {planet.name === "Earth" && (
                      <span className="earth-moon" />
                    )}
                  </motion.div>

                  {/* LABEL */}

                  {current >= 2 && (
                    <div
                      className="planet-name"
                      style={{
                        left: `calc(50% + ${
                          planet.orbit
                        }px + 8px)`,
                        top: `calc(50% - 6px)`
                      }}
                    >
                      {planet.name}
                    </div>
                  )}

                </div>
              );
            })}

          </div>

          {/* INNER PLANETS LABEL */}

          {showInnerOuter && (
            <>
              <motion.div
                className="planet-group inner-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span />
                Inner Planets
                <small>Rocky worlds</small>
              </motion.div>

              <motion.div
                className="planet-group outer-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span />
                Outer Planets
                <small>Gas & ice giants</small>
              </motion.div>
            </>
          )}

          {/* GRAVITY ARROWS */}

          {current >= 1 && (
            <motion.div
              className="gravity-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="gravity-arrow-line">
                ←
              </div>

              <div>
                <strong>GRAVITY</strong>
                <small>
                  Pulls planets toward the Sun
                </small>
              </div>
            </motion.div>
          )}

          {/* ORBIT MOTION INDICATOR */}

          {current >= 1 && (
            <motion.div
              className="orbit-motion"
              animate={
                playing
                  ? {
                      opacity: [0.4, 1, 0.4]
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              ↻ PLANETS ORBIT THE SUN
            </motion.div>
          )}

        </div>

        {/* =====================================================
            INFORMATION PANEL
        ===================================================== */}

        <div className="solar-info">

          <div className="solar-step">
            STEP {current + 1} / {stages.length}
          </div>

          <h2>
            {stages[current].title}
          </h2>

          <p className="solar-subtitle">
            {stages[current].subtitle}
          </p>

          <div className="solar-explanation">

            <div className="solar-explanation-icon">
              {current === 0 && "☀️"}
              {current === 1 && "🪐"}
              {current === 2 && "⏱️"}
              {current === 3 && "🌍"}
              {current === 4 && "🌌"}
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

          <div className="solar-process">

            {stages.map((stage, index) => (

              <div
                key={stage.title}
                className={`solar-process-step ${
                  index === current
                    ? "active"
                    : ""
                } ${
                  index < current
                    ? "completed"
                    : ""
                }`}
              >

                <div className="solar-process-dot">
                  {index < current
                    ? "✓"
                    : index + 1}
                </div>

                <span>
                  {index === 0 && "Sun"}
                  {index === 1 && "Orbit"}
                  {index === 2 && "Distance"}
                  {index === 3 && "Groups"}
                  {index === 4 && "System"}
                </span>

              </div>

            ))}

          </div>

          {/* PLANET GROUPS */}

          <div className="solar-cards">

            <div className="solar-card">

              <div className="solar-card-icon">
                🌍
              </div>

              <div>
                <strong>
                  Inner Planets
                </strong>

                <p>
                  Mercury, Venus, Earth and Mars
                </p>

                <small>
                  Rocky and relatively small
                </small>
              </div>

            </div>

            <div className="solar-card">

              <div className="solar-card-icon">
                🪐
              </div>

              <div>
                <strong>
                  Outer Planets
                </strong>

                <p>
                  Jupiter, Saturn, Uranus and Neptune
                </p>

                <small>
                  Gas and ice giants
                </small>
              </div>

            </div>

          </div>

          {/* KEY CONCEPTS */}

          <div className="solar-concepts">

            <div>
              <strong>
                ☀️ Sun
              </strong>

              <span>
                Main source of gravity
              </span>
            </div>

            <div>
              <strong>
                🪐 Orbit
              </strong>

              <span>
                Curved path around the Sun
              </span>
            </div>

            <div>
              <strong>
                🧲 Gravity
              </strong>

              <span>
                Keeps planets in orbit
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          ALL CSS IN SAME FILE
      ===================================================== */}

      <style>{`

        /* ===============================================
           MAIN
        =============================================== */

        .solar-system-wrapper {
          width: 100%;
          max-width: 1150px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* ===============================================
           SPACE
        =============================================== */

        .solar-scene {
          position: relative;
          width: 100%;
          height: 610px;

          overflow: hidden;

          border-radius: 26px;

          background:
            radial-gradient(
              circle at center,
              #17264a 0%,
              #0c1429 45%,
              #050914 100%
            );

          border: 1px solid
            rgba(255,255,255,0.08);

          box-sizing: border-box;
        }

        /* ===============================================
           STARS
        =============================================== */

        .solar-stars {
          position: absolute;
          inset: 0;

          pointer-events: none;
        }

        .solar-star {
          position: absolute;

          display: block;

          border-radius: 50%;

          background: white;

          opacity: 0.45;
        }

        /* ===============================================
           STAGE LABEL
        =============================================== */

        .solar-stage-label {
          position: absolute;

          top: 18px;
          left: 50%;

          transform: translateX(-50%);

          z-index: 100;

          padding: 8px 16px;

          border-radius: 999px;

          background:
            rgba(255,255,255,0.08);

          border: 1px solid
            rgba(255,255,255,0.1);

          color: white;

          font-size: 10px;
          font-weight: 800;

          letter-spacing: 1.4px;

          white-space: nowrap;
        }

        /* ===============================================
           SUN
        =============================================== */

        .solar-sun {
          position: absolute;

          left: 50%;
          top: 50%;

          transform: translate(-50%, -50%);

          z-index: 50;

          width: 82px;
          height: 82px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              #fff5a3 0%,
              #ffd84a 45%,
              #ff9f1c 75%,
              #ff6b00 100%
            );

          box-shadow:
            0 0 25px rgba(255,190,40,0.8),
            0 0 65px rgba(255,150,20,0.45),
            0 0 120px rgba(255,120,0,0.25);
        }

        .sun-core {
          font-size: 43px;

          filter:
            drop-shadow(
              0 0 10px
              rgba(255,255,255,0.8)
            );
        }

        .sun-label {
          position: absolute;

          bottom: -23px;

          font-size: 9px;
          font-weight: 800;

          letter-spacing: 1px;

          color:
            rgba(255,255,255,0.6);
        }

        /* ===============================================
           ORBITS
        =============================================== */

        .solar-orbit-system {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 1px;
          height: 1px;

          transform: translate(-50%, -50%);

          z-index: 10;
        }

        .solar-orbit-container {
          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          pointer-events: none;
        }

        .solar-orbit {
          position: absolute;

          left: 0;
          top: 0;

          border-radius: 50%;

          border:
            1px solid
            rgba(255,255,255,0.13);

          box-sizing: border-box;
        }

        .solar-orbit.orbit-visible {
          border-color:
            rgba(100,180,255,0.22);
        }

        /* ===============================================
           PLANETS
        =============================================== */

        .solar-planet {
          position: absolute;

          border-radius: 50%;

          z-index: 30;

          box-shadow:
            inset -3px -3px 5px
            rgba(0,0,0,0.35),
            0 0 8px
            rgba(255,255,255,0.15);

          box-sizing: border-box;
        }

        .planet-2 {
          box-shadow:
            inset -4px -4px 6px
            rgba(0,0,0,0.35),
            0 0 10px
            rgba(60,130,255,0.55);
        }

        .planet-5 {
          box-shadow:
            inset -5px -5px 8px
            rgba(0,0,0,0.3),
            0 0 5px
            rgba(255,220,140,0.4);
        }

        /* ===============================================
           SATURN RING
        =============================================== */

        .planet-5::before {
          content: "";

          position: absolute;

          left: 50%;
          top: 50%;

          width: 38px;
          height: 12px;

          transform:
            translate(-50%, -50%)
            rotate(-15deg);

          border:
            2px solid
            rgba(230,210,150,0.8);

          border-radius: 50%;
        }

        /* ===============================================
           EARTH MOON
        =============================================== */

        .earth-moon {
          position: absolute;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background: #ddd;

          right: -7px;
          top: -3px;
        }

        /* ===============================================
           PLANET LABEL
        =============================================== */

        .planet-name {
          position: absolute;

          z-index: 60;

          color:
            rgba(255,255,255,0.7);

          font-size: 8px;

          white-space: nowrap;

          pointer-events: none;
        }

        /* ===============================================
           GROUP LABELS
        =============================================== */

        .planet-group {
          position: absolute;

          z-index: 70;

          padding: 9px 12px;

          border-radius: 10px;

          background:
            rgba(255,255,255,0.06);

          border:
            1px solid
            rgba(255,255,255,0.08);

          color: white;

          font-size: 10px;
          font-weight: 700;

          backdrop-filter: blur(5px);
        }

        .planet-group small {
          display: block;

          margin-top: 3px;

          color:
            rgba(255,255,255,0.45);

          font-size: 8px;
          font-weight: 400;
        }

        .inner-group {
          left: 7%;
          top: 42%;
        }

        .outer-group {
          right: 5%;
          top: 42%;
        }

        /* ===============================================
           GRAVITY
        =============================================== */

        .gravity-indicator {
          position: absolute;

          left: 7%;
          bottom: 70px;

          z-index: 80;

          display: flex;
          align-items: center;

          gap: 10px;

          color:
            rgba(255,255,255,0.8);
        }

        .gravity-arrow-line {
          font-size: 28px;

          color: #74c7ff;
        }

        .gravity-indicator strong {
          display: block;

          font-size: 10px;

          letter-spacing: 1px;
        }

        .gravity-indicator small {
          display: block;

          margin-top: 3px;

          color:
            rgba(255,255,255,0.45);

          font-size: 8px;
        }

        /* ===============================================
           ORBIT INDICATOR
        =============================================== */

        .orbit-motion {
          position: absolute;

          right: 7%;
          bottom: 70px;

          z-index: 80;

          padding: 9px 12px;

          border-radius: 10px;

          background:
            rgba(80,160,255,0.08);

          border:
            1px solid
            rgba(80,160,255,0.15);

          color:
            rgba(150,210,255,0.8);

          font-size: 9px;
          font-weight: 700;
        }

        /* ===============================================
           INFORMATION
        =============================================== */

        .solar-info {
          width: 100%;

          padding:
            26px 5px 5px;

          box-sizing: border-box;
        }

        .solar-step {
          color: #4db8ff;

          font-size: 10px;
          font-weight: 800;

          letter-spacing: 1.5px;
        }

        .solar-info h2 {
          margin: 7px 0;

          color: white;

          font-size: 28px;
          line-height: 1.2;
        }

        .solar-subtitle {
          margin: 0 0 20px;

          color:
            rgba(255,255,255,0.6);

          font-size: 14px;
        }

        /* ===============================================
           EXPLANATION
        =============================================== */

        .solar-explanation {
          display: flex;

          gap: 14px;

          padding: 18px;

          border-radius: 16px;

          background:
            rgba(255,255,255,0.045);

          border:
            1px solid
            rgba(255,255,255,0.08);

          box-sizing: border-box;
        }

        .solar-explanation-icon {
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

        .solar-explanation strong {
          color: white;

          font-size: 14px;
        }

        .solar-explanation p {
          margin: 6px 0 0;

          color:
            rgba(255,255,255,0.62);

          font-size: 13px;

          line-height: 1.6;
        }

        /* ===============================================
           PROCESS
        =============================================== */

        .solar-process {
          display: flex;

          width: 100%;

          margin-top: 26px;

          gap: 8px;
        }

        .solar-process-step {
          flex: 1;

          text-align: center;

          opacity: 0.3;

          transition:
            opacity 0.25s ease;
        }

        .solar-process-step.active {
          opacity: 1;
        }

        .solar-process-step.completed {
          opacity: 0.65;
        }

        .solar-process-dot {
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

        .solar-process-step.active
        .solar-process-dot {
          background:
            rgba(60,180,255,0.2);

          border:
            1px solid
            rgba(60,180,255,0.65);

          transform: scale(1.1);
        }

        .solar-process-step span {
          display: block;

          margin-top: 7px;

          color:
            rgba(255,255,255,0.7);

          font-size: 9px;
        }

        /* ===============================================
           GROUP CARDS
        =============================================== */

        .solar-cards {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 12px;

          margin-top: 24px;
        }

        .solar-card {
          display: flex;

          gap: 13px;

          padding: 17px;

          border-radius: 15px;

          background:
            rgba(255,255,255,0.04);

          border:
            1px solid
            rgba(255,255,255,0.07);
        }

        .solar-card-icon {
          width: 38px;
          height: 38px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background:
            rgba(255,255,255,0.07);

          font-size: 20px;
        }

        .solar-card strong {
          color: white;

          font-size: 13px;
        }

        .solar-card p {
          margin: 5px 0;

          color:
            rgba(255,255,255,0.65);

          font-size: 10px;
        }

        .solar-card small {
          color:
            rgba(255,255,255,0.4);

          font-size: 9px;
        }

        /* ===============================================
           CONCEPTS
        =============================================== */

        .solar-concepts {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 12px;

          margin-top: 15px;
        }

        .solar-concepts > div {
          padding: 16px;

          border-radius: 14px;

          background:
            rgba(255,255,255,0.04);

          border:
            1px solid
            rgba(255,255,255,0.07);
        }

        .solar-concepts strong {
          display: block;

          color: white;

          font-size: 13px;
        }

        .solar-concepts span {
          display: block;

          margin-top: 7px;

          color:
            rgba(255,255,255,0.5);

          font-size: 10px;

          line-height: 1.4;
        }

        /* ===============================================
           RESPONSIVE
        =============================================== */

        @media (max-width: 900px) {

          .solar-scene {
            height: 520px;
          }

          .solar-orbit-container {
            transform:
              translate(-50%, -50%)
              scale(0.78);
          }

          .planet-group {
            display: none;
          }

          .gravity-indicator,
          .orbit-motion {
            bottom: 35px;
          }

          .solar-cards,
          .solar-concepts {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .solar-scene {
            height: 430px;
          }

          .solar-orbit-container {
            transform:
              translate(-50%, -50%)
              scale(0.55);
          }

          .solar-sun {
            width: 65px;
            height: 65px;
          }

          .sun-core {
            font-size: 32px;
          }

          .gravity-indicator {
            left: 20px;
          }

          .orbit-motion {
            right: 20px;
          }

          .solar-process-step span {
            font-size: 8px;
          }

        }

      `}</style>
    </VisualizationShell>
  );
}

export default SolarSystem;