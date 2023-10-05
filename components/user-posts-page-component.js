import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user } from "../index.js";
import { getTimeDistance } from "../helpers/get-time-distance.js";

export function renderUserPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const postsHtml = posts.map((post) => {
    return `
    <li class="post">
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}" />
      </div>
      <div class="post-likes">
        <button data-post-id="642d00579b190443860c2f32" class="like-button">
          <img src="./assets/images/like-active.svg" />
        </button>
        <p class="post-likes-text">Нравится: <strong>2</strong></p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date"> ${getTimeDistance(date)}</p>
    </li>`})
    .join('')

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <div class="posts-user-header">
                    <img src="${user.imageUrl}" class="posts-user-header__user-image">
                    <p class="posts-user-header__user-name">${user.name}</p>
                </div>
                <ul class="posts">
                 ${postsHtml}
                </ul>
              </div>`;


  console.log(user);
  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
