import { motion } from "motion/react";
import VisualizationShell from "../../components/VisualizationShell";

export default function ComputerNetwork({ step, playing }) {
  const stages = [
    "Create Packet",
    "Send Packet",
    "Reach Router",
    "Forward Packet",
    "Packet Delivered"
  ];

  const packetPosition = [
    { x: 0, y: 0 },
    { x: 27, y: 0 },
    { x: 50, y: 0 },
    { x: 73, y: 0 },
    { x: 100, y: 0 }
  ];

  const position = packetPosition[Math.min(step, 4)];

  return (
    <VisualizationShell
      title="Computer Networks"
      subtitle="Watch how a data packet travels from one computer to another."
    >
      <div className="network-scene">

        {/* STAGE */}

        <motion.div
          className="network-stage"
          key={step}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {stages[Math.min(step, 4)]}
        </motion.div>

        {/* NETWORK */}

        <div className="network-area">

          {/* CONNECTION LINE */}

          <div className="network-line">
            <div className="line-segment" />
            <div className="line-segment" />
            <div className="line-segment" />
          </div>

          {/* PACKET */}

          {step > 0 && (
            <motion.div
              className="data-packet"
              animate={{
                left: `${position.x}%`
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut"
              }}
            >
              <span>DATA</span>
              <small>101101</small>
            </motion.div>
          )}

          {/* SOURCE */}

          <motion.div
            className={`network-node computer-node ${
              step === 0 || step === 1
                ? "node-active"
                : ""
            }`}
          >
            <div className="node-icon">
              💻
            </div>

            <strong>Computer A</strong>

            <span>
              Sender
            </span>

            {step === 0 && (
              <motion.div
                className="signal"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              />
            )}
          </motion.div>

          {/* ROUTER */}

          <motion.div
            className={`network-node router-node ${
              step >= 2 && step <= 3
                ? "node-active router-active"
                : ""
            }`}
          >
            <div className="node-icon">
              📡
            </div>

            <strong>Router</strong>

            <span>
              Finds the path
            </span>

            {step === 2 && (
              <motion.div
                className="routing-ring"
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}
          </motion.div>

          {/* DESTINATION */}

          <motion.div
            className={`network-node computer-node destination ${
              step === 4
                ? "node-active delivered"
                : ""
            }`}
          >
            <div className="node-icon">
              🖥️
            </div>

            <strong>Computer B</strong>

            <span>
              Receiver
            </span>

            {step === 4 && (
              <motion.div
                className="received-check"
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>

        </div>

        {/* PACKET DETAILS */}

        <motion.div
          className="packet-panel"
          key={`packet-${step}`}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
        >

          <div className="packet-header">
            <span>NETWORK PACKET</span>

            <strong>
              {step === 0
                ? "Not created"
                : step === 4
                ? "Delivered ✓"
                : "In transit"}
            </strong>
          </div>

          <div className="packet-fields">

            <div>
              <span>Source IP</span>
              <strong>192.168.1.10</strong>
            </div>

            <div>
              <span>Destination IP</span>
              <strong>192.168.1.20</strong>
            </div>

            <div>
              <span>Protocol</span>
              <strong>TCP</strong>
            </div>

            <div>
              <span>Payload</span>
              <strong>101101</strong>
            </div>

          </div>

        </motion.div>

        {/* EXPLANATION */}

        <motion.div
          className="network-explanation"
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
                Step 1 — Create a Packet
              </strong>

              <p>
                When Computer A wants to send data,
                the data is divided into smaller units
                called <b>packets</b>. The packet contains
                information about the sender and receiver.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <strong>
                Step 2 — Send the Packet
              </strong>

              <p>
                Computer A sends the packet through the
                network connection toward the destination.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <strong>
                Step 3 — Router Receives the Packet
              </strong>

              <p>
                The router examines the destination
                address and determines where the packet
                should go next.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <strong>
                Step 4 — Router Forwards the Packet
              </strong>

              <p>
                The router forwards the packet along the
                appropriate path toward Computer B.
              </p>
            </>
          )}

          {step === 4 && (
            <>
              <strong>
                Step 5 — Packet Delivered ✓
              </strong>

              <p>
                Computer B receives the packet and
                reconstructs the transmitted information.
                Communication is complete.
              </p>
            </>
          )}

        </motion.div>

        {/* NETWORK LAYERS */}

        <div className="network-concepts">

          <div className="concept-card">
            <span>01</span>
            <strong>Sender</strong>
            <p>Creates and sends data.</p>
          </div>

          <div className="concept-arrow">
            →
          </div>

          <div className="concept-card">
            <span>02</span>
            <strong>Packet</strong>
            <p>Carries the data.</p>
          </div>

          <div className="concept-arrow">
            →
          </div>

          <div className="concept-card">
            <span>03</span>
            <strong>Router</strong>
            <p>Chooses the path.</p>
          </div>

          <div className="concept-arrow">
            →
          </div>

          <div className="concept-card">
            <span>04</span>
            <strong>Receiver</strong>
            <p>Receives the data.</p>
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

          .network-scene {
            min-height: 720px;
            position: relative;
            overflow: hidden;
            padding: 25px;

            border-radius: 24px;

            background:
              radial-gradient(
                circle at center,
                rgba(59,130,246,.14),
                transparent 50%
              ),
              #0b1020;

            color: white;
          }

          .network-stage {
            text-align: center;

            font-size: 19px;
            font-weight: 700;

            margin-bottom: 25px;
          }

          /* NETWORK AREA */

          .network-area {
            height: 270px;

            max-width: 900px;

            margin: auto;

            position: relative;
          }

          .network-line {
            position: absolute;

            left: 12%;
            right: 12%;

            top: 50%;

            display: flex;

            transform: translateY(-50%);

            gap: 0;
          }

          .line-segment {
            flex: 1;

            height: 3px;

            background:
              repeating-linear-gradient(
                90deg,
                rgba(96,165,250,.4) 0,
                rgba(96,165,250,.4) 8px,
                transparent 8px,
                transparent 15px
              );
          }

          /* NODES */

          .network-node {
            position: absolute;

            top: 50%;

            transform: translateY(-50%);

            width: 145px;
            height: 125px;

            border-radius: 18px;

            display: flex;

            flex-direction: column;

            align-items: center;
            justify-content: center;

            background:
              rgba(255,255,255,.05);

            border:
              1px solid rgba(255,255,255,.1);

            transition: .3s;

            z-index: 2;
          }

          .computer-node {
            left: 4%;
          }

          .router-node {
            left: 50%;

            transform:
              translate(-50%, -50%);
          }

          .destination {
            left: auto;
            right: 4%;
          }

          .node-active {
            border-color:
              rgba(96,165,250,.6);

            background:
              rgba(59,130,246,.12);

            box-shadow:
              0 0 35px
              rgba(59,130,246,.2);
          }

          .router-active {
            border-color:
              rgba(168,85,247,.7);

            background:
              rgba(168,85,247,.12);

            box-shadow:
              0 0 35px
              rgba(168,85,247,.2);
          }

          .delivered {
            border-color:
              rgba(34,197,94,.7);

            background:
              rgba(34,197,94,.1);

            box-shadow:
              0 0 35px
              rgba(34,197,94,.18);
          }

          .node-icon {
            font-size: 32px;

            margin-bottom: 7px;
          }

          .network-node strong {
            font-size: 12px;
          }

          .network-node span {
            margin-top: 4px;

            color: #64748b;

            font-size: 9px;
          }

          /* PACKET */

          .data-packet {
            position: absolute;

            z-index: 5;

            top: 50%;

            transform:
              translate(-50%, -50%);

            width: 58px;
            height: 42px;

            border-radius: 9px;

            display: flex;

            flex-direction: column;

            align-items: center;
            justify-content: center;

            background:
              rgba(59,130,246,.3);

            border:
              1px solid #60a5fa;

            box-shadow:
              0 0 20px
              rgba(59,130,246,.35);

            color: #bfdbfe;

            margin-left: 0;
          }

          .data-packet span {
            font-size: 8px;
            font-weight: 900;
          }

          .data-packet small {
            margin-top: 2px;
            font-size: 7px;
          }

          /* SIGNAL */

          .signal {
            position: absolute;

            width: 180px;
            height: 180px;

            border-radius: 50%;

            border:
              1px solid rgba(96,165,250,.25);

            pointer-events: none;
          }

          .routing-ring {
            position: absolute;

            width: 165px;
            height: 165px;

            border-radius: 50%;

            border:
              1px dashed
              rgba(192,132,252,.45);

            pointer-events: none;
          }

          .received-check {
            position: absolute;

            top: -10px;
            right: -10px;

            width: 27px;
            height: 27px;

            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #22c55e;

            color: white;

            font-weight: 900;
          }

          /* PACKET PANEL */

          .packet-panel {
            max-width: 700px;

            margin: 0 auto 18px;

            padding: 15px 18px;

            border-radius: 14px;

            background:
              rgba(255,255,255,.05);

            border:
              1px solid
              rgba(255,255,255,.08);
          }

          .packet-header {
            display: flex;

            justify-content: space-between;

            align-items: center;

            margin-bottom: 12px;
          }

          .packet-header span {
            color: #64748b;

            font-size: 8px;

            letter-spacing: 1px;
          }

          .packet-header strong {
            color: #60a5fa;

            font-size: 10px;
          }

          .packet-fields {
            display: grid;

            grid-template-columns:
              repeat(4, 1fr);

            gap: 8px;
          }

          .packet-fields div {
            padding: 8px;

            border-radius: 8px;

            background:
              rgba(255,255,255,.035);
          }

          .packet-fields span {
            display: block;

            color: #64748b;

            font-size: 8px;
          }

          .packet-fields strong {
            display: block;

            margin-top: 4px;

            color: #cbd5e1;

            font-size: 9px;
          }

          /* EXPLANATION */

          .network-explanation {
            max-width: 700px;

            margin: 15px auto;

            padding: 15px 20px;

            border-radius: 15px;

            background:
              rgba(255,255,255,.06);

            border:
              1px solid
              rgba(255,255,255,.08);
          }

          .network-explanation strong {
            display: block;

            font-size: 14px;

            margin-bottom: 5px;
          }

          .network-explanation p {
            margin: 0;

            color: #aeb8ca;

            font-size: 12px;

            line-height: 1.5;
          }

          /* CONCEPTS */

          .network-concepts {
            max-width: 850px;

            margin: 18px auto;

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 8px;
          }

          .concept-card {
            flex: 1;

            padding: 10px;

            border-radius: 10px;

            background:
              rgba(255,255,255,.04);

            text-align: center;
          }

          .concept-card span {
            color: #60a5fa;

            font-size: 8px;
          }

          .concept-card strong {
            display: block;

            margin-top: 3px;

            font-size: 11px;
          }

          .concept-card p {
            margin: 3px 0 0;

            color: #64748b;

            font-size: 8px;
          }

          .concept-arrow {
            color: #475569;

            font-size: 18px;
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

            .network-area {
              height: 240px;
            }

            .network-node {
              width: 110px;
              height: 105px;
            }

            .node-icon {
              font-size: 25px;
            }

            .packet-fields {
              grid-template-columns:
                repeat(2, 1fr);
            }

            .network-concepts {
              flex-wrap: wrap;
            }

          }

          @media (max-width: 500px) {

            .network-node {
              width: 85px;
              height: 90px;
            }

            .network-node strong {
              font-size: 9px;
            }

            .network-node span {
              font-size: 7px;
            }

            .network-area {
              height: 210px;
            }

            .network-line {
              left: 8%;
              right: 8%;
            }

          }

        `}</style>

      </div>
    </VisualizationShell>
  );
}