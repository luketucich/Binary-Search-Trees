# Binary Search Tree 🌳

A practical JavaScript implementation of a Binary Search Tree (BST) with essential operations for managing and manipulating node values.

## What is a Binary Search Tree?

- A data structure where each node has at most two children, referred to as the left and right child.
- For each node, all elements in the left subtree are less than the node, and all elements in the right subtree are greater.

## Key Takeaways

Developing this Binary Search Tree was a valuable learning experience. Here are some highlights:

- **Deep Understanding of Recursion:** Implementing the tree traversal methods and the buildTree function significantly improved my grasp of recursive algorithms and their applications.
- **Dynamic Data Handling:** The tree dynamically adjusts as nodes are added or removed, reflecting real-world data structures' dynamic nature.
- **Efficient Problem-Solving:** Writing methods like `insert`, `delete`, and `find` honed my skills in breaking down complex problems into manageable, logical steps.
- **Balancing Trees:** Understanding and implementing tree balancing techniques, such as rebalancing, to maintain optimal performance.
- **Code Modularity and Reusability:** Using classes and modular code structures emphasized the importance of clean, maintainable code.
- **Practical Application of Algorithms:** Hands-on implementation of searching, sorting, and traversal algorithms solidified my theoretical knowledge through practical application.

Overall, this project was a great way to enhance my skills in data structures and JavaScript.

## Usage Example:

```javascript
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
    if (this.root === null) {
      this.root = new Node(value, null, null);
      return this.root;
    }

    if (value == currNode.data) return "INSERT ERROR: Value already in BST";

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

  rebalance() {
    if (this.isBalanced()) return "REBALANCE ERROR: BST already balanced";
    this.arr = [];
    this.inOrder(value => this.arr.push(value));
    this.buildTree(this.arr);
  }

  isBalanced(rootNode = this.root) {
    const leftHeight = this.height(rootNode.left.data);
    const rightHeight = this.height(rootNode.right.data);
    const heightDiff = Math.abs(leftHeight - rightHeight);

    return heightDiff > 1 ? false : true;
  }

  height(value, currNode = this.find(value), count = 0) {
    if (currNode === "SEARCH ERROR: Value not in BST")
      return "HEIGHT ERROR: Value not in BST";

    if (currNode === null) return -1;
    const leftHeight = this.height(value, currNode.left, count++);
    const rightHeight = this.height(value, currNode.right, count++);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  find(value, currNode = this.root) {
    if (currNode === null) return "SEARCH ERROR: Value not in BST";
    if (value == currNode.data) return currNode;

    if (value > currNode.data) {
      return this.find(value, currNode.right);
    } else if (value < currNode.data) {
      return this.find(value, currNode.left);
    }
  }

  inOrder(callback, currNode = this.root) {
    if (!callback) throw new Error("A callback parameter is required!");
    if (currNode == null) return;

    this.inOrder(callback, currNode.left);
    callback(currNode.data);
    this.inOrder(callback, currNode.right);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│        " : "         "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└────── " : "┌────── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(
        node.left,
        `${prefix}${isLeft ? "         " : "│        "}`,
        true
      );
    }
  }
}

const arr = uniqueSortedArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const tree = new Tree(arr);

// Build initial tree
tree.buildTree(arr);

// Insert new values
tree.insert(10);
tree.insert(11);

// Rebalance tree
tree.rebalance();

// Print the tree
tree.prettyPrint();
