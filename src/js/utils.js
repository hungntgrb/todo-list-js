export function breakDownLong(text) {
  if (/\S{25,}/.test(text)) {
    const chunk = 20;
    let l = [];
    let i = 0;
    while (i < text.length) {
      l.push(text.slice(i, i + chunk));
      i += chunk;
    }
    return l.join(" ");
  }
  return text;
}
