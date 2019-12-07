import React from "react";
import { Spin } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./fetchingIndicator.module.scss";

const FetchingIndicator = ({ show, className }) => {
  return show ? (
    <div className={classNames(styles.fetchingIndicator, className)}>
      <Spin />
    </div>
  ) : null;
};

FetchingIndicator.defaultProps = {
  className: ""
};

FetchingIndicator.propTypes = {
  show: PropTypes.bool.isRequired,
  className: PropTypes.string
};

export default FetchingIndicator;
