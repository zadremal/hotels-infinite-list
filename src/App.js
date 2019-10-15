import React from "react";
import styles from "./app.module.scss";

import HotelsList from "./components/HotelsList";
import RegionSelect from "./components/RegionSelect";

class App extends React.Component {
  state = {
    regions: [],
    filter: ""
  };

  onHotelsListChange = hotels => {
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
            filter={this.state.filter}
            onChange={this.onHotelsListChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
