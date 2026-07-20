const questions = [
    {
        q: "What is your interest?",
        options: ["Programming", "Design", "Medical", "Teaching"]
    },
    {
        q: "What is your skill?",
        options: ["Coding", "Creativity", "Helping", "Explaining"]
    },
    {
        q: "What do you like most?",
        options: ["Apps", "Art", "Patients", "Students"]
    },
    {
        q: "Your favorite subject?",
        options: ["Computer", "Drawing", "Biology", "English"]
    },
    {
        q: "Work style?",
        options: ["Logical", "Creative", "Careful", "Friendly"]
    },
    {
        q: "Problem solving?",
        options: ["Fast coding", "Design thinking", "Helping others", "Teaching"]
    },
    {
        q: "Future goal?",
        options: ["Developer", "Designer", "Doctor", "Teacher"]
    },
    {
        q: "Preferred work?",
        options: ["Laptop", "Drawing pad", "Hospital", "Classroom"]
    },
    {
        q: "Team role?",
        options: ["Leader", "Creator", "Helper", "Guide"]
    },
    {
        q: "Dream job?",
        options: ["Software Engineer", "UI Designer", "Doctor", "Professor"]
    }
];

let step = 0;
let answers = [];

document.addEventListener("DOMContentLoaded", showQuestion);

function showQuestion(){

    if(step >= questions.length){
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) progressBar.style.width = "100%";
        sendData();
        return;
    }

    let q = questions[step];

    document.getElementById("question").innerText = q.q;

    // Update progress bar & step indicator
    const progressBar = document.getElementById("progress-bar");
    const stepIndicator = document.getElementById("step-indicator");
    if (progressBar) {
        progressBar.style.width = ((step / questions.length) * 100) + "%";
    }
    if (stepIndicator) {
        stepIndicator.innerText = `Question ${step + 1} of ${questions.length}`;
    }

    let html = "";

    q.options.forEach(opt => {
        html += `<button onclick="selectAns('${opt}')">${opt}</button>`;
    });

    document.getElementById("options").innerHTML = html;
}

function selectAns(ans){
    answers.push(ans);
    step++;
    showQuestion();
}

function sendData(){

    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ answers: answers })
    })
    .then(res => res.json())
    .then(data => {

        localStorage.setItem("result", JSON.stringify(data));

        window.location.href = "/result";

    })
    .catch(err => console.log(err));
}