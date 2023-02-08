export function Capitalize(str: string): string {
  let lower = str.toLowerCase();
  let words = lower.split("_");
  return words
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
}
const units = [
  [1, "s"],
  [60, "m"],
  [60 * 60, "h"],
  [60 * 60 * 24, "day"],
];

export function displayTime(seconds: number) {
  let bestUnit = units[0];
  for (const unit of units) {
    if (seconds >= unit[0]) {
      bestUnit = unit;
    }
  }
  const [divisor, label] = bestUnit;
  return Math.floor(seconds / <number>divisor).toString() + label + " ago";
}