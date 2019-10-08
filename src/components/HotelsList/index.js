import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "debounce";
import axios from "axios";

import getHotelsData from "../../mocks/hotelsDataMock";
import mockAPIRequest from "../../mocks/apiMock";
import { Spin } from "antd";

import styles from "./list.module.scss";

const getHotelsEndpoint = process.env.REACT_APP_API_GET_HOTELS;
const hotelsMockData = getHotelsData();
mockAPIRequest(getHotelsEndpoint, hotelsMockData);

class HotelsList extends Component {
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
    window.addEventListener("scroll", debounce(this.onDocumentScroll, 100));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", debounce(this.onDocumentScroll, 100));
  }

  componentDidUpdate(prevProps) {
    this.props.filter !== prevProps.filter &&
      this.setState(
        {
          nextHotelIndex: 0,
          total: 0
        },
        () => this.getHotelsData()
      );
  }

  getHotelsData = () => {
    this.setState({ isFetching: true }, () => {
      axios
        .get(getHotelsEndpoint, {
          params: {
            start: this.state.nextHotelIndex,
            size: 10,
            filter: this.props.filter
          }
        })
        .then(response => response.status === 200 && response.data)
        .catch(err => this.setState({ isFetching: false }))
        .then(data =>
          this.setState(
            prevState => ({
              hotels:
                prevState.nextHotelIndex === 0
                  ? data.hotels
                  : [...prevState.hotels, ...data.hotels],
              nextHotelIndex: data.nextHotelIndex,
              isFetching: false,
              total: data.total
            }),
            () => {
              this.props.onChange(this.state.hotels);
            }
          )
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
      !!this.state.total && (
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

HotelsList.defaultProps = {
  filter: ""
};

HotelsList.propTypes = {
  onChange: PropTypes.func,
  filter: PropTypes.string
};

export default HotelsList;
