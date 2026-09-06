import TopicCard from "./TopicCard";

function SubjectCard({ subject, topics = [] }) {
  if (!subject) {
    return null;
  }

  return (
    <div className="subject-card">
      <div className="subject-header">
        <div className="subject-icon">
          {subject.icon || "📚"}
        </div>

        <div>
          <h2>{subject.name || subject.title}</h2>

          {subject.description && (
            <p>{subject.description}</p>
          )}
        </div>
      </div>

      <div className="topics-grid">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
          />
        ))}
      </div>
    </div>
  );
}

export default SubjectCard;