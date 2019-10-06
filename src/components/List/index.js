import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import faker from "faker";
import { Grid } from "@material-ui/core";

import styles from "./list.module.scss";

const getHotelsEndpoint = process.env.REACT_APP_API_GET_HOTELS;
const mock = new MockAdapter(axios);

const cities = [
  "Moscow",
  "Saint-Petersburg",
  "NewYork",
  "Sydney",
  "San-Francisco",
  "Berlin",
  "Paris"
];

const getRegion = () => {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
};

const getFakeData = () => {
  let data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      id: faker.random.number(),
      name: faker.company.companyName(),
      region: getRegion(),
      price: faker.commerce.price()
    });
  }
  return data;
};

mock.onGet(getHotelsEndpoint).reply(
  200,
  JSON.stringify({
    hotels: getFakeData()
  })
);

class List extends Component {
  state = {
    hotels: ""
  };

  renderListElement = element => (
    <Grid className={styles.listElement} key={element} item xs={3}>
      {element}
    </Grid>
  );

  componentDidMount() {
    axios
      .get(getHotelsEndpoint)
      .then(response => response.status === 200 && response.data)
      .then(data => this.setState({ hotels: data.hotels }));
  }

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
        {Object.keys(this.state.hotels && this.state.hotels[0]).map(title => {
          return this.renderListElement(title);
        })}
      </Grid>
    );
  };

  renderHotels = () => {
    return (
      this.state.hotels &&
      this.state.hotels.map(hotel => {
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
      })
    );
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
