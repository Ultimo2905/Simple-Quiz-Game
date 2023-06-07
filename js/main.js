const quizInfo = [{
        question: "What is my name?",
        answer: "Volodymyr",
        optionOne: "Dmitriy",
        optionTwo: "Pavel",
        optionThree: "Alexander",
        optionFour: "Volodymyr",
        monetary: 10
    },
    {
        question: "My Favorite Operator?",
        answer: "Addition",
        optionOne: "Addition",
        optionTwo: "Equals",
        optionThree: "Multiply",
        optionFour: "Divide",
        monetary: 20

    },
    {
        question: "My month of birth?",
        answer: "May",
        optionOne: "September",
        optionTwo: "May",
        optionThree: "December",
        optionFour: "January",
        monetary: 30
    },
    {
        question: "My favorite color?",
        answer: "Green",
        optionOne: "Red",
        optionTwo: "Green",
        optionThree: "Blue",
        optionFour: "White",
        monetary: 40
    },
    {
        question: "My favorite fruit?",
        answer: "Mango",
        optionOne: "Peach",
        optionTwo: "Pear",
        optionThree: "Apple",
        optionFour: "Mango",
        monetary: 33
    },
    {
        question: "My favorite city?",
        answer: "Kyiv",
        optionOne: "Kyiv",
        optionTwo: "Lviv",
        optionThree: "Amsterdam",
        optionFour: "Florence",
        monetary: 22
    },
    {
        question: "My secondary favorite city?",
        answer: "Lviv",
        optionOne: "Kyiv",
        optionTwo: "Lviv",
        optionThree: "Amsterdam",
        optionFour: "Florence",
        monetary: 22
    },
];

const question = quizIterator(quizInfo);
let currQuestionAnswer;

nextQuestion();

let actualScore = 0;

const addScore = (button) => {
    if (button.classList.contains("correct")) {
        actualScore++;
        let val = actualScore;
        let score = document.getElementById("score");
        score.innerHTML = `${actualScore}`;
    }
}

function totalScore() {
    const rewardSum = rewardArr.reduce((partialSum, a) => partialSum + a, 0);
    console.log(rewardSum);
    let main = document.getElementById("main");
    main.innerHTML = `
    <h1 class="result">
        Quiz Completed <br> Your Score Is : <br> ${actualScore} out of ${quizInfo.length} <br> Your Reward Is : ${rewardSum}$
    </h1>
    `;
}



function nextQuestion() {

    const currQuestion = question.next().value;
    // console.log(currQuestion);


    let optiona = document.getElementById("optiona");
    let optionb = document.getElementById("optionb");
    let optionc = document.getElementById("optionc");
    let optiond = document.getElementById("optiond");
    let heading = document.getElementById("question");

    if (currQuestion !== undefined) {

        heading.innerHTML = currQuestion.question;
        optiona.innerHTML = currQuestion.optionOne;
        optionb.innerHTML = currQuestion.optionTwo;
        optionc.innerHTML = currQuestion.optionThree;
        optiond.innerHTML = currQuestion.optionFour;
        currQuestionAnswer = currQuestion.answer;
        // console.log(currQuestionAnswer);

    } else {
        totalScore();

    }

}




function quizIterator(question) {
    let nextQuest = 0;

    return {
        next: function () {
            return nextQuest < question.length ? {
                value: question[nextQuest++],
                done: false
            } : {
                done: true
            }
        }
    };
}

let opts = document.querySelectorAll(".opt");

let optArr = Array.from(opts);
// let optArr2 = [...opts];
console.log(currQuestionAnswer);


let rewardArr = [];

optArr.forEach(function (opts, index, optArr) {
    optArr[index].addEventListener("click", () => {
        const realAns = quizInfo.map(function (pick) {

            return pick.answer;

        });

        console.log(realAns);

        optArr[index]

        let but = optArr[index].textContent;
        let viewAns;

        if (but === optArr[index].textContent && but === currQuestionAnswer) {
            viewAns = realAns.includes(but);
        } else {
            viewAns = false;
        }

        console.log(but);
        console.log(viewAns);

        if (viewAns === true) {
            function filterByID(item) {
                if (item.answer == but) {
                    rewardArr.push(item.monetary);
                    console.log(rewardArr);

                }
            }
            quizInfo.filter(filterByID);
        }

        if (viewAns) {
            optArr[index].classList.add("correct");
            setTimeout(() => {
                optArr[index].classList.remove("correct");
                nextQuestion();
            }, 500);
        } else {
            optArr[index].classList.add("wrong");
            setTimeout(() => {
                optArr[index].classList.remove("wrong");
                nextQuestion();
            }, 500);
        }
        addScore(optArr[index]);
    });
});