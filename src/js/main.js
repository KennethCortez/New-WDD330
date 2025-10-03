import {loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

window.onload = () => {
    setTimeout(() => {
        document.getElementById("modal-join").style.display = "block";
    }, 5000);
};


    document.querySelector("#modal-join .close").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("modal-join").style.display = "none";
});