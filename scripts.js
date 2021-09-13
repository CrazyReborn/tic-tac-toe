const gameBoard = (() => {
    let gameBoardContent = ['', '', '', '', '', '', '', '', ''];
        function clear () {
            gameBoardContent.fill('');
            return gameBoardContent;
         };
   return {clear, gameBoardContent }
})();

const renderBoard = (() => {
    function newBoard() {
        gameBoard.gameBoardContent.forEach((e, index) => {
            const cellContent = document.createElement('p');
            const cellDiv = document.createElement('div');
            cellContent.textContent = e;
            document.querySelector('.gameboard').appendChild(cellDiv);
            cellDiv.appendChild(cellContent);
            cellDiv.setAttribute('id', 'cell');
            cellDiv.setAttribute('data-element', e);
            cellDiv.setAttribute('data-element', index);
        });
    };
    function clearBoard() {
        document.querySelector('.gameboard').innerHTML = '';
    };
    newBoard();
    return {newBoard, clearBoard};
})();

const playerFactory = (name, key) => {
    return {name, key};
};

let activePlayer = 'X';

const gameController = (() => {
    function turn() {
        if (activePlayer == 'X') {
            activePlayer = 'O';
        }
        else {
            activePlayer = 'X';
        }
    };
    function checkWin() {
        const winCombo = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [0,4,6]]
        for (let i = 0; i < 7; i++) {
            const combo = winCombo[i];
            let one = gameBoard.gameBoardContent[combo[0]];
            let two = gameBoard.gameBoardContent[combo[1]];
            let three = gameBoard.gameBoardContent[combo[2]];
            if ((one === '') || (two === '') || (three === '')) {
                continue;
            }
            else if (one == two && one == three) {
                alert('WIN!');
                break;
            }
        }
    };
    function addListeners() {
        document.querySelectorAll('#cell').forEach(e => {
            e.addEventListener('click', function() {
                if (activePlayer && !e.getAttribute('data-changed', true)) {
                    e.firstElementChild.textContent = activePlayer;
                    e.setAttribute('data-changed', true);
                    gameBoard.gameBoardContent.splice(e.getAttribute('data-element'), 1, e.firstElementChild.textContent);
                } else if (e.getAttribute('data-changed', true)) {
                    alert("STOP! YOU VIOLATED THE LAW!");
                }
                checkWin();
                turn();
                });
            });
    };
    addListeners();
    return {checkWin, addListeners,turn, playerOne, playerTwo};
})();