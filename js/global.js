/*
https://www.codegrepper.com/search.php?q=how%20to%20get%20all%20form%20values%20in%20javascript

//target the element and set submit event
    document.querySelector("form").addEventListener("submit", handleSubmit);

    //event function
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = [...e.currentTarget.elements]
            .filter((ele) => ele.type !== "submit")
            .map((ele) => {
                return {
                    [ele.getAttribute("name")]: ele.type === "file" ? ele.files : ele.value,
                };
            
*/
/**
 * Executes on browser load. Accesses local storage.
 */
window.onload = () => {
	if (localStorage.getItem("JSListDate")) {
		data = localStorage.getItem("JSListDate");
		list = JSON.parse(data);

		let tableContainer = document.getElementById("tableContainer"),
			table = document.createElement("table"),
			tblBody = document.createElement("tbody"),
			tblHeader = document.createElement("thead");

		table.classList.add("sortable");
		tblHeader.innerHTML =
			"<tr><th>Name</th><th>Birth Date</th><th>Age</th></tr>";
		table.appendChild(tblHeader);
		list.forEach((element) => {
			let row = document.createElement("tr");
			for (let i = 0; i < element.length; i++) {
				let cell = document.createElement("td"),
					cellText = document.createTextNode(element[i]);

				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			tblBody.appendChild(row);
		});
		table.appendChild(tblBody);
		tableContainer.appendChild(table);
	}
};

/**
 * Handles the submit button, saves to local storage
 */

let list = [];

const handleSubmit = (e) => {
	e.preventDefault();

	let arr = [],
		data = [...e.currentTarget.elements].filter((ele) => ele.type !== "submit");

	const dob = new Date(data[1].value);
	const age = CalculateAge(dob);
	data.forEach((element) => {
		arr.push(element.value);
	});
	arr.push(age);
	list.push(arr);
	localStorage.setItem("JSListDate", JSON.stringify(list));
	location.reload();
};
document.getElementById("userData").addEventListener("submit", handleSubmit);

//Calculate age
let CalculateAge = (dob) => {
	const currentDate = new Date();
	// To calculate the time difference of two dates
	const Difference_In_Time = currentDate.getTime() - dob.getTime();
	// To calculate the no. of days between two dates
	return Math.floor(Difference_In_Time / (1000 * 3600 * 24) / 365);
};

/**
 * Check age will recalculate the age in the database
 *
 * @param   {[type]}  checkAge  [checkAge description]
 * @param   {[type]}  click     [click description]
 *
 * @return  {[type]}            [return description]
 */
document.getElementById("checkAge").addEventListener("click", () => {
	if (localStorage.getItem("JSListDate")) {
		data = localStorage.getItem("JSListDate");
		list = JSON.parse(data);
		console.log(list);
		list.forEach((element) => {
			console.log(element);
			const dob = new Date(element[1]);
			element[2] = CalculateAge(dob);
		});
		localStorage.setItem("JSListDate", JSON.stringify(list));
		location.reload();
	} else {
		//display error message
	}
});
