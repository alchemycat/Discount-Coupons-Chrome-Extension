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

      .then((body) => body.data)
      .then((data) => {
        let names = [];
        let finalArr = [];
        console.log(data);
        data.forEach((item) => {
          if (!names.includes(item.name)) {
            names.push(item.name);
            finalArr.push(item);
            console.log(finalArr);
          } else {
            let index = names.indexOf(item.name);

            finalArr[index].id = `${finalArr[index].id} ${item.id}`;
            finalArr[index].campaign_count = `${
              +finalArr[index].campaign_count + +item.campaign_count
            }`;
            finalArr[index].coupon_count = `${
              +finalArr[index].coupon_count + +item.coupon_count
            }`;
            finalArr[index].code = item.code;
          }
        });
        return finalArr;
      })
      .then((json) => {
        chrome.runtime.sendMessage({
          type: "MAIN_DATA",
          data: json,
        });
      });
  }

  if (response.type == "GET_DATA_ID") {
    let json = [];

    let ids = response.id.split(" ");

    for (let i = 0; i < ids.length; i++) {
      console.log(`id: ${ids[i]}`);
      let result = await fetch(
        `https://extension.biggo.com/api/store.php?method=store_detail&id=${ids[i]}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((body) => {
          let c;
          if (body.data.coupon.length) {
            c = body.data.coupon;
          } else {
            c = body.data.campaign;
          }
          return c;
        });
      json = json.concat(result);

      if (i == ids.length - 1) {
        chrome.runtime.sendMessage({
          type: "ID_DATA",
          data: json,
        });
      }
    }
  }
});
