var rawRows = null;
var currentRowIndex = 0;
var rowsAsHtml = null;


var search = function() {
    var results = []
    var searchtext = document.getElementById("searchtext").value.toLowerCase();
    for (var index in rawRows) {
	var rawRow = rawRows[index];
	var found = false;
	for (var responseIndex in rawRow) {
	    var value = rawRow[responseIndex].toLowerCase();
	    if (value.indexOf(searchtext) >= 0) {
		found = true;
		break;
	    }
	}
	if (found) {
	    var internalIndex = index-1;
	    //results.push(index);
	    results.push('<li><button class="btn btn-link" onclick="displayIndex('+internalIndex+')">'+index+'</button></li>');
	}
    }
    //console.log("results: "+results);

    results.join('');
    $('#results').html('<ul>'+results.join('')+'</ul>');
}


var displayIndex = function(index) {

    var length = rowsAsHtml.length;
    if (index < 0 || index >= length) {
	alert("out of range!");
	return;
    }
    currentRowIndex = index;
    displayCurrentRow();

};

var displaySpecified = function() {
    var textinput = document.getElementById("jumpto_input");
    var page = parseInt(textinput.value) - 1;
    textinput.value = '';
    displayIndex(page);
}

var displayPrevious = function() {
    if (currentRowIndex > 0) {
	currentRowIndex = currentRowIndex - 1;
	displayCurrentRow();
    }
    else {
	alert("already on the first one!");
    }
}


var displayNext = function() {
    var length = rowsAsHtml.length;
    if (currentRowIndex < length -1) {
	currentRowIndex = currentRowIndex + 1;
	displayCurrentRow();
    }
    else {
	alert("already on the last one!");
    }
}


var displayCurrentRow = function() {

    $('#results').html(rowsAsHtml[currentRowIndex].join(''));
    $('#pagenumber').html("Viewing " + (currentRowIndex+1) + " of "+rowsAsHtml.length);
};

var formatRows = function(result) {

    var rows = result.data;
    rawRows = rows;

    var length = rows.length;

    var headers = rows[0];


    var htmlRowLines = [];
    for (var rowKey in rows) {
	if (rowKey == 0) {
	    continue;
	}

	var htmlLines = [];
	htmlLines.push('<div id="row'+rowKey+'">');
	htmlLines.push('<ul>');
	var row = rows[rowKey];
	for (var cellKey in headers) {
	    if (cellKey == 'A') {
		continue;
	    }

	    var headerCell = headers[cellKey];
	    var dataCell = row[cellKey] || "No answer";
	    htmlLines.push('<li>');
	    htmlLines.push('<div class="question">'+headerCell+'</div>');
	    htmlLines.push('<div class="response">'+dataCell+'</div>');
	    htmlLines.push('</li>');
	}
	htmlLines.push('</ul>')
	htmlLines.push('</div>')
	htmlRowLines.push(htmlLines);
    }

    return htmlRowLines;
};


