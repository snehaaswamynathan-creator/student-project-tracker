
const form = document.getElementById("project-form");
const nameInput = document.getElementById("name");
const statusInput = document.getElementById("status");
const projectList = document.getElementById("project-list");
const emptyState = document.getElementById("empty-state");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const message = document.getElementById("message");

let projects = [];
let editingId = null;

function showMessage(text) {
    message.textContent = text;
}

async function request(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Request failed.");
    }

    return data;
}

async function loadProjects() {
    try {
        projects = await request("/api/projects");
        renderProjects();
    } catch (error) {
        showMessage("Could not load projects: " + error.message);
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

    projects.forEach(project => {
        const item = document.createElement("li");
        const name = document.createElement("span");
        name.textContent = project.name;

        const status = document.createElement("span");
        status.textContent = " — " + project.status;

        const edit = document.createElement("button");
        edit.type = "button";
        edit.textContent = "Edit";
        edit.addEventListener("click", () => {
            editingId = project.id;
            nameInput.value = project.name;
            statusInput.value = project.status;
            saveButton.textContent = "Save changes";
            cancelButton.hidden = false;
            nameInput.focus();
        });

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Delete";
        remove.addEventListener("click", async () => {
            if (!confirm(`Delete the project "${project.name}"?`)) return;

            try {
                await request(`/api/projects/${project.id}`, {
                    method: "DELETE"
                });
                if (editingId === project.id) resetForm();
                await loadProjects();
                showMessage("Project deleted.");
            } catch (error) {
                showMessage("Delete failed: " + error.message);
            }
        });

        item.append(name, status, document.createTextNode(" "), edit,
            document.createTextNode(" "), remove);
        projectList.appendChild(item);
    });

    emptyState.hidden = projects.length > 0;
}

form.addEventListener("submit", async event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const status = statusInput.value;

    if (!name) {
        nameInput.setCustomValidity("Please enter a project name.");
        nameInput.reportValidity();
        nameInput.setCustomValidity("");
        return;
    }

    saveButton.disabled = true;

    try {
        if (editingId !== null) {
            await request(`/api/projects/${editingId}`, {
                method: "PUT",
                body: JSON.stringify({ name, status })
            });
        } else {
            await request("/api/projects", {
                method: "POST",
                body: JSON.stringify({ name, status })
            });
        }

        resetForm();
        await loadProjects();
        showMessage("Project saved successfully.");
    } catch (error) {
        showMessage("Save failed: " + error.message);
    } finally {
        saveButton.disabled = false;
    }
});

cancelButton.addEventListener("click", resetForm);

loadProjects();
