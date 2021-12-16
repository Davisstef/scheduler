import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props){

  return(
    <ul>
      <DayListItem 
        key={props.days[0].id}
        name={props.days[0].name} 
        spots={props.days[0].spots} 
        selected={props.days[0].name === props.value}
        setDay={props.onChange}  
      />
      <DayListItem
        key={props.days[1].id} 
        name={props.days[1].name} 
        spots={props.days[1].spots} 
        selected={props.days[1].name === props.value}
        setDay={props.onChange}  
      />
      <DayListItem 
        key={props.days[2].id}
        name={props.days[2].name}
        spots={props.days[2].spots} 
        selected={props.days[2].name === props.value}
        setDay={props.onChange}  
      />      
    </ul>
  )
}