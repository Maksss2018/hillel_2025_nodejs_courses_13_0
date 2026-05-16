import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Spinner, Alert, Button, ListGroup } from "react-bootstrap";

export default function PostDetails() {
  const { postID } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPost() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/post/${postID}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to load post (${response.status})`);
        }

        const data = await response.json();

        if (!data?.success || !data.post) {
          throw new Error(data?.message || "Invalid post response.");
        }

        setPost(data.post);
        setComments(data.comments || []);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Unable to load post details.");
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

  if (!post) {
    return (
      <div className="container py-5">
        <Alert variant="warning">Post not found.</Alert>
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

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Comments</Card.Title>
          {comments.length === 0 ? (
            <Alert variant="secondary">No comments yet.</Alert>
          ) : (
            <ListGroup as="ol" numbered>
              {comments.map((comment, index) => (
                <ListGroup.Item key={`${index}-comments-list`} as="li">
                  {comment.text}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
