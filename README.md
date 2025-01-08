# Grocery-list-taker
The Grocery List Tracker is a straightforward, web-based application designed to help users efficiently manage their grocery shopping list. It offers a range of features, including the ability to add new grocery items, set their purchase status, and visually highlight items based on their purchase date. The application is aimed at simplifying the process of grocery planning and tracking, ensuring that users stay organized while managing their shopping needs.

Features
1. Add Grocery Items
Users can input the name of the item, quantity, unit, and desired purchase date.
Mandatory fields (Item Name and Quantity) are validated to ensure proper inputs.
2. Purchase Status
Each item has a status button (Yet to Buy / Purchased).
Clicking the button toggles the purchase status, and the button color changes accordingly:
Yellow for "Yet to Buy."
Green for "Purchased."
3. Visual Indicators
Items with a purchase date matching the current date are highlighted in red, indicating urgency.
Once the status changes to "Purchased," the row color resets to black.
4. LocalStorage Integration
Data persists between sessions using localStorage, ensuring that the grocery list is not lost on page reload.
5. Dynamic Updates
Displays a message (Add Grocery List) when no items are in the list.
Automatically updates the list and localStorage whenever a new item is added or an item status is updated.
6. Reset Functionality
Users can reset the list, clearing all data from the table and localStorage.
