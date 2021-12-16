import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() { 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers:{}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(state => ({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  // Adds an interview, updates db and state
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   
    let updateSpots = state.days;
    //Check to see if a new appointment is being made. If so the number of spots available decrease for that day.
    if (!state.appointments[id].interview) {
      updateSpots = state.days.map((day) => {
        if (day.appointments.includes(id)){
          day.spots --;
          return day;
        } else {
          return day;
        }
      })
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(response => setState(state => ({ ...state, updateSpots, appointments})));
  };

  // Cancels an interview, updates db and state
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Updating days to increase the interview spots available on the day where the interview is being deleted
    const updateSpots= state.days.map((day) => {
      if (day.appointments.includes(id)){
        day.spots ++
        return day;
      } else{
        return day;
      }
    })
    return axios.delete(`/api/appointments/${id}`)
      .then(response => setState(state => ({ ...state, updateSpots, appointments})));
  };

  return { state, setDay, bookInterview,cancelInterview }
};