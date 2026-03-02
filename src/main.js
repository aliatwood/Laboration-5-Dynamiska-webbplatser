import './styles/styles.scss'

const button = document.querySelector("button");

button.addEventListener("click", () => {
    button.classList.add("spinning");

    button.addEventListener("animationend", () => {
        button.classList.remove("spinning");
    }, {once: true});
});