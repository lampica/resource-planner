$(document).ready(function(){
	$(document).on('click', '.clickable', function(){
		// Get month and member for clicked cell
		var month = $(this).attr('data-month');
		var member = $(this).attr('data-member');
		
		getMonthlyTable(month, member);
	})
	$(document).on('click', '.editable', function(){
		$(this).closest('div').attr('contenteditable', 'true');
	})
});

function showMontlyTable()
{
	// Show the popup <div> with table
	$("#monthly-content").css("display", "block");

	// When click on (x), close it
	$(document).on('click', '.popup-close', function(){
		$("#monthly-content").css("display", "none");
	});

	// When click outside of the popup, close it
	$(window).on('click', function(event) {
		if (event.target.id == 'monthly-content') {
			$("#monthly-content").css("display", "none");
		}
	});
}

function getMonthlyTable(month, member)
{
	getMonthlyTableCaption(month, member);
	getMonthlyTableHeader(month);
	getMonthlyTableBody(member, month);
	showMontlyTable();
}

function getMonthlyTableCaption(month, member){
	var year = $('#years option:selected').val();

	// Caption in form 'Apr 2014 (Little Prince)'
	$(".popup-title").html(getMonthName(month) + ' ' + year + ' ' + '(' + member +')');
}

function getMonthlyTableHeader(month){
	// Get all Mondays for month 
	mondayList = getMondays(month);
	
	var tableRow ='<tr>';
	// First cell in row - 'Project(s)'
	tableRow += '<th>Projects(s)</th>';
	// Other cells in row are Mondays in format '4.1.'
	for (var monday in mondayList) {
		tableRow += '<th>' + mondayList[monday] + '.' + month + '.' + '</th>';
	}
	tableRow += '</tr>';
	$("#monthly-head").html(tableRow);
}

function getMonthlyTableBody(member, month) {
	var team = $('#teams option:selected').val();
	
	var tableRows = "";
	tableRows += '<tr>';
	// First cell in row - 'Available'
	tableRows += '<td>Available</td>';
	// Other cells in row are fixed for value 5
	for (var monday in mondayList) {
		tableRows += '<td>';
		tableRows += '<div class="editable" data-available="' + mondayList[monday] + '">' + toFixedFloat(5, 1) + '</div>'
		tableRows += '</td>';
	}	
	tableRows += '</tr>';
	
	// All team projects
	var tx = db.transaction("projects", "readonly");
	var store = tx.objectStore("projects");
	var index = store.index("team");
	var request = index.openCursor(IDBKeyRange.only(parseInt(team)));
	
	request.onsuccess = function() {
		var cursor = request.result;
		if (cursor) {			
			tableRows += '<tr>';
			// First cell in row is project title
			tableRows += '<td>' + cursor.value.title + '</td>';
			for (var monday in mondayList) 
			{
				// Other cells in row are default value '-'
				tableRows += '<td>'
				tableRows += '<div class="editable" data-project="' + cursor.value.id + '" data-monday="' + mondayList[monday] +'">-</div>';
				tableRows += '</td>';
			}	
			tableRows += '</tr>';
			cursor.continue();
		}
		else
		{
			$("#monthly-body").html(tableRows);
			getMonthlyWorkinghours(member, month);
		}
	};
}

function getMonthlyWorkinghours(member, month) 
{
	var year = $('#years option:selected').val();
	
	// Working hours for member, month and year
	var tx = db.transaction("workhours", "readonly");
	var store = tx.objectStore("workhours");
	var index = store.index("workhours");
	
	var range = IDBKeyRange.only([member, parseInt(month), parseInt(year)]);
	var request = index.openCursor(range);
	request.onsuccess = function() {
		var cursor = request.result;
		if (cursor) {		
			// Set work hour in corresponding cell
			var cell = $('div[data-project="' + cursor.value.project.id + '"][data-monday="' + cursor.value.date.monday +'"]');
			$(cell).html(toFixedFloat(cursor.value.hours, 1));
			cursor.continue();
		}
		else
		{
			getMonthlyTableTotal();
		}
	};
}

function getMonthlyTableTotal()
{
	var tableRow = '<tr>';
	// First cell in row is 'Utilization'
	tableRow += '<td class="footer">Utilization</td>';
	
	for (var monday in mondayList) {
		var availableHours = $('div[data-available="' + mondayList[monday]+ '"]');
		var workHours = $('div[data-monday="' + mondayList[monday]+ '"]');
	
		var available = availableHours[0].innerHTML;
		var utilization = '-';
		var sum = 0;
		for(var i = 0; i < workHours.length; i ++) {
			if (!isNaN(workHours[i].innerHTML))
			{
				sum += parseInt(workHours[i].innerHTML);
			}
		}
		if(isNaN(availableHours[0].innerHTML) != '-')
		{
			utilization = toPercent(sum/availableHours[0].innerHTML);
		}	
		// Other cells in row are calculated as a percentage for available and work hours
		tableRow += '<td class="footer">' + utilization + '</td>';
	}
	tableRow += '</tr>';
	$("#monthly-footer").html(tableRow);
}

function getMondays(month) {
	var year = $('#years option:selected').val();
	
	// Set first day for month 
	var day = 1;
	// Index of month starts with 0
	var datemonth = parseInt(month) - 1;
    var d = new Date(year, datemonth, day);
    var mondays = [];

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
        d.setDate(++day);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() == datemonth) {
        mondays.push(day);
		day += 7
        d.setDate(day);
    }

    return mondays;
}

