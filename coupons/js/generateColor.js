function generateColor(i) {
  let targetColor;
  const colorClasses = [
    "color_red",
    "color_cyan",
    "color_violet",
    "color_green",
    "color_orange",
  ];

  if (i % 5 === 0) {
    targetColor = colorClasses[4];
  } else if (i % 4 === 0) {
    targetColor = colorClasses[3];
  } else if (i % 3 === 0) {
    targetColor = colorClasses[2];
  } else if (i % 2 === 0) {
    targetColor = colorClasses[1];
  } else if (i % 1 === 0) {
    targetColor = colorClasses[0];
  }

  return targetColor;
}
