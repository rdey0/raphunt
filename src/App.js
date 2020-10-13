import React from "react";
import ReleaseFeed from "./components/ReleaseFeed";
import ContactForm from "./components/ContactForm";
import { getWeeklyTopReleases } from "./utils.js";
import "./App.css";

class App extends React.Component {
  state = { releases: {} };

  componentDidMount() {
    getWeeklyTopReleases(releases => {
      this.setState({ releases: releases });
      this.clearLoadingIndicator();
    });
  }

  clearLoadingIndicator = () => {
    const loading = document.getElementById("loading");
    if (loading) loading.remove();
  };

  render() {
    return (
      <div class>
        <div className="parallax-container"></div>
        <div className="App">
          <div className="tagline">
            BEST NEW RAP
            <br />
            EVERY DAY
          </div>
          
          <div className="wrapper">
            <div className="header">
                <h1>Rap Hunt</h1>
            </div>
            <div id="loading">
              <h2>Hunting…</h2>
            </div>
            <ReleaseFeed releases={this.state.releases} />
            <ContactForm />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
