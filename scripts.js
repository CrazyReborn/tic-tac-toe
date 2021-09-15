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

const gameController = (() => {
    const playerOne = playerFactory('name', 'X');
    const playerTwo = playerFactory('name', 'O');

    let winStatus = false;

    document.querySelector('#submit-button').addEventListener('click', e => {
        playerOne.name = document.querySelector('#player-one-name').value;
        playerTwo.name = document.querySelector('#player-two-name').value;
        e.preventDefault();
    });

    let activePlayer = playerOne;
            function turn() {
                if (activePlayer == playerOne) {
                    activePlayer = playerTwo;
                }
                else {
                    activePlayer = playerOne;
                }
            };

    document.querySelector('#start').addEventListener('click', e => {
        updateDisplay();

            const buttonReset = document.querySelector('#clear');
            buttonReset.addEventListener('click', e => {
                gameBoard.clear();
                renderBoard.clearBoard();
                renderBoard.newBoard();
                document.querySelector('#display').firstElementChild.textContent = '';
                playerOne.name = document.querySelector('#player-one-name').value = '';
                playerTwo.name = document.querySelector('#player-two-name').value = '';
                addListeners();
                e.target.style.display = 'none';
            });

            function updateDisplay() {
                document.querySelector('#display').firstElementChild.textContent = `It's now ${activePlayer.name}'s turn.'`
            };
            
            function checkWin() {
                const winCombo = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
                for (let i = 0; i < 8; i++) {
                    const combo = winCombo[i];
                    let one = gameBoard.gameBoardContent[combo[0]];
                    let two = gameBoard.gameBoardContent[combo[1]];
                    let three = gameBoard.gameBoardContent[combo[2]];
                    if ((one === '') || (two === '') || (three === '')) {
                        continue;
                    } 
                    else if (one == two && one == three) {
                        document.querySelector('#display').firstElementChild.textContent = `${activePlayer.name} WINS!`;
                        winStatus = true;
                        document.querySelector('#clear').style.display = 'inline-block';
                    }
                    else if (!gameBoard.gameBoardContent.includes('') && (one != two && one != three)) {
                        document.querySelector('#display').firstElementChild.textContent =`IT's A TIE BETWEEN ${playerOne.name} and ${playerTwo.name}!`;
                        winStatus = true;
                        document.querySelector('#clear').style.display = 'inline-block';
                        break;
                    }
                }
            };
            function addListeners() {
                document.querySelectorAll('#cell').forEach(e => {
                    e.addEventListener('click', function() {
                        if (activePlayer.key && !e.getAttribute('data-changed', true)) {
                            e.firstElementChild.textContent = activePlayer.key;
                            e.setAttribute('data-changed', true);
                            gameBoard.gameBoardContent.splice(e.getAttribute('data-element'), 1, e.firstElementChild.textContent);
                        } else if (e.getAttribute('data-changed', true)) {
                            alert("STOP! YOU VIOLATED THE LAW!");
                        }
                        checkWin();
                        if (!winStatus) {
                            turn();
                            updateDisplay();
                        }
                        });
                    });
            };
            addListeners();
        });
        return {playerOne, playerTwo};
})();