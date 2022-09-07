/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  /*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
  window.onload = () => {
    (async () => {
      function copy() {
        const coupons = document.querySelectorAll(".coupon");
        coupons.forEach((item) => {
          item.addEventListener("click", () => {
            let code = item.querySelector(".code");
            navigator.clipboard.writeText(code.textContent);
            let codeText = code.textContent;
            code.textContent = "Copied";
            setTimeout(() => {
              code.textContent = codeText;
            }, 300);
          });
        });
      }
      function open() {
        const blocks = document.querySelectorAll("[data-id]");
        const stores = document.querySelector(".stores");
        const details = document.querySelector(".details");
        blocks.forEach((block) => {
          block.addEventListener("click", openDetails);
        });
        function openDetails(e) {
          console.log(e.target);
          if (e.target.getAttribute("data-id")) {
            let shopName = e.target.querySelector(".stores__name").textContent;

            const shop = document.querySelector(".details__shop-name span");

            shop.textContent = shopName;

            stores.classList.add("dnone");
            chrome.runtime.sendMessage({
              type: "GET_DATA_ID",
              id: e.target.getAttribute("data-id"),
            });
            details.classList.remove("dnone");
          }
        }
      }
      function close() {
        const close = document.querySelector(".back");
        const stores = document.querySelector(".stores");
        const details = document.querySelector(".details");
        close.addEventListener("click", closeDetails);
        function closeDetails() {
          details.classList.add("dnone");
          stores.classList.remove("dnone");
        }
      }
      close();
      try {
        chrome.runtime.sendMessage({
          type: "GET_MAIN_DATA",
        });
        chrome.runtime.onMessage.addListener(async (response) => {
          //Тут чекаємо на повідомлення чи змінилась сторінка
          if (response.type == "MAIN_DATA") {
            showData(response.data, "stores");
          }
          if (response.type == "ID_DATA") {
            showData(response.data, "details");
          }
        });
        function showData(data, type) {
          console.log(type);
          console.log(`data: ${JSON.stringify(data)}`);
          try {
            let template;
            let wrapper;
            let childs;
            if (type == "stores") {
              wrapper = document.querySelector(".stores__wrapper");
              childs = document.querySelectorAll(".stores__block");
              childs.forEach((item) => {
                item.remove();
              });
              data.forEach((item) => {
                template = `<div class="stores__block" data-id="${item.id}">
              <div class="stores__info">
                <div class="stores__icon">
                  <span class="stores__letter">${item.name[0]}</span>
                </div>
                <div class="stores__details">
                  <div class="stores__name">${item.name}</div>
                  <div class="stores__count">${item.coupon_count} coupon (s)</div>
                </div>
              </div>
              <div class="stores__coupon coupon">
                <?xml version="1.0" encoding="iso-8859-1"?>
                <!-- Generator: Adobe Illustrator 19.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 488.3 488.3"
                  style="enable-background: new 0 0 488.3 488.3"
                  xml:space="preserve">
                  <g>
                    <g>
                      <path
                        d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124
            C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124
            c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z" />
                      <path
                        d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227
            c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6
            V38.6C439.65,17.3,422.35,0,401.05,0z" />
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
                <span class="code">${item.code}</span>
              </div>
            </div>`;
                wrapper.insertAdjacentHTML("afterbegin", template);
              });
              open();
              copy();
            } else {
              wrapper = document.querySelector(".details__wrapper");
              childs = document.querySelectorAll(".details__block");
              const couponsCount = document.querySelector(".coupons__count");

              couponsCount.textContent = data.length;
              childs.forEach((item) => {
                item.remove();
              });
              // shopName.textContent = "";

              data.forEach((item) => {
                template = `<div class="details__block">
                <div class="details__name">
                  ${item.content}
                </div>
                <div class="details__coupon coupon">
                  <?xml version="1.0" encoding="iso-8859-1"?>
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 488.3 488.3"
                    style="enable-background: new 0 0 488.3 488.3"
                    xml:space="preserve">
                    <g>
                      <g>
                        <path
                          d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124
              C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124
              c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z" />
                        <path
                          d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227
              c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6
              V38.6C439.65,17.3,422.35,0,401.05,0z" />
                      </g>
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </svg>
                  <span class="code">${item.code}</span>
                </div>
              </div>`;
                wrapper.insertAdjacentHTML("afterbegin", template);
              });
            }
            // copy();
          } catch (err) {
            console.log(err);
          }
        }
      } catch {}
    })();
  };
  /******/
})();
//# sourceMappingURL=main.js.map
