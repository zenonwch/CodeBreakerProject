let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');

    if (!answer.value || !attempt.value) {
        setHiddenFields();
    }

    if (!validateInput(input.value)) {
        return false;
    }

    attempt.value++;

    if(getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
}

function setHiddenFields() {
    let newAnswer = "";
    for (let i = 0; i < 4; i++) {
        newAnswer += Math.floor(Math.random() * 10).toString();
    }

    answer.value = newAnswer;
    attempt.value = 0;
}

function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}

function validateInput(input) {
    console.log(input);
    if (input.length === 4) {
        return true;
    }
    else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(input){
    let correctCount = 0;
    let result = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for(let i = 0; i < input.length; i++) {
        if (input[i] === answer.value[i]) {
            result += '<span class="glyphicon glyphicon-ok"></span>';
            correctCount++;
        } else if (answer.value.indexOf(input[i]) > -1) {
            result += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            result += '<span class="glyphicon glyphicon-remove"></span>'
        }
    }

    document.getElementById('results').innerHTML += result;

    return correctCount === answer.value.length;
}

function showAnswer(winner) {
    let code = document.getElementById('code');
    code.innerHTML = answer.value;
    code.className += winner ? ' success' : ' failure';
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}