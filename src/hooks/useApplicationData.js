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

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

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