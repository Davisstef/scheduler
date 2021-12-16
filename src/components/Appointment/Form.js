import React, {useState} from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList"

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

   // Clears the student name and interviewer selection 
  const reset = function(){
  setName("");
  setInterviewer(null);
  };

  // Resets form after user clicks cancel. Form goes to previous appointment visual mode.
  const cancel = function(){
    reset();
    props.onCancel();
  };

  const save = () => {
    props.onSave(name, interviewer);
  };

  // Validates that user entered a name into form after clicking save, and calls the function to book interview.
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

      setError("");
      props.onSave(name, interviewer);
  };



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