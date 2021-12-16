import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  return (
    <section className="interviewers" onClick={()=>props.setInterviewer}>
    <h4 className="interviewers__header text--light">{props.name}</h4>
    <ul className="interviewers__list">
    {props.interviewers.map(interviewer => 
        <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}    
      />
        )}</ul>
  </section>
  )
};