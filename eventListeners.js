import { postComment, comments } from "./api.js";
import { renderComment } from "./initComments.js";

const commentLoadElement = document.getElementById("comment-loader");
const addFormElement = document.getElementById("add-form");
const buttonElement = document.getElementById("add-button");
const textInputElement = document.getElementById("text-input");
const nameInputElement = document.getElementById("name-input");

export const formatDateTime = (date) => {
    let dateTime = new Date(date);
    const day = String(dateTime.getDate()).padStart(2, "0");
    const month = String(dateTime.getMonth()).padStart(2, "0");
    const year = String(dateTime.getFullYear() - 2000);
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
};


buttonElement.addEventListener("click", () => {

    commentLoadElement.textContent = "Добавляется новый комментарий...";
    addFormElement.style.display = "none";

    postComment(
    )
});

export const initLikeListeners = () => {
    const commentElement = document.querySelectorAll(".comment");
    for (const comment of commentElement) {
        comment.addEventListener("click", () => {
            const text = comment.dataset.text;
            const name = comment.dataset.name;
            textInputElement.value = `QUOTE_BEGIN ${name}:\n${text} QUOTE_END`;
        });
    }

    const likeButtons = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", () => {
            event.stopPropagation();
            const index = likeButton.dataset.index;
            comments[index].likes += comments[index].isLiked ? -1 : +1;
            comments[index].isLiked = !comments[index].isLiked;

            renderComment();
        });
    }
};


export function errorButton() {
    buttonElement.addEventListener("mouseover", () => {

        if (nameInputElement.value === "" && textInputElement.value === "") {
            nameInputElement.classList.add("error");
            textInputElement.classList.add("error");
            document.getElementById("add-button").disabled = true;
            return;
        } else if (nameInputElement.value === "") {
            nameInputElement.classList.add("error");
            document.getElementById("add-button").disabled = true;
            return;
        } else if (textInputElement.value === "") {
            textInputElement.classList.add("error");
            document.getElementById("add-button").disabled = true;
            return;
        } else {
            document.getElementById("add-button").disabled = false;
            nameInputElement.classList.remove("error");
            textInputElement.classList.remove("error");

        }
    });

    textInputElement.addEventListener("input", () => {

        if (textInputElement.value.length >= 3) {
            textInputElement.classList.remove("error");
            cancelError()
        }

    });

    nameInputElement.addEventListener("input", () => {

        if (nameInputElement.value.length >= 3) {
            nameInputElement.classList.remove("error");
            cancelError()
        }
        console.log(nameInputElement.value.length)
    });

    function cancelError() {
        if (nameInputElement.value.length >= 3 && textInputElement.value.length >= 3) {
            document.getElementById("add-button").disabled = false;
        }
    }
}

