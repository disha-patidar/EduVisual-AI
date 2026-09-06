import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function TopicCard({ topic }) {
  if (!topic) {
    return null;
  }

  return (
    <Link
      to={`/lesson?topic=${encodeURIComponent(topic.id)}`}
      className="explore-topic-card"
    >

      <div className="explore-topic-icon">
        {topic.icon || "📚"}
      </div>

      <div className="explore-topic-content">

        <h3>
          {topic.title || topic.name}
        </h3>

        <p>
          {topic.description ||
            "Explore this topic with an interactive visualization."}
        </p>

        <div className="explore-topic-link">
          <span>Explore visualization</span>
          <ArrowRight size={16} />
        </div>

      </div>

    </Link>
  );
}

export default TopicCard;