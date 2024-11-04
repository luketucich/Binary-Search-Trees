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

  insert(value, currNode = this.root) {
    // Insert node to root if empty
    if (this.root === null) {
      this.root = new Node(value, null, null);
      return this.root;
    }

    // Do not allow duplicate nodes
    if (value == currNode.data) return "INSERT ERROR: Value already in BST";

    // Search for "value" placement & create new node
    if (value > currNode.data && currNode.data !== null) {
      return currNode.right == null
        ? (currNode.right = new Node(value, null, null))
        : this.insert(value, currNode.right);
    } else if (value < currNode.data && currNode.data !== null) {
      return currNode.left == null
        ? (currNode.left = new Node(value, null, null))
        : this.insert(value, currNode.left);
    } else {
      Object.assign(currNode, new Node(value, null, null));
    }
  }

  getSuccessor(currNode) {
    currNode = currNode.right;
    while (currNode !== null && currNode.left !== null) {
      currNode = currNode.left;
    }
    return currNode;
  }

  delete(value, currNode = this.root) {
    // Return null if tree empty
    if (this.root === null) {
      return null;
    }

    // Search for "value" placement
    if (value > currNode.data) {
      currNode.right !== null
        ? this.delete(value, currNode.right)
        : console.log("DELETE ERROR: Value not in BST");
    } else if (value < currNode.data) {
      currNode.left !== null
        ? this.delete(value, currNode.left)
        : console.log("DELETE ERROR: Value not in BST");
      // If "value" is found
    } else {
      // If leaf node (no children)
      if (currNode.left == null && currNode.right == null) {
        currNode.data = null;
      }

      // If one child on right
      if (currNode.left == null && currNode.right !== null) {
        Object.assign(currNode, currNode.right);
      }

      // If one child on left
      if (currNode.left !== null && currNode.right == null) {
        Object.assign(currNode, currNode.left);
      }

      // If two children
      if (currNode.left !== null && currNode.right !== null) {
        const successor = this.getSuccessor(currNode);
        currNode.data = successor.data;
        this.delete(successor.data, currNode.right);
      }
    }
  }

  find(value, currNode = this.root) {
    if (currNode === null) return "SEARCH ERROR: Value not in BST";
    if (value == currNode.data) return currNode;

    // Search for "value" placement
    if (value > currNode.data) {
      return this.find(value, currNode.right);
    } else if (value < currNode.data) {
      return this.find(value, currNode.left);
    }
  }

  levelOrder(callback) {}
  inOrder(callback) {}
  preOrder(callback) {}
  postOrder(callback) {}
  height(node) {}
  depth(node) {}
  isBalanced() {}
  rebalance() {}
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
tree.delete(7);
console.log(tree.find(7));
