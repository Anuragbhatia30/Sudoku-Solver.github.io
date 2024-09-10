function solve(){
    const table = document.getElementById("tables");
    const arr = [];
    for(let i=0; i<9; i++){
        let rowArray = [];
        for(let j=0; j<9; j++){
            let inputValue = table.rows[i].cells[j].querySelector('input').value;
            rowArray.push(inputValue === '' ? '.' : parseInt(inputValue));
        }
        arr.push(rowArray);
    }
    if(isValidSudoku(arr)){
        createTable2();
        if (solves(arr)) {
            console.log("Solved Array: ", arr);
            const table2 = document.getElementById("tables2");
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    let row = table2.getElementsByTagName("tr")[i];
                    row.cells[j].innerHTML = arr[i][j];
                }
            }
        }
        else {
            console.log("No solution found!");
        }
    }
    else{
        function showAlert() {
            document.getElementById('customAlert').style.display = 'block';
        }
        showAlert();
    }
}
function isValidSudoku(board) {
    let rows = Array.from({ length: 9 }, () => new Set());
    let cols = Array.from({ length: 9 }, () => new Set());
    let boxes = Array.from({ length: 9 }, () => new Set());
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let num = board[i][j];
            if (num !== '.') {
                let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
                    return false;
                }
                rows[i].add(num);
                cols[j].add(num);
                boxes[boxIndex].add(num);
            }
        }
    }
    return true;
}
function solves(arr){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(arr[i][j] == '.'){
                for(let k=1; k<=9; k++){
                    if(check(i,j,arr,k)){
                        arr[i][j] = k;
                        if(solves(arr)){
                        return true;
                        }
                        arr[i][j] = '.';
                    }
                }
                return false;
            }
        }
    }
    return true;
}
function check(i,j,arr,k){
    for(let l=0; l<9; l++){
        if(arr[i][l] == k){
            return false;
        }
        if(arr[l][j] == k){
            return false;
        }
        let startRow = 3 * Math.floor(i / 3);
            let startCol = 3 * Math.floor(j / 3);
        for(let r = startRow; r < startRow + 3; r++){
            for(let c = startCol; c < startCol + 3; c++){
                if(arr[r][c] === k){
                    return false;
                }
            }
        }
    }
    return true;
}
function createTable2() {
    const table2 = document.createElement('table');
    table2.id = "tables2";  // Set the ID of the table
    table2.border = "1";
    table2.classList.add("tablestyle2");
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            cell.innerHTML = ''; 
            row.appendChild(cell); 
        }

        table2.appendChild(row); 
    }
    const container = document.getElementById('tableContainer');
    container.innerHTML = '';  
    container.appendChild(table2);
}
function reset(){
    const inputBox = document.getElementById("inputvalue");
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            let cellId = 'cell-' + i + '-' + j;
            let cell = document.getElementById(cellId);
            const table2 =document.getElementById("tables");
            cell.value = (""); 
        }
    }
}
function hideAlert() {
    document.getElementById('customAlert').style.display = 'none';
}