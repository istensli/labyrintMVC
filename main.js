// Ta utgangspunkt i koden under som lager en modell for en 3×3 labyrint. (3×3 rom).
//  Gå videre med dette og lag funksjonen updateView() som leser modellen og lager HTML
//   for en tabell (med <TABLE> <TR> <TD>) og riktige css klasser
//      - ut fra feltet type i hvert objekt i modellen under.





var mazeModel = {
    size: 2,
    rows: [
        [
            { isHigh: false, isWide: false, isOpen: false },
            { isHigh: false, isWide: true, isOpen: false },
            { isHigh: false, isWide: false, isOpen: false },
            { isHigh: false, isWide: true, isOpen: false },
            { isHigh: false, isWide: false, isOpen: false },
        ],
        [
            { isHigh: true, isWide: false, isOpen: false },
            { isHigh: true, isWide: true },
            { isHigh: true, isWide: false, isOpen: false },
            { isHigh: true, isWide: true },
            { isHigh: true, isWide: false, isOpen: false },
        ],
        [
            { isHigh: false, isWide: false, isOpen: false },
            { isHigh: false, isWide: true, isOpen: false },
            { isHigh: false, isWide: false, isOpen: false },
            { isHigh: false, isWide: true, isOpen: false },
            { isHigh: false, isWide: false, isOpen: false },
        ],
        [
            { isHigh: true, isWide: false, isOpen: false },
            { isHigh: true, isWide: true},
            { isHigh: true, isWide: false, isOpen: false },
            { isHigh: true, isWide: true },
            { isHigh: true, isWide: false, isOpen: false },
        ],
        [
            { isHigh: false, isWide: false, isOpen: false },
            { isHigh: false, isWide: true, isOpen: false },
            { isHigh: false, isWide: false, isOpen: false },
            { isHigh: false, isWide: true, isOpen: false },
            { isHigh: false, isWide: false, isOpen: false },
        ],
    ]
};

let newModel = {};






initModel(6);

//Controller

//Denne funksjonen er alt for lang og burde deles opp i mindre funksjoner..
function initModel(labyrintSize){
    newModel.size = labyrintSize;
    newModel.rows = [];
   
    let exitArrayTop = [];
    let exitArrayBottom = [];
    let exitArrayLeft = [];
    let exitArrayRight = [];

    let numberOfColumnsAndRows = labyrintSize * 2 + 1;
    for(let i = 0; i< numberOfColumnsAndRows; i++){
        newModel.rows[i] = [];
        for(let j = 0; j< numberOfColumnsAndRows; j++){
            newModel.rows[i][j] = {};
            if(i % 2 != 0) newModel.rows[i][j].isHigh = true;
            else newModel.rows[i][j].isHigh = false;

            if(j % 2 != 0) newModel.rows[i][j].isWide = true;
            else newModel.rows[i][j].isWide = false;
            
            let isNotRoom = !((i % 2 != 0) && j % 2 != 0);
            let isOuterWall = (i == numberOfColumnsAndRows - 1) || (i == 0) || (j == numberOfColumnsAndRows - 1) || (j == 0);
            let isSmall = !newModel.rows[i][j].isWide && !newModel.rows[i][j].isHigh;
            
            if(isNotRoom) newModel.rows[i][j].isOpen = false;

            if(isNotRoom && !isOuterWall && !isSmall){
                let randomNumber = Math.floor(Math.random() * 2);
                if(randomNumber == 0) newModel.rows[i][j].isOpen = true;
                else newModel.rows[i][j].isOpen = false; 

            }
            //utganger
            if(isOuterWall){
                
                let currentObject = newModel.rows[i][j];
                
                if(currentObject.isOpen != undefined && currentObject.isOpen == false && (currentObject.isWide || currentObject.isHigh && !isSmall)){
                    if(i==0) exitArrayTop.push(currentObject);
                    if(i==numberOfColumnsAndRows - 1) exitArrayBottom.push(currentObject);
                    if(j==0) exitArrayLeft.push(currentObject);
                    if(j==numberOfColumnsAndRows - 1) exitArrayRight.push(currentObject);


                }
            }


        }
    }

    let randomIndexTop = Math.floor(Math.random() * exitArrayTop.length);
    let randomIndexBottom = Math.floor(Math.random() * exitArrayBottom.length);
    let randomIndexLeft = Math.floor(Math.random() * exitArrayLeft.length);
    let randomIndexRight = Math.floor(Math.random() * exitArrayRight.length);
    let randomTopOrSides = Math.floor(Math.random() * 2);
    if(randomTopOrSides == 0){
        exitArrayTop[randomIndexTop].isOpen = true;
        exitArrayBottom[randomIndexBottom].isOpen = true;
    }
    else if(randomTopOrSides == 1){
        exitArrayLeft[randomIndexLeft].isOpen = true;
        exitArrayRight[randomIndexRight].isOpen = true;

    }
    
    updateView(newModel);
    
}




function setExits(){
    //tom funksjon..
}




function klikk(row, column){
    if(newModel.rows[row][column].isOpen) newModel.rows[row][column].isOpen = false;
    else newModel.rows[row][column].isOpen = true;

    updateView(newModel);

}



//View

updateView(newModel);

function updateView(labyrintModel){

    let numberOfRowsAndColumns = labyrintModel.size * 2 + 1;

    let html = "<table>";
    for(let i = 0; i < numberOfRowsAndColumns;i++){
        html += "<tr>";
        for(let j = 0; j < numberOfRowsAndColumns; j++){
           
        console.log(getClasses(labyrintModel.rows[i][j], i, j));
           html += /*HTML*/`<td class="${getClasses(labyrintModel.rows[i][j], i, j)}" onclick="klikk(${i}, ${j})"> </td>`; 

        }
        html += "</tr>";

    }


    document.getElementById('app').innerHTML = html;
} 

function getClasses(tableObject, row, column){
    let classes = "";
    if(tableObject.isHigh) classes += "high ";
    if(tableObject.isWide) classes += "wide ";
    if(!tableObject.isWide) classes += "small ";
    if(!tableObject.isHigh) classes += "low ";
    if((row+1) % 2 == 0 && (column+1) % 2 == 0) classes += "room ";
    else if(!tableObject.isOpen) classes += "wall ";
    if(tableObject.isOpen) classes += "noWall ";

    

    classes = classes.trim();
    return classes;

}