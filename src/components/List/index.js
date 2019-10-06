import React, { Component } from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import styles from "./list.module.scss";

class List extends Component {
  renderListElement = element => (
    <Grid className={styles.listElement} key={element} item xs={3}>
      {element}
    </Grid>
  );

  renderHeader = () => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={styles.header}
        spacing={0}
      >
        {Object.keys(this.props.hotels[0]).map(title => {
          return this.renderListElement(title);
        })}
      </Grid>
    );
  };

  renderHotels = () => {
    return this.props.hotels.map(hotel => {
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={styles.hotel}
          spacing={0}
          key={hotel.id}
        >
          {Object.values(hotel).map(hotelInfo => {
            return this.renderListElement(hotelInfo);
          })}
        </Grid>
      );
    });
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderHotels()}
      </div>
    );
  }
}

List.propTypes = {
  onChange: PropTypes.func,
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      region: PropTypes.string,
      price: PropTypes.string
    })
  )
};

export default List;
