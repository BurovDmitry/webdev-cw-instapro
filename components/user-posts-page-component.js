import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user } from "../index.js";
import { mapPosts } from "../helpers/map-posts.js";

export function renderUserPostsPageComponent({ appEl, onLikePostClick, onDislikePostClick }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  function render() {
    const mappedPost = mapPosts(posts)
    const postsHtml = mappedPost.map((post, index) => {
      return `
      <li class="post">
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}" />
        </div>
        <div class="post-likes">
          <button data-index="${index}" data-post-id="${post.id}" class="like-button">
            <img src="./assets/images/like${post.isLiked ? "" : "-not"}-active.svg">
          </button>
          <p class="post-likes-text">Нравится: <strong>${post.likeText}</strong></p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date"> ${post.createdAt} назад</p>
      </li>`})
      .join('')

    const appHtml = `
                <div class="page-container">
                  <div class="header-container"></div>
                  <div class="posts-user-header">
                      <img src="${mappedPost[0].user.imageUrl}" class="posts-user-header__user-image">
                      <p class="posts-user-header__user-name">${mappedPost[0].user.name}</p>
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

    if (user) {
      const likeButtonsElements = document.querySelectorAll(".like-button");
      for (const likeButtonElement of likeButtonsElements) {
        likeButtonElement.addEventListener("click", (event) => {
          event.stopPropagation();

          const index = likeButtonElement.dataset.index;
          let promise;
          console.log(likeButtonElement.dataset)
          if (posts[index].isLiked) {
            promise = onDislikePostClick({ postId: likeButtonElement.dataset.postId })
          } else {
            promise = onLikePostClick({ postId: likeButtonElement.dataset.postId })
          }

          promise.then((post) => {
            posts[index] = post.post;
            render();
          })
        });
      }
    }
  }
  render();
}
