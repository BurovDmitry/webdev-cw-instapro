import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let isPostMode = true;
  let imageUrl = "";

  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div id="upload-image" class="upload-image-container">
          </div>
          <label>
            Опишите фотографию:
            <textarea id="description" class="input textarea" rows="4"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    const uploadImageContainer = appEl.querySelector(".upload-image-container");
    const descriptionText = document.getElementById("description");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {

      if (isPostMode) {
        const description = document.getElementById("description").value;

        if (!imageUrl) {
          alert("Добавте картинку");
          return;
        }

        if (!description) {
          alert("Добавте описание");
          return;
        }
      }

      onAddPostClick({
        description: descriptionText.value.replaceAll('<', '&lt;').replaceAll('>', '&gt; '),
        imageUrl,
      });
    });
  };

  render();
}
