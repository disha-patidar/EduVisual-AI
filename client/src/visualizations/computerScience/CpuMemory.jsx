import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function CPUMemory({ step, playing }) {
  const stages = [
    "Program Loaded",
    "Fetch",
    "Decode",
    "Execute",
    "Store Result"
  ];

  const instructions = [
    "LOAD A",
    "ADD B",
    "STORE C"
  ];

  const memoryValues = {
    A: 10,
    B: 20,
    C: step >= 4 ? 30 : "?"
  };

  return (
    <VisualizationShell
      title="CPU & Memory"
      subtitle="Follow how the CPU fetches instructions, processes data, and stores results."
    >
      <div className="cpu-scene">

        {/* STAGE TITLE */}

        <motion.div
          className="cpu-stage-title"
          key={step}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {stages[Math.min(step, stages.length - 1)]}
        </motion.div>

        {/* MAIN SYSTEM */}

        <div className="system-layout">

          {/* MEMORY */}

          <motion.div
            className={`memory-panel ${
              step === 0 || step === 1 || step === 4
                ? "highlight"
                : ""
            }`}
          >
            <div className="component-header">
              <div className="component-icon">
                MEM
              </div>

              <div>
                <strong>Memory</strong>
                <span>Stores instructions & data</span>
              </div>
            </div>

            <div className="memory-section">

              <div className="memory-section-title">
                PROGRAM
              </div>

              {instructions.map((instruction, index) => (
                <motion.div
                  key={instruction}
                  className={`memory-row ${
                    step === 0 && index === 0
                      ? "active-row"
                      : ""
                  }`}
                >
                  <span>
                    {index + 1}
                  </span>

                  <strong>
                    {instruction}
                  </strong>
                </motion.div>
              ))}

            </div>

            <div className="memory-section">

              <div className="memory-section-title">
                DATA
              </div>

              <div className="data-row">
                <span>A</span>
                <strong>{memoryValues.A}</strong>
              </div>

              <div className="data-row">
                <span>B</span>
                <strong>{memoryValues.B}</strong>
              </div>

              <div
                className={`data-row ${
                  step >= 4 ? "result-row" : ""
                }`}
              >
                <span>C</span>
                <strong>{memoryValues.C}</strong>
              </div>

            </div>
          </motion.div>

          {/* BUS */}

          <div className="bus-area">

            <div className="bus-line" />

            {step === 1 && (
              <motion.div
                className="data-packet fetch-packet"
                initial={{ x: -60, opacity: 0 }}
                animate={{
                  x: playing ? [0, 80, 0] : 80,
                  opacity: 1
                }}
                transition={{
                  duration: 1.5,
                  repeat: playing ? Infinity : 0
                }}
              >
                LOAD A
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                className="data-packet result-packet"
                initial={{ x: 60, opacity: 0 }}
                animate={{
                  x: playing ? [0, -80, 0] : -80,
                  opacity: 1
                }}
                transition={{
                  duration: 1.5,
                  repeat: playing ? Infinity : 0
                }}
              >
                C = 30
              </motion.div>
            )}

            <div className="bus-label">
              SYSTEM BUS
            </div>

          </div>

          {/* CPU */}

          <motion.div
            className={`cpu-panel ${
              step >= 1 && step <= 3
                ? "cpu-active"
                : ""
            }`}
          >

            <div className="component-header">

              <div className="component-icon cpu-icon">
                CPU
              </div>

              <div>
                <strong>CPU</strong>
                <span>Central Processing Unit</span>
              </div>

            </div>

            {/* CPU INTERNALS */}

            <div className="cpu-internals">

              <motion.div
                className={`cpu-unit ${
                  step === 1 ? "unit-active" : ""
                }`}
              >
                <span>PC</span>
                <strong>Program Counter</strong>
                <small>
                  Tracks next instruction
                </small>
              </motion.div>

              <motion.div
                className={`cpu-unit ${
                  step === 2 ? "unit-active" : ""
                }`}
              >
                <span>CU</span>
                <strong>Control Unit</strong>
                <small>
                  Decodes instruction
                </small>
              </motion.div>

              <motion.div
                className={`cpu-unit ${
                  step === 3 ? "unit-active" : ""
                }`}
              >
                <span>ALU</span>
                <strong>Arithmetic Logic Unit</strong>
                <small>
                  Performs calculation
                </small>
              </motion.div>

            </div>

            {/* REGISTER */}

            <div className="register">

              <div className="register-title">
                CPU REGISTER
              </div>

              <motion.div
                className="register-value"
                key={step}
                initial={{
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
              >
                {step === 0 && "READY"}

                {step === 1 && "LOAD A"}

                {step === 2 && "ADD B"}

                {step === 3 && "10 + 20 = 30"}

                {step === 4 && "RESULT = 30"}
              </motion.div>

            </div>

          </motion.div>

        </div>

        {/* FLOW INDICATOR */}

        <div className="instruction-flow">

          <motion.div
            className={
              step >= 1
                ? "flow-box active"
                : "flow-box"
            }
          >
            <span>1</span>
            <strong>FETCH</strong>
            <small>
              Get instruction
            </small>
          </motion.div>

          <div className="flow-arrow">→</div>

          <motion.div
            className={
              step >= 2
                ? "flow-box active"
                : "flow-box"
            }
          >
            <span>2</span>
            <strong>DECODE</strong>
            <small>
              Understand instruction
            </small>
          </motion.div>

          <div className="flow-arrow">→</div>

          <motion.div
            className={
              step >= 3
                ? "flow-box active"
                : "flow-box"
            }
          >
            <span>3</span>
            <strong>EXECUTE</strong>
            <small>
              Perform operation
            </small>
          </motion.div>

          <div className="flow-arrow">→</div>

          <motion.div
            className={
              step >= 4
                ? "flow-box active"
                : "flow-box"
            }
          >
            <span>4</span>
            <strong>STORE</strong>
            <small>
              Save result
            </small>
          </motion.div>

        </div>

        {/* EXPLANATION */}

        <motion.div
          className="cpu-explanation"
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
                Program is loaded into memory
              </strong>

              <p>
                Before the CPU can execute a program,
                its instructions and required data are
                stored in main memory (RAM).
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <strong>
                Step 1 — Fetch
              </strong>

              <p>
                The CPU uses the Program Counter to
                locate the next instruction and fetches
                it from memory.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <strong>
                Step 2 — Decode
              </strong>

              <p>
                The Control Unit interprets the fetched
                instruction and determines what operation
                needs to be performed.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <strong>
                Step 3 — Execute
              </strong>

              <p>
                The ALU performs the calculation.
                Here, the CPU adds <b>10 + 20</b> and
                produces <b>30</b>.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <strong>
                Step 4 — Store Result
              </strong>

              <p>
                The computed result is stored back into
                memory. Here, <b>C = 30</b>.
              </p>
            </>
          )}

        </motion.div>

        {/* FORMULA */}

        <div className="cycle-formula">
          <span>CPU INSTRUCTION CYCLE</span>

          <strong>
            FETCH → DECODE → EXECUTE → STORE
          </strong>
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

          .cpu-scene {
            min-height: 720px;
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

          .cpu-stage-title {
            text-align: center;
            font-size: 19px;
            font-weight: 700;
            margin-bottom: 25px;
          }

          /* SYSTEM */

          .system-layout {
            max-width: 950px;
            margin: auto;

            display: grid;
            grid-template-columns:
              1fr
              120px
              1.2fr;

            align-items: center;
            gap: 10px;
          }

          .memory-panel,
          .cpu-panel {
            min-height: 360px;
            padding: 18px;

            border-radius: 18px;

            background: rgba(255,255,255,.045);

            border: 1px solid rgba(255,255,255,.09);

            transition: .3s;
          }

          .memory-panel.highlight {
            border-color: rgba(96,165,250,.4);
            box-shadow:
              0 0 25px rgba(59,130,246,.1);
          }

          .cpu-panel.cpu-active {
            border-color: rgba(168,85,247,.4);
            box-shadow:
              0 0 30px rgba(168,85,247,.12);
          }

          /* HEADER */

          .component-header {
            display: flex;
            align-items: center;
            gap: 10px;

            padding-bottom: 15px;

            border-bottom:
              1px solid rgba(255,255,255,.08);
          }

          .component-icon {
            width: 42px;
            height: 42px;

            border-radius: 11px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: rgba(59,130,246,.15);

            color: #60a5fa;

            font-size: 10px;
            font-weight: 900;
          }

          .cpu-icon {
            background: rgba(168,85,247,.15);
            color: #c084fc;
          }

          .component-header strong {
            display: block;
            font-size: 15px;
          }

          .component-header span {
            display: block;
            margin-top: 3px;
            color: #64748b;
            font-size: 9px;
          }

          /* MEMORY */

          .memory-section {
            margin-top: 17px;
          }

          .memory-section-title {
            color: #64748b;
            font-size: 9px;
            letter-spacing: 1px;
            margin-bottom: 7px;
          }

          .memory-row,
          .data-row {
            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 9px 11px;
            margin-bottom: 5px;

            border-radius: 8px;

            background: rgba(255,255,255,.035);

            color: #94a3b8;

            font-size: 11px;
          }

          .memory-row strong,
          .data-row strong {
            color: #cbd5e1;
          }

          .memory-row.active-row {
            background: rgba(59,130,246,.15);
            border: 1px solid rgba(96,165,250,.2);
          }

          .result-row {
            background: rgba(34,197,94,.12);
            border: 1px solid rgba(34,197,94,.25);
          }

          .result-row strong {
            color: #4ade80;
          }

          /* BUS */

          .bus-area {
            position: relative;
            height: 80px;

            display: flex;
            align-items: center;
            justify-content: center;
          }

          .bus-line {
            position: absolute;

            width: 100%;
            height: 3px;

            background: rgba(96,165,250,.3);
          }

          .bus-label {
            position: absolute;
            top: 12px;

            padding: 4px 7px;

            border-radius: 5px;

            background: #0b1020;

            color: #64748b;

            font-size: 8px;
          }

          .data-packet {
            position: absolute;
            z-index: 3;

            padding: 6px 9px;

            border-radius: 7px;

            font-size: 9px;
            font-weight: 800;

            white-space: nowrap;
          }

          .fetch-packet {
            background: rgba(59,130,246,.25);
            border: 1px solid #60a5fa;
            color: #93c5fd;
          }

          .result-packet {
            background: rgba(34,197,94,.2);
            border: 1px solid #4ade80;
            color: #86efac;
          }

          /* CPU */

          .cpu-internals {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
            margin-top: 18px;
          }

          .cpu-unit {
            padding: 10px;

            border-radius: 9px;

            background: rgba(255,255,255,.035);

            border: 1px solid transparent;

            transition: .25s;
          }

          .cpu-unit > span {
            display: inline-flex;

            width: 25px;
            height: 25px;

            margin-right: 7px;

            border-radius: 6px;

            align-items: center;
            justify-content: center;

            background: rgba(168,85,247,.12);

            color: #c084fc;

            font-size: 8px;
            font-weight: 900;
          }

          .cpu-unit strong {
            font-size: 10px;
          }

          .cpu-unit small {
            display: block;
            margin-top: 4px;
            color: #64748b;
            font-size: 8px;
          }

          .cpu-unit.unit-active {
            border-color: rgba(192,132,252,.35);
            background: rgba(168,85,247,.1);

            transform: translateX(4px);
          }

          /* REGISTER */

          .register {
            margin-top: 15px;
            padding: 12px;

            border-radius: 10px;

            background: rgba(0,0,0,.15);
          }

          .register-title {
            color: #64748b;
            font-size: 8px;
            letter-spacing: 1px;
          }

          .register-value {
            margin-top: 7px;

            color: #c084fc;

            font-size: 13px;
            font-weight: 800;

            text-align: center;
          }

          /* FLOW */

          .instruction-flow {
            max-width: 800px;

            margin: 25px auto 15px;

            display: flex;

            align-items: center;
            justify-content: center;

            gap: 9px;
          }

          .flow-box {
            width: 125px;

            padding: 10px;

            border-radius: 11px;

            text-align: center;

            background: rgba(255,255,255,.04);

            border: 1px solid rgba(255,255,255,.08);

            transition: .3s;
          }

          .flow-box.active {
            background: rgba(59,130,246,.12);
            border-color: rgba(96,165,250,.3);
            transform: translateY(-3px);
          }

          .flow-box span {
            display: block;
            color: #64748b;
            font-size: 8px;
          }

          .flow-box strong {
            display: block;
            margin-top: 3px;
            font-size: 11px;
          }

          .flow-box small {
            display: block;
            margin-top: 3px;
            color: #64748b;
            font-size: 8px;
          }

          .flow-arrow {
            color: #475569;
            font-size: 18px;
          }

          /* EXPLANATION */

          .cpu-explanation {
            max-width: 720px;

            margin: 18px auto;

            padding: 15px 20px;

            border-radius: 15px;

            background: rgba(255,255,255,.06);

            border:
              1px solid rgba(255,255,255,.08);
          }

          .cpu-explanation strong {
            display: block;
            font-size: 14px;
            margin-bottom: 5px;
          }

          .cpu-explanation p {
            margin: 0;

            color: #aeb8ca;

            font-size: 12px;
            line-height: 1.5;
          }

          /* FORMULA */

          .cycle-formula {
            max-width: 500px;

            margin: 15px auto;

            padding: 10px;

            border-radius: 10px;

            background: rgba(255,255,255,.04);

            text-align: center;
          }

          .cycle-formula span {
            display: block;

            color: #64748b;

            font-size: 8px;
            letter-spacing: 1px;
          }

          .cycle-formula strong {
            display: block;

            margin-top: 4px;

            color: #60a5fa;

            font-size: 11px;
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

          @media (max-width: 850px) {

            .system-layout {
              grid-template-columns: 1fr;
            }

            .bus-area {
              height: 45px;
            }

            .instruction-flow {
              flex-wrap: wrap;
            }

          }

          @media (max-width: 550px) {

            .cpu-scene {
              padding: 15px;
            }

            .flow-box {
              width: 105px;
            }

            .flow-arrow {
              display: none;
            }

          }

        `}</style>

      </div>
    </VisualizationShell>
  );
}