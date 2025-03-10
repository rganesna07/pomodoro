// import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { Howl } from 'howler';

import clockMp3 from '../src/media/mixkit-sleepy-cat-135.mp3'
import bellMp3 from '../src/media/bell.mp3'

let clockLoop = new Howl({
  src: [clockMp3],
  loop: true
})

let bellSound = new Howl({
  src: [bellMp3],
})
function App() {
  const [isRunning, setRunning]= useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [onBreak, setOnBreak] = useState(false);
  const [workIntrvl, setWrk] = useState(0);
  const [breakIntrvl, setBrk] = useState(0);
  


  useEffect(() => {
    if (isRunning || onBreak){
    
      const interval = setInterval(()=> {
        
        if(seconds >0){
          setSeconds((seconds) => seconds -1)
        }

        if (seconds === 0){
          setMinutes((minutes) => minutes -1)
          setSeconds(59)
        }

        if (minutes === 0 && seconds === 0){
          
          setSeconds(0)
          setMinutes(0)
          clockLoop.stop()
          bellSound.play()        

          if (!onBreak){
            setMinutes(5)
            setOnBreak(true)
            setWrk((workIntrvl) => workIntrvl +1)
           
          }

          if (onBreak){
            setBrk((breakIntrvl) => breakIntrvl +1)
            setMinutes(25)
            setOnBreak(false) 
          }
        }

      }, 1000)
      return () => clearInterval(interval)
      
    }
  
  },[isRunning, minutes, seconds,workIntrvl,breakIntrvl])

  const decrease = () => {
    if (minutes > 0){
      setMinutes((minutes) => minutes-1)
    }
  }

  const increase = () => {
    if (minutes < 60){
    setMinutes((minutes) => minutes+1)
    }
  }

  const startTimer = () => {
    clockLoop.play()
    setRunning(true)
  }

  const PauseTimer = () => { 
    setRunning(false)
    clockLoop.stop()
  }

  const resetTimer = () => {
    clockLoop.stop()
    setRunning(false)
    setMinutes(25)
    setSeconds(0)

  }

  return (
    <div className= 'container'>
      <div>
        <h1 className= 'pomodoroTitle'> Pomodoro Timer</h1>
      </div>
      <div className= 'pictureArea'>
        
      </div>
      <div className= 'timerArea'>
        <h2 className='timerDisplay'> {minutes}:{seconds < 10 ? "0" +seconds: seconds}</h2>
        <div className= 'cntrlTimer'>
          <button className='cntrlBtn' onClick={increase}> + </button>
          <button className= 'cntrlBtn' onClick={decrease}> - </button>  
        </div>
        <div className= 'cntrlTimer'>
          <h2 className='h2'><span>Work Intervals {workIntrvl}</span>/ Breaks Completed {breakIntrvl}</h2>
        </div>
      </div>
     <div className='Buttons'>
      <button className='Start' onClick={startTimer}>Start</button>
      <button className='Reset' onClick={resetTimer}>Reset</button>
      <button className='Pause' onClick={PauseTimer}>Pause</button>

     </div>
    </div>
  );
}

export default App;
