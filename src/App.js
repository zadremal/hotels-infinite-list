import React from "react";
import styles from "./app.module.scss";

import List from "./components/HotelsList";
import RegionSelect from "./components/RegionSelect";

const App = () => {
  return (
    <div className={styles.app}>
      <h2 className={styles.mainHeader}> Demo list container </h2>
      <div>
        <RegionSelect />
        <List />
      </div>
    </div>
  );
};

export default App;
