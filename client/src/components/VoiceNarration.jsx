import { useEffect, useRef, useState } from "react";

/* =========================================================
   INTRODUCTION NARRATION FOR EACH TOPIC
   ========================================================= */

const introductions = {
  photosynthesis:
    "Welcome to Photosynthesis. In this lesson, we will understand how green plants use sunlight, water, and carbon dioxide to make glucose and release oxygen. Follow the animation step by step to see how this important process happens.",

  "human-heart":
    "Welcome to the Human Heart lesson. We will follow the journey of blood through the chambers of the heart. You will see how deoxygenated blood travels to the lungs, becomes oxygenated, and is then pumped to the rest of the body.",

  cell:
    "Welcome to Cell Structure. A cell contains several specialized structures called organelles. In this lesson, we will explore the major parts of a cell and understand how they work together to keep the cell functioning.",

  digestion:
    "Welcome to the Digestive System lesson. We will follow the journey of food through the digestive tract. You will see how food is broken down, how nutrients are absorbed, and how waste is eventually eliminated.",

  dna:
    "Welcome to DNA Replication. DNA contains the genetic information needed by living organisms. In this lesson, we will see how the DNA molecule unwinds, its strands separate, and new complementary strands are created.",

  newton:
    "Welcome to Newton's Laws of Motion. In this lesson, we will understand how forces affect the motion of objects. We will explore inertia, force and acceleration, and action and reaction through animation.",

  projectile:
    "Welcome to Projectile Motion. We will see how an object moves when it is launched into the air. The animation will show how launch angle, velocity, gravity, and time affect its trajectory.",

  electricity:
    "Welcome to Electric Circuits. In this lesson, we will see how electrical current flows through a circuit. We will explore the relationship between the battery, wires, components, and the moving electric charge.",

  "solar-system":
    "Welcome to the Solar System. In this lesson, we will explore how planets move around the Sun. The animation will help you understand planetary orbits and the role of the Sun's gravity.",

  waves:
    "Welcome to Wave Motion. We will explore how waves transfer energy while particles oscillate around their equilibrium positions. You will see amplitude, wavelength, frequency, and period in action.",

  atom:
    "Welcome to Atomic Structure. In this lesson, we will explore the basic structure of an atom. You will see the nucleus containing protons and neutrons, along with electrons moving around the nucleus.",

  bonding:
    "Welcome to Chemical Bonding. Atoms form bonds to become more stable. In this lesson, we will see how atoms can transfer or share electrons to form ionic and covalent bonds.",

  "acid-base":
    "Welcome to Acids and Bases. We will explore how acids and bases behave in water. The animation will show hydrogen ions, hydroxide ions, their interaction, and how this relates to the pH scale.",

  reaction:
    "Welcome to Chemical Reactions. In this lesson, we will see how reactants interact, bonds break and atoms rearrange to form new substances called products.",

  states:
    "Welcome to States of Matter. Matter can exist as a solid, liquid, or gas. In this lesson, we will see how particle movement and energy change as matter moves between these states.",

  "water-cycle":
    "Welcome to the Water Cycle. Water continuously moves between Earth's surface and the atmosphere. We will follow evaporation, condensation, precipitation, collection, and runoff through the animation.",

  "rock-cycle":
    "Welcome to the Rock Cycle. Rocks are continuously transformed by geological processes. In this lesson, we will see how cooling, weathering, pressure, heat, and melting create different types of rock.",

  volcano:
    "Welcome to the Volcano lesson. We will see how magma moves upward, pressure builds inside the Earth, and an eruption releases lava, ash, and gases onto the surface.",

  "earth-layers":
    "Welcome to Earth's Layers. Our planet has several major internal layers. In this lesson, we will explore the crust, mantle, outer core, and inner core and understand their different properties.",

  tectonics:
    "Welcome to Plate Tectonics. Earth's outer shell is divided into moving plates. In this lesson, we will see how plate movement can cause collisions, subduction, earthquakes, and mountain formation.",

  "binary-search":
    "Welcome to Binary Search. This algorithm efficiently searches a sorted collection by repeatedly dividing the search space in half. The animation will show how each comparison eliminates part of the search space.",

  sorting:
    "Welcome to Sorting Algorithms. Sorting arranges data into a particular order. In this visualization, we will see how elements are compared and swapped until the entire collection becomes sorted.",

  "stack-queue":
    "Welcome to Stack and Queue. These are two important data structures. A stack follows last in, first out, while a queue follows first in, first out. The animation will demonstrate both behaviors.",

  "cpu-memory":
    "Welcome to CPU and Memory. A computer continuously moves instructions and data between memory and the processor. In this lesson, we will follow an instruction from memory through the CPU and back to memory.",

  network:
    "Welcome to Computer Networks. Computers communicate by sending data in packets. In this lesson, we will follow a packet as it travels from one computer through a router to another computer.",
};


