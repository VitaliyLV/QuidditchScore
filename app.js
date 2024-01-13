let leftScoreNum = 0;
let rightScoreNum = 0;
const goalScore = 10;
const catchCore = 150;
let leftTeamCatch = false;

const leftScore = document.querySelector('#leftScore');
const rightScore = document.querySelector('#rightScore');
const congratsMess = document.querySelector('#congrats');
const leftAddButton = document.querySelector("#leftAdd");
const rightAddButton = document.querySelector("#rightAdd");
const leftCatchButton = document.querySelector('#leftCatch');
const rightCatchButton = document.querySelector('#rightCatch');
const startNewButton = document.querySelector('#newGame');

leftAddButton.addEventListener('click', addLeftScore);
rightAddButton.addEventListener('click', addRightScore);

leftCatchButton.addEventListener('click', leftCatchScore);
leftCatchButton.addEventListener('click', endTheGame);
leftCatchButton.addEventListener('click', displayCongrats);

rightCatchButton.addEventListener('click', rightCatchScore);
rightCatchButton.addEventListener('click', endTheGame);
rightCatchButton.addEventListener('click', displayCongrats);

startNewButton.addEventListener('click', startNewGame);
startNewButton.addEventListener('click', removeAllScores);

removeAllScores();

function addLeftScore(){
    leftScoreNum += goalScore;
    leftScore.textContent=leftScoreNum;
}
function addRightScore(){
    rightScoreNum += goalScore;
    rightScore.textContent=rightScoreNum;
}

function leftCatchScore(){
    leftScoreNum += catchCore;
    leftScore.textContent = leftScoreNum;
    leftTeamCatch = true;
}
function rightCatchScore(){
    rightScoreNum += catchCore;
    rightScore.textContent=rightScoreNum;
    leftTeamCatch = false;
}
function endTheGame(){
    changeButtonsState(false);
}
function startNewGame(){
   changeButtonsState(true);
}
function changeButtonsState(enabled){
    leftAddButton.disabled = !enabled;
    rightAddButton.disabled = !enabled;
    leftCatchButton.disabled = !enabled;
    rightCatchButton.disabled = !enabled;
}
function removeAllScores(){
    leftScoreNum=0;
    leftScore.textContent=leftScoreNum;
    rightScoreNum = 0;
    rightScore.textContent = rightScoreNum;
    congratsMess.textContent = '';
    leftScore.classList.remove('winScore', 'loseScore');
    rightScore.classList.remove('loseScore', 'winScore');
}
function displayCongrats(){
    let mess = 'team wins!';
    let leftWon = false;
    if(leftScoreNum === rightScoreNum && leftTeamCatch){
        //equal but left caught the Snitch
        leftWon = true;
    }
    if(leftScoreNum > rightScoreNum || leftWon){
        mess = "Left "+ mess;
        leftScore.classList.add('winScore');
        rightScore.classList.add('loseScore');
    }
    else{
        mess = "Right " + mess;
        rightScore.classList.add('winScore');
        leftScore.classList.add('loseScore');
    }
    congratsMess.textContent = mess;
}