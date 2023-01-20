function App(){


  const [pause, setPause] = React.useState(5);
  const [session, setSession] = React.useState(25);
  const [time, setTime] = React.useState(5);
  const [timerOn, setTimerOn] = React.useState(false);
  const [breakTime, setBreakTime] = React.useState(false);

  const playAlarm = () => {
    document.getElementById("beep").play();
    document.getElementById("beep").currentTime = 1;
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
    let breaking = breakTime
    if (!timerOn) {
      let interval = setInterval(() => {
        let current = new Date().getTime();
        if (current > end) {
          setTime((prev) => {
            if (prev <= 0 && breaking == false) {
              setBreakTime(true);
              breaking = true;
              console.log("changing to break time. Break time is now:" + breaking)
              return (pause*60);
            } else if (prev <= 0 && breaking == true) {
              setBreakTime(false);
              breaking = false;
              console.log("changing to session time. Break time is now:" + breaking)
              return (session*60);
            } else if (prev <= 1) {
              playAlarm();
              return prev - 1
            } else {
              return prev - 1
            }
          })
          end += second;
        }
      }, 10);
      localStorage.clear();
      localStorage.setItem("interval-id", interval)
    }

    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"))
    }
    setTimerOn(!timerOn)
  }

  const resetTime = () => {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    setBreakTime(false);
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
          <button class="btn btn-light" onClick={() => displayPause(1)} id="break-increment"><i class="fa-solid fa-arrow-up"></i></button>
          <button class="btn btn-light" onClick={() => displayPause(-1)} id="break-decrement"><i class="fa-solid fa-arrow-down"></i></button>
        </div>
      </div>

      <div id="session-label">
        Session Length:
        <div id="session-length">{session}</div>
        <div class="buttons">
          <button class="btn btn-light" onClick={() => displaySession(1)} id="session-increment"><i class="fa-solid fa-arrow-up"></i></button>
          <button class="btn btn-light" onClick={() => displaySession(-1)} id="session-decrement"><i class="fa-solid fa-arrow-down"></i></button>
        </div>
      </div>
    </div>

    <div id="lower">
      <div id="current">
        <div id="timer-label">
        {breakTime ? ("Break") : ("Session")}
        </div>
        <div id="time-left">{formatTime(time)}</div>
      </div>

      <div id="controls">
        <button id="start_stop" class="btn btn-light" onClick={controlTime}>
          {(timerOn ? ("Pause") : ("Play"))}
        </button>
        <button id="reset" class="btn btn-warning" onClick={resetTime}>Reset</button>
      </div>

      <audio id="beep" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3"></audio>

    </div>
  </div>


  );
}

ReactDOM.render(<App />, document.getElementById("root"))


///make reset PAUSE audio and then rewind
