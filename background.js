// //Слідкуємо за меседжами які приходять від content.js
chrome.runtime.onMessage.addListener(async (response, sender, sendResponse) => {
  //Якщо реквест == SAVE_DATA то потрібно зберегти дані в таблицю
  console.log(sender);
  if (response.type == "GET_MAIN_DATA") {
    fetch(
      "https://extension.biggo.com/api/store.php?method=hot_store&region=us",
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((body) => {
        return body.data.filter((item) => item.coupon_count);
      })
      .then((json) => {
        // sendResponse({ data: json });
        chrome.runtime.sendMessage({
          type: "MAIN_DATA",
          data: json,
        });
      });
  }

  console.log(response);

  if (response.type == "GET_DATA_ID") {
    console.log(`id: ${response.id}`);
    fetch(
      `https://extension.biggo.com/api/store.php?method=store_detail&id=${response.id}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((body) => {
        let coupons = body.data.coupon;
        chrome.runtime.sendMessage({
          type: "ID_DATA",
          data: coupons,
        });
      });
  }
});
