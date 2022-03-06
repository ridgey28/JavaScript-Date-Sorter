/*
https://www.codegrepper.com/search.php?q=how%20to%20get%20all%20form%20values%20in%20javascript
https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript       
*/
/**
 * Executes on browser load. Accesses local storage.
 */
window.onload = () => {
	if (localStorage.getItem("JSListDate")) {
		let list = getStorage(),
			tableContainer = document.getElementById("tableContainer"),
			table = document.createElement("table"),
			tblBody = document.createElement("tbody"),
			tblHeader = document.createElement("thead"),
			tblFoot = document.createElement("tfoot");

		tblHeader.innerHTML = `<tr><th>Name <span>˅</span><span class="hidden">˄</span></th><th>Birth Date <span>˅</span><span class="hidden">˄</span></th><th>Age <span>˅</span><span class="hidden">˄</span></th></tr>`;
		table.appendChild(tblHeader);
		list.forEach((element) => {
			let row = document.createElement("tr");
			//add id for delete row
			for (let i = 0; i < element.length; i++) {
				let cell = document.createElement("td"),
					cellText = document.createTextNode(element[i]);

				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			tblBody.appendChild(row);
		});
		table.appendChild(tblBody);
		table.appendChild(tblFoot);
		tableContainer.appendChild(table);

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
					if (ele.classList.contains("hidden")) {
						ele.classList.remove("hidden");
					} else {
						ele.classList.add("hidden");
					}
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
	age = CalculateAge(dob);
	data.forEach((element) => {
		arr.push(element.value);
	});
	arr.push(age);
	list.push(arr);
	setStorage(list);
	location.reload();
};
document.getElementById("userData").addEventListener("submit", handleSubmit);

//Calculate age
let CalculateAge = (dob) => {
	const currentDate = new Date(),
		// To calculate the time difference of two dates
		Difference_In_Time = currentDate.getTime() - dob.getTime();
	// To calculate the no. of days between two dates
	return Math.floor(Difference_In_Time / (1000 * 3600 * 24) / 365.25);
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
		let list = getStorage();
		list.forEach((element) => {
			const dob = new Date(element[1]);
			element[2] = CalculateAge(dob);
		});
		setStorage(list);
		location.reload();
	} else {
		TODO; //display error message
	}
});

let getStorage = () => {
	let data = localStorage.getItem("JSListDate");
	return JSON.parse(data);
};

let setStorage = (data) => {
	localStorage.setItem("JSListDate", JSON.stringify(data));
};

document.getElementById("clearTable").addEventListener("click", () => {
	if (window.confirm("Are you sure?")) {
		localStorage.removeItem("JSListDate");
		location.reload();
	}
});

//clear single record
