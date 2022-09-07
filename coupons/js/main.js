window.onload = () => {
  (async () => {
    //Копирование купонов
    function copy(parentSelector) {
      const parent = document.querySelector(parentSelector);
      const coupons = parent.querySelectorAll(".coupon");
      coupons.forEach((item) => {
        item.addEventListener("click", () => {
          let code = item.querySelector(".code");
          navigator.clipboard.writeText(code.textContent);
          let codeText = code.textContent;
          code.textContent = "Copied";
          item.setAttribute("disabled", true);
          setTimeout(() => {
            code.textContent = codeText;
            item.removeAttribute("disabled");
          }, 200);
        });
      });
    }
    //открытие подробного просмотра магазина
    function open() {
      const blocks = document.querySelectorAll("[data-id]");
      const stores = document.querySelector(".stores");
      const details = document.querySelector(".details");

      blocks.forEach((block) => {
        block.addEventListener("click", openDetails);
      });

      function openDetails(e) {
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
        if (
          /stores__(name|letter|count)/.test(e.target.getAttribute("class"))
        ) {
          const parent = e.target.parentElement.parentElement.parentElement;
          const id = parent.getAttribute("data-id");

          let shopName = parent.querySelector(".stores__name").textContent;

          const shop = document.querySelector(".details__shop-name span");

          shop.textContent = shopName;

          stores.classList.add("dnone");

          chrome.runtime.sendMessage({
            type: "GET_DATA_ID",
            id: id,
          });
          details.classList.remove("dnone");
        }
      }
    }

    //возврат к главному экрану
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
        try {
          let wrapper;
          let childs;

          let targetColor;

          if (type == "stores") {
            wrapper = document.querySelector(".stores__wrapper");
            childs = document.querySelectorAll(".stores__block");

            childs.forEach((item) => {
              item.remove();
            });

            data.forEach((item, i) => {
              targetColor = generateColor(i);

              if (item.code) {
                createBlock("stores", "coupon", item, wrapper, targetColor);
              } else {
                createBlock("stores", "campaign", item, wrapper, targetColor);
              }
            });
            open();
            copy(".stores");
          } else {
            wrapper = document.querySelector(".details__wrapper");
            childs = document.querySelectorAll(".details__block");

            const couponsCount = document.querySelector(".coupons__count");

            couponsCount.textContent = data.length;
            childs.forEach((item) => {
              item.remove();
            });

            data.forEach((item) => {
              createBlock("details", "coupon", item, wrapper, targetColor);
            });
            copy(".details");
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  })();
};
