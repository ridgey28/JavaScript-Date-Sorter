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

		table.classList.add("table");
		tblHeader.innerHTML = "<tr><td>Name</td><td>Birth Date</td></tr>";
		table.appendChild(tblHeader);
		list.forEach((element) => {
			console.log(typeof element);
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
	data.forEach((element) => {
		arr.push(element.value);
	});
	list.push(arr);
	localStorage.setItem("JSListDate", JSON.stringify(list));
};
document.getElementById("userData").addEventListener("submit", handleSubmit);

//Calculate age
