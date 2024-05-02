document.addEventListener('DOMContentLoaded', function() {
    // Define project objects
    let project1 = {
        image: "./img/project1.jpg",
        title: "Project 1", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptatum hic nemo voluptate assumenda minima expedita ratione omnis consectetur obcaecati ex perspiciatis itaque nulla", 
        button1: "https://www.google.com/", 
        button2: "https://www.google.com/",
        tag: "Mobileapp" 
    };
    let project2 = {
        image: "./img/project2.jpg",
        title: "Project 2", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptatum hic nemo voluptate assumenda minima expedita ratione omnis consectetur obcaecati ex perspiciatis itaque nulla", 
        button1: "https://www.google.com/", 
        button2: "https://www.google.com/",
        tag: "Mobileapp " 
    };
    let project3 = {
        image: "./img/project3.jpg",
        title: "Project 3", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptatum hic nemo voluptate assumenda minima expedita ratione omnis consectetur obcaecati ex perspiciatis itaque nulla", 
        button1: "https://www.google.com/", 
        button2: "https://www.google.com/",
        tag: "Desktop" 
    };

    // Define project library
    let library = {
        books: [project1, project2, project3]
    };

    // Function to create project card
    function createProjectCard(project) {
        let cardTable = document.createElement('table');
        cardTable.classList.add('table2');
        cardTable.setAttribute('align', 'center');

        let row1 = document.createElement('tr');
        let imgTd = document.createElement('td');
        imgTd.setAttribute('rowspan', '3');
        let img = document.createElement('img');
        img.setAttribute('src', project.image);
        img.setAttribute('alt', 'Project Image');
        img.style.boxShadow = '20px red';
        imgTd.appendChild(img);
        let titleTd = document.createElement('td');
        titleTd.setAttribute('colspan', '2');
        let titleP = document.createElement('p');
        titleP.style.fontSize = 'larger';
        titleP.style.fontWeight = 'bold';
        titleP.style.marginLeft = '10px';
        titleP.textContent = project.title;
        titleTd.appendChild(titleP);
        row1.appendChild(imgTd);
        row1.appendChild(titleTd);

        let row2 = document.createElement('tr');
        let descTd = document.createElement('td');
        descTd.setAttribute('colspan', '2');
        descTd.style.marginLeft = '20px';
        let descDiv = document.createElement('div');
        descDiv.classList.add('para');
        descDiv.textContent = project.description;
        descTd.appendChild(descDiv);
        row2.appendChild(descTd);

        let row3 = document.createElement('tr');
        let button1Td = document.createElement('td');
        let button1 = document.createElement('button');
        button1.classList.add('btn');
        button1.textContent = 'View Project';
        button1Td.appendChild(button1);
        let button2Td = document.createElement('td');
        let button2 = document.createElement('button');
        button2.classList.add('btn');
        button2.textContent = 'Read More';
        button2Td.appendChild(button2);
        row3.appendChild(button1Td);
        row3.appendChild(button2Td);

        cardTable.appendChild(row1);
        cardTable.appendChild(row2);
        cardTable.appendChild(row3);

        return cardTable;
    }

    // Function to display project details
    function displayProject(project) {
        const projectSection = document.getElementById('section');
        projectSection.innerHTML = '';
        const projectCard = createProjectCard(project);
        projectSection.appendChild(projectCard);
    }

    // Event listener for navigation links
    document.querySelectorAll('.nav').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const tag = this.getAttribute('href').substring(1); // Get the tag from href
            const project = library.books.find(project => project.tag === tag); // Find the project with the same tag
            if (project) {
                displayProject(project); // Display the project details
            }
        });
    });

    // Initial display of project based on default selection
    const defaultTag = 'Mobileapp'; // Set the default tag here
    const defaultProject = library.books.find(project => project.tag === defaultTag);
    if (defaultProject) {
        displayProject(defaultProject);
    }
});
