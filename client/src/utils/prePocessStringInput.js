export const removeRedundantCharacter = string => {
  return string.trim().replace(/\s\s+/g, ' ');
};
