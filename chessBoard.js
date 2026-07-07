/*
Write a program that creates a string that represents an 8×8 grid, 
using newline characters to separate lines. 
At each position of the grid there is either a space or a "#" character. 
The characters should form a chessboard.

Passing this string to console.log should show something like this:

 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # #
*/

let board = "";

for(let i = 0; i < 8; i++){
    for(let e =0; e < 8; e++){
        if(i % 2 == 0){
            board += (e % 2 === 0) ? " " : "#"
        }else{
            board += (e % 2 === 0) ? "#" : " "
        }
        
    }
    board += "\n";
}

console.log(board)