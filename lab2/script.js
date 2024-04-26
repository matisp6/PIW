"use strict";

let lastRemovedTask = null;
let lastRemovedList = null;

function addTask() {
    const taskText = document.getElementById('new-task-input').value.trim();
    if (taskText === '') {
        alert('Zadanie nie może być puste!');
        return;
    }

    const listSelector = document.getElementById('list-selector');
    const listId = listSelector.value;
    const list = document.querySelector(`#${listId} ul`);

    const listItem = document.createElement('li');
    const textNode = document.createElement('span');
    textNode.textContent = taskText;
    textNode.className = 'task-text';  // Klasa dla tekstu zadania
    const completedDateSpan = document.createElement('span');
    completedDateSpan.className = 'completed-date';
    completedDateSpan.style.display = "none";  // Data ukryta na początku

    listItem.appendChild(textNode);
    listItem.appendChild(completedDateSpan);
    listItem.onclick = () => toggleTask(listItem);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.onclick = (e) => {
        e.stopPropagation();
        confirmDeletion(listItem, taskText, list);
    };
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
    document.getElementById('new-task-input').value = '';
}




    const listSelector = document.getElementById('list-selector');
    const listId = listSelector.value;
    const list = document.querySelector(`#${listId} ul`);

    const listItem = document.createElement('li');
    listItem.textContent = taskText;
    listItem.onclick = () => toggleTask(listItem);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.onclick = (e) => {
        e.stopPropagation();
        confirmDeletion(listItem, taskText, list);
    };
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
    document.getElementById('new-task-input').value = '';

    function toggleTask(listItem) {
        const taskTextSpan = listItem.querySelector('.task-text');
        const completedIndicator = listItem.querySelector('.completed-date');
        
        taskTextSpan.classList.toggle('completed');
        if (taskTextSpan.classList.contains('completed')) {
            const completedDate = new Date();
            completedIndicator.textContent = ` (Zakończono: ${completedDate.toLocaleString()})`;
            completedIndicator.style.display = "inline";
        } else {
            completedIndicator.textContent = '';
            completedIndicator.style.display = "none";
        }
    }
    
    

function confirmDeletion(listItem, taskText, list) {
    const dialog = document.getElementById('confirmation-dialog');
    document.getElementById('task-text').textContent = taskText;
    dialog.showModal();

    const confirmButton = dialog.querySelector('button[value="delete"]');
    const cancelButton = dialog.querySelector('button[value="cancel"]');

    confirmButton.onclick = () => {
        lastRemovedTask = listItem;
        lastRemovedList = list;
        list.removeChild(listItem);
        dialog.close();
    };

    cancelButton.onclick = () => {
        dialog.close();
    };
}


function undoLastRemoval() {
    if (lastRemovedTask && lastRemovedList) {
        lastRemovedList.appendChild(lastRemovedTask);
        lastRemovedTask = null;
        lastRemovedList = null;
    } else {
        alert('Brak zadania do przywrócenia!');
    }
}

function toggleList(listId) {
    const list = document.getElementById(listId);
    list.querySelector('ul').classList.toggle('hidden');
}

function filterTasks() {
    const searchText = document.getElementById('search-input').value;
    const caseSensitive = document.getElementById('case-sensitive').checked;
    const lists = document.querySelectorAll('ul');

    lists.forEach(list => {
        Array.from(list.children).forEach(task => {
            const text = caseSensitive ? task.textContent : task.textContent.toLowerCase();
            const search = caseSensitive ? searchText : searchText.toLowerCase();
            task.style.display = text.includes(search) ? '' : 'none';
        });
    });
}

window.onload = () => {
    document.getElementById('confirmation-dialog').addEventListener('cancel', (event) => {
        event.preventDefault();
        document.getElementById('confirmation-dialog').close();
    });
};
