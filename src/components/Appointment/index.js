import React from "react";
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETING = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDITING = "EDITING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_MISSING = "ERROR_MISSING";

const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY );

function save(name, interviewer) {
  transition(SAVING);
  const interview = {
    student: name,
    interviewer
  };
  if(!interview.interviewer || !interview.student){
    transition(ERROR_MISSING, true)
  }else{
  props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  }
}
function deleteInterview() {
  transition(DELETING);
  props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
} 

return (
  <article className="appointment">
    <Header time={ props.time } />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && <Show student={ props.interview.student } interviewer={ props.interview.interviewer } onDelete={()=>transition(CONFIRM)} onEdit={()=>transition(EDITING)}/>}    
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={ back } onSave={ save }/>}
    {mode === CONFIRM && <Confirm message= 'Are you sure you would like to delete?' onCancel={back} onConfirm={deleteInterview} />}
    {mode === EDITING && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => transition(SHOW)} onSave={save} />}
    {mode === ERROR_DELETE && <Error message= 'There was an error deleting your appointment. Please try again later.' onClose={() => back()}/>}
    {mode === ERROR_SAVE && <Error message= 'There was an error saving your appointment. Please try again later.' onClose={() => back()}/>}
    {mode === ERROR_MISSING && <Error message= 'Please enter your name and select an interviewer' onClose={() => back()}/>}
    {mode === SAVING && <Status message= 'Saving'/>}
    {mode === DELETING && <Status message= 'Deleting' />}
    

  </article>
)
};