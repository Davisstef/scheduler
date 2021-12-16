import React from "react";
import Button from "../Button"

//Sends a confirm message to delete an existing appointment.
export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
    <h1 className="text--semi-bold">Delete this appointment?</h1>
    <section className="appointment__actions">
      <Button onClick={props.onCancel} danger>Cancel</Button>
      <Button onClick={props.onConfirm} danger>Confirm</Button>
    </section>
  </main>
  )
};