import { useState, useEffect } from "react";
import { ListGroup, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function ListOfPosts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/`);
        const data = await response.json();

        if (!data?.posts) {
          throw new Error(data?.message || "Unable to load posts.");
        }

        setPosts(data.posts);
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load posts.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Please provide both title and content.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/form/new_post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            content: content.trim(),
          }),
        },
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to create post.");
      }

      const createdPost = await response.json();
      setPosts((prevPosts) => [createdPost, ...prevPosts]);
      setTitle("");
      setContent("");
      setMessage("Post created successfully.");
    } catch (submitError) {
      setError(submitError.message || "Unable to create post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Create a new post</Card.Title>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <Form.Group className="mb-3" controlId="postTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="postContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Creating..." : "Create post"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <section>
        <h2 className="mb-3">Posts</h2>
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <ListGroup>
            {posts.map((post) => (
              <ListGroup.Item
                key={post._id}
                action
                as={Link}
                to={`/post/${post._id}`}
              >
                {post.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </section>
    </div>
  );
}

export default ListOfPosts;
