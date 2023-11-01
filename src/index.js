import '@fortawesome/fontawesome-free/js/all';
import './styles/style.css';

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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

// Event Listeners
itemForm.addEventListener('submit', addItem);