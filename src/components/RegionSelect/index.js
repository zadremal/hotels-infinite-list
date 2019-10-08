import React, { Component } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import "antd/dist/antd.css";
import styles from "./regionSelect.module.scss";
const { Option } = Select;

const values = ["Saint-Petersburg", "Moscow", "Berlin", "Stockholm"];

export default class RegionSelect extends Component {
  static propTypes = {
    prop: PropTypes
  };

  onFilterChange = e => {};

  render() {
    return (
      <div>
        <Select
          className={styles.select}
          placeholder="Please select location"
          allowClear
          onChange={this.onFilterChange}
          showSearch
        >
          {values.map(value => {
            return (
              <Option value={value} key={value}>
                {value}
              </Option>
            );
          })}
        </Select>
      </div>
    );
  }
}
