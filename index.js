const tableBody = document.querySelector("#data-table tbody");

function updateTableMessage() {
  // Check if the table has any rows (excluding the header row)
  if (tableBody.rows.length === 0) {
    // Create a message row
    const newMessageRow = document.createElement("tr");
    const newMessageCell = document.createElement("td");
    newMessageCell.colSpan = 3; // Set the colspan to match the number of columns in the table
    newMessageCell.textContent = "Add Grocery List";
    newMessageRow.appendChild(newMessageCell);

    // Only append the message if it's not already in the table
    if (!tableBody.contains(newMessageRow)) {
      tableBody.appendChild(newMessageRow);
    }
  } else {
    // Remove the message row if there are items in the table
    const messageRow = tableBody.querySelector("tr");
    if (messageRow && messageRow.textContent === "Add Grocery List") {
      tableBody.removeChild(messageRow);
    }
  }
}

function newGroceryList() {
  let itmName = document.getElementById("ItemName").value.trim();
  let qty = document.getElementById("qty").value.trim();
  let buyDate = document.getElementById("date").value.trim();

  // Validate mandatory fields
  if (!itmName || !qty) {
    window.alert("Please fill in all the mandatory fields.");
    return;
  }

  // Check if the date is in the past
  const purchaseDate = new Date(buyDate);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (purchaseDate < currentDate) {
    window.alert(
      "Sorry, no time machines available. Grocery shopping in the past isn’t an option! 😏"
    );
    document.getElementById("ItemName").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("date").value = "";
    return;
  }

  // Create a new row and append cells
  const newRow = document.createElement("tr");
  [itmName, qty, buyDate].forEach((value) => {
    const cell = document.createElement("td");
    cell.textContent = value;
    newRow.appendChild(cell);
  });

  if (purchaseDate.toDateString() === currentDate.toDateString()) {
    newRow.style.color = "red";
  }
  // Append the row to the table
  tableBody.appendChild(newRow);

  // Store the new item in localStorage
  storeData();

  // Clear the input fields after appending
  document.getElementById("ItemName").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("date").value = "";

  // Update table message visibility after adding a row
  updateTableMessage();
}

function resetList() {
  // Clear all input fields
  document.getElementById("ItemName").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("date").value = "";

  // Update table message visibility after resetting the list
  updateTableMessage();
}

function storeData() {
  const rows = [];
  tableBody.querySelectorAll("tr").forEach((row) => {
    const cells = row.querySelectorAll("td");
    const rowData = Array.from(cells).map((cell) => cell.textContent);
    rows.push(rowData);
  });
  localStorage.setItem("groceryData", JSON.stringify(rows));
}

function loadData() {
  const storedData = localStorage.getItem("groceryData");
  if (storedData) {
    const rows = JSON.parse(storedData);
    rows.forEach((rowData) => {
      const newRow = document.createElement("tr");
      rowData.forEach((data) => {
        const cell = document.createElement("td");
        cell.textContent = data;
        newRow.appendChild(cell);
      });
      tableBody.appendChild(newRow);
    });
  }
  updateTableMessage();
}

// Update the table message when the page loads (in case there are no items initially)
loadData();

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  newGroceryList(); // Call your function to add a new grocery item
});

document.getElementById("reset").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent any default action
  localStorage.removeItem("groceryData"); // Clear the stored data
  tableBody.innerHTML = ""; // Clear the table body
  updateTableMessage(); // Update the message
});
