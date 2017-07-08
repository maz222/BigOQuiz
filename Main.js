var problems = [];
var currentProblem = null;
var problemCount = 0;
var problemNumber = 1;
var complexities = ["(1)","(log(n))", "(n)", "(n log(n))", "(n^2)"];

$(document).ready(function () {
    var currentAnswer = null;

    $.ajax({
    type: "GET",
    url: "Problems.xml",
    dataType: "xml",
    success: function (xml) {
        console.log(problems);
        var $xmlProblems = $(xml).find('problem').each(function() {
            var problem = {
                "subject":$(this).find("subject").text(),
                "topic":$(this).find("topic").text(),
                "question":$(this).find("question").text(),
                "answer":$(this).find("answer").text()
            };
            problems[problems.length]=problem;
            console.log("Added problem");
            problemCount += 1;
        });
        }
    }).done(function() {
        $("#cheat-button").on("click", function() {
            window.open("ReferenceTable.html")
        })

        currentProblem = getRandomProblem();
        setProblem(currentProblem);
        for(i = 1; i <= 4; i++) {
            var buttonString = "#answer" + String(i);
            $(buttonString).on("click",function() {
                if($(this).text() == currentProblem["answer"]) {
                    currentProblem = getRandomProblem();
                    problemNumber += 1;
                    setProblem(currentProblem);
                }
                else {
                    $(this).css("color","white");
                    $(this).css("background-color","red");
                    $(this).css("border-color", "red");
                }
            })
        }
        }
    );


})

function getRandomProblem() {
    var index = Math.floor(Math.random()*(problems.length-1+0)+0);
    var problem = problems.splice(index,1);
    return problem[0];
}

function setProblem(problem) {
    setTopic(problem["topic"]);
    setSubject(problem["subject"]);
    setQuestion(problem["question"]);
    var randomAnswers = complexities.slice();
    for(i = 0; i < randomAnswers.length; i++) {
        if(randomAnswers[i] == problem["answer"]) {
            randomAnswers.splice(i, 1);
        }
    }
    for(i = 0; i < randomAnswers.length - 3; i++)
    {
        var temp = Math.floor(Math.random()*(randomAnswers.length-1+0)+0);
        randomAnswers.splice(temp,1);
    }
    setAnswerButtons(problem["answer"],randomAnswers)
    $("#question-counter").text(String(problemNumber) + " / " + String(problemCount));
}

function setTopic(topic) {
    $("#topic").text(topic);
}

function setSubject(subject) {
    $("#subject").text(subject);
}

function setQuestion(question) {
    $("#question").text(question);
}

function setAnswerButtons(correctAnswer, randomAnswers) {
    currentAnswer = correctAnswer;
    var correctButtonNumber = Math.floor(Math.random()*(4-1+1)+1);
    for(i = 1; i <= 4; i++) {
        var buttonString = "#answer" + String(i);
        if(i == correctButtonNumber) {
            $(buttonString).text(correctAnswer);
        }
        else {
            $(buttonString).text(randomAnswers.pop());
        }
        $(buttonString).css("color","rgb(40,40,40)");
        $(buttonString).css("border-color","rgb(40,40,40)")
        $(buttonString).css("background-color","#E0E8EB")
    }
}

function setQuestionCounter(newCount, total) {
    var counterString = String(newCount) + " / " + String(total);
    $("#question-counter").text(counterString);
}
