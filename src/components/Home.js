import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <React.Fragment>
    <div id="home">
      <section>
        <h1>Quiz Up!!!</h1>
        <div className="play-button-container">
          <Link className="play-button" to="/play">Play</Link>
        </div>
      </section>
    </div>
  </React.Fragment>
);

export default Home;