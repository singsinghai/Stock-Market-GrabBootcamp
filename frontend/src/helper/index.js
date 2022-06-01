export function seo(data = {}) {
  data.title = data.title || "Hẻ Cu Lé";
  data.metaDescription = data.metaDescription || "Default app title";

  document.title = data.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", data.metaDescription);
}
