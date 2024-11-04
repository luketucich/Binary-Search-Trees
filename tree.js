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

  levelOrder(callback) {
    if (!callback) throw new Error("A callback parameter is required!");

    const queue = [this.root];

    while (queue.length) {
      const currNode = queue.shift();
      currNode.left && queue.push(currNode.left);
      currNode.right && queue.push(currNode.right);
      callback(currNode.data);
    }
  }

  inOrder(callback, currNode = this.root) {
    if (!callback) throw new Error("A callback parameter is required!");
    if (currNode == null) return;

    this.inOrder(callback, currNode.left);
    callback(currNode.data);
    this.inOrder(callback, currNode.right);
  }

  preOrder(callback, currNode = this.root) {
    if (!callback) throw new Error("A callback parameter is required!");
    if (currNode == null) return;

    console.log(currNode.data);
    this.preOrder(callback, currNode.left);
    this.preOrder(callback, currNode.right);
  }

  postOrder(callback, currNode = this.root) {
    if (!callback) throw new Error("A callback parameter is required!");
    if (currNode == null) return;

    this.postOrder(callback, currNode.left);
    this.postOrder(callback, currNode.right);
    console.log(currNode.data);
  }

  depth(value, currNode = this.root, count = 0) {
    if (currNode === null) return "DEPTH ERROR: Value not in BST";
    if (value == currNode.data) return count;

    // Search for "value" placement
    if (value > currNode.data) {
      return this.depth(value, currNode.right, count + 1);
    } else if (value < currNode.data) {
      return this.depth(value, currNode.left, count + 1);
    }
  }

  height(value, currNode = this.find(value), count = 0) {
    if (currNode === "SEARCH ERROR: Value not in BST")
      return "HEIGHT ERROR: Value not in BST";

    if (currNode === null) return -1;
    let leftHeight = this.height(value, currNode.left, count++);
    let rightHeight = this.height(value, currNode.right, count++);

    return Math.max(leftHeight, rightHeight) + 1;
  }
}

const arr = uniqueSortedArray([1, 2, 3, 4, 5, 6, 7]);
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
tree.insert(10);
prettyPrint(tree.root);
console.log(tree.height(3124));
