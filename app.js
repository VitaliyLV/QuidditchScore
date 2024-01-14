const leftTeam = {
    scoreNum: 0,
    imgNum: 0,
    score: document.querySelector('#leftScore'),
    select: document.querySelector('#leftSelect'),
    img: document.querySelector('#leftImg'),
    addButton: document.querySelector('#leftAdd'),
    catchButton: document.querySelector('#leftCatch')
}
const rightTeam ={
    scoreNum: 0,
    imgNum: 0,
    score: document.querySelector('#rightScore'),
    select: document.querySelector('#rightSelect'),
    img: document.querySelector('#rightImg'),
    addButton: document.querySelector('#rightAdd'),
    catchButton: document.querySelector('#rightCatch')
}

const goalScore = 10;
const catchCore = 150;
let leftTeamCatch = false;
const faculties = ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'];
const congratsMess = document.querySelector('#congrats');
const startNewButton = document.querySelector('#newGame');

leftTeam.addButton.addEventListener('click', () => addScore(leftTeam));
leftTeam.catchButton.addEventListener('click', () => catchScore(leftTeam));
leftTeam.catchButton.addEventListener('click', endTheGame);
leftTeam.catchButton.addEventListener('click', displayCongrats);

rightTeam.addButton.addEventListener('click', () => addScore(rightTeam));
rightTeam.catchButton.addEventListener('click', () => catchScore(rightTeam));
rightTeam.catchButton.addEventListener('click', endTheGame);
rightTeam.catchButton.addEventListener('click', displayCongrats);

startNewButton.addEventListener('click', startNewGame);
startNewButton.addEventListener('click', removeAllScores);

removeAllScores();
addOptions();

leftTeam.select.addEventListener('change', () => selectChanged(leftTeam, rightTeam));
rightTeam.select.addEventListener('change', () => selectChanged(rightTeam, leftTeam));

function selectChanged(team, oposeTeam){
    if(team.select.selectedIndex !== oposeTeam.select.selectedIndex){
        const imgUrl = faculties[team.select.selectedIndex];
        team.img.src = `images/${imgUrl}.jpg`;
        changeColor(team, team.imgNum, team.select.selectedIndex);
        team.imgNum = team.select.selectedIndex;
    }
    else{
        team.select.selectedIndex = team.imgNum;
        alert('Cannot select same teams!');
    }
}
function changeColor(team, oldNumber, newNumber){
    const oldColor = `color${oldNumber}`;
    const newColor = `color${newNumber}`;
    for(let elm of [team.select, team.addButton, team.catchButton]){
        elm.classList.remove(oldColor);
        elm.classList.add(newColor);
    }
}

function addScore(team){
    team.scoreNum += goalScore;
    team.score.textContent = team.scoreNum;
}
function catchScore(team){
    team.scoreNum += catchCore;
    team.score.textContent = team.scoreNum;
    leftTeamCatch = true;
}
function endTheGame(){
    changeButtonsState(false);
}
function startNewGame(){
   changeButtonsState(true);
}
function changeButtonsState(enabled){
    for(let team of [leftTeam, rightTeam]){
        team.addButton.disabled = !enabled;
        team.select.disabled = !enabled;
        team.catchButton.disabled = !enabled;
    }
}
function removeAllScores(){
    for(let team of [leftTeam, rightTeam]){
        team.scoreNum=0;
        team.score.textContent = team.scoreNum;
        team.score.classList.remove('winScore', 'loseScore');
    }
    congratsMess.textContent = '';
}
function displayCongrats(){
    let mess = 'team wins!';
    let leftWon = false;
    if(leftTeam.scoreNum === rightTeam.scoreNum && leftTeamCatch){
        //equal but left caught the Snitch
        leftWon = true;
    }
    if(leftTeam.scoreNum > rightTeam.scoreNum || leftWon){
        mess = "Left "+ mess;
        leftTeam.score.classList.add('winScore');
        rightTeam.score.classList.add('loseScore');
    }
    else{
        mess = "Right " + mess;
        rightTeam.score.classList.add('winScore');
        leftTeam.score.classList.add('loseScore');
    }
    congratsMess.textContent = mess;
}

function addOptions(){
    let i = 0;
    for(let ft of faculties){
        for(let team of [leftTeam, rightTeam]){
            const opt = createOption(i);
            team.select.appendChild(opt);
        }
        i++;
    }
    leftTeam.imgNum = 0;
    leftTeam.select.selectedIndex = 0;
    rightTeam.imgNum = 3;
    rightTeam.select.selectedIndex = 3;
    selectChanged(leftTeam, rightTeam);
    selectChanged(rightTeam, leftTeam);
}
function createOption(i){
    const opt = document.createElement('option');
    opt.value = faculties[i];
    opt.textContent = faculties[i];
    return opt;
}