<script>
function loadScript(src){
  return new Promise((resolve,reject)=>{
    const s = document.createElement("script");
    s.src = src + "?v=" + Date.now();
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
}

const getParam = (key) => new URLSearchParams(location.search).get(key);

async function loadSlider() {
  const CAT = getParam("cat") || "CAT001";

  await loadScript("data/category-map.js");
  await loadScript("data/products.js");

  const map = window.CATEGORY_MAP;
  const pro = window.PRODUCTS;

  // 🔥 DÜZELTİLEN SATIR — RELATED BURADA
  const related = map[CAT]?.related || [];

  const track = document.getElementById("sliderTrack");

  for (let rc of related) {
    const productLink = pro[rc]?.[0];
    if (!productLink) continue;

    const api = await fetch(
      "https://yellow-fog-3fba.eray-kaymaz.workers.dev/?url=" + 
      encodeURIComponent(productLink)
    ).then(r=>r.json());

    const div = document.createElement("div");
    div.className = "slide-item";

    const t = api.title.split(" ");
    const line1 = t.slice(0,3).join(" ");
    const line2 = t.slice(3,6).join(" ");

    div.innerHTML = `
      <a href="${productLink}" target="_top">
        <img src="${api.image}">
      </a>
      <div class="product-title">${line1}<br>${line2}</div>
      <div class="product-price">${api.price}</div>
    `;

    track.appendChild(div);
  }

  initSlider();
}
</script>
