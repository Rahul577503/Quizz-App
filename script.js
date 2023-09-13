const questions = [
  {
    question: "What will be the output of the following code?",
    code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}",
    options: ["A: 0 1 2 and 0 1 2", "B: 0 1 2 and 3 3 3", "C: 3 3 3 and 0 1 2"],
    correctAnswer: ["B"],
    explanation:
      "Correct Answer: B\n\nBecause of the event queue in JavaScript:`B` ",
  },
  {
    question:
      "What is the output of the code snippet below?\n\n```javascript\nconsole.log(1 + '1' - 1);\n```",
    code: `console.log(1 + '1' - 1);`,
    options: ["A: '11'", "B: 1", "C: '10'", "D: 0"],
    correctAnswer: "D",
    explanation: "Correct Answer: D: 0",
  },
  {
    question: "What is the purpose of the `bind` method in JavaScript?",
    code: "",
    options: [
      "A: To create a new array with the results of calling a function for every element in an array.",
      "B: To bind an event handler to a DOM element.",
      "C: To set the this value and partially apply arguments for a function.",
      "D: To sort the elements of an array in place.",
    ],
    correctAnswer: "C",
    explanation:
      "Correct Answer: C: To set the this value and partially apply arguments for a function.",
  },
  {
    question: "What does the 'spread' operator (...) do in JavaScript?",
    code: "",
    options: [
      "A: Combines two or more arrays into a single array.",
      "B: Destructures an object into individual properties.",
      "C: Clones an array or object.",
      "D: Converts a string into an array of characters.",
    ],
    correctAnswer: "C",
    explanation: "Correct Answer: C: Clones an array or object.",
  },
  {
    question: "What is a closure in JavaScript?",
    code: "",
    options: [
      "A: A built-in method for closing files in Node.js.",
      "B: A way to encapsulate data and behavior within a single unit of code.",
      "C: A function defined inside another function that has access to its parent's variables.",
      "D: A way to define class constructors in ES6.",
    ],
    correctAnswer: "C",
    explanation:
      "Correct Answer: C: A function defined inside another function that has access to its parent's variables.",
  },
  {
    question:
      "Which of the following is not a valid primitive data type in JavaScript?",
    code: "",
    options: ["A: Number", "B: String", "C: Boolean", "D: Object"],
    correctAnswer: "D",
    explanation: "Correct Answer: D: Object",
  },
  {
    question: "What is the purpose of the JavaScript `Promise` object?",
    code: "",
    options: [
      "A: To handle asynchronous operations and callbacks.",
      "B: To define classes and objects for object-oriented programming.",
      "C: To perform regular expressions on strings.",
      "D: To format and manipulate dates and times.",
    ],
    correctAnswer: "A",
    explanation:
      "Correct Answer: A: To handle asynchronous operations and callbacks.",
  },
  {
    question:
      "What does the `async` keyword do when used before a function in JavaScript?",
    code: "",
    options: [
      "A: It makes the function execute synchronously.",
      "B: It defines a generator function.",
      "C: It indicates that the function returns a `Promise`.",
      "D: It defines a function that cannot be awaited using `await`.",
    ],
    correctAnswer: "C",
    explanation:
      "Correct Answer: C: It indicates that the function returns a `Promise`.",
  },
  {
    question: "What is the purpose of the `localStorage` object in JavaScript?",
    code: "",
    options: [
      "A: To store session data on the server.",
      "B: To store data locally in the user's browser.",
      "C: To manage server-side databases.",
      "D: To send HTTP requests to a remote server.",
    ],
    correctAnswer: "B",
    explanation:
      "Correct Answer: B: To store data locally in the user's browser.",
  },
  {
    question:
      "What is the main advantage of using arrow functions in JavaScript?",
    code: "",
    options: [
      "A: They have shorter syntax compared to regular functions.",
      "B: They have better performance.",
      "C: They have access to the `arguments` object.",
      "D: They are automatically hoisted.",
    ],
    correctAnswer: "A",
    explanation:
      "Correct Answer: A: They have shorter syntax compared to regular functions.",
  },
  {
    question:
      "Which method can be used to iterate over the keys of an object in JavaScript?",
    code: "",
    options: [
      "A: `map()`",
      "B: `forEach()`",
      "C: `Object.keys()`",
      "D: `reduce()`",
    ],
    correctAnswer: "C",
    explanation: "Correct Answer: C: `Object.keys()`",
  },
];

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  quizContainer.innerHTML = `
        <div class="question">
            <h6>${currentQuestionIndex + 1}. ${question.question}</h6>
            <pre><code>${question.code}</code></pre> <!-- Display code here -->
            <form id="quiz-form">
                ${question.options
                  .map(
                    (option, i) => `
                    <label>
                        <input type="radio" name="answer" value="${i}">
                        <span>${option}</span>
                    </label><br>
                `
                  )
                  .join("")}
            </form>
            <button class="submit-button" onclick="checkAnswer()">Submit</button>
            <button class="next-button" onclick="nextQuestion()" style="display: none;">Next</button>
            <button class="explanation-button" onclick="toggleExplanation()" style="display: none;">Explanation</button>
            <div id="explanation" class="explanation" style="display: none;">${
              question.explanation
            }</div>
        </div>
    `;
}

function checkAnswer() {
  const form = document.getElementById("quiz-form");
  const options = form.elements["answer"];
  const explanationButton = document.querySelector(".explanation-button");
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  let selectedAnswer = null;

  for (let i = 0; i < options.length; i++) {
    options[i].disabled = true; // Disable all options after submission
    if (options[i].checked) {
      selectedAnswer = options[i].value; // Store the selected answer
    }
  }

  if (selectedAnswer === correctAnswer) {
    for (let i = 0; i < options.length; i++) {
      options[i].nextElementSibling.style.color =
        options[i].value === correctAnswer ? "green" : "gray";
    }
    explanationButton.style.display = "block"; // Show "Toggle Explanation" button
    correctAnswers++;
  } else {
    for (let i = 0; i < options.length; i++) {
      options[i].nextElementSibling.style.color =
        options[i].value === correctAnswer ? "green" : "gray";
      if (options[i].checked) {
        options[i].nextElementSibling.style.color = "red"; // Incorrect answer
      }
    }
    explanationButton.style.display = "block"; // Show "Toggle Explanation" button
    incorrectAnswers++;
  }

  // Show the "Next" button after submission
  const nextButton = document.querySelector(".next-button");
  nextButton.style.display = "block";

  // Hide the "Submit" button
  const submitButton = document.querySelector(".submit-button");
  submitButton.style.display = "none";
}

function toggleExplanation() {
  const explanation = document.getElementById("explanation");
  if (
    explanation.style.display === "none" ||
    explanation.style.display === ""
  ) {
    explanation.style.display = "block";
  } else {
    explanation.style.display = "none";
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    // All questions have been answered
    showResults();
  }
}

function showResults() {
  const correctAnswersElement = document.getElementById("correct-answers");
  const incorrectAnswersElement = document.getElementById("incorrect-answers");
  const backToQuizButton = document.querySelector(".back-to-quiz-button");

  correctAnswersElement.textContent = correctAnswers;
  incorrectAnswersElement.textContent = incorrectAnswers;

  resultContainer.style.display = "block";
  quizContainer.style.display = "none";
  backToQuizButton.style.display = "block";
}

function backToQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  renderQuestion();
  resultContainer.style.display = "none";
  quizContainer.style.display = "block";
  const backToQuizButton = document.querySelector(".back-to-quiz-button");
  backToQuizButton.style.display = "none";
}

renderQuestion();
