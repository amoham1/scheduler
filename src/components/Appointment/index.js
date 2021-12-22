import React from "react";

import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm"; 
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";  
  const ERROR_SAVE = "ERROR_SAVE";  
  const ERROR_DELETE = "ERROR_DELETE"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition("SAVING");
    props.bookInterview(props.id, interview)
      .then(() => {
        transition("SHOW");
      }).catch(()=>{
        transition("ERROR_SAVE",true)
      })
  }
  function deleting() {
    transition("DELETE", true)
    props.cancelInterview(props.id)
      .then(() => {
        transition("EMPTY");
      })
      .catch(()=>{
        transition("ERROR_DELETE",true)
      })
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === "CREATE" &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && <Error onClose={back} message={"Error Saving Please Try Again"}/>}
      {mode === ERROR_DELETE && <Error onClose={back} message={"Error Deleting Please Try Again"}/>}
      {mode === CONFIRM && <Confirm onConfirm={deleting} onCancel={back} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETE && <Status message={"Deleting"} />}
    </article>
  );
}
