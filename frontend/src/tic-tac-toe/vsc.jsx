



import { useState } from 'react';

function VsComputer() {

  const [board, setBoard] = useState(Array(9).fill(null));
  //const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {

    if (board[index] || calculateWinner(board)) return;
  
    // Player's move (X)
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
  
    // Check for winner after player's move
    if (calculateWinner(newBoard)) return;
  
    // Computer's move (O)
    const computerMove = findBestMove(newBoard);
    if (computerMove !== -1) {
      newBoard[computerMove] = "O";
      setBoard(newBoard);
    }
  };
  



  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };
  
  const minimax = (board, depth, isMaximizing) => {

    const winner = calculateWinner(board);
    if (winner === "X") return -10 + depth;
    if (winner === "O") return 10 - depth;
    if (!board.includes(null)) return 0; // Draw
  
    if (isMaximizing) {

      let maxEval = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "O";
          const evaluation = minimax(board, depth + 1, false);
          board[i] = null; // Undo the move
          maxEval = Math.max(maxEval, evaluation);
        }
      }
      return maxEval;

    } else {
      let minEval = Infinity;
      for (let i = 0; i < board.length; i++) {
        
        if (board[i] === null) {
          board[i] = "X";
          const evaluation = minimax(board, depth + 1, true);
          board[i] = null; // Undo the move
          minEval = Math.min(minEval, evaluation);
        }
      }
      return minEval;
    }
  };
  
  const findBestMove = (board) => {

    let bestMove = -1;
    let bestValue = -Infinity;

    for (let i = 0; i < board.length; i++) {

      if (board[i] === null) {
        board[i] = "O"; // Computer is "O"
        const moveValue = minimax(board, 0, false);
        board[i] = null; // Undo the move
        if (moveValue > bestValue) {
          bestValue = moveValue;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };
  

  
  
  const winner = calculateWinner(board);
  //const nextPlayer = isXNext ? 'X' : 'O';

  return (

    <>

     <div className='bg-black h-screen flex flex-col  justigy-center '>
        <div className='h-full flex flex-row justify-center items-center'>

            <div className='bg-black '>
                <h1 className='text-white text-center'>Tic Tac Toe</h1>
                <div className='text-white text-center  m-4'>
                    {winner ? <h2>Winner: {winner}</h2> : <h2>game going on !</h2>}
                </div>
                <div className='h-64 w-64 grid grid-cols-3 grid-rows-3 gap-x-1 gap-y-1'>
                    {board.map((cell, index) => (
                    <button
                        key={index}
                        className= "border rounded-lg border-black bg-gray-100" 
                        onClick={() => handleClick(index)}
                    >
                        {cell}
                    </button>
                    ))}
                </div>
                <button className='border border-black rounded mt-16 bg-green-500
                                   ml-14 px-6 h-10 font-bold font-mono
                                   hover:border-4  ' onClick={() => setBoard(Array(9).fill(null))}>
                    PLAY AGAIN
                </button>
        </div>

        </div>
     </div>
    

    
    

    </>
  );
}

export default VsComputer;
