const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let currentEtnia = null;
let cultura = 50;
let territorio = 50;
let bem_estar = 50;

let player = { x: 100, y: 100, speed: 5 };

const backgrounds = {
    guarani: 'assets/guarani_bg.png',
    yanomami: 'assets/yanomami_bg.png',
    mapuche: 'assets/mapuche_bg.png',
    qom: 'assets/qom_bg.png'
};

const challenges = {
    guarani: [{ text: "Os colonos querem ocupar sua terra. O que faz?", options: ["Negociar", "Resistir", "Fugir"] }],
    yanomami: [{ text: "Garimpeiros invadiram sua floresta. O que faz?", options: ["Denunciar", "Resistir", "Fugir"] }],
    mapuche: [{ text: "Colonizadores exigem suas terras. O que faz?", options: ["Resistir", "Negociar", "Fugir"] }],
    qom: [{ text: "Foram forçados a migrar. O que faz?", options: ["Aceitar", "Resistir", "Negociar"] }]
};

function startGame(etnia) {
    currentEtnia = etnia;
    document.getElementById('menu').style.display = 'none';
    gameLoop();
    showChallenge();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let bg = new Image();
    bg.src = backgrounds[currentEtnia];
    bg.onload = () => ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, 50, 50);

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') player.y -= player.speed;
    if (event.key === 'ArrowDown') player.y += player.speed;
    if (event.key === 'ArrowLeft') player.x -= player.speed;
    if (event.key === 'ArrowRight') player.x += player.speed;
    updateHUD();
});

function showChallenge() {
    const challenge = challenges[currentEtnia][0];
    const choice = prompt(`${challenge.text}\n${challenge.options.join(" / ")}`);
    processChoice(choice);
}

function processChoice(choice) {
    choice = choice.toLowerCase();

    if (choice.includes("negociar")) {
        territorio -= 10; bem_estar += 5;
    } else if (choice.includes("resistir")) {
        territorio += 10; bem_estar -= 10;
    } else if (choice.includes("fugir") || choice.includes("aceitar")) {
        territorio -= 20; cultura += 5;
    }

    updateHUD();
}

function updateHUD() {
    document.getElementById('cultura').textContent = cultura;
    document.getElementById('territorio').textContent = territorio;
    document.getElementById('bem_estar').textContent = bem_estar;
}