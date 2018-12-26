//truncate description to fit in Card
export function truncate(text) {
  if (text.length > 100) {
    return text.substring(0, 97) + "...";
  } else {
    return text;
  }
}

//only display 2 lines of tags
export function truncateTags(tags) {
  let maxLength;
  let string = "";
  for (let i = 0; i < tags.length; i++) {
    if (string.length + tags[i].length < 85) {
      string += tags[i];
    } else {
      maxLength = i;
      console.log();
      tags[maxLength - 1] = tags[maxLength - 1].replace("|", "");
      break;
    }
  }

  return tags.slice(0, maxLength);
}
