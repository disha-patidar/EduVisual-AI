import Navbar from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";
import { topics } from "../data/topics";

function Home() {
  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <h1>
          Learn Anything
          <br />
          <span>Visually.</span>
        </h1>

        <p>
          Turn complex educational concepts into interactive
          visual experiences.
        </p>
      </section>

      {/* SUBJECTS */}
      <section id="subjects" className="subjects-section">
        <h2>Explore Subjects</h2>

        {/* BIOLOGY */}
        <SubjectCard
          subject={{
            id: "biology",
            name: "Biology",
            icon: "🧬",
            description: "Explore life and living systems.",
          }}
          topics={topics.biology}
        />

        {/* PHYSICS */}
        <SubjectCard
          subject={{
            id: "physics",
            name: "Physics",
            icon: "⚡",
            description: "Understand the laws of nature.",
          }}
          topics={topics.physics}
        />

        {/* CHEMISTRY */}
        <SubjectCard
          subject={{
            id: "chemistry",
            name: "Chemistry",
            icon: "🧪",
            description: "Explore matter and chemical reactions.",
          }}
          topics={topics.chemistry}
        />

        {/* GEOGRAPHY */}
        <SubjectCard
          subject={{
            id: "geography",
            name: "Geography",
            icon: "🌍",
            description: "Explore Earth and its systems.",
          }}
          topics={topics.geography}
        />

        {/* COMPUTER SCIENCE */}
        <SubjectCard
          subject={{
            id: "computer-science",
            name: "Computer Science",
            icon: "💻",
            description: "Understand computing concepts.",
          }}
          topics={topics.computerScience}
        />
      </section>
    </div>
  );
}

export default Home;