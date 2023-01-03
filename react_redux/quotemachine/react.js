const root = ReactDOM.createRoot(document.getElementById('quote-box'));

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomIndex: 4
    };
    this.makeQuote = this.makeQuote.bind(this);
  }

  makeQuote() {
    this.setState({
      randomIndex: (Math.floor(Math.random() * 10))
    })
  }

  render() {
    const quotes = {
      "Mark Twain" : "Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.",
      "Albert Einstein" : "We cannot solve problems with the kind of thinking we employed when we came up with them.",
      "Mahatma Gandhi" : "Learn as if you will live forever, live like you will die tomorrow.",
      "Eleanor Roosevelt" : "When you give joy to other people, you get more joy in return. You should give a good thought to happiness that you can give out.",
      "Norman Vincent Peale" : "When you change your thoughts, remember to also change your world.",
      "Walter Anderson" : "It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest.",
      "Diane McLaren" : "Nature has given us all the pieces required to achieve exceptional wellness and health, but has left it to us to put these pieces together.",
      "Winston Churchill" : "Success is not final; failure is not fatal: It is the courage to continue that counts.",
      "Herman Melville" : "It is better to fail in originality than to succeed in imitation.",
      "Colin R. Davis" : "The road to success and the road to failure are almost exactly the same.",
    }

    let randomAuthor = Object.keys(quotes)[this.state.randomIndex]
    return (
      <div>
        <h1 id="text">{quotes[randomAuthor]}</h1>
        <h3 id="author"><em>{randomAuthor}</em></h3>
        <button id="new-quote" onClick={this.makeQuote}>New Quote</button>
        <button><a href="twitter.com/intent/tweet" id="tweet-quote">Tweet Quote</a></button>
      </div>
    );
  }
}


root.render(<QuoteMachine />);
