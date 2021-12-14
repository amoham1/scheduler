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
        setState({
          ...state,
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
        setState({
          ...state,
          appointments
        });
      });
  }
  return { state, setDay, bookInterview, cancelInterview };
}