import { login, register, token, setToken } from "./api.js";


const addFormElement = document.getElementById("add-form");
const nameInputElement = document.getElementById("name-input");

let name;
const setName = (newName) => {
    name = newName;
}

export const auth = () => {
    const appElement = document.getElementById("app");
    const appHTML = `<br /><span> Чтобы добавить комментарии  </span>
    <a href="#" class="login-link" id="autorize-button">Авторизуйтесь</a>`;

    addFormElement.style.display = "none";

    appElement.innerHTML = appHTML;

    const buttonElement = document.getElementById("autorize-button");
    const authElement = document.getElementById("autorize");
    const commentsElement = document.getElementById("comments");
    const regElement = document.getElementById("register");

    authElement.style.display = "none";
    regElement.style.display = "none";

    buttonElement.addEventListener("click", () => {
        commentsElement.style.display = "none";
        appElement.style.display = "none";

        authElement.style.display = "";
    });

    const authHTML = `  <div class="add-form" id="auth-form">
    <h1>Форма входа</h1>
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите логин"
      id="login-auth"
    />
    <br />
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите пароль"
      id="password-auth"
    />
    <div class="add-form-row">
      <button class="add-form-button" id="login-button">Войти</button>
    </div>
    <a href="#" class="login-link" id="link-to-reg">Зарегестрироваться</a>
  </div>`;

    authElement.innerHTML = authHTML;

    const regButtonElement = document.getElementById("link-to-reg");

    regButtonElement.addEventListener("click", () => {
        authElement.style.display = "none";
        regElement.style.display = "";
    });

    const regHTML = `  <div class="add-form" id="reg-form">
    <h1>Форма регистрации</h1>
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите имя"
      id="name-reg"
    />
    <br />
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите логин"
      id="login-reg"
    />
    <br />
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите пароль"
      id="password-reg"
    />
    <div class="add-form-row">
      <button class="add-form-button" id="register-button">Зарегистрироваться</button>
    </div>
    <a href="#" class="login-link" id="link-to-login">Войти</a>
  </div>`;

    regElement.innerHTML = regHTML;

    const authButtonElement = document.getElementById("link-to-login");

    authButtonElement.addEventListener("click", () => {
        authElement.style.display = "";
        regElement.style.display = "none";
    });

    const loginButtonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-auth");
    const passwordInputElement = document.getElementById("password-auth");

    loginButtonElement.addEventListener("click", () => {

        login(
            {
                login: loginInputElement.value,
                password: passwordInputElement.value,
            }
        ).then((responseData) => {
            console.log(token);
            setToken(responseData.user.token);
            console.log(token);
            console.log(name);
            setName(responseData.user.name);
            console.log(name);


        }).then(() => {
            addFormElement.style.display = "";
            authElement.style.display = "none";
            regElement.style.display = "none";
            commentsElement.style.display = "";
            nameInputElement.value = `${name}`;
        })

    })

    const registerButtonElement = document.getElementById("register-button");
    const regNameInputElement = document.getElementById("name-reg")
    const regLoginInputElement = document.getElementById("login-reg")
    const regPasswordInputElement = document.getElementById("password-reg")

    registerButtonElement.addEventListener("click", () => {
        register(
            {
                name: regNameInputElement.value,
                login: regLoginInputElement.value,
                password: regPasswordInputElement.value,
            }
        ).then((responseData) => {
            console.log(token);
            setToken(responseData.user.token);
            console.log(token);
            console.log(name);
            setName(responseData.user.name);
            console.log(name);

        }).then(() => {
            addFormElement.style.display = "";
            authElement.style.display = "none";
            regElement.style.display = "none";
            commentsElement.style.display = "";
            nameInputElement.value = `${name}`;

        })
    })
};
