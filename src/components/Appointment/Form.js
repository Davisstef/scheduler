import React, { useState } from 'react';
import 'components/Appointment/styles.scss';
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [interviewer, setInterviewer ] = useState(props.interviewer || null);
  const [student, setStudent] = useState(props.student || "");
  const [error, setError] = useState("");
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }
  function reset() {
    setStudent("");
    setInterviewer(null);
  };
  function cancel() {
    reset();
    props.onCancel();
  }
  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        data-testid="student-name-input"
      />
      <section className="appointment__validation">{error}</section>
    </form>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={validate} confirm>Save</Button>
    </section>
  </section>
</main>
)}