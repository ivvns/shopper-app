import '@fortawesome/fontawesome-free/js/all';
import './styles/style.css';

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    resetUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const itemToEdit = itemList.querySelector('.edit-mode');
    const newItem = itemInput.value;
    // Validate Input
    if(newItem === '') {
        alert('Please add an item');
        return;
    }   

    // Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else if (checkIfItemExists(newItem)) {
        alert('That item already exists!');
        return;
    }

    // Create item DOM element
    addItemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);

    resetUI();

    itemInput.value = '';
 }

function addItemToDOM(item) {

    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item item-btn');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-x')
    button.appendChild(icon);
    return button;
 }

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // Add new item to array
    itemsFromStorage.push(item);

    // Convert to array JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage; 

    // Check to see if there are items in storage
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    const itemsLowerCase = itemsFromStorage.map((str) => str.toLowerCase());
    return itemsLowerCase.includes(item.toLowerCase());
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach(item => item.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    itemInput.value = item.textContent;
    itemInput.classList.add('form-edit');
}

function removeItem(item) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    resetUI();
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i != item);

    // Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // Clear from local storage
    localStorage.removeItem('items');

    resetUI();
}

function filterItems(e) {
    const items = document.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    
    // Loop through each item
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        // Check to see if typed text matches item name
        if(itemName.indexOf(text) != -1) {    
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Reset state of UI
function resetUI() {
    const items = document.querySelectorAll('li');
    if(items.length === 0) { 
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    itemInput.classList.remove('form-edit');

    isEditMode = false;
}

// Initialize app
function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    
    resetUI();
}

init();