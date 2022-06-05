const wordToTranslateContainer = document.getElementById('wordToTranslateContainer');
const instrutionContainer = document.getElementById('instrutionContainer');
const answerButton = document.getElementById('answerButton');
const messageContainer = document.getElementById('messageContainer');
let allQuestions;
const Http = new XMLHttpRequest();
const url = "https://projects.fordsdevelopment.co.uk/spanish-feed";
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    if (!allQuestions) {
        allQuestions = JSON.parse(Http.responseText);
        console.log(Http.status)
        generateQuestion();
        showQuestionsOnModel();
    }
}

// Display all the questions in the model

const modelBody = document.getElementById("modelBody");

function showQuestionsOnModel() {
    for (let i = 0; i < allQuestions.length; i++) {
        console.log(allQuestions[i])
        let span = document.createElement('span');
        span.innerHTML = allQuestions[i]["english"];
        let checkBox = document.createElement('input');
        modelBody.appendChild(span);
    }
}


// Display the question

let randomQuestion;
let englishOrSpanishQuestion;
let englishOrSpanishAnswer;
let masculineOrFeminine;
let question;

function EnglishOrSpanish() {
    if (Math.random() > 0.5) {
        englishOrSpanishQuestion = "english";
        englishOrSpanishAnswer = "spanish";
    } else {
        englishOrSpanishQuestion = "spanish";
        englishOrSpanishAnswer = "english";
    }
}

function generateMasculineOrFeminine() {
    if (Math.random() > 0.5) {
        masculineOrFeminine = "masculine";
    } else {
        masculineOrFeminine = "feminine";
    }
}

function englishQuestion() {
    instrutionContainer.innerHTML = `Translate this into Spanish - ${masculineOrFeminine}`
    question = allQuestions[randomQuestion][englishOrSpanishQuestion];
    wordToTranslateContainer.innerHTML = question;
}

function spanishQuestion() {
    instrutionContainer.innerHTML = `Translate this into English`
    question = allQuestions[randomQuestion][englishOrSpanishQuestion][masculineOrFeminine];
    wordToTranslateContainer.innerHTML = question;
}

function generateQuestion() {
    document.getElementById('answerInput').value = "";
    EnglishOrSpanish();
    generateMasculineOrFeminine();
    randomQuestion = Math.floor(Math.random() * allQuestions.length);
    eval(`${englishOrSpanishQuestion}Question()`);
}

// submit the answer

function spanishAnswer(answer) {
    return allQuestions[randomQuestion][englishOrSpanishAnswer][masculineOrFeminine] == answer
}

function englishAnswer(answer) {
    return allQuestions[randomQuestion][englishOrSpanishAnswer] == answer
}

function submitAnswer() {
    const answer = document.getElementById("answerInput").value;
    mark = eval(`${englishOrSpanishAnswer}Answer('${answer}')`);
    console.log(mark)
    if (mark) {
        generateQuestion();
        messageContainer.innerHTML = "<span class='correct'>Correct!</span>";
    } else {
        messageContainer.innerHTML = "<span class='incorrect'>Incorrect, try again.</span>";
    }
}

answerButton.addEventListener('click', submitAnswer)
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        submitAnswer();
    }
})
