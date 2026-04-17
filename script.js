const quizdata = [
    {
        question: "Which flies a green, white, and orange (in that order) tricolor flag? ",
        options: ["Ireland", "Ivory", "CoastItaly", "India"],
        answer: "Ireland"
    },
    {
        question: " What company makes the Xperia model of smartphone? ",
        options: ["Samsung", "Nokia", "Sony", "Iphone"],
        answer: "Sony"
    },
    {
        question: "Which city is home to the Brandenburg Gate? ",
        options: ["Vienna", "Zurich", "Venice", "Berlin"],
        answer: "Berlin"
    },
    {
        question: "Which of the following is NOT a fruit? ",
        options: ["Rhubarb", "Tomatoes", "Avocados", "Pitaya"],
        answer: "Rhubarb"
    },
    {
        question: "Where was the first example of paper money used? ",
        options: ["Greece", "China", "Turkey", "America"],
        answer: "China"
    },
    {
        question: "Who is generally considered the inventor of the motor car? ",
        options: ["Henry Ford", "Karl Benz", "Henry M. Leland", "Kiichiro Toyoda"],
        answer: "Karl Benz"
    },
    {
        question: "If you were looking at Iguazu Falls, on what continent would you be? ",
        options: ["Asia", "South America", "Africa", "Australia"],
        answer: "South America"
    },
    {
        question: " What number was the Apollo mission that successfully put a man on the moon for the first time in human history? ",
        options: ["Apollo 11", "Apollo 12", "Apollo 13", "Apollo 14"],
        answer: "Apollo 11"
    },
    {
        question: "Which horoscope sign is a fish? ",
        options: ["Aquaris", "Cancer", "Pisces", "Leo"],
        answer: "Pisces"
    },
    {
        question: "Which app has the most total users? ",
        options: ["Tiktok", "Instagram", "Snapchat", "Facebook"],
        answer: "Facebook",
    }
];

let currentquestion = 0;
let score = 0;
let timeleft = 30;
let timeinterval;
const timerel = document.getElementById('time');
const questionel = document.querySelector('.question');
const optionsel = document.querySelector('.option');
const resultel = document.querySelector('.result');
const scoreel = document.getElementById('score');
const restartel = document.querySelector('.restart-btn');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadquestion() {
    if (currentquestion >= quizdata.length) {
        endQuiz();
        return;
    }
    clearInterval(timeinterval);
    timeleft = 30;
    timerel.textContent = timeleft;
    startTimer();
    const currentquiz = quizdata[currentquestion];
    questionel.textContent = currentquiz.question;
    optionsel.innerHTML = '';
    currentquiz.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.onclick = () => checkanswer(option);
        optionsel.appendChild(button);
    })
}

function checkanswer(checkoption) {
    if (checkoption === quizdata[currentquestion].answer) {
        score++;
    }
    currentquestion++;
    loadquestion();
}

function startTimer() {
    timeinterval = setInterval(() => {
        timeleft--;
        timerel.textContent = timeleft;
        if (timeleft <= 0) {
            clearInterval(timeinterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz(){
    clearInterval(timeinterval);
    questionel.style.display='none';
    optionsel.style.display='none';
    resultel.style.display='block';
    scoreel.textContent=score;
    restartel.style.display='block';
}

restartel.addEventListener('click',()=>{
    currentquestion=0;
    score=0;
    timeleft=30;
    timerel.textContent=timeleft;
    questionel.style.display='block';
    optionsel.style.display='flex';
    resultel.style.display='none';
    restartel.style.display='none';
    shuffleArray(quizdata);
    loadquestion();
})

shuffleArray(quizdata);
loadquestion();
