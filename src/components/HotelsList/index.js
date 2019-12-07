import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { debounce } from "debounce";
import axios from "axios";

import FetchingIndicator from "../FetchingIndicator";
import getHotelsMockData from "../../mocks/hotelsMockData";
import mockAPIRequest from "../../mocks/apiMock";

import styles from "./list.module.scss";

const getHotelsEndpoint = process.env.REACT_APP_API_GET_HOTELS;
const hotelsMockData = getHotelsMockData();
mockAPIRequest(getHotelsEndpoint, hotelsMockData);

class HotelsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      hotelsList: [],
      nextHotelIndex: 0,
      totalHotelsCount: null
    };
  }

  componentDidMount() {
    this.updateHotelsList();
    window.addEventListener("scroll", debounce(this.onDocumentScroll, 100));
  }

  componentDidUpdate(prevProps) {
    const { filter } = this.props;
    if (filter !== prevProps.filter) {
      this.updateHotelsList([], filter, 0);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", debounce(this.onDocumentScroll, 100));
  }

  getHotelsData = async (start, filter, size = 10) => {
    this.setState({ isFetching: true });
    let response = {};
    try {
      response = await axios.get(getHotelsEndpoint, {
        params: {
          start,
          filter,
          size
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ isFetching: false });
    }
    return response.data;
  };

  updateHotelsList = async (currentHotels = [], filter = "", lastFetchedIndex = 0) => {
    const { onChange } = this.props;
    const hotelsData = await this.getHotelsData(lastFetchedIndex, filter);

    const { hotels, nextHotelIndex, totalHotelsCount } = hotelsData;
    const hotelsList = [...currentHotels, ...hotels];
    this.setState({
      hotelsList,
      nextHotelIndex,
      totalHotelsCount
    });
    onChange(hotelsList);
  };

  onDocumentScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.scrollHeight
    ) {
      const { nextHotelIndex } = this.state;
      if (nextHotelIndex !== null) {
        const { filter } = this.props;
        const { hotelsList } = this.state;
        this.updateHotelsList(hotelsList, filter, nextHotelIndex);
      }
    }
  };

  renderFetchingIndicator = () => {
    const { isFetching } = this.state;
    return <FetchingIndicator className={styles.fetchingIndicator} show={isFetching} />;
  };

  renderFetchedAmount = () => {
    const { totalHotelsCount, hotelsList } = this.state;
    return (
      !!totalHotelsCount && (
        <div className={styles.totalHotelsCount}>
          <span>
            {hotelsList.length} / {totalHotelsCount}
          </span>
        </div>
      )
    );
  };

  renderListHeader = () => {
    const { hotelsList } = this.state;
    return (
      <div className={styles.header}>
        {Object.keys(hotelsList[0]).map(title => {
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
    const { hotelsList } = this.state;
    return hotelsList.map(hotel => {
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
    const { hotelsList } = this.state;
    return (
      <div className={styles.hotelsList}>
        {hotelsList.length > 0 && (
          <>
            {this.renderListHeader()}
            {this.renderHotels()}
            {this.renderFetchedAmount()}
          </>
        )}
        {this.renderFetchingIndicator()}
      </div>
    );
  }
}

HotelsList.defaultProps = {
  onChange: () => {},
  filter: ""
};

HotelsList.propTypes = {
  onChange: PropTypes.func,
  filter: PropTypes.string
};

export default HotelsList;
