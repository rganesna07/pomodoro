// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { Button } from 'react-bootstrap';

function App() {
  const [isRunning, setRunning]= useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  return (
    <div className= 'container'>
      <div>
        <h1 className= 'pomodoroTitle'> Pomodoro Timer</h1>
      </div>
      <div className= 'pictureArea'>
        
      </div>
      <div className= 'timerArea'>
        <h2 className='timerDisplay'> 25:00</h2>
      </div>
     <div className='Buttons'>
      <button className='Start'>Start</button>
      <button className='Reset'>Reset</button>
      <button className='Pause'>Pause</button>

     </div>
    </div>
  );
}

export default App;
