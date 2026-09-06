import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function EarthLayers({ step, playing }) {
  const stages = [
    "Earth",
    "Crust",
    "Mantle",
    "Outer Core",
    "Inner Core"
  ];

  const layers = [
    {
      name: "Inner Core",
      depth: "5,150 – 6,371 km",
      description: "Solid iron and nickel",
      className: "inner-core"
    },
    {
      name: "Outer Core",
      depth: "2,890 – 5,150 km",
      description: "Liquid iron and nickel",
      className: "outer-core"
    },
    {
      name: "Mantle",
      depth: "35 – 2,890 km",
      description: "Hot, slowly flowing rock",
      className: "mantle"
    },
    {
      name: "Crust",
      depth: "0 – 35 km",
      description: "Thin, solid outer layer",
      className: "crust"
    }
  ];

  return (
    <VisualizationShell
      title="Earth's Layers"
      subtitle="Explore the structure of Earth from its thin outer crust to its solid inner core."
    >
      <div className="earth-scene">

        {/* STAGE TITLE */}

        <motion.div
          className="earth-stage"
          key={step}
          initial={{
            opacity: 0,
            y: -10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
        >
          {stages[Math.min(step, 4)]}
        </motion.div>

        {/* MAIN EARTH */}

        <div className="earth-layout">

          {/* EARTH CROSS SECTION */}

          <div className="earth-container">

            <motion.div
              className="earth-glow"
              animate={
                playing
                  ? {
                      scale: [1, 1.04, 1],
                      opacity: [0.35, 0.55, 0.35]
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />

            {/* CRUST */}

            <motion.div
              className="earth-layer crust"
              initial={{
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: step >= 1 ? 1 : 0,
                opacity: step >= 1 ? 1 : 0
              }}
              transition={{
                duration: 0.8
              }}
            />

            {/* MANTLE */}

            <motion.div
              className="earth-layer mantle"
              initial={{
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: step >= 2 ? 1 : 0,
                opacity: step >= 2 ? 1 : 0
              }}
              transition={{
                duration: 0.8
              }}
            />

            {/* OUTER CORE */}

            <motion.div
              className="earth-layer outer-core"
              initial={{
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: step >= 3 ? 1 : 0,
                opacity: step >= 3 ? 1 : 0
              }}
              transition={{
                duration: 0.8
              }}
            />

            {/* INNER CORE */}

            <motion.div
              className="earth-layer inner-core"
              initial={{
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: step >= 4 ? 1 : 0,
                opacity: step >= 4 ? 1 : 0
              }}
              transition={{
                duration: 0.8
              }}
            />

            {/* HIGHLIGHT */}

            {step >= 1 && (
              <motion.div
                className={`layer-highlight highlight-${step}`}
                animate={{
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 1.4,
                  repeat:
                    playing ? Infinity : 0
                }}
              />
            )}

            {/* CENTER LABEL */}

            {step >= 4 && (
              <motion.div
                className="center-label"
                initial={{
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
              >
                INNER
                <br />
                CORE
              </motion.div>
            )}

          </div>

          {/* LAYER INFORMATION */}

          <div className="layer-information">

            {layers.map((layer, index) => {

              const layerStep =
                4 - index;

              const visible =
                step >= layerStep;

              const active =
                step === layerStep;

              return (
                <motion.div
                  key={layer.name}
                  className={`
                    layer-card
                    ${visible ? "visible" : ""}
                    ${active ? "active" : ""}
                  `}
                  initial={{
                    opacity: 0,
                    x: 30
                  }}
                  animate={{
                    opacity: visible ? 1 : 0.35,
                    x: visible ? 0 : 15
                  }}
                  transition={{
                    duration: 0.5
                  }}
                >

                  <div
                    className={`layer-dot ${layer.className}`}
                  />

                  <div className="layer-info-text">

                    <strong>
                      {layer.name}
                    </strong>

                    <span>
                      {layer.depth}
                    </span>

                    <p>
                      {layer.description}
                    </p>

                  </div>

                  {active && (
                    <motion.div
                      className="active-indicator"
                      initial={{
                        scale: 0
                      }}
                      animate={{
                        scale: 1
                      }}
                    >
                      ●
                    </motion.div>
                  )}

                </motion.div>
              );
            })}

          </div>

        </div>

        {/* DEPTH SCALE */}

        <div className="depth-section">

          <div className="depth-title">
            DISTANCE FROM EARTH'S SURFACE
          </div>

          <div className="depth-scale">

            <div className="depth-marker">
              <span>0 km</span>
              <small>Surface</small>
            </div>

            <div className="depth-line">
              <motion.div
                className="depth-progress"
                animate={{
                  width:
                    step === 0
                      ? "5%"
                      : step === 1
                      ? "15%"
                      : step === 2
                      ? "55%"
                      : step === 3
                      ? "82%"
                      : "100%"
                }}
                transition={{
                  duration: 0.8
                }}
              />
            </div>

            <div className="depth-marker">
              <span>6,371 km</span>
              <small>Center</small>
            </div>

          </div>

        </div>

        {/* EXPLANATION */}

        <motion.div
          className="earth-explanation"
          key={`explanation-${step}`}
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
              <strong>
                Earth has a layered structure
              </strong>

              <p>
                Earth is made of several layers with
                different compositions, temperatures,
                pressures and physical properties.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <strong>
                Step 1 — Crust
              </strong>

              <p>
                The <b>crust</b> is Earth's thin,
                solid outer layer. It includes the
                continents and ocean floors.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <strong>
                Step 2 — Mantle
              </strong>

              <p>
                Beneath the crust lies the <b>mantle</b>.
                It consists mostly of hot rock that can
                slowly flow over geological time.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <strong>
                Step 3 — Outer Core
              </strong>

              <p>
                The <b>outer core</b> is extremely hot
                and is mainly liquid iron and nickel.
                Its movement contributes to Earth's
                magnetic field.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <strong>
                Step 4 — Inner Core
              </strong>

              <p>
                At Earth's center is the <b>inner core</b>.
                Despite its extremely high temperature,
                enormous pressure keeps it predominantly
                solid.
              </p>
            </>
          )}

        </motion.div>

        {/* TEMPERATURE */}

        <div className="temperature-card">

          <div className="temperature-icon">
            🌡️
          </div>

          <div>
            <span>
              GOING TOWARD THE CENTER
            </span>

            <strong>
              Temperature & pressure increase
            </strong>

            <p>
              Each deeper layer experiences greater
              temperature and pressure.
            </p>
          </div>

        </div>

        {/* PROCESS */}

        <div className="process-row">

          {stages.map((stage, index) => (
            <div
              key={stage}
              className={`
                process-step
                ${step === index ? "active" : ""}
                ${step > index ? "completed" : ""}
              `}
            >

              <div className="process-number">
                {index + 1}
              </div>

              <span>
                {stage}
              </span>

            </div>
          ))}

        </div>

        <style>{`

          .earth-scene {
            min-height: 760px;
            position: relative;
            overflow: hidden;
            padding: 25px;

            border-radius: 24px;

            background:
              radial-gradient(
                circle at center,
                rgba(59,130,246,.12),
                transparent 48%
              ),
              #0b1020;

            color: white;
          }

          .earth-stage {
            text-align: center;

            font-size: 19px;
            font-weight: 700;

            margin-bottom: 25px;
          }

          /* MAIN LAYOUT */

          .earth-layout {
            max-width: 850px;

            margin: auto;

            display: grid;

            grid-template-columns:
              1fr 1fr;

            align-items: center;

            gap: 55px;
          }

          /* EARTH */

          .earth-container {
            width: 330px;
            height: 330px;

            position: relative;

            margin: auto;

            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;
          }

          .earth-glow {
            position: absolute;

            inset: -18px;

            border-radius: 50%;

            background:
              radial-gradient(
                circle,
                rgba(239,68,68,.22),
                transparent 65%
              );

            filter: blur(8px);
          }

          .earth-layer {
            position: absolute;

            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;
          }

          /*
            Actual relative layer proportions
          */

          .crust {
            inset: 0;

            background:
              linear-gradient(
                135deg,
                #475569,
                #64748b
              );

            box-shadow:
              inset 0 0 0 5px
              rgba(148,163,184,.7),

              0 0 25px
              rgba(100,116,139,.25);
          }

          .mantle {
            width: 88%;
            height: 88%;

            background:
              linear-gradient(
                135deg,
                #b45309,
                #ea580c,
                #c2410c
              );

            box-shadow:
              inset 0 0 30px
              rgba(0,0,0,.3);
          }

          .outer-core {
            width: 54%;
            height: 54%;

            background:
              radial-gradient(
                circle,
                #f59e0b,
                #ea580c
              );

            box-shadow:
              0 0 35px
              rgba(245,158,11,.3);
          }

          .inner-core {
            width: 30%;
            height: 30%;

            background:
              radial-gradient(
                circle,
                #fef3c7,
                #f59e0b
              );

            box-shadow:
              0 0 30px
              rgba(253,224,71,.4);
          }

          /* HIGHLIGHT */

          .layer-highlight {
            position: absolute;

            border-radius: 50%;

            pointer-events: none;

            border: 3px solid white;
          }

          .highlight-1 {
            inset: -3px;
          }

          .highlight-2 {
            width: 88%;
            height: 88%;
          }

          .highlight-3 {
            width: 54%;
            height: 54%;
          }

          .highlight-4 {
            width: 30%;
            height: 30%;
          }

          .center-label {
            position: absolute;

            text-align: center;

            color: #451a03;

            font-size: 9px;
            font-weight: 900;

            line-height: 1.2;
          }

          /* LAYER CARDS */

          .layer-information {
            display: flex;

            flex-direction: column;

            gap: 10px;
          }

          .layer-card {
            position: relative;

            display: flex;

            align-items: center;

            gap: 12px;

            padding: 13px;

            border-radius: 13px;

            background:
              rgba(255,255,255,.04);

            border:
              1px solid
              rgba(255,255,255,.07);
          }

          .layer-card.active {
            background:
              rgba(255,255,255,.08);

            border-color:
              rgba(255,255,255,.2);

            transform: translateX(5px);
          }

          .layer-dot {
            width: 16px;
            height: 16px;

            flex-shrink: 0;

            border-radius: 50%;
          }

          .layer-dot.crust {
            background: #64748b;
          }

          .layer-dot.mantle {
            background: #ea580c;
          }

          .layer-dot.outer-core {
            background: #f59e0b;
          }

          .layer-dot.inner-core {
            background: #fde68a;
          }

          .layer-info-text strong {
            display: block;

            font-size: 12px;
          }

          .layer-info-text span {
            display: block;

            margin-top: 2px;

            color: #60a5fa;

            font-size: 8px;
          }

          .layer-info-text p {
            margin: 4px 0 0;

            color: #64748b;

            font-size: 9px;
          }

          .active-indicator {
            position: absolute;

            right: 12px;

            color: #60a5fa;

            font-size: 10px;
          }

          /* DEPTH */

          .depth-section {
            max-width: 750px;

            margin: 30px auto 18px;
          }

          .depth-title {
            text-align: center;

            color: #64748b;

            font-size: 8px;

            letter-spacing: 1px;

            margin-bottom: 10px;
          }

          .depth-scale {
            display: flex;

            align-items: center;

            gap: 12px;
          }

          .depth-marker {
            text-align: center;

            min-width: 55px;
          }

          .depth-marker span {
            display: block;

            color: #cbd5e1;

            font-size: 9px;
            font-weight: 700;
          }

          .depth-marker small {
            display: block;

            color: #64748b;

            font-size: 7px;

            margin-top: 2px;
          }

          .depth-line {
            flex: 1;

            height: 6px;

            border-radius: 10px;

            background:
              rgba(255,255,255,.08);

            overflow: hidden;
          }

          .depth-progress {
            height: 100%;

            border-radius: inherit;

            background:
              linear-gradient(
                90deg,
                #64748b,
                #ea580c,
                #f59e0b,
                #fde68a
              );
          }

          /* EXPLANATION */

          .earth-explanation {
            max-width: 750px;

            margin: 18px auto;

            padding: 15px 20px;

            border-radius: 15px;

            background:
              rgba(255,255,255,.06);

            border:
              1px solid
              rgba(255,255,255,.08);
          }

          .earth-explanation strong {
            display: block;

            font-size: 14px;

            margin-bottom: 5px;
          }

          .earth-explanation p {
            margin: 0;

            color: #aeb8ca;

            font-size: 12px;

            line-height: 1.5;
          }

          /* TEMPERATURE */

          .temperature-card {
            max-width: 600px;

            margin: 15px auto;

            padding: 12px 16px;

            display: flex;

            align-items: center;

            gap: 12px;

            border-radius: 12px;

            background:
              rgba(245,158,11,.07);

            border:
              1px solid
              rgba(245,158,11,.15);
          }

          .temperature-icon {
            font-size: 23px;
          }

          .temperature-card span {
            display: block;

            color: #fbbf24;

            font-size: 8px;

            letter-spacing: 1px;
          }

          .temperature-card strong {
            display: block;

            margin-top: 3px;

            font-size: 11px;
          }

          .temperature-card p {
            margin: 3px 0 0;

            color: #64748b;

            font-size: 8px;
          }

          /* PROCESS */

          .process-row {
            display: flex;

            justify-content: center;

            gap: 8px;

            flex-wrap: wrap;

            margin-top: 18px;
          }

          .process-step {
            display: flex;

            align-items: center;

            gap: 7px;

            padding: 7px 11px;

            border-radius: 20px;

            background:
              rgba(255,255,255,.05);

            color: #94a3b8;

            font-size: 11px;
          }

          .process-step.active {
            background:
              rgba(59,130,246,.2);

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

            background:
              rgba(255,255,255,.1);

            font-size: 10px;
          }

          @media (max-width: 750px) {

            .earth-layout {
              grid-template-columns: 1fr;
              gap: 30px;
            }

            .earth-container {
              width: 270px;
              height: 270px;
            }

          }

          @media (max-width: 500px) {

            .earth-container {
              width: 220px;
              height: 220px;
            }

            .earth-scene {
              padding: 15px;
            }

          }

        `}</style>

      </div>
    </VisualizationShell>
  );
}