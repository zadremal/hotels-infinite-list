import React from "react";
import PropTypes from "prop-types";

import styles from "./fetchingCounter.module.scss";

const FetchingCounter = ({ fetched, totalCount }) => {
  return totalCount ? (
    <div className={styles.totalHotelsCount}>
      show: {fetched} / {totalCount}
    </div>
  ) : null;
};

FetchingCounter.defaultProps = {
  fetched: 0,
  totalCount: 0
};

FetchingCounter.propTypes = {
  fetched: PropTypes.number,
  totalCount: PropTypes.number
};

export default FetchingCounter;
