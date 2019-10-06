import React from "react";
import styles from "./app.module.scss";

import { Container } from "@material-ui/core";

import List from "./components/List";
const App = () => {
  return (
    <div>
      <Container>
        <h2 className={styles.mainHeading}> Demo list container </h2>
      </Container>
      <Container>
        <List />
      </Container>
    </div>
  );
};

export default App;