/* =========================================================
   VOICE COMPONENT
   ========================================================= */

function VoiceNarration({
  lesson,
  step,
  playing,
  setPlaying,
}) {
  const [enabled, setEnabled] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [introPlayed, setIntroPlayed] = useState(false);

  const lastStep = useRef(-1);

  const topicKey = lesson?.visualization?.type;

  const getIntroduction = () => {
    return (
      introductions[topicKey] ||
      `Welcome to ${lesson?.title}. ${lesson?.description || ""}`
    );
  };

  const getStepNarration = () => {
    const currentStep = lesson?.steps?.[step];

    if (!currentStep) return "";

    let text = `${currentStep.title}. ${currentStep.description}`;

    if (currentStep.formula) {
      text += ` The formula is ${currentStep.formula}.`;
    }

    return text;
  };

  const speakText = (text, onComplete) => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.88;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => {
      setSpeaking(true);
    };

    speech.onend = () => {
      setSpeaking(false);

      if (onComplete) {
        onComplete();
      }
    };

    speech.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };


  /* =====================================================
     START LESSON
     ===================================================== */

  const startLesson = () => {
    setEnabled(true);
    setIntroPlayed(false);
    lastStep.current = -1;

    /*
     * Keep animation paused while the introduction
     * is being spoken.
     */
    setPlaying(false);

    speakText(getIntroduction(), () => {
      setIntroPlayed(true);

      /*
       * Start the animation after introduction.
       */
      setPlaying(true);
    });
  };


  /* =====================================================
     STEP NARRATION
     ===================================================== */

  useEffect(() => {
    if (!enabled) return;

    /*
     * Don't speak steps before introduction finishes.
     */
    if (!introPlayed) return;

    /*
     * If user manually pauses animation,
     * don't start another narration.
     */
    if (!playing) return;

    if (lastStep.current === step) return;

    lastStep.current = step;

    const timer = setTimeout(() => {
      speakText(getStepNarration());
    }, 300);

    return () => clearTimeout(timer);
  }, [step, playing, enabled, introPlayed]);


  /* =====================================================
     STOP SPEECH WHEN LEAVING PAGE
     ===================================================== */

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);


  /* =====================================================
     TURN VOICE OFF
     ===================================================== */

  const stopVoice = () => {
    window.speechSynthesis.cancel();

    setSpeaking(false);
    setEnabled(false);
    setIntroPlayed(false);

    setPlaying(false);

    lastStep.current = -1;
  };


  /* =====================================================
     REPLAY CURRENT STEP
     ===================================================== */

  const replay = () => {
    speakText(getStepNarration());
  };


  /* =====================================================
     UI
     ===================================================== */

  return (
    <div className="voice-narration">

      {!enabled ? (
        <button
          className="voice-main-btn"
          onClick={startLesson}
        >
          <span className="voice-icon">🎙️</span>

          <span>Start Lesson with Voice</span>
        </button>
      ) : (
        <>
          <button
            className="voice-main-btn voice-active"
            onClick={stopVoice}
          >
            <span className="voice-icon">🔊</span>

            <span>Voice On</span>
          </button>

          <button
            className="voice-replay-btn"
            onClick={replay}
            title="Replay explanation"
          >
            ↻
          </button>
        </>
      )}

      {speaking && (
        <div className="voice-speaking">
          <span className="voice-dot"></span>
          Speaking...
        </div>
      )}

    </div>
  );
}

export default VoiceNarration;