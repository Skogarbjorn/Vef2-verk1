export function shuffle(array) {
  if (array.constructor !== Array) {
    console.error("Trying to randomize a non-array object");
    return null;
  }
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
