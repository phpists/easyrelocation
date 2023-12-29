document.addEventListener("DOMContentLoaded", function () {
  let startDate = new Date(newYearPluginCustom.dateStart);
  let endDate = new Date(newYearPluginCustom.dateEnd);
  let currentDate = new Date();
  if (currentDate >= startDate && currentDate <= endDate) {
    if (Array.isArray(newYearPluginCustom.serializedData)) {
      newYearPluginCustom.serializedData.forEach(function (item) {
        let targetElements = document.querySelectorAll(item.selector);
        targetElements.forEach(function (targetElement) {
          if (targetElement) {
            switch (item.insertion) {
              case "inside_start":
                targetElement.insertAdjacentHTML("afterbegin", item.html);
                break;
              case "inside_end":
                targetElement.insertAdjacentHTML("beforeend", item.html);
                break;
              case "before":
                targetElement.insertAdjacentHTML("beforebegin", item.html);
                break;
              case "after":
                targetElement.insertAdjacentHTML("afterend", item.html);
                break;
              case "replace":
                targetElement.innerHTML = item.html;
                break;
              default:
                console.log(
                  "РќРµ РІРєР°Р·Р°РЅРѕ РІР°Р»С–РґРЅРµ РјС–СЃС†Рµ РІСЃС‚Р°РІРєРё"
                );
            }
          }
        });
      });
    }
  }
});
