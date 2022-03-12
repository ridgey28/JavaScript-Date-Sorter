/*
https://www.codegrepper.com/search.php?q=how%20to%20get%20all%20form%20values%20in%20javascript
https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript       
*/

/**
 * Gets the storage from the browser
 * @returns
 */
let getStorage = () => {
	let data = localStorage.getItem("JSListDate");
	return JSON.parse(data);
};

/**
 * Sets the storage to the browser
 * @param {array} data
 */
let setStorage = (data) => {
	let store = [];
	//if it already exists get the storage
	if (check !== null) {
		store = getStorage();
	}
	//Push the arr to the store
	store.push(data);
	localStorage.setItem("JSListDate", JSON.stringify(store));
};

/**
 * Checks if local storage exists
 * @returns null
 */
let checkStorage = () => {
	if (localStorage.getItem("JSListDate") === null) {
		return null;
	}
};

//global to check if storage exists
let check = checkStorage();

/**
 * Loads the table on load
 */
window.onload = () => {
	if (check !== null) {
		let list = getStorage(),
			tableContainer = document.getElementById("tableContainer"),
			table = document.createElement("table"),
			tblBody = document.createElement("tbody"),
			tblHeader = document.createElement("thead");
		tblHeader.innerHTML = `<tr><th><input id="cb" name="cb" type="checkbox"/></th><th>Name <span>˅</span><span class="hidden">˄</span></th><th>Birth Date <span>˅</span><span class="hidden">˄</span></th><th>Age <span>˅</span><span class="hidden">˄</span></th></tr>`;
		table.appendChild(tblHeader);
		list.forEach((element, index) => {
			let row = document.createElement("tr"),
				cellBx = document.createElement("td"),
				x = document.createElement("input");
			x.setAttribute("type", "checkbox");
			x.setAttribute("name", "select");
			x.setAttribute("id", index);
			cellBx.appendChild(x);
			row.append(cellBx);
			row.id = `id_${index}`;
			for (let i = 0; i < element.length; i++) {
				let cell = document.createElement("td"),
					cellText = document.createTextNode(element[i]);
				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			tblBody.appendChild(row);
		});
		let div = document.createElement("div"),
			btn = document.createElement("button");
		btn.setAttribute("id", "delBtn");
		btn.innerText = "Delete";
		btn.addEventListener("click", removeData);
		div.appendChild(btn);
		table.appendChild(tblBody);
		tableContainer.appendChild(table);
		tableContainer.appendChild(div);

		const getCellValue = (tr, idx) =>
			tr.children[idx].innerText || tr.children[idx].textContent;

		const comparer = (idx, asc) => (a, b) =>
			((v1, v2) =>
				v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)
					? v1 - v2
					: v1.toString().localeCompare(v2))(
				getCellValue(asc ? a : b, idx),
				getCellValue(asc ? b : a, idx)
			);

		let thead = document.querySelectorAll("th");
		thead.forEach((th) =>
			th.addEventListener("click", () => {
				const table = th.closest("table"),
					tbody = table.querySelector("tbody"),
					span = th.querySelectorAll("span");

				span.forEach((ele) => {
					ele.classList.contains("hidden")
						? ele.classList.remove("hidden")
						: ele.classList.add("hidden");
				});

				Array.from(tbody.querySelectorAll("tr"))
					.sort(
						comparer(
							Array.from(th.parentNode.children).indexOf(th),
							(this.asc = !this.asc)
						)
					)
					.forEach((tr) => tbody.appendChild(tr));
			})
		);
		//Select checkboxxes
		document.getElementById("cb").addEventListener("click", function () {
			let checkboxes = document.querySelectorAll('input[name="select"]');
			checkboxes.forEach((ele) => {
				cb.checked ? (ele.checked = true) : (ele.checked = false);
			});
		});
	}
};

/**
 * Deletes the items selected in the table
 */
let removeData = () => {
	let checked = document.querySelectorAll("input:checked"),
		store = getStorage(),
		len = checked.length;
	for (i = 0; i < checked.length; i++) {
		store.splice(checked[i].id, len);
	}
	console.log(store.length);
	//check the store length - if it has more than 0
	if (store.length !== 0) {
		//add to the database
		localStorage.setItem("JSListDate", JSON.stringify(store));
	} else {
		//no entries left remove everything
		localStorage.removeItem("JSListDate");
	}
	location.reload();
};

/**
 * Handles the submit button, saves to local storage
 */
const handleSubmit = (e) => {
	e.preventDefault();

	let arr = [],
		data = [...e.currentTarget.elements].filter((ele) => ele.type !== "submit");

	const dob = new Date(data[1].value);
	age = CalculateAge(dob);
	data.forEach((element) => {
		arr.push(element.value);
	});
	arr.push(age);
	setStorage(arr);
	location.reload();
};
document.getElementById("userData").addEventListener("submit", handleSubmit);

/**
 * Calculates the age of the person
 * @param {Date} dob
 * @returns age
 */
let CalculateAge = (dob) => {
	const currentDate = new Date(),
		// To calculate the time difference of two dates
		Difference_In_Time = currentDate.getTime() - dob.getTime();
	// To calculate the no. of days between two dates
	return Math.floor(Difference_In_Time / (1000 * 3600 * 24) / 365.25);
};

let info = document.getElementById("info");

/**
 * Check age button will recalculate the age in the database
 */
document.getElementById("checkAge").addEventListener("click", () => {
	if (check !== null) {
		let list = getStorage();
		list.forEach((element) => {
			const dob = new Date(element[1]);
			element[2] = CalculateAge(dob);
		});
		setStorage(list);
		location.reload();
	} else {
		displayMessage("No data to check");
	}
});

/**
 * Clears the database
 */

document.getElementById("clearTable").addEventListener("click", () => {
	if (check !== null) {
		if (window.confirm("Are you sure?")) {
			localStorage.removeItem("JSListDate");
			location.reload();
		}
	} else {
		displayMessage("No table to clear");
	}
});

/**
 *
 * Displays a message if a buttton is pressed and there is no data to show
 * @param {string} msg
 */

let displayMessage = (msg) => {
	info.innerText = msg;
	setTimeout(function () {
		info.innerText = "";
	}, 5000);
};
