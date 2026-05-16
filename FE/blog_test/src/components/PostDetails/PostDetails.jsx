import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Spinner, Alert, Button } from "react-bootstrap";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function PostDetails() {
  const { postID } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPost() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_BASE_URL}/posts/list`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to load post details (${response.status})`);
        }

        const data = await response.json();

        if (!data || !data.posts) {
          throw new Error("Invalid post data returned from server.");
        }

        const foundPost = data.posts.find(
          (item) => item._id === postID || String(item._id) === String(postID),
        );

        if (!foundPost) {
          setError("Post not found.");
          setPost(null);
        } else {
          setPost(foundPost);
        }
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Unable to load post details.");
          setPost(null);
        }
      } finally {
        setLoading(false);
      }
    }

    loadPost();

    return () => controller.abort();
  }, [postID]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <Alert variant="danger">{error}</Alert>
        <Button as={Link} to="/" variant="primary">
          Back to posts
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Button as={Link} to="/" variant="secondary" className="mb-4">
        Back to posts
      </Button>

      <Card>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            Post ID: {postID}
          </Card.Subtitle>
          <Card.Text>{post.content}</Card.Text>
          {post.comments && post.comments.length > 0 && (
            <Card.Text className="text-muted mt-3">
              Comments: {post.comments.length}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
