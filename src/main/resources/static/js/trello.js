var todoUpdateIntervalId;

var listMap = {};
function addCardToList(listId, cardName) {
    listMap[listId] = listMap[listId] || [];
    listMap[listId].push(cardName);
}

var tableMap = {};
function addTableToMap(tableIndex, tableHtml) {
    tableMap[tableIndex] = tableHtml;
}
var rotationIndex = 0;

var loadTodo = function(focusListName){
    $.post("http://localhost:8080/mirrormirror/service/doAgentGet", "https://api.trello.com/1/boards/{trello.board}/cards?fields=name,idList&key={trello.key}&token={trello.token}",
    function(json) {
        listMap = {};
        for (index in json){
            addCardToList(json[index]['idList'], json[index]['name'])
        }
        $.post("http://localhost:8080/mirrormirror/service/doAgentGet", "https://api.trello.com/1/boards/{trello.board}/lists?fields=name,idList&key={trello.key}&token={trello.token}",
        function(listJson) {
            tableMap = {};
            for (index = 0; index < listJson.length; index++){
                var table ='<div class="bussTitle">' + listJson[index]['name'] + '</div><table class="listTable">';
                for (cardIndex in listMap[listJson[index]['id']]) {
                    table += '<tr>';
                    table += '<td>' + listMap[listJson[index]['id']][cardIndex] + '</td>';
                    table += '</tr>';
                 }
                 table += '</table>';
                 addTableToMap(index, table);

                 if (focusListName === listJson[index]['name']){
                    rotationIndex = index;
                 }
            }
            setHighlightedTable();
        });
    });
}

function setHighlightedTable(){
    var prevTable = rotationIndex - 1;
    var nextTable = rotationIndex + 1;
    if (prevTable < 0){
        prevTable = Object.keys(tableMap).length - 1;
    }
    if (nextTable >= Object.keys(tableMap).length){
        nextTable = 0;
    }
    var html = '<div class="row">';
    html += '<div id="' + prevTable + '" class="column unfocusedTable">' + tableMap[prevTable] + '</div>';
    html += '<div id="' + rotationIndex + '" class="column">' + tableMap[rotationIndex] + '</div>';
    html += '<div id="' + nextTable + '" class="column unfocusedTable">' + tableMap[nextTable] + '</div>';
    html += '</div>';
    $("#todolist").html(html);
}

function rotateNextList(){
    if (!$("#todolist").hasClass("hidden")){
        rotationIndex += 1;
        if (rotationIndex >= Object.keys(tableMap).length){
            rotationIndex = 0;
        }
        setHighlightedTable();
    }
}

function rotatePreviousList(){
    if (!$("#todolist").hasClass("hidden")){
        rotationIndex -= 1;
        if (rotationIndex < 0){
            rotationIndex = Object.keys(tableMap).length - 1;
        }
        setHighlightedTable();
    }
}

function showBoard(focusListName){
    loadTodo(focusListName);
    clearInterval(todoUpdateIntervalId);
    todoUpdateIntervalId = setInterval(loadTodo, 300000);
    $("#todolist").removeClass("hidden");
}

function hideBoard(){
   if (!$("#todolist").hasClass("hidden")){
      $("#todolist").addClass("hidden");
      clearInterval(todoUpdateIntervalId);
   }
}
