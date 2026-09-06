import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";
import TopicCard from "../components/TopicCard";

import { subjects, topics } from "../data/topics";

function Explore() {
  const [params] = useSearchParams();

  const initialSubject = params.get("subject") || "all";
  const [active, setActive] = useState(initialSubject);

  const groups =
    active === "all"
      ? subjects
      : subjects.filter((subject) => subject.id === active);

  // Handles both:
  // computerScience
  // computer-science
  const getTopics = (subjectId) => {
    if (topics[subjectId]) {
      return topics[subjectId];
    }

    const camelCaseKey = subjectId.replace(
      /-([a-z])/g,
      (_, letter) => letter.toUpperCase()
    );

    return topics[camelCaseKey] || [];
  };

  return (
    <>
      <Navbar />

      <main className="explore-page">

        {/* HEADER */}
        <section className="explore-header">

          <div className="explore-eyebrow">
            LEARNING LIBRARY
          </div>

          <h1>
            Explore visualizations
          </h1>

          <p>
            25 interactive concepts across five subjects.
          </p>

        </section>


        {/* FILTERS */}
        <div className="subject-filters">

          <button
            className={`subject-filter ${
              active === "all" ? "active" : ""
            }`}
            onClick={() => setActive("all")}
          >
            All
          </button>

          {subjects.map((subject) => (
            <button
              key={subject.id}
              className={`subject-filter ${
                active === subject.id ? "active" : ""
              }`}
              onClick={() => setActive(subject.id)}
            >
              <span>{subject.icon}</span>
              {subject.name}
            </button>
          ))}

        </div>


        {/* SUBJECTS */}
        {groups.map((subject) => {

          const subjectTopics = getTopics(subject.id);

          return (
            <section
              className="explore-subject"
              key={subject.id}
            >

              {/* SUBJECT HEADER */}
              <div className="explore-subject-header">

                <div className="explore-subject-icon">
                  {subject.icon}
                </div>

                <div>
                  <h2>{subject.name}</h2>

                  <p>
                    {subject.description}
                  </p>
                </div>

              </div>


              {/* TOPICS */}
              <div className="explore-topics-grid">

                {subjectTopics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                  />
                ))}

              </div>

            </section>
          );
        })}

      </main>
    </>
  );
}

export default Explore;