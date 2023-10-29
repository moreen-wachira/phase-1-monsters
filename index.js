document.addEventListener('DOMContentLoaded', function() {
    const monsterForm = document.getElementById('monster-form');
    const loadMonstersButton = document.getElementById('load-monsters');
    const monsterContainer = document.getElementById('monster-container');
    
    let currentPage = 1;
    const monstersPerPage = 50;

    // Function to fetch and display monsters
    function fetchMonsters() {
        fetch(`http://localhost:3000/monsters/?_limit=${monstersPerPage}&_page=${currentPage}`)
            .then(response => response.json())
            .then(monsters => {
                monsters.forEach(monster => {
                    const monsterDiv = document.createElement('div');
                    monsterDiv.innerHTML = `
                        <h2>${monster.name}</h2>
                        <p>Age: ${monster.age}</p>
                        <p>Description: ${monster.description}</p>
                    `;
                    monsterContainer.appendChild(monsterDiv);
                });
            });
    }

    // Load initial monsters
    fetchMonsters();

    // Load more monsters when the button is clicked
    loadMonstersButton.addEventListener('click', function() {
        currentPage++;
        fetchMonsters();
    });

    // Handle form submission to create a new monster
    monsterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value);
        const description = document.getElementById('description').value;

        const newMonster = {
            name: name,
            age: age,
            description: description
        };

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newMonster)
        })
        .then(response => response.json())
        .then(data => {
            // Assuming the new monster has been added successfully, you can display it in the list
            const monsterDiv = document.createElement('div');
            monsterDiv.innerHTML = `
                <h2>${data.name}</h2>
                <p>Age: ${data.age}</p>
                <p>Description: ${data.description}</p>
            `;
            monsterContainer.appendChild(monsterDiv);
        });
    });
});