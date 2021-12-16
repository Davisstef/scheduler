import React, {useState} from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList"

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  // Clears the student name and interviewer selection. 
  const reset = function(){
  setName("");
  setInterviewer(null);
  };
  // Resets the form on cancel.
  const cancel = function(){
    reset();
    props.onCancel();
  };
  //Saves the interview to the schedule
  const save = () => {
    props.onSave(name, interviewer);
  };
  // Checks if the user entered the information and then calls the save prop.
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
      setError("");
      props.onSave(name, interviewer);
  };
  //Contains the form for booking an appointment, and prevents a default error.
  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form onSubmit={event=> event.preventDefault()} autoComplete="off">
        <input
        className="appointment__create-input text--semi-bold"
        name= "name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={event => setName(event.target.value)}
        data-testid="student-name-input"
        />
      </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      interviewers={props.interviewers} 
      value={interviewer} 
      onChange={setInterviewer} 
      onSave={save} 
    />
  </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
  )
};