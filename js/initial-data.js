function insertInitialValues(){
	addTeams();
	addProjects();
	addMembers();
	addWorkhours();
}

function addTeams() {
    //Get a transaction
    var transaction = db.transaction(["teams"],"readwrite");
    //Ask for the teamsObject
    var teamsObject = transaction.objectStore("teams");

    //Define teams
	// {id, title}
    var team1 = {
		id:10,
        title:"Absenger"
    };
	var team2 = {
		id:20,
        title:"Alicic",
    };
	var team3 = {
		id:30,
        title:"Burscher"
    };
	var team4 = {
		id:40,
        title:"Faustner"
    };

    //Add teams
	teamsObject.add(team1);
	teamsObject.add(team2);
	teamsObject.add(team3);
	teamsObject.add(team4);
}

function addProjects() {
    //Get a transaction
    var transaction = db.transaction(["projects"],"readwrite");
    //Ask for the projectsObject
    var projectsObject = transaction.objectStore("projects");

    //Define projects
	// {id, title, team {id, title}}
    var project1 = {
		id:10,
        title:"Change Certus I",
		team: {id: 10, title: "Absenger"}
    };
	var project2 = {
		id:20,
        title:"Change Certus II",
		team: {id: 10, title: "Absenger"}
    };
	var project3 = {
		id:30,
        title:"Change Certus III",
		team: {id: 10, title: "Absenger"}
    };

    //Add projects
	projectsObject.add(project1);
	projectsObject.add(project2);
	projectsObject.add(project3);
}

function addMembers() {
	//Get a transaction
    var transaction = db.transaction(["members"],"readwrite");
    //Ask for the memberObject
    var memberObject = transaction.objectStore("members");

    //Define members
	// {id, name, team {id, title}}
    var member1 = {
		id:10,
        name:"Alen Helac",
		team: {id: 10, title: "Absenger"}
    };
	var member2 = {
		id:20,
        name:"Alicic Adnan",
		team: {id: 10, title: "Absenger"}
    };
	var member3 = {
		id:30,
        name:"Anel Kalajevac",
		team: {id: 20, title: "Alicic"}
    };

    //Add members
	memberObject.add(member1);
	memberObject.add(member2);
	memberObject.add(member3);
}

function addWorkhours()
{
	//Get a transaction
    var transaction = db.transaction(["workhours"],"readwrite");
    //Ask for the workObject
    var workObject = transaction.objectStore("workhours");

    //Define workhours
	//{id, hours, member {id, name}, date {year, month, monday}, project {id, title}}
    var workhour1 = {
		id:1,
		hours:3,
		member: {id:10, name:"Alen Helac"},
        date: {year:2014, month:4, monday: 7},
		project: {id:10, title:"Change Certus I"}
    };
	var workhour2 = {
		id:2,
		hours:1,
		member: {id:10, name:"Alen Helac"},
        date: {year:2014, month:4, monday: 7},
		project: {id:20, title:"Change Certus II"}
    };
	var workhour3 = {
		id:3,
		hours:5,
		member: {id:10, name:"Alen Helac"},
        date: {year:2014, month:4, monday: 21},
		project: {id:20, title:"Change Certus II"}
    };
	var workhour4 = {
		id:4,
		hours:5,
		member: {id:20, name:"Alicic Adnan"},
        date: {year:2014, month:4, monday: 7},
		project: {id:30, title:"Change Certus III"}
    };
	
    //Add workhours
	workObject.add(workhour1);
	workObject.add(workhour2);
	workObject.add(workhour3);
	workObject.add(workhour4);
}