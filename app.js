let leftScoreNum = 0;
let rightScoreNum = 0;
const goalScore = 10;
const catchCore = 150;
let leftTeamCatch = false;
const faculties = ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'];

let leftImgNum = 0;
let rightImgNum = 0;

const leftScore = document.querySelector('#leftScore');
const rightScore = document.querySelector('#rightScore');
const congratsMess = document.querySelector('#congrats');
const leftSelect = document.querySelector('#leftSelect');
const rightSelect = document.querySelector('#rightSelect');
const leftImg = document.querySelector('#leftImg');
const rightImg = document.querySelector('#rightImg');

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
addOptions();

leftSelect.addEventListener('change', leftSelectChanged);
rightSelect.addEventListener('change', rightSelectChanged);

function leftSelectChanged(){
    if(leftSelect.selectedIndex !== rightSelect.selectedIndex){
        const imgUrl = faculties[leftSelect.selectedIndex];
        leftImg.src = `images/${imgUrl}.jpg`;
        leftImgNum = leftSelect.selectedIndex;
    }
    else{
        leftSelect.selectedIndex = leftImgNum;
    }
}
function rightSelectChanged(){
    if(leftSelect.selectedIndex !== rightSelect.selectedIndex){
        const imgUrl = faculties[rightSelect.selectedIndex];
        rightImg.src = `images/${imgUrl}.jpg`;
        rightImgNum = rightSelect.selectedIndex;
    }
    else{
        rightSelect.selectedIndex = rightImgNum;
    }
}
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

function addOptions(){
    let i = 0;
    for(let ft of faculties){
        const opt = createOption(i);
        leftSelect.appendChild(opt);

        const opt2 = createOption(i);
        rightSelect.appendChild(opt2);
        i++;
    }
    leftImgNum = 0;
    leftSelect.selectedIndex = 0;
    rightImgNum = 3;
    rightSelect.selectedIndex = 3;
    leftSelectChanged();
    rightSelectChanged();
}
function createOption(i){
    const opt = document.createElement('option');
    opt.value = faculties[i];
    opt.textContent = faculties[i];
    return opt;
}