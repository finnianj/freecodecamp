const root = ReactDOM.createRoot(document.getElementById('root'));

const initialstate = ["# This is a heading", "Heres some code, `<div></div>`, between 2 backticks.", "\n \`\`\` \n function anotherExample(firstLine, lastLine) {", "if (firstLine == true && lastLine == true) \n {return multiLineCode;}\n \`\`\` ", "## This is a sub-heading...", "There's also [links](https://www.freecodecamp.org),", "\n > Block Quotes!", "- And of course there are lists.", "\n  - Some are bulleted.", "\n    - With different indentation levels", "    - That look like this.", "![freeCodeCamp Logo](https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/256/256/true/eyJpZCI6ImVhYzdiZWFjZTNjMGJjZmI2YjRkNzJhMmQyYzFhOTA5Iiwic3RvcmFnZSI6InB1YmxpY19zdG9yZSJ9?signature=12853b38cbc88ec20035d98e3007ca6e699c923a7be2fca98e9f9004ded750f3)", "**bold text!**"]



class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: initialstate.join("\r\n")
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
    text: event.target.value
    })
  }

  render() {
return (
     <div>
      <div id="holder1">
        <h2>Editor:</h2>
        <textarea id="editor" value={this.state.text} onChange={this.handleChange}>
            {this.state.text}
        </textarea>
      </div>
      <div id="holder2">
        <h2>Preview:</h2>
        <Preview data={this.state}/>
      </div>
    </div>
  );
  }
};

class Preview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let contents = this.props.data.text;
let text = marked.parse(contents)
marked.setOptions({
  breaks: true
})


return (

<div id="preview" dangerouslySetInnerHTML={{__html: text}}>
</div>
  );
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
return (
  <div>
    <div id="container">
      <Editor />
    </div>
  </div>
  );
  }
};



root.render(<App />);
