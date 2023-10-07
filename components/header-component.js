import { goToPage, logout, user } from "../index.js";
import { ADD_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";

export function renderHeaderComponent() {
  const headerComponent = document.getElementById("header");
  let isNavbarOpen = false;
  headerComponent.innerHTML = `
  <div class="page-header">
  <div class="page-"><h1 class="logo">instapro</h1></div>
  <div>
    <button class="header-button add-or-login-button">
      ${user
      ? `<div title="Добавить пост" class="add-post-sign"></div>`
      : "Войти"
    }
    </button>
  </div>
  
    ${user
      ? `<div class="navbar">
        <img src="${user.imageUrl}" class="posts-user-header__user-image">
          <div>${user.name}</div>
          <div class="navbar-dropdown">
            <span title="${user.name}" class="header-button logout-button">Выйти</span>
            <span title="Мои посты" class="header-button my-posts-button">Мои посты</span>
          </div>
        </div>`
      : ""
    }  
`;

  headerComponent
    .querySelector(".add-or-login-button")
    .addEventListener("click", () => {
      if (user) {
        goToPage(ADD_POSTS_PAGE);
      } else {
        goToPage(AUTH_PAGE);
      }
    });
  const navbarDropdownComponent = document.querySelector(".navbar-dropdown");
  headerComponent.querySelector(".logo").addEventListener("click", () => {
    goToPage(POSTS_PAGE);
  });

  headerComponent.querySelector(".logout-button")?.addEventListener("click", logout);
  headerComponent.querySelector(".my-posts-button")?.addEventListener("click", () => {
    goToPage(USER_POSTS_PAGE, {
      userId: user._id,
    });
  });
  headerComponent.querySelector(".navbar")?.addEventListener("click", (event) => {
    event.stopPropagation();
    isNavbarOpen = true;
    navbarDropdownComponent.classList.add('navbar-dropdown-active');
  });
  document.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!isNavbarOpen || (isNavbarOpen && (event.target.parentElement === navbarDropdownComponent || event.target === navbarDropdownComponent))) {
      return
    }
    isNavbarOpen = false;
    navbarDropdownComponent.classList.remove('navbar-dropdown-active');
  });

  return headerComponent;
}
