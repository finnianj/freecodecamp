function App(){


  const [pause, setPause] = React.useState(5);
  const [session, setSession] = React.useState(25);
  const [time, setTime] = React.useState(25*60);
  const [timerOn, setTimerOn] = React.useState(false);
  const [breakTime, setBreakTime] = React.useState(false);
  const [alarm, setAlarm] = React.useState(new Audio ("./alarm.mp3"))


  const playAlarm = () => {
    alarm.currentTime = 0;
    alarm.play();
  }


  const displayPause = (num) => {
    if (pause == 1 && num == -1) {
      return;
    } else if (pause == 60 && num == 1) {
      return;
    } else {
      setPause((prev) => prev + num)
      if (breakTime == true) {
        setTime((pause + num )*60)
      }
    }
  }

  const displaySession = (num) => {
    if (session == 60 && num == 1) {
      return;
    } else if (session == 1 && num == -1) {
       return;
    } else {
      setSession((prev) => prev + num )
      if (timerOn == false) {
        setTime((session + num )*60)
      }
    }
  }

  const formatTime = () => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
      )
    }

  const controlTime = () => {
    let second = 1000;
    let end = new Date().getTime() + second;
    if (!timerOn) {
      let interval = setInterval(() => {
        let current = new Date().getTime();
        if (current > end) {
          setTime((prev) => {
            if (prev <= 0 && !breakTime) {
              setBreakTime(true);
              playAlarm();
              return pause*60
            } else if (prev <= 0 && breakTime) {
              setBreakTime(false);
              playAlarm();
              return session*60
            } else {
              return prev - 1
            }
          })
          end += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval)
    }

    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"))
    }
    setTimerOn(!timerOn)
  }

  const resetTime = () => {
    setPause(5);
    setSession(25);
    setTime(25*60);
    clearInterval(localStorage.getItem("interval-id"))
    setTimerOn(false);
  }

  return (
  <div id="container">
    <h1>25 + 5 Clock</h1>

    <div id="dashboard">

      <div id="break-label">Break Length:
        <div id="break-length">{pause}</div>
        <div class="buttons">
          <button onClick={() => displayPause(1)} id="break-increment">+</button>
          <button onClick={() => displayPause(-1)} id="break-decrement">-</button>
        </div>
      </div>

      <div id="session-label">
        Session Length:
        <div id="session-length">{session}</div>
        <div class="buttons">
          <button onClick={() => displaySession(1)} id="session-increment">+</button>
          <button onClick={() => displaySession(-1)} id="session-decrement">-</button>
        </div>
      </div>
    </div>

    <div id="lower">
      <div id="current">
        <div id="timer-label">
        {(breakTime ? ("Break") : ("Session"))}
        </div>
        <div id="time-left">{formatTime(time)}</div>
      </div>

      <div id="controls">
        <button id="start_stop" onClick={controlTime}>
          {(timerOn ? ("Pause") : ("Play"))}
        </button>
        <button id="reset" onClick={resetTime}>Reset</button>
      </div>

    </div>
  </div>


  );
}

ReactDOM.render(<App />, document.getElementById("root"))
