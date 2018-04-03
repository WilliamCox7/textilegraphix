export function showAt(threshold, windowSize) {
  return windowSize > threshold ? null : {display: "none"};
}
