import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function Sorting({ step, playing }) {
  const stages = [
    "Unsorted Array",
    "Compare Elements",
    "Swap Elements",
    "Move Largest",
    "Sorted Array"
  ];

  const numbers = [5, 2, 8, 1, 6];

  /*
    Bubble Sort visualization

    Initial:
    5  2  8  1  6

    Compare 5 & 2
    2  5  8  1  6

    Compare 5 & 8
    2  5  8  1  6

    Compare 8 & 1
    2  5  1  8  6

    Compare 8 & 6
    2  5  1  6  8

    Largest element 8 is now fixed.

    Final:
    1  2  5  6  8
  */

  const states = [
    [5, 2, 8, 1, 6],

    [5, 2, 8, 1, 6],

    [2, 5, 8, 1, 6],

    [2, 5, 1, 8, 6],

    [2, 5, 1, 6, 8],

    [1, 2, 5, 6, 8]
  ];

  const currentArray =
    states[Math.min(step, states.length - 1)];

  const comparison =
    step === 1
      ? [0, 1]
      : step === 2
      ? [0, 1]
      : step === 3
      ? [1, 2]
      : step === 4
      ? [3, 4]
      : [];

  const sortedIndexes =
    step >= 4
      ? [4]
      : [];

  return (
    <VisualizationShell
      title="Sorting Algorithms"
      subtitle="Watch how Bubble Sort compares and swaps elements until the array is sorted."
    >
      <div className="sorting-scene">

        {/* TITLE */}

        <motion.div
          className="sorting-title"
          key={step}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {stages[Math.min(step, stages.length - 1)]}
        </motion.div>

        {/* ALGORITHM */}

        <div className="algorithm-badge">
          <span>Algorithm</span>
          <strong>Bubble Sort</strong>
        </div>

        {/* ARRAY */}

        <div className="array-section">

          <div className="array-label">
            Current Array
          </div>

          <div className="sorting-array">

            {currentArray.map((number, index) => {

              const isComparing =
                comparison.includes(index);

              const isSorted =
                sortedIndexes.includes(index);

              return (
                <motion.div
                  key={`${number}-${index}-${step}`}
                  className={`
                    sort-cell
                    ${isComparing ? "comparing" : ""}
                    ${isSorted ? "sorted" : ""}
                  `}
                  layout
                  initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.8
                  }}
                  animate={{
                    opacity: 1,
                    y:
                      isComparing && playing
                        ? [0, -10, 0]
                        : 0,
                    scale:
                      isComparing
                        ? [1, 1.08, 1]
                        : 1
                  }}
                  transition={{
                    layout: {
                      duration: 0.7
                    },
                    opacity: {
                      duration: 0.3
                    },
                    scale: {
                      duration: 0.8,
                      repeat:
                        isComparing && playing
                          ? Infinity
                          : 0
                    },
                    y: {
                      duration: 0.8,
                      repeat:
                        isComparing && playing
                          ? Infinity
                          : 0
                    }
                  }}
                >
                  <span className="sort-number">
                    {number}
                  </span>

                  <span className="sort-index">
                    index {index}
                  </span>

                  {isComparing && (
                    <motion.span
                      className="compare-tag"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      COMPARE
                    </motion.span>
                  )}

                  {isSorted && (
                    <motion.span
                      className="sorted-tag"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              );
            })}

          </div>

        </div>

        {/* COMPARISON */}

        <motion.div
          className="comparison-box"
          key={`comparison-${step}`}
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
        >

          {step === 0 && (
            <>
              <span className="comparison-label">
                START
              </span>

              <strong>
                5 → 2 → 8 → 1 → 6
              </strong>

              <p>
                The elements are not in sorted order.
                Bubble Sort will repeatedly compare
                neighboring elements.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <span className="comparison-label">
                COMPARE
              </span>

              <strong>
                5 &nbsp; vs &nbsp; 2
              </strong>

              <p>
                Since 5 is greater than 2, they need
                to be swapped.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <span className="comparison-label">
                SWAP
              </span>

              <strong>
                5 ↔ 2
              </strong>

              <p>
                The smaller value moves toward the
                beginning of the array.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <span className="comparison-label">
                COMPARE & SWAP
              </span>

              <strong>
                8 &nbsp; vs &nbsp; 1
              </strong>

              <p>
                8 is greater than 1, so the elements
                exchange positions.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <span className="comparison-label">
                SORTED POSITION
              </span>

              <strong>
                8 is in its final position ✓
              </strong>

              <p>
                After moving through the array, the
                largest element reaches the end.
              </p>
            </>
          )}

        </motion.div>

        {/* SWAP ARROW */}

        <div className="operation-flow">

          {step === 0 && (
            <>
              <div className="flow-icon">↕</div>
              <span>
                Compare neighboring elements
              </span>
            </>
          )}

          {step === 1 && (
            <>
              <div className="flow-icon">?</div>
              <span>
                Is left element greater than right?
              </span>
            </>
          )}

          {step === 2 && (
            <>
              <motion.div
                className="flow-icon"
                animate={
                  playing
                    ? { x: [-8, 8, -8] }
                    : {}
                }
                transition={{
                  duration: 0.8,
                  repeat: Infinity
                }}
              >
                ↔
              </motion.div>

              <span>
                Swap the two elements
              </span>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flow-icon">↓</div>
              <span>
                Larger value moves toward the end
              </span>
            </>
          )}

          {step === 4 && (
            <>
              <div className="flow-icon">✓</div>
              <span>
                The largest remaining element is fixed
              </span>
            </>
          )}

        </div>

        {/* SORTING PROGRESS */}

        <div className="progress-section">

          <div className="progress-header">
            <span>Sorting Progress</span>
            <strong>
              {step === 0
                ? "0%"
                : step === 1
                ? "20%"
                : step === 2
                ? "40%"
                : step === 3
                ? "65%"
                : "100%"}
            </strong>
          </div>

          <div className="progress-track">
            <motion.div
              className="progress-fill"
              animate={{
                width:
                  step === 0
                    ? "0%"
                    : step === 1
                    ? "20%"
                    : step === 2
                    ? "40%"
                    : step === 3
                    ? "65%"
                    : "100%"
              }}
              transition={{
                duration: 0.6
              }}
            />
          </div>

        </div>

        {/* COMPLEXITY */}

        <div className="complexity-card">

          <div>
            <span>Average Time</span>
            <strong>O(n²)</strong>
          </div>

          <div className="complexity-divider" />

          <div>
            <span>Worst Time</span>
            <strong>O(n²)</strong>
          </div>

          <div className="complexity-divider" />

          <div>
            <span>Space</span>
            <strong>O(1)</strong>
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

              <span>{stage}</span>
            </div>
          ))}

        </div>

        {/* EXPLANATION */}

        <motion.div
          className="sorting-explanation"
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
                How Bubble Sort works
              </strong>

              <p>
                Bubble Sort repeatedly compares adjacent
                elements. If they are in the wrong order,
                they are swapped.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <strong>
                Step 1 — Compare
              </strong>

              <p>
                Compare the first two values:
                <b> 5 and 2</b>.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <strong>
                Step 2 — Swap
              </strong>

              <p>
                Because <b>5 &gt; 2</b>, swap them.
                The array becomes:
                <b> 2, 5, 8, 1, 6</b>.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <strong>
                Step 3 — Continue comparing
              </strong>

              <p>
                The algorithm continues through the
                array. Larger values gradually move
                toward the right.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <strong>
                Array Sorted ✓
              </strong>

              <p>
                After repeated comparisons and swaps,
                the elements are arranged in ascending
                order:
                <b> 1, 2, 5, 6, 8</b>.
              </p>
            </>
          )}

        </motion.div>

        <style>{`

          .sorting-scene {
            min-height: 700px;
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

          .sorting-title {
            text-align: center;
            font-size: 19px;
            font-weight: 700;
          }

          .algorithm-badge {
            width: fit-content;
            margin: 10px auto 0;
            padding: 6px 14px;
            border-radius: 20px;
            background: rgba(59,130,246,.12);
            border: 1px solid rgba(96,165,250,.2);
            text-align: center;
          }

          .algorithm-badge span {
            color: #94a3b8;
            font-size: 9px;
            margin-right: 7px;
          }

          .algorithm-badge strong {
            color: #60a5fa;
            font-size: 11px;
          }

          /* ARRAY */

          .array-section {
            max-width: 650px;
            margin: 45px auto 0;
          }

          .array-label {
            text-align: center;
            color: #64748b;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
          }

          .sorting-array {
            display: flex;
            justify-content: center;
            gap: 15px;
          }

          .sort-cell {
            width: 80px;
            height: 82px;
            position: relative;

            border-radius: 14px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: rgba(255,255,255,.06);
            border: 1px solid rgba(255,255,255,.12);
          }

          .sort-cell.comparing {
            background: rgba(245,158,11,.13);
            border: 2px solid #f59e0b;

            box-shadow:
              0 0 25px rgba(245,158,11,.22);
          }

          .sort-cell.sorted {
            background: rgba(34,197,94,.13);
            border: 2px solid #22c55e;

            box-shadow:
              0 0 22px rgba(34,197,94,.2);
          }

          .sort-number {
            font-size: 27px;
            font-weight: 800;
          }

          .sort-index {
            position: absolute;
            bottom: -20px;
            color: #64748b;
            font-size: 9px;
          }

          .compare-tag {
            position: absolute;
            top: -30px;
            color: #fbbf24;
            font-size: 8px;
            font-weight: 800;
          }

          .sorted-tag {
            position: absolute;
            top: -10px;
            right: -8px;

            width: 21px;
            height: 21px;

            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #22c55e;

            font-size: 11px;
          }

          /* COMPARISON */

          .comparison-box {
            max-width: 650px;
            margin: 45px auto 15px;

            padding: 15px 20px;

            border-radius: 15px;

            background: rgba(255,255,255,.06);
            border: 1px solid rgba(255,255,255,.08);

            text-align: center;
          }

          .comparison-label {
            display: block;
            color: #64748b;
            font-size: 9px;
            letter-spacing: 1px;
            margin-bottom: 4px;
          }

          .comparison-box strong {
            display: block;
            font-size: 18px;
          }

          .comparison-box p {
            margin: 6px 0 0;
            color: #aeb8ca;
            font-size: 12px;
            line-height: 1.5;
          }

          /* FLOW */

          .operation-flow {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;

            margin: 15px auto;

            color: #94a3b8;

            font-size: 11px;
          }

          .flow-icon {
            width: 28px;
            height: 28px;

            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;

            background: rgba(59,130,246,.12);
            color: #60a5fa;

            font-weight: 800;
          }

          /* PROGRESS */

          .progress-section {
            max-width: 650px;
            margin: 15px auto;
          }

          .progress-header {
            display: flex;
            justify-content: space-between;

            color: #64748b;

            font-size: 10px;
            margin-bottom: 6px;
          }

          .progress-header strong {
            color: #60a5fa;
          }

          .progress-track {
            height: 6px;
            overflow: hidden;

            border-radius: 10px;

            background: rgba(255,255,255,.08);
          }

          .progress-fill {
            height: 100%;
            border-radius: inherit;
            background: #3b82f6;
          }

          /* COMPLEXITY */

          .complexity-card {
            max-width: 480px;
            margin: 18px auto;

            padding: 12px;

            display: flex;
            justify-content: space-around;
            align-items: center;

            border-radius: 13px;

            background: rgba(255,255,255,.04);
          }

          .complexity-card div {
            text-align: center;
          }

          .complexity-card span {
            display: block;
            color: #64748b;
            font-size: 9px;
          }

          .complexity-card strong {
            display: block;
            margin-top: 3px;
            font-size: 15px;
            color: #60a5fa;
          }

          .complexity-divider {
            width: 1px;
            height: 30px;
            background: rgba(255,255,255,.12);
          }

          /* PROCESS */

          .process-row {
            display: flex;
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 15px;
          }

          .process-step {
            display: flex;
            align-items: center;
            gap: 7px;

            padding: 7px 11px;

            border-radius: 20px;

            background: rgba(255,255,255,.05);

            color: #94a3b8;

            font-size: 11px;
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

            font-size: 10px;
          }

          /* EXPLANATION */

          .sorting-explanation {
            max-width: 650px;
            margin: 18px auto 0;

            padding: 15px 20px;

            border-radius: 15px;

            background: rgba(255,255,255,.06);

            border: 1px solid rgba(255,255,255,.08);
          }

          .sorting-explanation strong {
            display: block;
            font-size: 14px;
            margin-bottom: 5px;
          }

          .sorting-explanation p {
            margin: 0;
            color: #aeb8ca;
            font-size: 12px;
            line-height: 1.5;
          }

          @media (max-width: 650px) {

            .sorting-array {
              gap: 6px;
            }

            .sort-cell {
              width: 58px;
              height: 65px;
            }

            .sort-number {
              font-size: 21px;
            }

            .complexity-card {
              max-width: 95%;
            }

          }

        `}</style>

      </div>
    </VisualizationShell>
  );
}