import { Routes, Route, Link, useParams } from "react-router-dom";
import ListOfPosts from "./components/ListOFPosts/ListOfPosts";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListOfPosts />} />
        <Route path="post/:postID" element={<PostDetails />} />
      </Routes>
    </div>
  );
}

export default App;
