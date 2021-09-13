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
        if ((!gameBoard.gameBoardContent[0] == '') && gameBoard.gameBoardContent[0] == gameBoard.gameBoardContent[1] &&
        gameBoard.gameBoardContent[1] == gameBoard.gameBoardContent[2]) {
            alert('WinOne');
            gameBoard.clear();
            renderBoard.clearBoard();
            renderBoard.newBoard();
            addListeners();
            return true;
        }
        else if ((!gameBoard.gameBoardContent[3] == '') && gameBoard.gameBoardContent[3] == gameBoard.gameBoardContent[4] &&
        gameBoard.gameBoardContent[3] == gameBoard.gameBoardContent[5]) {
            alert('WinTwo');
            gameBoard.clear();
            renderBoard.clearBoard();
            renderBoard.newBoard();
            addListeners();
            return true;
        }
        else if ((!gameBoard.gameBoardContent[6] == '') && gameBoard.gameBoardContent[6] == gameBoard.gameBoardContent[7] &&
        gameBoard.gameBoardContent[6] == gameBoard.gameBoardContent[8]) {
            alert('WinThree');
            gameBoard.clear();
            renderBoard.clearBoard();
            renderBoard.newBoard();
            addListeners();
            return true;
        }
        else if ((!gameBoard.gameBoardContent[0] == '') && gameBoard.gameBoardContent[0] == gameBoard.gameBoardContent[3] &&
        gameBoard.gameBoardContent[3] == gameBoard.gameBoardContent[6]) {
            alert('WinFour');
            gameBoard.clear();
            renderBoard.clearBoard();
            renderBoard.newBoard();
            addListeners();
            return true;
        }
        else if ((!gameBoard.gameBoardContent[1] == '') && gameBoard.gameBoardContent[1] == gameBoard.gameBoardContent[4] &&
        gameBoard.gameBoardContent[1] == gameBoard.gameBoardContent[7]) {
            alert('WinFive');
            gameBoard.clear();
            renderBoard.clearBoard();
            renderBoard.newBoard();
            addListeners();
            return true;
        }
        else if ((!gameBoard.gameBoardContent[2] == '') && gameBoard.gameBoardContent[2] == gameBoard.gameBoardContent[5] &&
        gameBoard.gameBoardContent[2] == gameBoard.gameBoardContent[8]) {
            alert('WinSix');
            return true;
        }
        else if ((!gameBoard.gameBoardContent[0] == '') && gameBoard.gameBoardContent[0] == gameBoard.gameBoardContent[4] &&
        gameBoard.gameBoardContent[0] == gameBoard.gameBoardContent[8]) {
            alert('WinSeven');
            gameBoard.clear();
            renderBoard.clearBoard();
            renderBoard.newBoard();
            addListeners();
            return true;
        }
        else if ((!gameBoard.gameBoardContent[2] == '') && gameBoard.gameBoardContent[2] == gameBoard.gameBoardContent[4] &&
        gameBoard.gameBoardContent[4] == gameBoard.gameBoardContent[6]) {
            alert('WinEight');
            gameBoard.clear();
            renderBoard.clearBoard();
            renderBoard.newBoard();
            addListeners();
            return true;
        }
        else if (!gameBoard.gameBoardContent.includes('')) {
            alert('TIE!');
            gameBoard.clear();
            renderBoard.clearBoard();
            renderBoard.newBoard();
            addListeners();
            return true;
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