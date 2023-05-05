import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [timers, setTimers] = useState([]);
  const [seconds, setSeconds] = useState('');

  const handleSecondsChange = (event) => {
    setSeconds(event.target.value);
  };

  const handleNewTimerSubmit = (event) => {
    event.preventDefault();
    if (!seconds) return;
    const timer = {
      createdAt: new Date().toLocaleString(),
      remainingTime: seconds,
    };
    setTimers([...timers, timer]);
    setSeconds('');
  };

  const handleDeleteTimer = (index) => {
    setTimers(timers.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((timers) =>
        timers.map((timer) => {
        
        const remainingTime =  Math.max(timer.remainingTime - 0.01, 0).toFixed(2);
        if (remainingTime === '0.00') {
          return null;
        }
        return {
          ...timer,
          remainingTime,
        };
      }).filter(Boolean)
    );
  }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container'>
    <div className="App">
      <div className="Timers">
        {timers.map((timer, index) => (
          <div key={index} className="Timer">
            <div className="TimerRemainingTime">{timer.remainingTime}</div>
            <button className = "CloseIcon" onClick={() => handleDeleteTimer(index)}> X </button>
            <div className="TimerCreatedAt">{timer.createdAt}</div>
          </div>
        ))}
      </div>
      <div className="NewTimerForm">
        <h3>New Timer</h3>
        <form onSubmit={handleNewTimerSubmit}>
          <input
          className='formControl'
            type="number"
            value={seconds}
            onChange={handleSecondsChange}
            
          />
          <br/>
          <br/>
          <button className='addButton' type="submit">Add</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default App;
