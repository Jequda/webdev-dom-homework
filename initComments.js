import { fetchAndRenderTasks, comments } from "./api.js";
import { initLikeListeners } from "./eventListeners.js";

const listElement = document.getElementById("comments");

fetchAndRenderTasks();

export const renderComment = () => {
    const commentHTML = comments
        .map((comment, index) => {
            return `<li class="comment" data-name="${comment.name}" data-text="${comment.text
                }">
    <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
    </div>
    <div class="comment-body" >
        <div class="comment-text">${comment.text}</div>
    </div>
    <div class="comment-footer">
        <div class="likes">
        <span class="likes-counter">${comment.likes}</span>
        <button class="like-button ${comment.isLiked ? "-active-like" : ""
                }" data-index="${index}"></button>
        </div>
    </div>
    </li>`;
        })
        .join("");
    listElement.innerHTML = commentHTML;
    initLikeListeners();


};






