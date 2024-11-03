import Node from "./node.js";
import uniqueSortedArray from "./sort.js";

class Tree {
  constructor(arr) {
    this.root = null;
    this.arr = arr;
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(
      arr[mid],
      this.buildTree(arr, start, mid - 1),
      this.buildTree(arr, mid + 1, end)
    );

    this.root = root;
    return root;
  }
}

const arr = uniqueSortedArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const tree = new Tree(arr);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

tree.buildTree(tree.arr);
prettyPrint(tree.root);
