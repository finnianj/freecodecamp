function App(){


  const [pause, setPause] = React.useState(5);
  const [session, setSession] = React.useState(25);
  const [time, setTime] = React.useState([25*60]);



  const displayPause = (num) => {
    if (pause == 1 && num == -1) {
      return;
    } else if (pause == 60 && num == 1) {
      return;
    } else {
      setPause((prev) => prev + num)
    }
  }

  const displaySession = (num) => {
    if (session == 60 && num == 1) {
      return;
    } else if (session == 1 && num == -1) {
       return;
    } else {
      setSession((prev) => prev + num )
    }
  }

  const formatTime = () => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
      )
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
        <div id="timer-label">Current: Session</div>
        <div id="time-left">{formatTime(time)}</div>
      </div>

      <div id="controls">
        <button id="start_stop">Start/Stop</button>
        <button id="reset">Reset</button>
      </div>

    </div>
  </div>


  );
}

ReactDOM.render(<App />, document.getElementById("root"))
