const settingsButton = document.getElementById("settingsButton");
const closeButton = document.getElementById("closeButton");
const modelContainer = document.getElementById("modelContainer");

function openModel() {
    modelContainer.classList.add("model-open")
}

function closeModel() {
    modelContainer.classList.remove("model-open")
}

settingsButton.addEventListener('click', openModel);
closeButton.addEventListener('click', closeModel);
