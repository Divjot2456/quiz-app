import React from 'react';
import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: '',
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      answered: false
    }
  };

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
    this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
  }

  displayQuestions = (questions, currentQuestion, nextQuestion, previousQuestion) => {
    let { currentQuestionIndex } = this.state;
    if(!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        answer 
      });
    }
  };

  handleOptionClick = (e) => {
    if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      e.target.className = "correct";
      this.correctAnswer();
    } else {
      e.target.className = "wrong";
      this.wrongAnswer();
    }
    this.setState({
      answered: true
    });
  }

  correctAnswer = () => {
    this.setState(prevState => ({
      score: prevState.score + 1,
      correctAnswers: prevState.correctAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
      this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
    });
  }

  wrongAnswer = () => {
    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
      this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
    });
  }

  nextQuestionClick = () => {
    if(this.state.nextQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      }), () => {
        this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
      });
    }
  }

  previousQuestionClick = () => {
    if(this.state.previousQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex - 1
      }), () => {
        this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
      });
    }
  }

  editAnswer = () => {
    this.setState({
      answered: false
    });
  }

  render () {
    const { currentQuestion, answered } = this.state;
    return (
      <React.Fragment>
        <div className="questions">
          <h4 className="question">{currentQuestion.question}</h4>
          <div className="options-container">
            <p onClick={this.handleOptionClick} disabled={!this.state.answered} className="option">{currentQuestion.optionA}</p>
            <p onClick={this.handleOptionClick} disabled={this.state.answered} className="option">{currentQuestion.optionB}</p>
            <p onClick={this.handleOptionClick} disabled={this.state.answered} className="option">{currentQuestion.optionC}</p>
            <p onClick={this.handleOptionClick} disabled={this.state.answered} className="option">{currentQuestion.optionD}</p>
            <p onClick={this.handleOptionClick} disabled={this.state.answered} className="option">{currentQuestion.optionE}</p>
          </div>
          <div className="button-container">
            <button onClick={this.previousQuestionClick}>Previous</button>
            <button onClick={this.editAnswer}>Edit</button>
            <button onClick={this.nextQuestionClick}>Next</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Play;