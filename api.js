import { renderComment } from "./initComments.js";
import { formatDateTime } from "./eventListeners.js";

const loadElement = document.getElementById("page-loader");
const commentLoadElement = document.getElementById("comment-loader");
const addFormElement = document.getElementById("add-form");
const textInputElement = document.getElementById("text-input");
const nameInputElement = document.getElementById("name-input");


loadElement.textContent = "Комментарии загружаются...";

export let comments = [];
export function fetchAndRenderTasks() {
    return fetch(
        "https://wedev-api.sky.pro/api/v1/yaroslav-sakhno/comments",
        {
            method: "GET",
        }
    )
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            comments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: formatDateTime(comment.date),
                    id: comment.id,
                    isLiked: comment.isLiked,
                    likes: comment.likes,
                    text: comment.text,
                };
            });
            renderComment();
        })
        .then(() => {
            loadElement.textContent = "";
        });

};

export function postComment() {
    return fetch("https://wedev-api.sky.pro/api/v1/yaroslav-sakhno/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value
                .replaceAll("<", "&lt")
                .replaceAll(">", "&gt"),
            text: textInputElement.value
                .replaceAll("<", "&lt")
                .replaceAll(">", "&gt")
                .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
                .replaceAll("QUOTE_END", "</div>"),

        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error("400");
            } else if (response.status === 500) {
                throw new Error("500");
            }
        })
        .then(() => {
            return fetchAndRenderTasks();
        })
        .then(() => {
            commentLoadElement.textContent = "";
            addFormElement.style.display = "";
            nameInputElement.value = "";
            textInputElement.value = "";
        })
        .catch((error) => {
            commentLoadElement.textContent = "";
            addFormElement.style.display = "";
            if (error.message === "400") {
                alert("Имя и комментарий должны быть не короче 3х символов");
            } else if (error.message === "500") {
                alert("Сервер сломался, попробуй позже");
                addEventListener();
            } else {
                alert("Похоже у Вас пропал интерент, попробуйте позже");
            }
        });

};