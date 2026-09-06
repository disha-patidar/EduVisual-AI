import Photosynthesis from "./biology/Photosynthesis";

// Biology
import HumanHeart from "./biology/HumanHeart";
import CellStructure from "./biology/CellStructure";
import DigestiveSystem from "./biology/DigestiveSystem";
import DNAReplication from "./biology/DNAReplication";

// Physics
import NewtonLaws from "./physics/NewtonLaws";
import ProjectileMotion from "./physics/ProjectileMotion";
import ElectricCircuit from "./physics/ElectricCircuit";
import SolarSystem from "./physics/SolarSystem";
import WaveMotion from "./physics/WaveMotion";

// Chemistry
import AtomicStructure from "./chemistry/AtomicStructure";
import ChemicalBonding from "./chemistry/ChemicalBonding";
import AcidBase from "./chemistry/AcidBase";
import ChemicalReaction from "./chemistry/ChemicalReaction";
import StatesOfMatter from "./chemistry/StatesOfMatter";

// Geography
import WaterCycle from "./geography/WaterCycle";
import RockCycle from "./geography/RockCycle";
import Volcano from "./geography/Volcano";
import EarthLayers from "./geography/EarthLayers";
import PlateTectonics from "./geography/PlateTectonics";

// Computer Science
import BinarySearch from "./computerScience/BinarySearch";
import Sorting from "./computerScience/Sorting";
import StackQueue from "./computerScience/StackQueue";
import CpuMemory from "./computerScience/CpuMemory";
import ComputerNetwork from "./computerScience/ComputerNetwork";

export default function VisualizationEngine({
  lesson,
  step,
  playing,
}) {
  const type = lesson?.visualization?.type;

  switch (type) {

    /* =========================
       BIOLOGY
    ========================= */

    case "photosynthesis":
      return (
        <Photosynthesis
          step={step}
          playing={playing}
        />
      );

    case "human-heart":
      return (
        <HumanHeart
          step={step}
          playing={playing}
        />
      );

    case "cell":
      return (
        <CellStructure
          step={step}
          playing={playing}
        />
      );

    case "digestion":
      return (
        <DigestiveSystem
          step={step}
          playing={playing}
        />
      );

    case "dna":
      return (
        <DNAReplication
          step={step}
          playing={playing}
        />
      );


    /* =========================
       PHYSICS
    ========================= */

    case "newton":
    case "newton-laws":
      return (
        <NewtonLaws
          step={step}
          playing={playing}
        />
      );

    case "projectile":
      return (
        <ProjectileMotion
          step={step}
          playing={playing}
        />
      );

    case "electricity":
    case "electric-circuit":
      return (
        <ElectricCircuit
          step={step}
          playing={playing}
        />
      );

    case "solar-system":
      return (
        <SolarSystem
          step={step}
          playing={playing}
        />
      );

    case "waves":
      return (
        <WaveMotion
          step={step}
          playing={playing}
        />
      );


    /* =========================
       CHEMISTRY
    ========================= */

    case "atom":
      return (
        <AtomicStructure
          step={step}
          playing={playing}
        />
      );

    case "bonding":
      return (
        <ChemicalBonding
          step={step}
          playing={playing}
        />
      );

    case "acid-base":
      return (
        <AcidBase
          step={step}
          playing={playing}
        />
      );

    case "reaction":
      return (
        <ChemicalReaction
          step={step}
          playing={playing}
        />
      );

    case "states":
      return (
        <StatesOfMatter
          step={step}
          playing={playing}
        />
      );


    /* =========================
       GEOGRAPHY
    ========================= */

    case "water-cycle":
      return (
        <WaterCycle
          step={step}
          playing={playing}
        />
      );

    case "rock-cycle":
      return (
        <RockCycle
          step={step}
          playing={playing}
        />
      );

    case "volcano":
      return (
        <Volcano
          step={step}
          playing={playing}
        />
      );

    case "earth-layers":
      return (
        <EarthLayers
          step={step}
          playing={playing}
        />
      );

    case "tectonics":
      return (
        <PlateTectonics
          step={step}
          playing={playing}
        />
      );


    /* =========================
       COMPUTER SCIENCE
    ========================= */

    case "binary-search":
      return (
        <BinarySearch
          step={step}
          playing={playing}
        />
      );

    case "sorting":
      return (
        <Sorting
          step={step}
          playing={playing}
        />
      );

    case "stack-queue":
      return (
        <StackQueue
          step={step}
          playing={playing}
        />
      );

    case "cpu-memory":
      return (
        <CpuMemory
          step={step}
          playing={playing}
        />
      );

    case "network":
      return (
        <ComputerNetwork
          step={step}
          playing={playing}
        />
      );


    /* =========================
       FALLBACK
    ========================= */

    default:
      return (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2>Visualization not available</h2>

          <p>
            Visualization type:
            {" "}
            <strong>{type || "unknown"}</strong>
          </p>
        </div>
      );
  }
}