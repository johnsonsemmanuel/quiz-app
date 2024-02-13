const quizData = [
  {
    question: "What is the capital of France?",
    a: "London",
    b: "Paris",
    c: "Berlin",
    d: "Rome",
    correct: "b",
  },
  {
    question: "What is the capital of Germany?",
    a: "London",
    b: "Paris",
    c: "Berlin",
    d: "Rome",
    correct: "c",
  },
];

// DOM elements
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("questions");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

// Variables
let currentQuiz = 0;
let score = 0;

// Function to load quiz
function loadQuiz() {
  deselectAnswers(); // Clear previous selection
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

// clear selected answers
function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

// get selected answer
function getSelected() {
  let answer = undefined;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

// Event listener for submit button
submitBtn.addEventListener("click", () => {
  const answer = getSelected(); // Get selected answer

  // Check if an answer is selected
  if (answer) {
    // Check if selected answer is correct
    if (answer === quizData[currentQuiz].correct) {
      score++; // Increment score if correct
    } else {
      // Alert if the answer is wrong
      alert(
        "Wrong answer! The correct answer is: " +
          quizData[currentQuiz].correct.toUpperCase()
      );
    }

    currentQuiz++; // Move to the next question

    // Load the next question if available
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      // Display final score if all questions are answered
      let remark = "";
      if (score >= 8) {
        remark = "Excellent! You really know your stuff!";
      } else if (score >= 5) {
        remark = "Well done! You did a good job!";
      } else {
        remark = "Keep practicing! You'll get better!";
      }
      quiz.innerHTML = `<h2>You answered ${score} / ${quizData.length} questions correctly</h2><p>${remark}</p><button onclick="location.reload()">Reload</button>`;
    }
  } else {
    // Alert if no answer is selected
    alert("Please select an answer before submitting.");
  }
});

// Initial load of the quiz
loadQuiz();