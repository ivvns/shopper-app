import '@fortawesome/fontawesome-free/js/all';
import './styles/style.css';

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

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

    itemList.appendChild(li);

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
    }
}

// Clear all items
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);