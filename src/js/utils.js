export function breakDownLong(text) {
  if (/\S{25,}/.test(text)) {
    const chunk = 15;
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

export function preventParagraph(text) {
  if (text.length > 150) {
    return "Too long!";
  }
  return text;
}

export function removeHTML(text) {
  return text.replace(/<\/?.*?>/g, "");
}

export function zeroLengthOrAllSpace(text) {
  if (/^\s*$/.test(text)) {
    return "!NOINPUT";
  }
  return text;
}
