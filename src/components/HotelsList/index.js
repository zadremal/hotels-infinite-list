import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import getHotelsData from "../../mocks/hotelsDataMock";
import mockAPIRequest from "../../mocks/apiMock";
import styles from "./list.module.scss";
import { Spin } from "antd";

const getHotelsEndpoint = process.env.REACT_APP_API_GET_HOTELS;
const hotelsMockData = getHotelsData();
mockAPIRequest(getHotelsEndpoint, hotelsMockData);

class List extends Component {
  state = {
    hotels: [],
    isFetching: false,
    nextHotelIndex: 0,
    total: null
  };

  renderListElement = element => (
    <div className={styles.listElement} key={element}>
      {element}
    </div>
  );

  componentDidMount() {
    this.getHotelsData();
    window.addEventListener("scroll", () => this.onDocumentScroll());
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () => this.onDocumentScroll());
  }

  getHotelsData = () => {
    this.setState({ isFetching: true }, () => {
      axios
        .get(getHotelsEndpoint, {
          params: { start: this.state.nextHotelIndex, size: 10 }
        })
        .then(response => response.status === 200 && response.data)
        .catch(err => this.setState({ isFetching: false }))
        .then(data =>
          this.setState(prevState => ({
            hotels: [...prevState.hotels, ...data.hotels],
            nextHotelIndex: data.nextHotelIndex,
            isFetching: false,
            total: data.total
          }))
        );
    });
  };

  onDocumentScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.scrollHeight
    ) {
      this.state.nextHotelIndex !== null &&
        !this.state.isFetching &&
        this.getHotelsData();
    }
  };

  renderFetchingIndicator = () => {
    return (
      this.state.isFetching && (
        <div className={styles.fetchingIndicator}>
          <Spin />
        </div>
      )
    );
  };

  renderFetchedAmount = () => {
    return (
      this.state.total && (
        <div className={styles.totalAmount}>
          show: {this.state.hotels.length} / {this.state.total}
        </div>
      )
    );
  };

  renderListHeader = () => {
    return (
      <div className={styles.header}>
        {Object.keys(
          this.state.hotels &&
            !!this.state.hotels.length &&
            this.state.hotels[0]
        ).map(title => {
          return this.renderListElement(title);
        })}
      </div>
    );
  };

  renderHotels = () => {
    return (
      this.state.hotels &&
      !!this.state.hotels.length &&
      this.state.hotels.map(hotel => {
        return (
          <div className={styles.hotel} spacing={0} key={hotel.id}>
            {Object.values(hotel).map(hotelInfo => {
              return this.renderListElement(hotelInfo);
            })}
          </div>
        );
      })
    );
  };

  render() {
    return (
      <div>
        {this.renderListHeader()}
        {this.renderHotels()}
        {this.renderFetchedAmount()}
        {this.renderFetchingIndicator()}
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
