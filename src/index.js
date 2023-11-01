import '@fortawesome/fontawesome-free/js/all';
import './styles/style.css';

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    // Validate Input
    if(newItem === '') {
        alert('Please add an item');
        return;
    }   

    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item item-btn');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);

    resetUI();

    itemInput.value = '';
 }

// Create button
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-x')
    button.appendChild(icon);
    return button;
 }

// Create icon
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Remove item from list
function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove();
        resetUI();
    }
}

// Clear all items
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    resetUI();
}

// Filter items
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
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

resetUI();