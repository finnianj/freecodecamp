const root = ReactDOM.createRoot(document.getElementById('root'));


class Display extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      input: 0,
      output: 0,
    }
 }
  render() {
    return (
      <div id="display">
        {this.state.input}
        {this.state.output}
      </div>
    )
  }}

  class Keypad extends React.Component{
  constructor(props) {
    super(props);
 }

  render() {
    return (
      <div id="keypad">
        <div class="key" id="clear">AC
  </div>
  <div class="key" id="divide">/
  </div>
  <div class="key" id="multiply">X
  </div>
  <div class="key" id="seven">7
  </div>
  <div class="key" id="eight">8
  </div>
  <div class="key" id="nine">9
    </div>
  <div class="key" id="subtract">-
  </div>
  <div class="key" id="four">4
  </div>
  <div class="key" id="five">5
  </div>
  <div class="key" id="six">6
  </div>
  <div class="key" id="add">+
  </div>
  <div class="key" id="one">1
  </div>
  <div class="key" id="two">2
  </div>
  <div class="key" id="three">3
  </div>
  <div class="key" id="equals">=
  </div>
  <div class="key" id="zero">0
  </div>
  <div class="key" id="decimal">.
  </div>
      </div>
    )
  }
}

class Calculator extends React.Component{
  constructor(props) {
    super(props);
 }
  render() {
    return (
      <div id="calculator">
        <Display />
        <Keypad />
      </div>
    )
  }}

root.render(<Calculator />)
