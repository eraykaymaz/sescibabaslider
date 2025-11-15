(function(){
  const target = document.getElementById("sescibaba-slider");
  if(!target) return;

  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat") || window.SLIDER_CAT || "CAT001";

  const iframe = document.createElement("iframe");
  iframe.src = "https://eraykaymaz.github.io/sescibabaslider/slider.html?cat=" + cat;
  iframe.style.width = "100%";
  iframe.style.height = "330px";
  iframe.style.border = "0";
  iframe.style.overflow = "hidden";
  iframe.setAttribute("scrolling", "no");

  // ÖNEMLİ: T-SOFT sandbox ekleyemez
  iframe.removeAttribute("sandbox");

  target.appendChild(iframe);
})();
