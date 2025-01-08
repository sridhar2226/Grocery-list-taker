const tableBody = document.querySelector("#data-table tbody");

function updateTableMessage() {
  if (tableBody.rows.length === 0) {
    const newMessageRow = document.createElement("tr");
    const newMessageCell = document.createElement("td");
    newMessageCell.colSpan = 5;
    newMessageCell.textContent = "Add Grocery List";
    newMessageCell.style.textAlign = "center";
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
  let qtyUnit = document.getElementById("unit").value.trim();
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
    document.getElementById("unit").value = "";
    document.getElementById("date").value = "";
    return;
  }

  // Create a new row and append cells
  const newRow = document.createElement("tr");
  [itmName, qty, qtyUnit, buyDate].forEach((value) => {
    const cell = document.createElement("td");
    cell.textContent = value;
    newRow.appendChild(cell);
  });

  // Status button

  const buttonCell = document.createElement("td");
  const statusBtn = document.createElement("button");
  statusBtn.textContent = "Yet to buy";
  statusBtn.className = "status-btn";
  statusBtn.style.backgroundColor = "#FCF55F";
  statusBtn.style.border = "1px solid #FCF55F";
  statusBtn.addEventListener("click", () => {
    statusBtn.textContent =
      statusBtn.textContent === "Yet to buy" ? "Purchased" : "Yet to buy";
  });
  statusBtn.addEventListener("click", () => {
    if (statusBtn.textContent === "Purchased") {
      statusBtn.style.backgroundColor = "#018749";
      statusBtn.style.color = "white";
      statusBtn.style.border = "1px solid #018749";
    } else {
      statusBtn.style.backgroundColor = "#FCF55F";
      statusBtn.style.color = "black";
      statusBtn.style.border = "1px solid #FCF55F";
    }
  });
  buttonCell.appendChild(statusBtn);
  newRow.appendChild(buttonCell);

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
  document.getElementById("unit").value = "";
  document.getElementById("date").value = "";

  // Update table message visibility after adding a row
  updateTableMessage();
}

function resetList() {
  // Clear all input fields
  document.getElementById("ItemName").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("unit").value = "";
  document.getElementById("date").value = "";

  clearStoredData();

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

// Load existing data

function loadData() {
  const storedData = localStorage.getItem("groceryData");
  if (storedData) {
    const rows = JSON.parse(storedData);
    rows.forEach((rowData) => {
      const newRow = document.createElement("tr");

      rowData.forEach((data, index) => {
        const cell = document.createElement("td");

        // Check if it's the purchase date column (assumed to be the 4th column)
        if (index === 3) {
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          const purchaseDate = new Date(data);

          if (purchaseDate.toDateString() === currentDate.toDateString()) {
            newRow.style.color = "red"; // Highlight the row if purchase date is today
          }
        }

        // Check if it's the status column (last column)
        if (
          index === rowData.length - 1 &&
          (data === "Yet to buy" || data === "Purchased")
        ) {
          const statusBtn = document.createElement("button");
          statusBtn.textContent = data;
          statusBtn.className = "status-btn";

          // Set initial button styles
          if (data === "Purchased") {
            statusBtn.style.backgroundColor = "#018749";
            statusBtn.style.color = "white";
            statusBtn.style.border = "1px solid #018749";
            newRow.style.color = "black"; // Reset row color if purchased
          } else {
            statusBtn.style.backgroundColor = "#FCF55F";
            statusBtn.style.color = "black";
            statusBtn.style.border = "1px solid #FCF55F";
          }

          // Add event listener for toggling status
          statusBtn.addEventListener("click", () => {
            statusBtn.textContent =
              statusBtn.textContent === "Yet to buy"
                ? "Purchased"
                : "Yet to buy";

            if (statusBtn.textContent === "Purchased") {
              statusBtn.style.backgroundColor = "#018749";
              statusBtn.style.color = "white";
              statusBtn.style.border = "1px solid #018749";
              newRow.style.color = "black"; // Reset row color
            } else {
              statusBtn.style.backgroundColor = "#FCF55F";
              statusBtn.style.color = "black";
              statusBtn.style.border = "1px solid #FCF55F";
              const purchaseDate = new Date(rowData[3]);
              const currentDate = new Date();
              currentDate.setHours(0, 0, 0, 0);

              // Reapply red color if the date matches today
              if (purchaseDate.toDateString() === currentDate.toDateString()) {
                newRow.style.color = "red";
              }
            }

            // Update localStorage when button is toggled
            storeData();
          });

          cell.appendChild(statusBtn);
        } else {
          // For other cells, just add plain text
          cell.textContent = data;
        }

        newRow.appendChild(cell);
      });

      tableBody.appendChild(newRow);
    });
  }
  updateTableMessage();
}

// Update the table message when the page loads (in case there are no items initially)
loadData();

function resetTableData() {
  localStorage.removeItem("groceryData");
}

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
document.getElementById("reset").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent any default action
  localStorage.removeItem("groceryData"); // Clear the stored data
  tableBody.innerHTML = ""; // Clear the table body
  updateTableMessage(); // Update the message
});

