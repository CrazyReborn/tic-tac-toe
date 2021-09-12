const gameBoard = (() => {
    const gameBoardContent = ['', '', '', '', '', '', '', '', ''];
   return {gameBoardContent}
})();

const renderBoard = (() => {
    return gameBoard.gameBoardContent.forEach((e, index) => {
        const cellContent = document.createElement('p');
        const cellDiv = document.createElement('div');
        cellContent.textContent = e;
        document.querySelector('.gameboard').appendChild(cellDiv);
        cellDiv.appendChild(cellContent);
        cellDiv.setAttribute('id', 'cell');
        cellDiv.setAttribute('data-element', e);
        cellDiv.setAttribute('data-element', index);
    });
})();

const playerFactory = (name, key) => {
    return {name, key};
};

/*
const playerOne = playerFactory('P1', 'X');
const playerTwo = playerFactory('P2', 'O');
*/

const gameController = (() => {
    document.querySelectorAll('#cell').forEach(e => {
        e.addEventListener('click', function() {
            if (document.querySelector('#playerOne').checked && !e.getAttribute('data-changed', true)) {
                e.firstElementChild.textContent = 'X';
                gameBoard.gameBoardContent.splice(e.getAttribute('data-element'), 1, e.firstElementChild.textContent);
                e.setAttribute('data-changed', true)
            } else if (document.querySelector('#playerTwo').checked && !e.getAttribute('data-changed', true)) {
                e.firstElementChild.textContent = 'O';
                gameBoard.gameBoardContent.splice(e.getAttribute('data-element'), 1, e.firstElementChild.textContent);
                e.setAttribute('data-changed', true);
            } else {
                alert("STOP! YOU VIOLATED THE LAW!");
            }
        
        });
    });
    for (let i = 0; i < gameBoard.gameBoardContent.length; i +3) {
        if (gameBoard.gameBoardContent[i] == gameBoard.gameBoardContent[i+1] && gameBoard.gameBoardContent[i] == gameBoard.gameBoardContent[i+2]) {
            alert('You WIN!');
        } else if (gameBoard.gameBoardContent[i] == '' || gameBoard.gameBoardContent[i+1] == '' || gameBoard.gameBoardContent[i+2] == '') {
            continue;
        }
    }
})();