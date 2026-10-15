
const projects = [];

const form = document.getElementById("project-form");
const nameInput = document.getElementById("name");
const statusInput = document.getElementById("status");
const projectList = document.getElementById("project-list");
const emptyState = document.getElementById("empty-state");

function renderProjects() {
    projectList.replaceChildren();

    projects.forEach(function (project) {
        const listItem = document.createElement("li");

        const name = document.createElement("span");
        name.textContent = project.name;

        const status = document.createElement("span");
        status.textContent = " — " + project.status;

        listItem.appendChild(name);
        listItem.appendChild(status);
        projectList.appendChild(listItem);
    });

    if (emptyState) {
        emptyState.hidden = projects.length > 0;
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const status = statusInput.value;

    if (name === "") {
        nameInput.setCustomValidity("Please enter a project name.");
        nameInput.reportValidity();
        nameInput.setCustomValidity("");
        return;
    }

    const project = {
        id: crypto.randomUUID(),
        name: name,
        status: status
    };

    projects.push(project);

    renderProjects();
    form.reset();
});

renderProjects();

