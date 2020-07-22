function isHTML(text) {
  let match = text.match(/<\w*?>|<\/\w*?>/);
  if (match === null) {
    return false;
  } else {
    window.alert("Malcious Attempt!");
    return true;
  }
}
function escapeHTML(text) {
  return text.replace(/<\/\w*?>/gi, "");
}
function escapeTag(text) {
  return text.replace(/<\w*?>/gi, "");
}
export function sanitizeInput(value_) {
  let t = escapeHTML(value_);
  t = escapeTag(t);
  return t;
}
