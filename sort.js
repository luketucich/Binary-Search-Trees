function merge(left, right) {
  const sorted = [];

  while (left.length > 0 && right.length > 0) {
    sorted.push(left[0] <= right[0] ? left.shift() : right.shift());
  }

  return sorted.concat(left, right);
}

function mergeSort(arr) {
  if (arr.length == 1) return arr;

  const mid = Math.ceil(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid, arr.length);

  return merge(mergeSort(left), mergeSort(right));
}

export default function uniqueSortedArray(arr) {
  return [...new Set(mergeSort(arr))];
}
