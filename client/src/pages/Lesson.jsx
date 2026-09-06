import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import ExplanationPanel from "../components/ExplanationPanel";
import AnimationControls from "../components/AnimationControls";

import VisualizationEngine from "../visualizations/VisualizationEngine";
import Quiz from "../components/Quiz";
import { quizData } from "../data/quizData";

const lessons = {

  // ================= BIOLOGY =================

  photosynthesis: {
    title: "Photosynthesis",
    description: "How plants convert sunlight into chemical energy.",
    visualization: { type: "photosynthesis" },
    steps: [
      {
        title: "Sunlight reaches the plant",
        description: "Chlorophyll captures energy from sunlight.",
        formula: null,
      },
      {
        title: "Roots absorb water",
        description: "Roots absorb water from the soil.",
        formula: "H₂O",
      },
      {
        title: "Carbon dioxide enters",
        description: "CO₂ enters the leaves through stomata.",
        formula: "CO₂",
      },
      {
        title: "Glucose is produced",
        description:
          "Light energy helps convert carbon dioxide and water into glucose.",
        formula: "CO₂ + H₂O + ☀️ → C₆H₁₂O₆ + O₂",
      },
      {
        title: "Oxygen is released",
        description: "Oxygen is released into the atmosphere.",
        formula: "O₂",
      },
    ],
  },

  "human-heart": {
    title: "Human Heart",
    description: "Follow blood through the chambers of the heart.",
    visualization: { type: "human-heart" },
    steps: [
      {
        title: "Deoxygenated blood enters",
        description: "Blood from the body enters the right atrium.",
        formula: null,
      },
      {
        title: "Right ventricle",
        description: "Blood moves from the right atrium to the right ventricle.",
        formula: null,
      },
      {
        title: "Blood goes to lungs",
        description: "The right ventricle pumps blood to the lungs.",
        formula: "CO₂ → Lungs",
      },
      {
        title: "Oxygenated blood returns",
        description: "Oxygen-rich blood returns from the lungs.",
        formula: "O₂",
      },
      {
        title: "Blood reaches body",
        description:
          "The left ventricle pumps oxygenated blood to the whole body.",
        formula: null,
      },
    ],
  },

  cell: {
    title: "Cell Structure",
    description: "Explore the major structures inside a cell.",
    visualization: { type: "cell" },
    steps: [
      {
        title: "Cell membrane",
        description: "Controls what enters and leaves the cell.",
        formula: null,
      },
      {
        title: "Cytoplasm",
        description: "The cell's internal fluid where many reactions occur.",
        formula: null,
      },
      {
        title: "Nucleus",
        description: "Contains most of the cell's genetic material.",
        formula: "DNA",
      },
      {
        title: "Mitochondria",
        description: "Help release usable energy from food.",
        formula: "ATP",
      },
      {
        title: "Organelles work together",
        description: "Different organelles perform specialized functions.",
        formula: null,
      },
    ],
  },

  digestion: {
    title: "Digestive System",
    description: "Follow food through the digestive system.",
    visualization: { type: "digestion" },
    steps: [
      {
        title: "Mouth",
        description: "Food is chewed and mixed with saliva.",
        formula: null,
      },
      {
        title: "Esophagus",
        description: "Food travels toward the stomach.",
        formula: null,
      },
      {
        title: "Stomach",
        description: "Food is mixed with digestive juices.",
        formula: null,
      },
      {
        title: "Small intestine",
        description: "Most nutrients are absorbed here.",
        formula: null,
      },
      {
        title: "Large intestine",
        description: "Water is absorbed and waste is prepared for removal.",
        formula: null,
      },
    ],
  },

  dna: {
    title: "DNA Replication",
    description: "Watch DNA unwind and create a copy.",
    visualization: { type: "dna" },
    steps: [
      {
        title: "DNA unwinds",
        description: "The DNA double helix begins to separate.",
        formula: null,
      },
      {
        title: "Strands separate",
        description: "The two strands become templates.",
        formula: null,
      },
      {
        title: "Bases pair",
        description: "Complementary bases attach to each template.",
        formula: "A ↔ T, C ↔ G",
      },
      {
        title: "New strands form",
        description: "New complementary DNA strands are created.",
        formula: null,
      },
      {
        title: "Two DNA molecules",
        description: "Two DNA molecules are produced.",
        formula: null,
      },
    ],
  },

  // ================= PHYSICS =================

  newton: {
    title: "Newton's Laws",
    description: "Understand force, mass and acceleration.",
    visualization: { type: "newton" },
    steps: [
      {
        title: "Inertia",
        description:
          "Objects remain at rest or in motion unless acted upon by a net force.",
        formula: null,
      },
      {
        title: "Force causes acceleration",
        description: "A net force changes the motion of an object.",
        formula: "F = ma",
      },
      {
        title: "Mass matters",
        description: "More mass requires more force for the same acceleration.",
        formula: "a = F/m",
      },
      {
        title: "Action and reaction",
        description: "Forces occur in equal and opposite pairs.",
        formula: null,
      },
      {
        title: "Motion changes",
        description: "A net force produces a change in velocity.",
        formula: null,
      },
    ],
  },

  projectile: {
    title: "Projectile Motion",
    description: "Explore how angle and velocity affect a projectile.",
    visualization: { type: "projectile" },
    steps: [
      {
        title: "Launch",
        description: "The object starts with an initial velocity.",
        formula: null,
      },
      {
        title: "Horizontal motion",
        description: "Horizontal velocity remains constant when air resistance is ignored.",
        formula: "vₓ = constant",
      },
      {
        title: "Vertical motion",
        description: "Gravity accelerates the projectile downward.",
        formula: "aᵧ = −g",
      },
      {
        title: "Maximum height",
        description: "Vertical velocity becomes zero at the highest point.",
        formula: "vᵧ = 0",
      },
      {
        title: "Landing",
        description: "Gravity brings the projectile back to the ground.",
        formula: null,
      },
    ],
  },

  electricity: {
    title: "Electric Circuit",
    description: "Understand how current flows through a circuit.",
    visualization: { type: "electricity" },
    steps: [
      {
        title: "Battery",
        description: "The battery provides electrical potential difference.",
        formula: "V",
      },
      {
        title: "Closed circuit",
        description: "A complete path allows charge to move.",
        formula: null,
      },
      {
        title: "Current flows",
        description: "Electric current is the rate of charge flow.",
        formula: "I = Q/t",
      },
      {
        title: "Resistance",
        description: "Resistance opposes the flow of current.",
        formula: "V = IR",
      },
      {
        title: "Electrical power",
        description: "Electrical energy can be converted into other forms.",
        formula: "P = VI",
      },
    ],
  },

  "solar-system": {
    title: "Solar System",
    description: "Explore planets orbiting the Sun.",
    visualization: { type: "solar-system" },
    steps: [
      {
        title: "The Sun",
        description: "The Sun is the central star of our solar system.",
        formula: null,
      },
      {
        title: "Planetary orbits",
        description: "Planets travel around the Sun.",
        formula: null,
      },
      {
        title: "Gravity",
        description: "Gravity helps keep planets in their orbits.",
        formula: "F ∝ 1/r²",
      },
      {
        title: "Different planets",
        description: "Planets have different sizes and orbital periods.",
        formula: null,
      },
      {
        title: "Solar system",
        description: "The Sun and its orbiting objects form the solar system.",
        formula: null,
      },
    ],
  },

  waves: {
    title: "Wave Motion",
    description: "Understand amplitude, frequency and wavelength.",
    visualization: { type: "waves" },
    steps: [
      {
        title: "Wave",
        description: "A wave transfers energy from one place to another.",
        formula: null,
      },
      {
        title: "Amplitude",
        description: "Amplitude is the maximum displacement from equilibrium.",
        formula: "A",
      },
      {
        title: "Frequency",
        description: "Frequency is the number of cycles per second.",
        formula: "f = 1/T",
      },
      {
        title: "Wavelength",
        description: "Wavelength is the distance between corresponding points.",
        formula: "λ",
      },
      {
        title: "Wave speed",
        description: "Wave speed depends on frequency and wavelength.",
        formula: "v = fλ",
      },
    ],
  },

  // ================= CHEMISTRY =================

  atom: {
    title: "Atomic Structure",
    description: "Explore protons, neutrons and electrons.",
    visualization: { type: "atom" },
    steps: [
      {
        title: "Nucleus",
        description: "The nucleus contains protons and neutrons.",
        formula: null,
      },
      {
        title: "Protons",
        description: "Protons have positive charge.",
        formula: "+",
      },
      {
        title: "Neutrons",
        description: "Neutrons have no net charge.",
        formula: "0",
      },
      {
        title: "Electrons",
        description: "Electrons have negative charge.",
        formula: "−",
      },
      {
        title: "Complete atom",
        description: "Electrons surround the nucleus.",
        formula: null,
      },
    ],
  },

  bonding: {
    title: "Chemical Bonding",
    description: "Understand how atoms form chemical bonds.",
    visualization: { type: "bonding" },
    steps: [
      {
        title: "Atoms interact",
        description: "Atoms interact through their electrons.",
        formula: null,
      },
      {
        title: "Electron transfer",
        description: "Ionic bonding involves electron transfer.",
        formula: null,
      },
      {
        title: "Electron sharing",
        description: "Covalent bonding involves sharing electrons.",
        formula: null,
      },
      {
        title: "Chemical bond",
        description: "Electrostatic interactions help hold atoms or ions together.",
        formula: null,
      },
      {
        title: "Stable structure",
        description: "Bonding produces molecules or extended structures.",
        formula: null,
      },
    ],
  },

  "acid-base": {
    title: "Acids & Bases",
    description: "Explore acids, bases and the pH scale.",
    visualization: { type: "acid-base" },
    steps: [
      {
        title: "Acid",
        description: "Acids increase hydrogen ion concentration in aqueous solution.",
        formula: "H⁺",
      },
      {
        title: "Base",
        description: "Bases can increase hydroxide ion concentration.",
        formula: "OH⁻",
      },
      {
        title: "pH",
        description: "pH measures hydrogen ion concentration logarithmically.",
        formula: "pH = −log[H⁺]",
      },
      {
        title: "Neutralization",
        description: "Acids and bases can react to form water.",
        formula: "H⁺ + OH⁻ → H₂O",
      },
      {
        title: "pH scale",
        description: "The pH scale is commonly used to compare acidity and basicity.",
        formula: "0 ← Acid | 7 | Base → 14",
      },
    ],
  },

  reaction: {
    title: "Chemical Reaction",
    description: "Watch reactants transform into products.",
    visualization: { type: "reaction" },
    steps: [
      {
        title: "Reactants",
        description: "Reactants are the starting substances.",
        formula: null,
      },
      {
        title: "Particles interact",
        description: "Particles collide and interact.",
        formula: null,
      },
      {
        title: "Bonds change",
        description: "Chemical bonds can break and new bonds can form.",
        formula: null,
      },
      {
        title: "Products",
        description: "New substances are produced.",
        formula: null,
      },
      {
        title: "Conservation",
        description: "Atoms are rearranged during the reaction.",
        formula: null,
      },
    ],
  },

  states: {
    title: "States of Matter",
    description: "Explore particle movement in different states.",
    visualization: { type: "states" },
    steps: [
      {
        title: "Solid",
        description: "Particles are closely packed and mainly vibrate.",
        formula: null,
      },
      {
        title: "Heating",
        description: "Adding energy generally increases particle motion.",
        formula: null,
      },
      {
        title: "Liquid",
        description: "Particles stay close but can move past each other.",
        formula: null,
      },
      {
        title: "Gas",
        description: "Particles are widely separated and move freely.",
        formula: null,
      },
      {
        title: "Phase changes",
        description: "Matter can change between different states.",
        formula: "Solid ↔ Liquid ↔ Gas",
      },
    ],
  },

  // ================= GEOGRAPHY =================

  "water-cycle": {
    title: "Water Cycle",
    description: "Explore the continuous movement of water on Earth.",
    visualization: { type: "water-cycle" },
    steps: [
      {
        title: "Evaporation",
        description: "Solar energy causes water to become vapor.",
        formula: null,
      },
      {
        title: "Condensation",
        description: "Water vapor cools and forms droplets.",
        formula: null,
      },
      {
        title: "Cloud formation",
        description: "Condensed water forms clouds.",
        formula: null,
      },
      {
        title: "Precipitation",
        description: "Water falls as rain, snow or other precipitation.",
        formula: null,
      },
      {
        title: "Collection",
        description: "Water collects in oceans, lakes and rivers.",
        formula: null,
      },
    ],
  },

  "rock-cycle": {
    title: "Rock Cycle",
    description: "Understand how rocks transform over geological time.",
    visualization: { type: "rock-cycle" },
    steps: [
      {
        title: "Weathering",
        description: "Rocks break down into smaller sediments.",
        formula: null,
      },
      {
        title: "Sedimentary rock",
        description: "Sediments can become compacted and cemented.",
        formula: null,
      },
      {
        title: "Metamorphic rock",
        description: "Heat and pressure transform existing rocks.",
        formula: null,
      },
      {
        title: "Melting",
        description: "Rock can melt and form magma.",
        formula: null,
      },
      {
        title: "Igneous rock",
        description: "Magma cools and forms igneous rock.",
        formula: null,
      },
    ],
  },

  volcano: {
    title: "Volcano",
    description: "Understand how volcanic eruptions occur.",
    visualization: { type: "volcano" },
    steps: [
      {
        title: "Magma",
        description: "Molten rock exists beneath Earth's surface.",
        formula: null,
      },
      {
        title: "Magma rises",
        description: "Magma can rise through weaknesses in the crust.",
        formula: null,
      },
      {
        title: "Pressure builds",
        description: "Pressure can increase inside the volcanic system.",
        formula: null,
      },
      {
        title: "Eruption",
        description: "Magma reaches the surface as lava.",
        formula: null,
      },
      {
        title: "Cooling",
        description: "Lava cools and becomes solid rock.",
        formula: null,
      },
    ],
  },

  "earth-layers": {
    title: "Earth's Layers",
    description: "Explore Earth's internal structure.",
    visualization: { type: "earth-layers" },
    steps: [
      {
        title: "Crust",
        description: "The crust is Earth's thin outer rocky layer.",
        formula: null,
      },
      {
        title: "Mantle",
        description: "The mantle lies beneath the crust.",
        formula: null,
      },
      {
        title: "Outer core",
        description: "The outer core is primarily liquid metal.",
        formula: null,
      },
      {
        title: "Inner core",
        description: "The inner core is primarily solid metal.",
        formula: null,
      },
      {
        title: "Complete Earth",
        description: "These layers form Earth's internal structure.",
        formula: null,
      },
    ],
  },

  tectonics: {
    title: "Plate Tectonics",
    description: "Explore how Earth's tectonic plates move.",
    visualization: { type: "tectonics" },
    steps: [
      {
        title: "Tectonic plates",
        description: "Earth's outer rigid layer is divided into plates.",
        formula: null,
      },
      {
        title: "Plate movement",
        description: "Plates move relative to one another.",
        formula: null,
      },
      {
        title: "Collision",
        description: "Some plates move toward each other.",
        formula: null,
      },
      {
        title: "Earthquakes",
        description: "Plate movement can cause earthquakes.",
        formula: null,
      },
      {
        title: "Mountains",
        description: "Plate interactions can contribute to mountain formation.",
        formula: null,
      },
    ],
  },

  // ================= COMPUTER SCIENCE =================

  "binary-search": {
    title: "Binary Search",
    description: "Search a sorted array by repeatedly eliminating half.",
    visualization: { type: "binary-search" },
    steps: [
      {
        title: "Sorted array",
        description: "Binary search requires a sorted collection.",
        formula: null,
      },
      {
        title: "Find middle",
        description: "Check the middle element.",
        formula: null,
      },
      {
        title: "Compare",
        description: "Compare the target with the middle value.",
        formula: null,
      },
      {
        title: "Eliminate half",
        description: "Discard the half that cannot contain the target.",
        formula: null,
      },
      {
        title: "Repeat",
        description: "Continue until the target is found.",
        formula: "O(log n)",
      },
    ],
  },

  sorting: {
    title: "Sorting Algorithms",
    description: "Understand how algorithms arrange elements.",
    visualization: { type: "sorting" },
    steps: [
      {
        title: "Unsorted data",
        description: "The elements begin in an arbitrary order.",
        formula: null,
      },
      {
        title: "Compare elements",
        description: "The algorithm compares selected elements.",
        formula: null,
      },
      {
        title: "Swap or move",
        description: "Elements are moved toward their correct positions.",
        formula: null,
      },
      {
        title: "Repeat",
        description: "The process continues until the desired order is reached.",
        formula: null,
      },
      {
        title: "Sorted data",
        description: "The elements are now arranged in order.",
        formula: null,
      },
    ],
  },

  "stack-queue": {
    title: "Stack & Queue",
    description: "Understand LIFO and FIFO data structures.",
    visualization: { type: "stack-queue" },
    steps: [
      {
        title: "Stack",
        description: "A stack follows Last In, First Out.",
        formula: "LIFO",
      },
      {
        title: "Push",
        description: "An element is added to the top of a stack.",
        formula: "push()",
      },
      {
        title: "Pop",
        description: "The top element is removed from a stack.",
        formula: "pop()",
      },
      {
        title: "Queue",
        description: "A queue follows First In, First Out.",
        formula: "FIFO",
      },
      {
        title: "Enqueue & dequeue",
        description: "Elements enter at the rear and leave from the front.",
        formula: "enqueue() / dequeue()",
      },
    ],
  },

  "cpu-memory": {
    title: "CPU & Memory",
    description: "Understand how the CPU interacts with memory.",
    visualization: { type: "cpu-memory" },
    steps: [
      {
        title: "Fetch",
        description: "The CPU fetches an instruction from memory.",
        formula: null,
      },
      {
        title: "Decode",
        description: "The CPU determines what the instruction means.",
        formula: null,
      },
      {
        title: "Execute",
        description: "The CPU performs the required operation.",
        formula: null,
      },
      {
        title: "Memory",
        description: "Data can be read from or written to memory.",
        formula: null,
      },
      {
        title: "Result",
        description: "The result is stored or passed to the next operation.",
        formula: null,
      },
    ],
  },

  network: {
    title: "Computer Networks",
    description: "See how data travels between computers.",
    visualization: { type: "network" },
    steps: [
      {
        title: "Sender",
        description: "A computer creates data to send.",
        formula: null,
      },
      {
        title: "Packet",
        description: "Data is divided into packets.",
        formula: null,
      },
      {
        title: "Network",
        description: "Packets travel through network devices.",
        formula: null,
      },
      {
        title: "Destination",
        description: "Packets reach the receiving computer.",
        formula: null,
      },
      {
        title: "Reassemble",
        description: "The receiving system uses the packets to reconstruct the data.",
        formula: null,
      },
    ],
  },
};

