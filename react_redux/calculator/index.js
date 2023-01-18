const root = ReactDOM.createRoot(document.getElementById('root'));

class Calculator extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      answer: 0,
    }
 }



 render() {

    let screen = document.getElementById("display")

    const display = (event) => {
      let button = event.target.innerHTML
      let check = this.state.input.match(/\d+\.*\d*$/)
      let lastChar = this.state.input[this.state.input.length - 1]

      if (this.state.input == "0" && button == ".") {
        this.setState({ input: "0." })
      } else if (this.state.input == "0") {
        this.setState({ input: button })
      } else if (button == "." && this.state.input[this.state.input.length - 1] == ".") {
        return;
      } else if (button == "." && (/\./).test(check[check.length - 1]) == true) {
        return;
      } else if (/[+-\/*]/.test(lastChar) && /[+\/*]/.test(button) ) {
        let reg = /([+-\/*]+)$/
        let newStr = this.state.input.replace(reg, button)
        this.setState({ input: newStr})
      }else {
        this.setState({ input: this.state.input + button})
      } /// changes the input with given character and removes 0 if input is 0



      if (this.state.input[this.state.input.length - 1 ] == "=") {
        if (/[1-9.]/.test(button)) {
          this.setState({ input: button, answer: 0 })
        } else {
          this.setState({ input: this.state.answer + button, answer: 0 })
        }
      } // allows you to operate on previous answer

    };

    const calculate = () => {
      this.setState({ answer: eval(this.state.input), input: this.state.input + "=" })
    };

    const clear = () => {
      this.setState({ input: "0", answer: 0 })
    }

    const checkDisplay = () => {
      if (this.state.answer != 0 ) {
          return this.state.answer
        } else {
          return this.state.input
        }
    }


    return (
      <div id="calculator">
        <div id="display">
          {checkDisplay()}
        </div>
        <div id="keypad">
          <button onClick={clear} class="key" id="clear">AC</button>
          <button onClick={display} class="key operator" id="divide">/</button>
          <button onClick={display} class="key operator" id="multiply">*</button>
          <button onClick={display} class="key" id="seven">7</button>
          <button onClick={display} class="key" id="eight">8</button>
          <button onClick={display} class="key" id="nine">9</button>
          <button onClick={display} class="key operator" id="subtract">-</button>
          <button onClick={display} class="key" id="four">4</button>
          <button onClick={display} class="key" id="five">5</button>
          <button onClick={display} class="key" id="six">6</button>
          <button onClick={display} class="key operator" id="add">+</button>
          <button onClick={display} class="key" id="one">1</button>
          <button onClick={display} class="key" id="two">2</button>
          <button onClick={display} class="key" id="three">3</button>
          <button onClick={calculate} class="key" id="equals">=</button>
          <button onClick={display} class="key" id="zero">0</button>
          <button onClick={display} class="key" id="decimal">.</button>
        </div>
      </div>
    )
  }}


root.render(<Calculator />)
