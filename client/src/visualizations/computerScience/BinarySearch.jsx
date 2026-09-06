import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function BinarySearch({ step, playing }) {
  const stages = [
    "Sorted Array",
    "Find Middle",
    "Compare",
    "Reduce Search Space",
    "Element Found"
  ];

  // Example target = 23
  const numbers = [3, 7, 11, 15, 19, 23, 27, 31, 36];

  /*
    Step 0:
    [3 7 11 15 19 23 27 31 36]

    Step 1:
    middle = 19

    Step 2:
    23 > 19

    Step 3:
    Search right half

    Step 4:
    23 found
  */

  const activeIndexes = {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    1: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    2: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    3: [5, 6, 7, 8],
    4: [5]
  };

  const visibleIndexes = activeIndexes[step] || activeIndexes[0];

  return (
    <VisualizationShell
      title="Binary Search"
      subtitle="Watch how binary search repeatedly halves the search space."
    >
      <div className="binary-scene">

        {/* HEADER */}
        <motion.div
          className="binary-stage-title"
          key={step}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {stages[Math.min(step, stages.length - 1)]}
        </motion.div>

        {/* TARGET */}
        <div className="target-box">
          <span>Target</span>
          <strong>23</strong>
        </div>

        {/* ARRAY */}
        <div className="array-wrapper">

          <div className="array-label">
            Sorted Array
          </div>

          <div className="array">

            {numbers.map((number, index) => {

              const isVisible = visibleIndexes.includes(index);
              const isMiddle = index === 4 && step >= 1 && step < 3;
              const isTarget = number === 23 && step === 4;
              const isDiscarded =
                step >= 3 && !isVisible;

              return (
                <motion.div
                  key={number}
                  className={`
                    array-cell
                    ${isVisible ? "visible" : "discarded"}
                    ${isMiddle ? "middle" : ""}
                    ${isTarget ? "found" : ""}
                  `}
                  animate={{
                    scale: isTarget
                      ? [1, 1.15, 1]
                      : isMiddle
                      ? [1, 1.05, 1]
                      : 1,
                    y: isTarget
                      ? [0, -8, 0]
                      : 0
                  }}
                  transition={{
                    duration: isTarget ? 0.8 : 0.5,
                    repeat: isTarget && playing ? Infinity : 0
                  }}
                >
                  <span className="array-number">
                    {number}
                  </span>

                  <span className="array-index">
                    index {index}
                  </span>

                  {isMiddle && (
                    <motion.span
                      className="middle-pointer"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      MID
                    </motion.span>
                  )}

                  {isTarget && (
                    <motion.span
                      className="found-check"
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

        {/* POINTER / SEARCH RANGE */}
        <div className="pointer-area">

          {step <= 2 && (
            <motion.div
              className="search-range"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span>Search range</span>
              <strong>index 0 → 8</strong>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              className="search-range reduced"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span>Left half eliminated</span>
              <strong>index 5 → 8</strong>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              className="search-range success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span>Target located</span>
              <strong>index 5</strong>
            </motion.div>
          )}

        </div>

        {/* COMPARISON */}
        <motion.div
          className="comparison-box"
          key={`comparison-${step}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >

          {step === 0 && (
            <>
              <strong>Start with a sorted array</strong>
              <p>
                Binary search only works efficiently when the
                elements are sorted.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <strong>Find the middle element</strong>
              <p>
                The search begins at the middle of the current
                range. Here, the middle value is <b>19</b>.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <strong>Compare target with middle</strong>
              <p>
                Target <b>23</b> is greater than middle value
                <b> 19</b>, so the target must be on the right side.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <strong>Discard half the array</strong>
              <p>
                Everything from index 0 to 4 can be ignored.
                The new search range is index 5 to 8.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <strong>Target found!</strong>
              <p>
                The value <b>23</b> is found at index <b>5</b>.
                Binary search found it without checking every element.
              </p>
            </>
          )}

        </motion.div>

        {/* COMPLEXITY */}
        <div className="complexity-card">

          <div>
            <span>Linear Search</span>
            <strong>O(n)</strong>
          </div>

          <div className="complexity-divider" />

          <div className="binary-complexity">
            <span>Binary Search</span>
            <strong>O(log n)</strong>
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

        <style>{`

          .binary-scene {
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

          .binary-stage-title {
            text-align: center;
            font-size: 19px;
            font-weight: 700;
            margin-bottom: 12px;
          }

          /* TARGET */

          .target-box {
            width: 120px;
            margin: auto;
            padding: 10px 16px;
            border-radius: 12px;
            background: rgba(59,130,246,.12);
            border: 1px solid rgba(96,165,250,.25);
            text-align: center;
          }

          .target-box span {
            display: block;
            color: #94a3b8;
            font-size: 11px;
            margin-bottom: 3px;
          }

          .target-box strong {
            font-size: 22px;
            color: #60a5fa;
          }

          /* ARRAY */

          .array-wrapper {
            max-width: 850px;
            margin: 40px auto 0;
          }

          .array-label {
            text-align: center;
            color: #64748b;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
          }

          .array {
            display: flex;
            justify-content: center;
            gap: 8px;
          }

          .array-cell {
            width: 70px;
            height: 75px;
            position: relative;
            border-radius: 12px;
            background: rgba(255,255,255,.07);
            border: 1px solid rgba(255,255,255,.12);

            display: flex;
            align-items: center;
            justify-content: center;

            transition: opacity .4s;
          }

          .array-cell.visible {
            opacity: 1;
          }

          .array-cell.discarded {
            opacity: .18;
            transform: scale(.9);
          }

          .array-cell.middle {
            border: 2px solid #f59e0b;
            background: rgba(245,158,11,.12);
            box-shadow:
              0 0 25px rgba(245,158,11,.25);
          }

          .array-cell.found {
            border: 2px solid #22c55e;
            background: rgba(34,197,94,.15);
            box-shadow:
              0 0 30px rgba(34,197,94,.35);
          }

          .array-number {
            font-size: 21px;
            font-weight: 800;
          }

          .array-index {
            position: absolute;
            bottom: -18px;
            left: 0;
            right: 0;
            text-align: center;
            color: #64748b;
            font-size: 9px;
          }

          .middle-pointer {
            position: absolute;
            top: -30px;
            color: #fbbf24;
            font-size: 9px;
            font-weight: 800;
          }

          .found-check {
            position: absolute;
            top: -25px;
            right: -5px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #22c55e;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          }

          /* RANGE */

          .pointer-area {
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .search-range {
            padding: 9px 18px;
            border-radius: 20px;
            background: rgba(255,255,255,.05);
            color: #cbd5e1;
            text-align: center;
            font-size: 11px;
          }

          .search-range span {
            margin-right: 7px;
            color: #94a3b8;
          }

          .search-range strong {
            color: #60a5fa;
          }

          .search-range.reduced {
            background: rgba(245,158,11,.1);
          }

          .search-range.reduced strong {
            color: #fbbf24;
          }

          .search-range.success {
            background: rgba(34,197,94,.1);
          }

          .search-range.success strong {
            color: #4ade80;
          }

          /* EXPLANATION */

          .comparison-box {
            max-width: 720px;
            margin: auto;
            padding: 16px 20px;
            border-radius: 15px;
            background: rgba(255,255,255,.06);
            border: 1px solid rgba(255,255,255,.08);
          }

          .comparison-box strong {
            display: block;
            font-size: 15px;
            margin-bottom: 5px;
          }

          .comparison-box p {
            margin: 0;
            color: #aeb8ca;
            line-height: 1.5;
            font-size: 13px;
          }

          /* COMPLEXITY */

          .complexity-card {
            width: 360px;
            margin: 18px auto;
            padding: 10px 18px;
            border-radius: 13px;
            background: rgba(255,255,255,.04);

            display: flex;
            align-items: center;
            justify-content: space-around;
          }

          .complexity-card div {
            text-align: center;
          }

          .complexity-card span {
            display: block;
            color: #94a3b8;
            font-size: 10px;
          }

          .complexity-card strong {
            display: block;
            margin-top: 3px;
            font-size: 16px;
          }

          .binary-complexity strong {
            color: #60a5fa;
          }

          .complexity-divider {
            width: 1px;
            height: 30px;
            background: rgba(255,255,255,.15);
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

          @media (max-width: 750px) {

            .array {
              gap: 4px;
              transform: scale(.8);
            }

            .array-cell {
              width: 60px;
            }

          }

          @media (max-width: 520px) {

            .array {
              transform: scale(.62);
              margin-left: -15%;
              margin-right: -15%;
            }

            .complexity-card {
              width: 90%;
            }

          }

        `}</style>

      </div>
    </VisualizationShell>
  );
}