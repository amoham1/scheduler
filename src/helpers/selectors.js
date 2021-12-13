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
    result.push(state.appointments[String(val)]);
  }
  return result;
}

export function getInterview(state, interview){
  if(interview){
    let result = {"student": interview.student, "interviewer": state.interview[interview.interviewer]};
    return result
  }else {
    return null;
  }
}
// interview: { student: "Archie Cohen", interviewer: 2 }
// {  
//   "student": "Archie Cohen",
//   "interviewer": {  
//     "id": 2,
//     "name": "Tori Malcolm",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }