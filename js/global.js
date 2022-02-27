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

 let row = (data) => {
	let div = document.createElement("div"),
		span = document.createElement("span"),
		classes = card.class
	div.classList.add(...classes);
	div.appendChild(span);
	player.appendChild(div);
}               
*/
/**
 * Executes on browser load. Saves the cards to local storage.
 */
window.onload = () => {
	if (localStorage.getItem("JSListDate")) {
		data = localStorage.getItem("JSListDate");
		list = JSON.parse(data);
		let tableContainer = document.getElementById("table"),
			table = document.createElement("table"),
			tr = document.createElement("tr"),
			dataRow = document.createElement("tr");

		tableContainer.appendChild(table);
		table.appendChild(tr);
		let th = "<tr><th>Name</th><th>Birth Date</th></tr>";
		tr.innerHTML = th;
		let row = [];
		list.forEach((element) => {
			let name = element[0].name,
				dob = element[1].birth_date;
			row.push(`<td>${name}</td><td>${dob}</td>`);
			console.log(row);
		});

		row.forEach((element, i) => {
			dataRow.innerHTML = `<tr>${element}</tr>`;
			table[i].appendChild(dataRow);
		});
	}
};

/**
 * 
 * let createCard = (card) => {
	let div = document.createElement("div"),
		span = document.createElement("span"),
		classes = card.class
	div.classList.add(...classes);
	div.appendChild(span);
	player.appendChild(div);
}
 * 
 */

let list = [];

const handleSubmit = (e) => {
	e.preventDefault();
	//console.log(e.currentTarget.elements);
	let data = [...e.currentTarget.elements]
		.filter((ele) => ele.type !== "submit")
		.map((ele) => {
			return {
				[ele.getAttribute("name")]: ele.value,
			};
		});

	list.push(data);
	localStorage.setItem("JSListDate", JSON.stringify(list));
};
document.getElementById("userData").addEventListener("submit", handleSubmit);
