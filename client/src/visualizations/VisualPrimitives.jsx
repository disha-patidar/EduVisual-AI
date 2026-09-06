import { motion } from "motion/react";

export function Orb({
  x = 50,
  y = 50,
  label = "",
  size = 54,
  className = ""
}) {

  return (

    <motion.div
      className={`orb ${className}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size
      }}
      animate={{
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity
      }}
    >
      {label}
    </motion.div>
  );
}


export function Particle({
  x,
  y,
  label,
  colorClass = "",
  delay = 0
}) {

  return (

    <motion.div
      className={`particle ${colorClass}`}
      style={{
        left: `${x}%`,
        top: `${y}%`
      }}
      animate={{
        x: [0, 70, 140],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay
      }}
    >
      {label}
    </motion.div>
  );
}


export function FlowLine({
  vertical = false
}) {

  return (
    <div
      className={
        vertical
          ? "flow-line vertical"
          : "flow-line"
      }
    />
  );
}