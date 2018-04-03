export function hideAt(threshold, windowSize) {
  return windowSize < threshold ? null : {display: "none"};
}
