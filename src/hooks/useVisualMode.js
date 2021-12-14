import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    console.log(newMode)
    setMode(newMode);
    if (replace) {
      setHistory(prev => {
        return [...prev.slice(0, prev.length - 1), newMode]
      });
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }

  function back() {
    if (history.length <= 1) return
    setMode(history[history.length - 2]);
    setHistory(prev => {
      return prev.slice(0, prev.length - 1)
    });
  }

  return { mode, transition, back };
}
