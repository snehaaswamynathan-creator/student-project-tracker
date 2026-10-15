
const STORAGE_KEY = "workshop-projects-v1";

let projects = [];
let editingId = null;
let idCounter = 0;
let storageBlocked = false;

const form = document.getElementById("project-form");
const nameInput = document.getElementById("name");
const statusInput = document.getElementById("status");
const projectList = document.getElementById("project-list");
const emptyState = document.getElementById("empty-state");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const message = document.getElementById("message");

function showMessage(text) {
    if (message) {
        message.textContent = text;
    }
}

function isValidProjects(data) {
    if (!Array.isArray(data)) {
        return false;
    }

    const ids = new Set();

    return data.every(function (project) {
        if (
            project === null ||
            typeof project !== "object" ||
            typeof project.id !== "string" ||
            project.id.trim() === "" ||
            typeof project.name !== "string" ||
            project.name.trim() === "" ||
            typeof project.status !== "string" ||
            project.status.trim() === "" ||
            ids.has(project.id)
        ) {
            return false;
        }

        ids.add(project.id);
        return true;
    });
}

function loadProjects() {
    try {
        const storedText = window.localStorage.getItem(STORAGE_KEY);

        if (storedText === null) {
            projects = [];
            return;
        }

        const storedProjects = JSON.parse(storedText);

        if (!isValidProjects(storedProjects)) {
            storageBlocked = true;
            showMessage(
                "Saved project data is invalid. It has not been overwritten."
            );
            projects = [];
            return;
        }

        projects = storedProjects;
    } catch (error) {
        storageBlocked = true;
        projects = [];
        showMessage(
            "Could not read saved projects. Existing stored data has not been overwritten."
        );
    }
}

function saveProjects() {
    if (storageBlocked) {
        showMessage(
            "Changes could not be saved because the existing stored data could not be read safely."
        );
        return false;
    }

    try {
        const projectsText = JSON.stringify(projects);
        window.localStorage.setItem(STORAGE_KEY, projectsText);
        showMessage("Projects saved.");
        return true;
    } catch (error) {
        showMessage(
            "Changes could not be saved. Browser storage may be unavailable or full."
        );
        return false;
    }
}

function resetForm() {
    form.reset();
    editingId = null;
    saveButton.textContent = "Save Project";
    cancelButton.hidden = true;
}

function renderProjects() {
    projectList.replaceChildren();

    projects.forEach(function (project) {
        const listItem = document.createElement("li");

        const name = document.createElement("span");
        name.textContent = project.name;

        const status = document.createElement("span");
        status.textContent = " — " + project.status;

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {
            editingId = project.id;
            nameInput.value = project.name;
            statusInput.value = project.status;

            saveButton.textContent = "Save changes";
            cancelButton.hidden = false;
            nameInput.focus();
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            const confirmed = window.confirm(
                'Delete the project "' + project.name + '"?'
            );

            if (!confirmed) {
                return;
            }

            const projectIndex = projects.findIndex(function (item) {
                return item.id === project.id;
            });

            if (projectIndex === -1) {
                return;
            }

            projects.splice(projectIndex, 1);

            if (editingId === project.id) {
                resetForm();
            }

            renderProjects();
            saveProjects();
        });

        listItem.appendChild(name);
        listItem.appendChild(status);
        listItem.appendChild(document.createTextNode(" "));
        listItem.appendChild(editButton);
        listItem.appendChild(document.createTextNode(" "));
        listItem.appendChild(deleteButton);

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

    if (editingId !== null) {
        const project = projects.find(function (item) {
            return item.id === editingId;
        });

        if (!project) {
            resetForm();
            renderProjects();
            showMessage("The project being edited could not be found.");
            return;
        }

        project.name = name;
        project.status = status;
    } else {
        const id =
            typeof crypto !== "undefined" &&
            typeof crypto.randomUUID === "function"
                ? crypto.randomUUID()
                : Date.now() + "-" + (++idCounter);

        projects.push({
            id: id,
            name: name,
            status: status
        });
    }

    resetForm();
    renderProjects();
    saveProjects();
});

cancelButton.addEventListener("click", function () {
    resetForm();
});

loadProjects();
renderProjects();
