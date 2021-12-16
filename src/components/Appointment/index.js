import React from 'react';
import "./styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <header>
        {props.time}
        {props.interview ? (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
          />
        ) : (
          <Empty onAdd={props.onAdd} />
        )}
      </header>
    </article>
  );
}