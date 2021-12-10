import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {

  const result = props.days.map((day) => {
    return <DayListItem
      keys={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}  
    />
  });
  return (
    <ul>
      {result}
    </ul>
  )

}