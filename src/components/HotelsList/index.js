import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "debounce";
import axios from "axios";

import getHotelsMockData from "../../mocks/hotelsMockData";
import mockAPIRequest from "../../mocks/apiMock";
import { Spin } from "antd";

import styles from "./list.module.scss";

const getHotelsEndpoint = process.env.REACT_APP_API_GET_HOTELS;
const hotelsMockData = getHotelsMockData();
mockAPIRequest(getHotelsEndpoint, hotelsMockData);

class HotelsList extends Component {
  state = {
    hotelsList: [],
    isFetching: false,
    nextHotelIndex: 0,
    totalHotelsCount: null
  };

  componentDidMount() {
    this.updateHotelsList();
    window.addEventListener("scroll", debounce(this.onDocumentScroll, 100));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", debounce(this.onDocumentScroll, 100));
  }

  componentDidUpdate(prevProps) {
    this.props.filter !== prevProps.filter &&
      this.updateHotelsList([], this.props.filter, 0);
  }

  getHotelsData = async (start, filter, size = 10) => {
    const response = await axios.get(getHotelsEndpoint, {
      params: {
        start: start,
        filter: filter,
        size: size
      }
    });

    return response.data;
  };

  updateHotelsList = async (
    currentHotels = [],
    filter,
    lastFetchedIndex = 0
  ) => {
    const hotelsData = await this.getHotelsData(lastFetchedIndex, filter);

    const { hotels, nextHotelIndex, totalHotelsCount } = hotelsData;
    const hotelsList = [...currentHotels, ...hotels];
    this.setState({
      hotelsList: hotelsList,
      nextHotelIndex: nextHotelIndex,
      totalHotelsCount: totalHotelsCount
    });
    this.props.onChange(hotelsList);
  };

  onDocumentScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.scrollHeight
    ) {
      this.state.nextHotelIndex !== null &&
        this.updateHotelsList(
          this.state.hotelsList,
          this.props.filter,
          this.state.nextHotelIndex
        );
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
      !!this.state.totalHotelsCount && (
        <div className={styles.totalHotelsCount}>
          show: {this.state.hotelsList.length} / {this.state.totalHotelsCount}
        </div>
      )
    );
  };

  renderListHeader = () => {
    return (
      <div className={styles.header}>
        {Object.keys(this.state.hotelsList[0]).map(title => {
          return this.renderListElement(title);
        })}
      </div>
    );
  };

  renderListElement = element => (
    <div className={styles.listElement} key={element}>
      {element}
    </div>
  );

  renderHotels = () => {
    return this.state.hotelsList.map(hotel => {
      return (
        <div className={styles.hotel} key={hotel.id}>
          {Object.values(hotel).map(hotelInfo => {
            return this.renderListElement(hotelInfo);
          })}
        </div>
      );
    });
  };

  render() {
    return (
      this.state.hotelsList.length > 0 && (
        <div>
          {this.renderListHeader()}
          {this.renderHotels()}
          {this.renderFetchedAmount()}
          {this.renderFetchingIndicator()}
        </div>
      )
    );
  }
}

HotelsList.defaultProps = {
  filter: ""
};

HotelsList.propTypes = {
  onChange: PropTypes.func,
  filter: PropTypes.string
};

export default HotelsList;
