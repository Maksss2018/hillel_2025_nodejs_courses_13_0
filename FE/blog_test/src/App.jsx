import { Routes, Route, Link, useParams } from "react-router-dom";
import ListOfPosts from "./components/ListOFPosts/ListOfPosts";
import "./App.css";

function Home() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>Blog Home</h1>
        <p>Select a post to view its details.</p>
      </header>
      <ListOfPosts />
    </div>
  );
}

function PostDetail() {
  const { postID } = useParams();

  return (
    <div className="container py-4">
      <nav className="mb-3">
        <Link to="/" className="btn btn-outline-primary btn-sm">
          Back to posts
        </Link>
      </nav>
      <h1>Post Detail</h1>
      <p>You are viewing post with ID: <strong>{postID}</strong></p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="post/:postID" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;
