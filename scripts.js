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

const changeMode = (() => {
    let gameMode = '';
    let compPlayed = false;
    
    return {gameMode, compPlayed};
})();

const gameController = (() => {
    const playerOne = playerFactory('name', 'X');
    const playerTwo = playerFactory('name', 'O');

    let winStatus = false;

    const modeIsPvp = document.querySelector('#change-pvp');
    const modeIsPve = document.querySelector('#change-pve');
    modeIsPvp.addEventListener('click', e=> {
        if (changeMode.gameMode != 'pvp') {
        changeMode.gameMode = 'pvp';
        e.target.style.backgroundColor = '#3ef699';
        modeIsPve.style.backgroundColor = '';
        }
    });
    modeIsPve.addEventListener('click', e=> {
        if (changeMode.gameMode != 'pve') {
            changeMode.gameMode = 'pve';
            e.target.style.backgroundColor = '#3ef699';
            modeIsPvp.style.backgroundColor = '';
            document.querySelector('#player-two-name').disabled = true;
            }
    });

    document.querySelector('#submit-button').addEventListener('click', e => {
        playerOne.name = document.querySelector('#player-one-name').value;
        playerTwo.name = document.querySelector('#player-two-name').value;
        e.preventDefault();
    });

    function computerPlays() {
        while (!changeMode.compPlayed) {
            let i = parseInt(Math.random() * 9);
            if (gameBoard.gameBoardContent[i] == '') {
                gameBoard.gameBoardContent.splice(i, 1, 'O');
                document.querySelector(`[data-element='${i}']`).firstElementChild.textContent = 'O';
                document.querySelector(`[data-element='${i}']`).setAttribute('data-changed', true);
                changeMode.compPlayed = true;
            }
        }
    };

    document.querySelector('#start').addEventListener('click', e => {
    
        if (changeMode.gameMode == 'pvp') {
            let activePlayer = playerOne;

            function turn() {
                if (activePlayer == playerOne) {
                    activePlayer = playerTwo;
                }
                else {
                    activePlayer = playerOne;
                }
            };
    
        updateDisplay();

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
            const buttonReset = document.querySelector('#clear');
            buttonReset.addEventListener('click', e => {
                gameBoard.clear();
                renderBoard.clearBoard();
                renderBoard.newBoard();
                document.querySelector('#display').firstElementChild.textContent = '';
                playerOne.name = document.querySelector('#player-one-name').value = '';
                playerTwo.name = document.querySelector('#player-two-name').value = '';
                changeMode.gameMode = 'pvp';
                changeMode.compPlayed = false;
                winStatus = false;
                e.target.style.display = 'none';
            });

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
        }

        else if (changeMode.gameMode == 'pve') {
            let activePlayer = playerOne;
            playerTwo.name = 'Computer';

            function turn() {
                if (activePlayer == playerOne) {
                    activePlayer = playerTwo;
                }
                else {
                    activePlayer = playerOne;
                }
            };
            updateDisplay();

            const buttonReset = document.querySelector('#clear');
            buttonReset.addEventListener('click', e => {
                gameBoard.clear();
                renderBoard.clearBoard();
                renderBoard.newBoard();
                document.querySelector('#display').firstElementChild.textContent = '';
                playerOne.name = document.querySelector('#player-one-name').value = '';
                changeMode.gameMode = 'pve';
                changeMode.compPlayed = false;
                winStatus = false;
                e.target.style.display = 'none';
            });
            
            
            function updateDisplay() {
                document.querySelector('#display').firstElementChild.textContent = `Your Turn!`
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
                        console.log(typeof e);
                        if (!e.getAttribute('data-changed', true)) {
                            e.firstElementChild.textContent = 'X';
                            e.setAttribute('data-changed', true);
                            gameBoard.gameBoardContent.splice(e.getAttribute('data-element'), 1, e.firstElementChild.textContent);
                        } else if (e.getAttribute('data-changed', true)) {
                        }
                        checkWin();
                        if (!winStatus) {
                            turn()
                            updateDisplay();
                            computerPlays();
                            checkWin();
                            turn();
                            changeMode.compPlayed = false;
                        }
                        });
                    });
            };
            addListeners();
        }
    });
        return {playerOne, playerTwo,computerPlays};
})();