function Lesson() {
  const [searchParams] = useSearchParams();

  const topic = searchParams.get("topic");

  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  /*
   * THIS IS THE IMPORTANT PART
   * Find the lesson using the topic from the URL.
   */
  const lesson = lessons[topic];

  /*
   * Reset step whenever the user opens another topic.
   */
  useEffect(() => {
    setStep(0);
    setPlaying(true);
  }, [topic]);

  /*
   * Automatically move through lesson steps.
   */
  useEffect(() => {
    if (!playing || !lesson) return;

    const timer = setInterval(() => {
      setStep((current) => {
        if (current >= lesson.steps.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [playing, lesson]);

  /*
   * Topic doesn't exist.
   */
  if (!lesson) {
    return (
      <>
        <Navbar />

        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "30px",
          }}
        >
          <div style={{ fontSize: "70px" }}>🔍</div>

          <h1>Topic Not Found</h1>

          <p style={{ color: "#94a3b8" }}>
            We couldn't find a lesson for:
          </p>

          <strong>{topic || "unknown topic"}</strong>

          <Link
            to="/"
            style={{
              marginTop: "25px",
              padding: "12px 22px",
              borderRadius: "10px",
              textDecoration: "none",
              background: "#2563eb",
              color: "white",
            }}
          >
            ← Back to Subjects
          </Link>
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="lesson-page">

        {/* HEADER */}

        <div className="lesson-header">

          <Link to="/" className="back-btn">
            ← Back
          </Link>

          <div>
            <h1>{lesson.title}</h1>

            <p>{lesson.description}</p>
          </div>

        </div>

        {/* LESSON */}

        <div className="lesson-layout">

          {/* VISUALIZATION */}

          <div className="visualization-card">

            <VisualizationEngine
              lesson={lesson}
              step={step}
              playing={playing}
            />

            <AnimationControls
              step={step}
              totalSteps={lesson.steps.length}
              playing={playing}
              setPlaying={setPlaying}
              setStep={setStep}
            />

          </div>

          {/* EXPLANATION */}

          <ExplanationPanel
            lesson={lesson}
            step={step}
          />

        </div>

        {/* QUIZ */}

     {/* QUIZ */}

<div className="lesson-quiz-section">
  <Quiz
    topic={lesson.title}
    questions={quizData[topic] || []}
  />
</div>

      </main>
    </div>
  );
}

export default Lesson;