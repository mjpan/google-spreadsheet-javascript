var currentRowIndex = 0;
var rowsAsHtml = null;


var displaySpecified = function() {
    var textinput = document.getElementById("jumpto_input");
    var page = parseInt(textinput.value) - 1;
    var length = rowsAsHtml.length;
    if (page < 0 || page >= length) {
	alert("out of range!");
	return;
    }
    textinput.value = '';
    currentRowIndex = page;
    displayCurrentRow();
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


