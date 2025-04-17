import React from "react";
import InputField from "../common/InputField";

const TaskFilters = ({ search, setSearch, filter, setFilter }) =>
  <div style={{ marginBottom: "1rem" }}>
    <InputField
      name="search"
      placeholder="Search tasks..."
      label="Search"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
    <InputField
      name="status"
      label="Work Status"
      type="select"
      value={filter}
      onChange={e => setFilter(e.target.value)}
      options={["All", "Pending", "Completed"]}
    />
  </div>;

export default TaskFilters;
