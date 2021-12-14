function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let result = [];
  let appointmentsArray = []
  for (const obj of state.days) {
    if (obj.name === day) {
      appointmentsArray = obj.appointments;
    }
  }

  for (const val of appointmentsArray) {
    result.push(state.appointments[val]);
  }
  return result;
}

export function getInterview(state, interview) {
  if (interview) {
    let result = { "student": interview.student, "interviewer": state.interview[interview.interviewer] };
    return result
  } else {
    return null;
  }
}

export function getInterviewsForDay(state, day) {
  let result = [];
  let interviewersArray = []
  for (const obj of state.days) {
    if (obj.name === day) {
      interviewersArray = obj.interviewers;
    }
  }
  for (const val of interviewersArray) {
    result.push(state.interview[val]);
  }
  return result;
}
