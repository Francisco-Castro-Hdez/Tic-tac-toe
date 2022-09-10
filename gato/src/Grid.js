import React, { useState } from 'react'
import './Grid.css'

function Grid() {
    const [turn, setTurn] = useState('❌');
    const [cells, setCells] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState();


    const checkForWinner = (squares) =>{
        let combos = {
            across: [
                [0,1,2],
                [3,4,5],
                [6,7,8],
            ],
            down: [
                [0,3,6],
                [1,4,7],
                [2,5,8],
            ],
            diagonal: [
                [0,4,8],
                [6,4,2]
            ]
        };

        for (let combo in combos){
            combos[combo].forEach((pattern) => {
                if(
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === ''
                ) {
                    //Do nothing
                } else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]]);
                }
            });
        }
       
        
    }

    const handleClick = (num) => {
        let squares = [...cells];
        if (squares[num] !== ''){
            alert('NOPE!')
            return;
        }

        if (turn === '❌') {
            squares[num] = '❌'
            setTurn('⭕')
        } 
        else {
            squares[num] = '⭕'
            setTurn('❌')
        }
        setCells(squares);
        checkForWinner(squares)
    };

   const Cell = ({num}) => {
    return <td className='cell' onClick={() => handleClick(num)}>{cells[num]}</td>
   }

   const handleRestart = () => {
    setTurn(winner);
    setWinner(null);
    setCells(Array(9).fill(''))
   }

  return (
    <div className='Container'>
    <table >
        Turn: {turn}
        <tbody>
            <tr>
                <Cell num={0} />
                <Cell num={1} />
                <Cell num={2} />
            </tr>
            <tr>
                <Cell num={3} />
                <Cell num={4} />
                <Cell num={5} />
            </tr>
            <tr>
                <Cell num={6} />
                <Cell num={7} />
                <Cell num={8} />
            </tr>
        </tbody>
        {winner && (
            <>
            <p>{winner} is the winner!</p>
            <button onClick={() => handleRestart()} >Play again</button>
            </>
        )}
    </table>
    </div>
  )
}

export default Grid