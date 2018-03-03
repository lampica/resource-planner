function getYearlyTable()
{
	getYearlyTableCaption();
	getYearlyTableHeader();
	getYearlyTableBody();
	showYearlyTable();
}

function getYearlyTableCaption() 
{
	// Team title as caption
	var teamTitle = $('#teams option:selected').text();
	
	$('#yearly-caption').html(teamTitle);
}

function getYearlyTableHeader() 
{
	var tableHeader ='<tr>';
	// First cell of row is 'Name'
	tableHeader += '<th>Name</th>';
	// Other cells of row are month name shortcuts
	for (var index in monthList) {
		tableHeader += '<th>' + monthList[index].name + '</th>';
	}
	tableHeader += '</tr>';
	
	$("#yearly-head").html(tableHeader);
}

function getYearlyTableBody() 
{
	var team = $('#teams option:selected').val();
	var year = $('#years option:selected').val();
	
	// All team members
	var tx = db.transaction("members", "readonly");
	var store = tx.objectStore("members");
	var index = store.index("team");
	var request = index.openCursor(IDBKeyRange.only(parseInt(team)));
	
	var tableRow = "";
	request.onsuccess = function() {
	  var cursor = request.result;
	  if (cursor) {		
		tableRow += '<tr>';
		// First cell in row is member name
		tableRow += '<td>' + cursor.value.name + '</td>';
		for (var index in monthList) {
			// Other cells in row are random percentage numbers
			var val = toPercent(Math.random());
			tableRow += '<td>'
			tableRow += '<div class="clickable content" data-member = "' + cursor.value.name + '" data-month="' + monthList[index].val + '">'+ val +'</div>'
			tableRow += '</td>';
		}	
		tableRow += '</tr>';
		cursor.continue();
	  }
	  else
	  {
		$("#yearly-body").html(tableRow);
		getYearlyTableTotal();
	  }
	};
}

function showYearlyTable(){
	$("#yearly-content").css("display", "block");
}
function getWorkingHoursForMonth()
{

}	

function getYearlyTableTotal()
{
	var tableFooter = '<tr>';
	// First cell in row is 'Total'
	tableFooter += '<td class="footer">Total</td>';
	for (var month in monthList) {
		var tds = $('div[data-month="' + monthList[month].val + '"]');
		var sum = 0;	
		var nums = 0;
		var average = '-';

		// Other cells in row are calculated average value for corresponding column/month
		for(var i = 0; i < tds.length; i ++) 
		{
			var cellvalue = tds[i].innerHTML.replace('%','');
			if (!isNaN(cellvalue))
			{
				sum += parseFloat(cellvalue);
				nums++;
			}
		}
		if(nums != 0)
		{
			average	= toFixedFloat(sum/nums, 1) + '%';
		}
			
		tableFooter += '<td class="footer">' + average + '</td>';
	}
	tableFooter += '</tr>';
	$("#yearly-footer").html(tableFooter);
}
	