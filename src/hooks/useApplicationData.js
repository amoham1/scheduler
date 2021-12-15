import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interview: {}
  });

  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {

      setState(prev => (
        {
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interview: all[2].data
        }
      ));
    })
  }, []);

  const updateSpots = function (state, appointments, id) {
    // console.log(state);
    // console.log(appointments);
    let i;
    const day = state.days.find((day, index) => {
      if (state.day === day.name) {
        i = index;
        return day
      }
    });
    console.log("THIS IS THE DAY OBJECT:", day)
    console.log("INDEX : ", i)
    let count = 0;
    for (let val of day.appointments) {
      if (appointments[val].interview === null) {
        count++;
      }
      console.log("this is the number of spots:", count);
    }
    const days = [...state.days];
    console.log("THIS IS THE DAYS ARRAY :", days)
    days[i] = { ...day, spots: count }
    console.log("THIS IS THE DAYS ARRAY AFTER UPDATE:", days)
    // return days array
    return days;
  };

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(data => {
        const spotUpdate = updateSpots(state,appointments)
        setState({
          ...state,
          days: spotUpdate,
          appointments
        })
      });
  }

  function cancelInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(data => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const spotUpdate = updateSpots(state,appointments)
        setState({
          ...state,
          days: spotUpdate,
          appointments
        });
      });
  }
  return { state, setDay, bookInterview, cancelInterview };
}