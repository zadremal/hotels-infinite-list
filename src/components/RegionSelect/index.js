import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

import "antd/dist/antd.css";
import styles from "./regionSelect.module.scss";

const { Option } = Select;

const RegionSelect = props => {
  return (
    <div>
      <Select
        allowClear
        showSearch
        className={styles.select}
        placeholder="Please select region"
        onChange={props.onChange}
      >
        {props.regions.map(value => {
          return (
            <Option value={value} key={value}>
              {value}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

RegionSelect.propTypes = {
  onChange: PropTypes.func,
  regions: PropTypes.arrayOf(PropTypes.string)
};

export default RegionSelect;
