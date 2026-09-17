import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import "./style/Blog.css";

const meta = [
  { date: "AUG 15, 2024", title: "5 Essential Tips for Better Portrait Photography" },
  { date: "AUG 10, 2024", title: "How to Capture Emotional Moments Naturally" },
  { date: "AUG 05, 2024", title: "The Art of Playing with Natural Light" },
];

function Blog() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://arulnode.onrender.com/api/arul/blog")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load blog posts");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="blog-section">
      <Reveal direction="up" className="blog-heading">
        <div>
          <p className="eyebrow">From the Blog</p>
          <h2>Tips, Stories & Inspiration</h2>
          <p className="desc">
            Explore our latest articles on photography tips, behind-the-scenes
            stories and more.
          </p>
        </div>
        <button className="btn-ghost-dark">View All Blogs →</button>
      </Reveal>

      {error && <p className="blog-error">{error}</p>}

      <div className="blog-grid">
        {posts.map((post, i) => (
          <Reveal
            key={post.id}
            direction="up"
            delay={i * 110}
            className="blog-card"
          >
            <div className="blog-card-media">
              <img src={post.img} alt={meta[i]?.title || "Blog post"} />
            </div>
            <div className="blog-card-body">
              <span className="blog-date">{meta[i]?.date}</span>
              <h4>{meta[i]?.title || `Post ${post.id}`}</h4>
              <span className="blog-read">Read more →</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Blog;