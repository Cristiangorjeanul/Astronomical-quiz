document.addEventListener('DOMContentLoaded', function () {

	// Format question
	function FormatQuestion(text, options, answer) {
		this.text = text;
		this.options = options;
		this.answer = answer;
	}
	// If option is correct answer then return true
	FormatQuestion.prototype.correctAnswer = function (option) {
		return this.answer === option;
	};
	// Format questionnaire
	function Questionnaire(questions) {
		// Array of questions
		this.questions = questions;
		// Start quiz with the first question
		this.questionIndex = 0;
		this.score = 0;
	}
	Questionnaire.prototype.currentQuestion = function () {
		return this.questions[this.questionIndex];
	};
	Questionnaire.prototype.checkAnswer = function (answer) {
		if (this.currentQuestion().correctAnswer(answer)) {
			this.score++;
		}
		this.questionIndex++;
	};
	// Check if quiz end is reached
	Questionnaire.prototype.isOver = function () {
		// Return TRUE only after last question
		return this.questionIndex >= this.questions.length;
	};
	// Format questionnaire
	var QuestionnaireFormat = {
		displayNext: function () {
			if (quiz.isOver()) {
				this.showResults();
			} else {
				this.displayQuestion();
				this.displayOptions();
				this.displayState();
				this.displayScore();
			}
		},
		displayQuestion: function () {
			this.fillingWithText('table', quiz.currentQuestion().text);
		},
		displayOptions: function () {
			var options = quiz.currentQuestion().options;
			// Display all options
			for (var i = 0; i < options.length; i++) {
				var optionId = 'option' + i;
				var optionText = options[i];
				this.fillingWithText(optionId, optionText);
				this.checkAnswerOrganizer(optionId, optionText);
			}
		},
		checkAnswerOrganizer: function (id, guess) {
			var button = document.getElementById(id);
			button.onclick = function () {
				quiz.checkAnswer(guess);
				QuestionnaireFormat.displayNext();
			}
		},
		displayScore: function () {
			var scoreText = 'Score: ' + quiz.score;
			this.fillingWithText('score', scoreText);
		},
		displayState: function () {
			var questionNumber = quiz.questionIndex + 1;
			var totalQuestions = quiz.questions.length;
			var showState = 'Page ' + questionNumber + ' of ' + totalQuestions;
			this.fillingWithText('page', showState);
		},
		showResults: function () {
			var grade = quiz.score / quiz.questions.length;
			var results = '<h1>';

			results += '<h1>Final score: ' + quiz.score + ' points</h1>';
			if (grade >= 0.8) {
				results += '<h2><br>Congratulations!<br>The result shows that you have extensive knowledge about astronomy!</h2>';
			} else if (grade < 0.8 && grade > 0.5) {
				results += '<h2><br>The result shows that you need to know more about astronomy!</h2>';
			} else {
				results += '<h2><br>The result shows that you do not know much about astronomy!</h2>';
			}
			results += '<br><button id="reset">Try Again?</button>';
			this.fillingWithText('questionnaire', results);
			this.resetQuestionnaire();
		},
		resetQuestionnaire: function () {
			var resetBtn = document.getElementById('reset');
			// Restart from the beginning
			resetBtn.onclick = function () {
				window.location.reload(false);
			}
		},
		fillingWithText: function (id, content) {
			var element = document.getElementById(id);
			element.innerHTML = content;
		}
	};
	// Create questions
	var questions = [
		new FormatQuestion('How many planets are in the Solar System?', ['Five', 'Six', 'Seven', 'Eight'], 'Eight'),
		new FormatQuestion('Which is the closest planet to the sun?', ['Mercury', 'Mars', 'Terra', 'Pluto'], 'Mercury'),
		new FormatQuestion('Who are the celestial bodies with their own light?', ['Planets', 'Stars', 'Asteroids', 'Satellites'], 'Stars'),
		new FormatQuestion('What type of celestial body is the moon?', ['A big meteorite', 'An Asteroid', 'A natural satellite', 'A small planet'], 'A natural satellite'),
		new FormatQuestion('Who is the largest planet in the solar system?', ['Mars', 'Terra', 'Saturn', 'Jupiter'], 'Jupiter'),
		new FormatQuestion('What is the cause of the inequality of days & nights?', ['The revolution motion', 'The size of the Earth', 'The rotational motion', 'The shape of the galaxy'], 'The revolution motion'),
		new FormatQuestion('What is the shape of the Milky Way galaxy?', ['Elliptical', 'Spiral', 'Spherical', 'Lenticular'], 'Spiral'),
		new FormatQuestion('What are the celestial bodies with head and tail?', ['Meteorites', 'Asteroids', 'Meteors', 'Comets'], 'Comets'),
		new FormatQuestion('How many planets are between Sun and Earth?', ['Two', 'Three', 'Four', 'Five'], 'Two'),
		new FormatQuestion('How many stars exist in the Milky Way galaxy?', ['A hundred', 'A few billion', 'About a thousand', 'Only a million'], 'A few billion')
	];
	// Questionnaire initialization
	var quiz = new Questionnaire(questions);
	QuestionnaireFormat.displayNext();

});