import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    interviewer:    PropTypes.number,
    setInterviewer: PropTypes.func.isRequired
  };
 
  const interviewerList =
  (props.interviewers || []).map((interviewer, _index) =>
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={(_event) => props.onChange(interviewer.id)}
    />
  );

return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewerList}</ul>
  </section>
);
}