import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  return (
    <>
      <section id="center">
        <div>
          <h1>title</h1>
          <p>text</p>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Documentation</h2>
          <p>
            Your questions, answered Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Odio, molestias amet! Itaque placeat quo tenetur
            non at blanditiis quos iure hic dolorum quaerat! Non dolore, id
            blanditiis dolor sequi tempore.
          </p>
        </div>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
