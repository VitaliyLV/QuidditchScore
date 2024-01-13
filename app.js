const leftScore = document.querySelector('#leftScore');
let leftScoreNum = 0;

const rightScore = document.querySelector('#rightScore');
let rightScoreNum = 0;
removeAllScores();

const leftAddButton = document.querySelector("#leftAdd");
leftAddButton.onclick = function(){
    leftScoreNum+=10;
    leftScore.textContent=leftScoreNum;
}
const rightAddButton = document.querySelector("#rightAdd");
rightAddButton.onclick = function(){
    rightScoreNum += 10;
    rightScore.textContent=rightScoreNum;
}

const leftCatchButton = document.querySelector('#leftCatch');
leftCatchButton.addEventListener('click', leftCatchScore);
leftCatchButton.addEventListener('click', endTheGame);

function leftCatchScore(){
    leftScoreNum+=150;
    leftScore.textContent=leftScoreNum;
}

const rightCatchButton = document.querySelector('#rightCatch');
rightCatchButton.addEventListener('click', rightCatchScore);
rightCatchButton.addEventListener('click', endTheGame);

function rightCatchScore(){
    rightScoreNum+=150;
    rightScore.textContent=rightScoreNum;
}

const startNewButton = document.querySelector('#newGame');
startNewButton.addEventListener('click', startNewGame);
startNewButton.addEventListener('click', removeAllScores);

function endTheGame(){
    changeButtonsState(false);
}
function startNewGame(){
   changeButtonsState(true);
}
function changeButtonsState(enabled){
    leftAddButton.disabled = !enabled;
    rightAddButton.disabled = !enabled;
    leftCatchButton.disabled=!enabled;
    rightCatchButton.disabled=!enabled;
}
function removeAllScores(){
    leftScoreNum=0;
    leftScore.textContent=leftScoreNum;
    rightScoreNum = 0;
    rightScore.textContent = rightScoreNum;
}