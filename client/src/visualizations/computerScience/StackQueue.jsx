import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function StackQueue({ step, playing }) {
  const stages = [
    "Empty Structures",
    "Push / Enqueue",
    "Add More Elements",
    "Pop / Dequeue",
    "Compare LIFO & FIFO"
  ];

  const stackItems =
    step === 0
      ? []
      : step === 1
      ? ["A"]
      : step === 2
      ? ["A", "B", "C"]
      : step === 3
      ? ["A", "B"]
      : ["A", "B"];

  const queueItems =
    step === 0
      ? []
      : step === 1
      ? ["A"]
      : step === 2
      ? ["A", "B", "C"]
      : step === 3
      ? ["B", "C"]
      : ["B", "C"];

  return (
    <VisualizationShell
      title="Stack & Queue"
      subtitle="Understand LIFO and FIFO through animated insertion and removal."
    >
      <div className="sq-scene">

        {/* TITLE */}
        <motion.div
          className="sq-stage-title"
          key={step}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {stages[Math.min(step, stages.length - 1)]}
        </motion.div>

        {/* MAIN STRUCTURES */}
        <div className="structures">

          {/* STACK */}
          <div className="structure-card">

            <div className="structure-heading">
              <div>
                <h3>Stack</h3>
                <span>LIFO — Last In, First Out</span>
              </div>

              <div className="operation-badge">
                {step === 1 || step === 2
                  ? "PUSH"
                  : step >= 3
                  ? "POP"
                  : "READY"}
              </div>
            </div>

            <div className="stack-area">

              <div className="stack-container">

                {stackItems.map((item, index) => (
                  <motion.div
                    key={item}
                    className={`stack-item ${
                      step === 3 && item === "C"
                        ? "removed"
                        : ""
                    }`}
                    initial={{
                      opacity: 0,
                      y: -80,
                      scale: 0.7
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale:
                        step === 3 && item === "B"
                          ? [1, 1.08, 1]
                          : 1
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      repeat:
                        playing &&
                        step === 3 &&
                        item === "B"
                          ? Infinity
                          : 0
                    }}
                  >
                    {item}
                  </motion.div>
                ))}

                {stackItems.length === 0 && (
                  <div className="empty-message">
                    Empty
                  </div>
                )}

              </div>

              <div className="stack-top-label">
                ↑ TOP
              </div>

            </div>

            {/* STACK OPERATION */}
            <div className="operation-info">

              {step === 0 && (
                <span>Nothing is stored</span>
              )}

              {step === 1 && (
                <span>
                  PUSH A → A is added to the top
                </span>
              )}

              {step === 2 && (
                <span>
                  PUSH B → PUSH C → elements added on top
                </span>
              )}

              {step === 3 && (
                <span>
                  POP → C is removed first
                </span>
              )}

              {step === 4 && (
                <span>
                  Last inserted element is removed first
                </span>
              )}

            </div>

          </div>

          {/* QUEUE */}
          <div className="structure-card">

            <div className="structure-heading">
              <div>
                <h3>Queue</h3>
                <span>FIFO — First In, First Out</span>
              </div>

              <div className="operation-badge queue-badge">
                {step === 1 || step === 2
                  ? "ENQUEUE"
                  : step >= 3
                  ? "DEQUEUE"
                  : "READY"}
              </div>
            </div>

            <div className="queue-area">

              <div className="queue-container">

                {queueItems.map((item, index) => (
                  <motion.div
                    key={item}
                    className={`queue-item ${
                      step === 3 && item === "A"
                        ? "removed"
                        : ""
                    }`}
                    initial={{
                      opacity: 0,
                      x: 80,
                      scale: 0.7
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale:
                        step === 3 && item === "B"
                          ? [1, 1.08, 1]
                          : 1
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      repeat:
                        playing &&
                        step === 3 &&
                        item === "B"
                          ? Infinity
                          : 0
                    }}
                  >
                    {item}
                  </motion.div>
                ))}

                {queueItems.length === 0 && (
                  <div className="empty-message">
                    Empty
                  </div>
                )}

              </div>

              <div className="queue-labels">
                <span>FRONT →</span>
                <span>← REAR</span>
              </div>

            </div>

            {/* QUEUE OPERATION */}
            <div className="operation-info">

              {step === 0 && (
                <span>Nothing is stored</span>
              )}

              {step === 1 && (
                <span>
                  ENQUEUE A → A enters at the rear
                </span>
              )}

              {step === 2 && (
                <span>
                  B and C enter behind the existing elements
                </span>
              )}

              {step === 3 && (
                <span>
                  DEQUEUE → A leaves from the front
                </span>
              )}

              {step === 4 && (
                <span>
                  First inserted element is removed first
                </span>
              )}

            </div>

          </div>

        </div>

        {/* OPERATION ANIMATION */}
        <motion.div
          className="operation-flow"
          key={`flow-${step}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >

          {step === 0 && (
            <>
              <span className="flow-label">
                Start
              </span>
              <strong>Both structures are empty</strong>
            </>
          )}

          {step === 1 && (
            <>
              <span className="flow-label">
                Adding elements
              </span>
              <strong>
                PUSH adds to Stack's top • ENQUEUE adds to Queue's rear
              </strong>
            </>
          )}

          {step === 2 && (
            <>
              <span className="flow-label">
                More elements
              </span>
              <strong>
                A → B → C
              </strong>
            </>
          )}

          {step === 3 && (
            <>
              <span className="flow-label">
                Removing elements
              </span>
              <strong>
                Stack removes C • Queue removes A
              </strong>
            </>
          )}

          {step === 4 && (
            <>
              <span className="flow-label">
                Key Difference
              </span>
              <strong>
                Stack = LIFO &nbsp; | &nbsp; Queue = FIFO
              </strong>
            </>
          )}

        </motion.div>

        {/* COMPARISON */}
        <div className="comparison">

          <div className="comparison-column">
            <div className="comparison-icon stack-icon">
              S
            </div>

            <div>
              <strong>Stack</strong>
              <span>Last In → First Out</span>
              <small>push() • pop()</small>
            </div>
          </div>

          <div className="comparison-divider" />

          <div className="comparison-column">
            <div className="comparison-icon queue-icon">
              Q
            </div>

            <div>
              <strong>Queue</strong>
              <span>First In → First Out</span>
              <small>enqueue() • dequeue()</small>
            </div>
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
          className="sq-explanation"
          key={`explanation-${step}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >

          {step === 0 && (
            <>
              <strong>What are Stack and Queue?</strong>
              <p>
                Both are linear data structures used to store
                and manage collections of elements.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <strong>Adding elements</strong>
              <p>
                A Stack uses <b>push()</b> to add an element to
                the top. A Queue uses <b>enqueue()</b> to add an
                element at the rear.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <strong>Multiple elements</strong>
              <p>
                After inserting A, B and C, their order is
                A → B → C. The difference becomes important when
                elements are removed.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <strong>Removing elements</strong>
              <p>
                The Stack removes <b>C</b> because it was inserted
                last. The Queue removes <b>A</b> because it was
                inserted first.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <strong>Remember the rule</strong>
              <p>
                <b>Stack = LIFO</b> — Last In, First Out.
                <br />
                <b>Queue = FIFO</b> — First In, First Out.
              </p>
            </>
          )}

        </motion.div>

        <style>{`

          .sq-scene {
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

          .sq-stage-title {
            text-align: center;
            font-size: 19px;
            font-weight: 700;
            margin-bottom: 20px;
          }

          /* STRUCTURES */

          .structures {
            max-width: 850px;
            margin: auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .structure-card {
            padding: 18px;
            border-radius: 18px;
            background: rgba(255,255,255,.045);
            border: 1px solid rgba(255,255,255,.09);
          }

          .structure-heading {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
          }

          .structure-heading h3 {
            margin: 0;
            font-size: 17px;
          }

          .structure-heading span {
            display: block;
            margin-top: 3px;
            color: #94a3b8;
            font-size: 10px;
          }

          .operation-badge {
            padding: 5px 8px;
            border-radius: 8px;
            background: rgba(59,130,246,.15);
            color: #60a5fa;
            font-size: 9px;
            font-weight: 800;
          }

          .queue-badge {
            background: rgba(168,85,247,.15);
            color: #c084fc;
          }

          /* STACK */

          .stack-area {
            height: 220px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }

          .stack-container {
            width: 130px;
            min-height: 175px;
            padding: 8px;
            border-left: 3px solid rgba(255,255,255,.3);
            border-right: 3px solid rgba(255,255,255,.3);
            border-bottom: 3px solid rgba(255,255,255,.3);

            display: flex;
            flex-direction: column-reverse;
            justify-content: flex-start;
            gap: 5px;

            border-radius: 0 0 10px 10px;
          }

          .stack-item {
            height: 42px;
            flex-shrink: 0;
            border-radius: 8px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #3b82f6;

            font-size: 18px;
            font-weight: 800;

            box-shadow:
              0 5px 15px rgba(59,130,246,.2);
          }

          .stack-item.removed {
            opacity: .25;
          }

          .stack-top-label {
            position: absolute;
            top: 8px;
            right: 30px;
            color: #60a5fa;
            font-size: 10px;
            font-weight: 800;
          }

          /* QUEUE */

          .queue-area {
            height: 220px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }

          .queue-container {
            width: 100%;
            min-height: 70px;
            padding: 8px;

            border-top: 3px solid rgba(255,255,255,.3);
            border-bottom: 3px solid rgba(255,255,255,.3);

            display: flex;
            align-items: center;
            gap: 6px;

            border-radius: 8px;
          }

          .queue-item {
            width: 58px;
            height: 55px;
            flex-shrink: 0;

            border-radius: 9px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #a855f7;

            font-size: 18px;
            font-weight: 800;

            box-shadow:
              0 5px 15px rgba(168,85,247,.2);
          }

          .queue-item.removed {
            opacity: .25;
          }

          .queue-labels {
            position: absolute;
            bottom: 28px;
            left: 15px;
            right: 15px;

            display: flex;
            justify-content: space-between;

            color: #c084fc;
            font-size: 9px;
            font-weight: 800;
          }

          .empty-message {
            color: #475569;
            font-size: 12px;
          }

          /* FLOW */

          .operation-flow {
            max-width: 700px;
            margin: 18px auto;

            text-align: center;

            padding: 12px 18px;

            border-radius: 12px;

            background: rgba(255,255,255,.045);
            border: 1px solid rgba(255,255,255,.07);
          }

          .flow-label {
            display: block;
            color: #64748b;
            font-size: 10px;
            margin-bottom: 3px;
            text-transform: uppercase;
          }

          .operation-flow strong {
            font-size: 13px;
          }

          /* COMPARISON */

          .comparison {
            max-width: 620px;
            margin: 15px auto;

            display: flex;
            align-items: center;
            justify-content: space-around;

            padding: 13px;

            border-radius: 13px;

            background: rgba(255,255,255,.035);
          }

          .comparison-column {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .comparison-column strong {
            display: block;
            font-size: 13px;
          }

          .comparison-column span {
            display: block;
            color: #94a3b8;
            font-size: 10px;
          }

          .comparison-column small {
            display: block;
            color: #64748b;
            font-size: 9px;
            margin-top: 3px;
          }

          .comparison-icon {
            width: 35px;
            height: 35px;
            border-radius: 9px;

            display: flex;
            align-items: center;
            justify-content: center;

            font-weight: 800;
          }

          .stack-icon {
            background: rgba(59,130,246,.18);
            color: #60a5fa;
          }

          .queue-icon {
            background: rgba(168,85,247,.18);
            color: #c084fc;
          }

          .comparison-divider {
            width: 1px;
            height: 35px;
            background: rgba(255,255,255,.12);
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

          /* EXPLANATION */

          .sq-explanation {
            max-width: 720px;
            margin: 18px auto 0;

            padding: 15px 20px;

            border-radius: 15px;

            background: rgba(255,255,255,.06);

            border: 1px solid rgba(255,255,255,.08);
          }

          .sq-explanation strong {
            display: block;
            font-size: 15px;
            margin-bottom: 5px;
          }

          .sq-explanation p {
            margin: 0;
            color: #aeb8ca;
            line-height: 1.5;
            font-size: 13px;
          }

          @media (max-width: 700px) {

            .structures {
              grid-template-columns: 1fr;
            }

            .structure-card {
              padding: 12px;
            }

            .queue-area,
            .stack-area {
              height: 170px;
            }

            .comparison {
              flex-direction: column;
              gap: 12px;
            }

            .comparison-divider {
              width: 80%;
              height: 1px;
            }

          }

        `}</style>

      </div>
    </VisualizationShell>
  );
}