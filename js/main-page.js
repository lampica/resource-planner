$(document).ready(function(){
/* Open database*/
	var request = window.indexedDB.open('resourceDB', 1);
	
	request.onupgradeneeded = function(e)
	{
		db = e.target.result;	
		if(!db.objectStoreNames.contains('teams'))
		{
			// {id, title}
			var teamStore = db.createObjectStore("teams", {keyPath:"id", autoincrement:false});
			teamStore.createIndex("title", "title", {unique:true});
		}
		if(!db.objectStoreNames.contains("projects"))
		{
			// {id, title, team {id, title}}
			var projectStore = db.createObjectStore("projects", {keyPath:"id", autoincrement:false})
			projectStore.createIndex("title", "title", {unique:true});
			projectStore.createIndex("team", "team.id", {unique:false});
		}
		if(!db.objectStoreNames.contains("members"))
		{
			// {id, name, team {id, title}}
			var memberStore = db.createObjectStore("members", {keyPath:"id", autoincrement:false})
			memberStore.createIndex("name", "name", {unique:false});
			memberStore.createIndex("team", "team.id", {unique:false});
		}
		if(!db.objectStoreNames.contains("workhours"))
		{
			// {id, hours, member {id, name}, date {year, month, monday}, project {id, title}}
			var workhoursStore = db.createObjectStore("workhours", {keyPath:"id", autoincrement:false});
			workhoursStore.createIndex("workhours", ["member.name", "date.month", "date.year"]);
		}
	}
	
	request.onsuccess = function(e)
	{
		console.log("success");
		db = e.target.result;
		setYears();
		setMonths();
		loadTeamList();
		loadYearList();
	}
	
	request.onerror = function(e)
	{
		console.log("error");
	}
});

function loadTeamList() {
	var transaction = db.transaction(["teams"], "readonly");
    var objectStore = transaction.objectStore("teams");
	var cursor = objectStore.openCursor();
	
	var teamList = '<option class="placeholder" selected disabled value="0">Select team</option>';
	cursor.onsuccess = function(e) {
		var res = e.target.result;
		if(res) {
			teamList += '<option value="'+ res.value.id +'">' + res.value.title + '</option>';
			res.continue();
		}
		$('#teams').html(teamList);
	}
}

function loadYearList() {
	var options = '<option class="placeholder" selected disabled value="0">Select year</option>';
	for (var index in yearList) {
		options += '<option value="'+ yearList[index] +'">' + yearList[index] + '</option>';
	}
	$('#years').html(options);
}

function collapseFilter()
{
	// Toggle between hiding and showing the filter body
	if ($('#filter-body').css('height') == "60px") {
		$('#filter-title').html('+ Filter');
		$('#filter-body').css('height', '0px');
	} else {
		$('#filter-title').html('- Filter');
		$('#filter-body').css('height', '60px');
	}
}

function setYears()
{
	yearList = [2014, 2015, 2016, 2017, 2018];
}

function setMonths()
{
	monthList = [{name:'Jan', val: 1},
				{name:'Feb', val: 2},
				{name:'Mar', val: 3},
				{name:'Apr', val: 4},
				{name:'Maj', val: 5},
				{name:'Jun', val: 6},
				{name:'Jul', val: 7},
				{name:'Aug', val: 8},
				{name:'Sep', val: 9},
				{name:'Okt', val: 10},
				{name:'Nov', val: 11},
				{name:'Dec', val: 12}];
}

function getMonthName(val)
{
	var name = "";
	for (var index in monthList) 
	{
		if (monthList[index].val == val)
		{
			name = monthList[index].name;
			break;
		}
	}
	return name;
}