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
      question: "What is the capital of Japan?",
      a: "Beijing",
      b: "Tokyo",
      c: "Seoul",
      d: "Bangkok",
      correct: "b",
    },
    {
      question: "What is the capital of Italy?",
      a: "London",
      b: "Paris",
      c: "Rome",
      d: "Madrid",
      correct: "c",
    },
  ];
  
  const quiz = document.getElementById("quiz");
  const answerEls = document.querySelectorAll(".answer");
  const questionEl = document.getElementById("questions");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");
  const submitBtn = document.getElementById("submit");
  const feedbackEl = document.getElementById("feedback");
  const resultEl = document.getElementById("result");
  
  let currentQuiz = 0;
  let score = 0;
  
  function loadQuiz() {
      deselectAnswers();
      const currentQuizData = quizData[currentQuiz];
      questionEl.innerText = currentQuizData.question;
      a_text.innerText = currentQuizData.a;
      b_text.innerText = currentQuizData.b;
      c_text.innerText = currentQuizData.c;
      d_text.innerText = currentQuizData.d;
  }
  
  function deselectAnswers() {
    answerEls.forEach((answerEl) => {
      answerEl.checked = false;
    });
  }
  
  function getSelected() {
    let answer = undefined;
  
    answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }
    });
  
    return answer;
  }
  
  function checkAnswer() {
    const answer = getSelected();
  
    if (answer) {
      if (answer === quizData[currentQuiz].correct) {
        score++;
      }
      currentQuiz++;
  
      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        showResults();
      }
    } else {
      feedbackEl.innerText = 'Please select an answer';
    }
  }
  
  function showResults() {
    let grade = '';
  
    if (score === quizData.length) {
      grade = 'Excellent';
    } else if (score >= quizData.length / 2) {
      grade = 'Good';
    } else {
      grade = 'Pass';
    }
  
    quiz.innerHTML = `<h2>You scored ${score} out of ${quizData.length}</h2><p>Grade: ${grade}</p>`;
    submitBtn.style.display = 'none';
    feedbackEl.innerText = ''; // Clear any previous feedback
  }
  
  submitBtn.addEventListener("click", checkAnswer);
  
  // Event listener to handle case where user doesn't select any answer
  answerEls.forEach((answerEl) => {
    answerEl.addEventListener('click', () => {
      feedbackEl.innerText = ''; // Clear any previous feedback when the user selects an answer
    });
  });
  
  loadQuiz();
  