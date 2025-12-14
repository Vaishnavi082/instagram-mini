import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  // Creating a  Post states
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  //Fetching Feed
  useEffect(() => {
    const fetchFeed = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please login first");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/feed", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setPosts(data);
        } else {
          setMessage(data.message || "Failed to load the creative feed");
        }
      } catch {
        setMessage("Server error,ugh");
      }
    };

    fetchFeed();
  }, []);

  //Create Post handler
  const handleCreatePost = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          imageUrl,
          caption,
        }),
      });

      if (res.ok) {
        setImageUrl("");
        setCaption("");
        window.location.reload(); // simple + acceptable for mini project
      } else {
        alert("Failed to create post");
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    
  <div className="page">
    <div className="container">


      <h2>Home Feed</h2>

      {/* Post UI */}
      <form onSubmit={handleCreatePost} style={{ marginBottom: "20px" }}>
        <h3>Create Post</h3>

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <br /><br />

        <button type="submit">Post</button>
      </form>

      {message && <p>{message}</p>}

      {/* Feed */}
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>{post.author.username}</strong>
          </p>

          <img
            src={post.imageUrl}
            alt="post"
            style={{ width: "300px" }}
          />

          <p>{post.caption}</p>

          <p>❤️ Likes: {post.likes.length}</p>

          <button
            onClick={async () => {
              const token = localStorage.getItem("token");

              await fetch(
                `http://localhost:5000/posts/${post._id}/like`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              window.location.reload();
            }}
          >
            Like
          </button>

          <p>💬 Comments: {post.comments.length}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
