import { motion } from "motion/react";

function BloodParticle({ path, color = "#ef4444", delay = 0 }) {
  return (
    <motion.circle
      r="7"
      fill={color}
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        offsetDistance: ["0%", "100%"],
      }}
      transition={{
        duration: 2.8,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        offsetPath: `path("${path}")`,
      }}
    />
  );
}

function HumanHeart({ step = 0, playing = true }) {
  const activeStep = step;

  /*
   * Coordinates are based on the SVG below.
   *
   * Left side of image = anatomical right side
   * Right side of image = anatomical left side
   */

  const bloodPaths = {
    bodyToRA:
      "M 80 300 C 160 300 205 280 275 250",

    raToRV:
      "M 300 285 C 300 335 300 365 315 405",

    rvToLungs:
      "M 315 410 C 260 450 205 450 150 405",

    lungsToLA:
      "M 150 405 C 205 360 430 250 510 260",

    laToLV:
      "M 515 280 C 540 330 555 370 550 420",

    lvToBody:
      "M 550 430 C 650 420 735 360 830 300",
  };

  const descriptions = [
    "Deoxygenated blood from the body enters the right atrium.",
    "Blood moves from the right atrium into the right ventricle.",
    "The right ventricle pumps deoxygenated blood to the lungs.",
    "Oxygen-rich blood returns from the lungs to the left atrium.",
    "The left ventricle pumps oxygenated blood to the entire body.",
  ];

  const activeColors = {
    red: "#ef4444",
    blue: "#3b82f6",
  };

  return (
    <div className="heart-visualization">

      {/* HEADER */}

      <div className="heart-title">
        <div>
          <h2>❤️ Human Heart</h2>
          <p>
            Step {activeStep + 1} of 5
          </p>
        </div>
      </div>


      {/* MAIN DIAGRAM */}

      <div className="heart-stage">

        <svg
          viewBox="0 0 900 600"
          width="100%"
          height="100%"
          className="heart-svg"
        >

          <defs>

            {/* Heart gradients */}

            <linearGradient
              id="heartRed"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#ef233c" />
              <stop offset="100%" stopColor="#9f1239" />
            </linearGradient>

            <linearGradient
              id="heartBlue"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            {/* Glow */}

            <filter id="glow">
              <feGaussianBlur
                stdDeviation="5"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

          </defs>


          {/* =====================================
              BODY
          ====================================== */}

          <g opacity="0.9">

            <circle
              cx="85"
              cy="300"
              r="38"
              fill="#334155"
              stroke="#64748b"
              strokeWidth="2"
            />

            <text
              x="85"
              y="305"
              textAnchor="middle"
              fill="white"
              fontSize="15"
            >
              BODY
            </text>

          </g>


          {/* =====================================
              LUNGS
          ====================================== */}

          <g>

            <path
              d="
                M 120 395
                C 90 350 105 285 155 275
                C 180 290 178 350 165 400
                Z
              "
              fill="#f8a5b5"
              stroke="#fb7185"
              strokeWidth="3"
            />

            <path
              d="
                M 165 400
                C 150 350 150 290 185 275
                C 230 285 245 350 215 395
                Z
              "
              fill="#f8a5b5"
              stroke="#fb7185"
              strokeWidth="3"
            />

            <line
              x1="175"
              y1="270"
              x2="175"
              y2="410"
              stroke="#fca5a5"
              strokeWidth="8"
              strokeLinecap="round"
            />

            <text
              x="175"
              y="455"
              textAnchor="middle"
              fill="#fda4af"
              fontSize="18"
              fontWeight="700"
            >
              LUNGS
            </text>

          </g>


          {/* =====================================
              BLOOD VESSELS
          ====================================== */}

          {/* Body → Right Atrium */}

          <path
            d={bloodPaths.bodyToRA}
            fill="none"
            stroke="#ef4444"
            strokeWidth="15"
            strokeLinecap="round"
            opacity={activeStep >= 0 ? 0.75 : 0.25}
          />

          {/* Right Atrium → Right Ventricle */}

          <path
            d={bloodPaths.raToRV}
            fill="none"
            stroke="#ef4444"
            strokeWidth="15"
            strokeLinecap="round"
            opacity={activeStep >= 1 ? 0.8 : 0.25}
          />

          {/* Right Ventricle → Lungs */}

          <path
            d={bloodPaths.rvToLungs}
            fill="none"
            stroke="#ef4444"
            strokeWidth="15"
            strokeLinecap="round"
            opacity={activeStep >= 2 ? 0.8 : 0.25}
          />

          {/* Lungs → Left Atrium */}

          <path
            d={bloodPaths.lungsToLA}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="15"
            strokeLinecap="round"
            opacity={activeStep >= 3 ? 0.8 : 0.25}
          />

          {/* Left Atrium → Left Ventricle */}

          <path
            d={bloodPaths.laToLV}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="15"
            strokeLinecap="round"
            opacity={activeStep >= 3 ? 0.8 : 0.25}
          />

          {/* Left Ventricle → Body */}

          <path
            d={bloodPaths.lvToBody}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="15"
            strokeLinecap="round"
            opacity={activeStep >= 4 ? 0.9 : 0.25}
          />


          {/* =====================================
              HEART
          ====================================== */}

          <motion.g
            animate={
              playing
                ? {
                    scale: [1, 1.06, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.8,
              repeat: playing ? Infinity : 0,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "425px 335px",
            }}
          >

            {/* Heart outer */}

            <path
              d="
                M 425 430
                C 390 400 300 345 300 270
                C 300 220 340 190 380 190
                C 405 190 425 205 440 230
                C 455 205 475 190 500 190
                C 540 190 580 220 580 270
                C 580 345 490 400 425 430
                Z
              "
              fill="url(#heartRed)"
              stroke="#fb7185"
              strokeWidth="5"
              filter="url(#glow)"
            />

            {/* Septum */}

            <path
              d="M 440 235 C 430 285 430 350 425 425"
              stroke="#881337"
              strokeWidth="8"
              fill="none"
            />

            {/* Chambers */}

            <ellipse
              cx="370"
              cy="285"
              rx="48"
              ry="42"
              fill="#b91c1c"
              opacity="0.8"
            />

            <ellipse
              cx="500"
              cy="285"
              rx="48"
              ry="42"
              fill="#dc2626"
              opacity="0.7"
            />

            <ellipse
              cx="370"
              cy="365"
              rx="48"
              ry="60"
              fill="#991b1b"
              opacity="0.85"
            />

            <ellipse
              cx="500"
              cy="365"
              rx="48"
              ry="60"
              fill="#be123c"
              opacity="0.8"
            />

          </motion.g>


          {/* =====================================
              CHAMBER LABELS
          ====================================== */}

          <text
            x="370"
            y="285"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="700"
          >
            Right
          </text>

          <text
            x="370"
            y="303"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="700"
          >
            Atrium
          </text>


          <text
            x="370"
            y="365"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="700"
          >
            Right
          </text>

          <text
            x="370"
            y="383"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="700"
          >
            Ventricle
          </text>


          <text
            x="500"
            y="285"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="700"
          >
            Left
          </text>

          <text
            x="500"
            y="303"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="700"
          >
            Atrium
          </text>


          <text
            x="500"
            y="365"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="700"
          >
            Left
          </text>

          <text
            x="500"
            y="383"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="700"
          >
            Ventricle
          </text>


          {/* =====================================
              STEP HIGHLIGHT
          ====================================== */}

          {activeStep === 0 && (
            <motion.circle
              cx="370"
              cy="285"
              r="55"
              fill="none"
              stroke="#facc15"
              strokeWidth="5"
              animate={{
                opacity: [0.2, 1, 0.2],
                r: [50, 60, 50],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            />
          )}

          {activeStep === 1 && (
            <motion.circle
              cx="370"
              cy="365"
              r="65"
              fill="none"
              stroke="#facc15"
              strokeWidth="5"
              animate={{
                opacity: [0.2, 1, 0.2],
                r: [60, 70, 60],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            />
          )}

          {activeStep === 2 && (
            <motion.circle
              cx="175"
              cy="340"
              r="85"
              fill="none"
              stroke="#facc15"
              strokeWidth="5"
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            />
          )}

          {activeStep === 3 && (
            <motion.circle
              cx="500"
              cy="285"
              r="55"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="5"
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            />
          )}

          {activeStep === 4 && (
            <motion.circle
              cx="500"
              cy="365"
              r="70"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="5"
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            />
          )}


          {/* =====================================
              FLOW PARTICLES
          ====================================== */}

          {playing && activeStep === 0 && (
            <>
              <circle
                cx="150"
                cy="295"
                r="8"
                fill="#ef4444"
              />

              <motion.circle
                r="8"
                fill="#ef4444"
                animate={{
                  cx: [150, 210, 275],
                  cy: [295, 285, 250],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </>
          )}


          {playing && activeStep === 1 && (
            <motion.circle
              r="9"
              fill="#ef4444"
              animate={{
                cx: [370, 370, 370],
                cy: [285, 330, 365],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}


          {playing && activeStep === 2 && (
            <motion.circle
              r="9"
              fill="#ef4444"
              animate={{
                cx: [315, 270, 220, 175],
                cy: [405, 435, 430, 390],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}


          {playing && activeStep === 3 && (
            <motion.circle
              r="9"
              fill="#3b82f6"
              animate={{
                cx: [175, 250, 350, 430, 500],
                cy: [390, 350, 300, 270, 285],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}


          {playing && activeStep === 4 && (
            <motion.circle
              r="9"
              fill="#3b82f6"
              animate={{
                cx: [500, 550, 650, 740, 830],
                cy: [365, 405, 410, 350, 300],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}

        </svg>


        {/* =====================================
            LEGEND
        ====================================== */}

        <div className="heart-legend">

          <div>
            <span
              className="legend-dot"
              style={{
                background: activeColors.red,
              }}
            />
            Deoxygenated blood
          </div>

          <div>
            <span
              className="legend-dot"
              style={{
                background: activeColors.blue,
              }}
            />
            Oxygenated blood
          </div>

        </div>

      </div>


      {/* =====================================
          STEP EXPLANATION
      ====================================== */}

      <motion.div
        className="heart-step-box"
        key={activeStep}
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
      >

        <div className="heart-step-number">
          STEP {activeStep + 1}
        </div>

        <h3>
          {[
            "Blood enters the right atrium",
            "Blood moves into the right ventricle",
            "Blood travels to the lungs",
            "Oxygenated blood returns to the heart",
            "Oxygenated blood is pumped to the body",
          ][activeStep]}
        </h3>

        <p>
          {descriptions[activeStep]}
        </p>

      </motion.div>

    </div>
  );
}

export default HumanHeart;