
function App(){
  return (
  <div id="container">
    <h1>25 + 5 Clock</h1>

    <div id="dashboard">

      <div id="break-label">Break Length:
        <div id="break-length">5</div>
        <div class="buttons">
          <button id="break-increment">+</button>
          <button id="break-decrement">-</button>
        </div>
      </div>

      <div id="session-label">
        Session Length:
        <div id="session-length">25</div>
        <div class="buttons">
          <button id="session-increment">+</button>
          <button id="session-decrement">-</button>
        </div>
      </div>
    </div>

    <div id="lower">
      <div id="current">
        <div id="timer-label">Current: Session</div>
        <div id="time-left">25:00</div>
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
