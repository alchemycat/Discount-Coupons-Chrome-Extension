function createBlock(type, item, parent, targetColor) {
  let block = document.createElement("div");
  block.setAttribute("data-id", item.id);
  block.classList.add("stores__block");

  let info = document.createElement("div");
  info.classList.add("stores__info");

  block.append(info);

  let icon = document.createElement("div");
  icon.classList.add("stores__icon");
  icon.classList.add(targetColor);

  info.append(icon);

  let letter = document.createElement("span");
  letter.classList.add("stores__letter");
  letter.textContent = item.name[0];
  icon.append(letter);

  let details = document.createElement("div");
  details.classList.add("stores__details");
  info.append(details);

  let name = document.createElement("div");
  name.textContent = item.name;
  name.classList.add("stores__name");

  let count = document.createElement("div");
  count.classList.add("stores__count");

  count.textContent = `${item.coupon_count} ${type}(s)`;

  details.append(name);
  details.append(count);

  if (item.code) {
    let coupon = document.createElement("button");

    coupon.setAttribute("class", "stores__coupon coupon");
    block.append(coupon);

    let svg = `<?xml version="1.0" encoding="iso-8859-1"?>
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
    </svg>`;

    coupon.insertAdjacentHTML("afterbegin", svg);

    let code = document.createElement("span");

    code.classList.add("code");
    code.textContent = item.code;
    coupon.append(code);
  }

  parent.append(block);
}
