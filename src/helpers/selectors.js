// Returns an array of objects for the current day.
export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(d => d.name === day);
  let appointments = [];
  if (filteredAppointments.length){
    appointments = filteredAppointments[0].appointments.map(x => state.appointments[x]);
  }
return appointments;
};

// Returns the interview object for the an appointment slot.
export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const interviewObj = { 
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
return interviewObj;
};

// Returns an array of objects similarly to the getAppointmentsForDay.
export function getInterviewersForDay(state, day) {
  const filteredAppointments = state.days.filter(d => d.name === day);
  let interviewers = [];
  if (filteredAppointments.length){
    interviewers = filteredAppointments[0].interviewers.map(x => state.interviewers[x]);
  }
return interviewers;
};

