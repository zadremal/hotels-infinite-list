import React from "react";
import styles from "./app.module.scss";

import HotelsList from "./components/HotelsList";
import RegionSelect from "./components/RegionSelect";

class App extends React.Component {
  state = {
    regions: [],
    filter: ""
  };

  onHotelsUpdate = hotels => {
    const uniqueRegions = new Set(hotels.map(hotel => hotel.region));
    this.setState({
      regions: Array.from(uniqueRegions)
    });
  };

  onRegionChange = value => {
    this.setState({
      filter: value
    });
  };

  render() {
    return (
      <div className={styles.app}>
        <h2 className={styles.mainHeader}> Demo list container </h2>
        <div>
          <RegionSelect
            regions={this.state.regions}
            onChange={this.onRegionChange}
          />
          <HotelsList
            onChange={this.onHotelsUpdate}
            filter={this.state.filter}
          />
        </div>
      </div>
    );
  }
}

export default App;
