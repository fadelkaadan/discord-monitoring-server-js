export const seperateSentence = (content) => {
  if (content.length > 0) {
    return content.match(/\b(\w+)\b/g);
  }
};
