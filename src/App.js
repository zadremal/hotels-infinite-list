import React from "react";
import styles from "./app.module.scss";

import { Container } from "@material-ui/core";

import List from "./components/List";
const App = () => {
  const hotels = [
    {
      id: "1",
      name: "test hotel",
      region: "saint-petersburg",
      price: "220"
    },
    {
      id: "2",
      name: "super hotel",
      region: "saint-petersburg",
      price: "230"
    }
  ];

  return (
    <div>
      <Container>
        <h2 className={styles.mainHeading}> Demo list container </h2>
      </Container>
      <Container>
        <List hotels={hotels} />
      </Container>
    </div>
  );
};

export default App;
