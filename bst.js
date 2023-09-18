class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }

    const middle = Math.floor((start + end) / 2);
    const node = new Node(arr[middle]);

    node.left = this.buildTree(arr, start, middle - 1);
    node.right = this.buildTree(arr, middle + 1, end);

    return node;
  }

  insert(key, currentNode = this.root) {
    if (currentNode === null) {
      currentNode = new Node(key);
      return currentNode;
    }

    if (key < currentNode.data) {
      currentNode.left = this.insert(key, currentNode.left);
    }
    if (key > currentNode.data) {
      currentNode.right = this.insert(key, currentNode.right);
    }
    return currentNode;
  }

  delete(key, currentNode = this.root) {
    if (currentNode === null) {
      // If the tree is empty return
      return currentNode;
    }

    // Search for the node to delete calling the method recursively in the correct subtree
    if (key < currentNode.data) {
      currentNode.left = this.delete(key, currentNode.left);
    } else if (key > currentNode.data) {
      currentNode.right = this.delete(key, currentNode.right);
    } else {

    // If the node is found
    // Case 1: leaf node
    if (currentNode.left === null && currentNode.right === null) {
      return null;
    }

    // Case 2: the node has one child
    if (currentNode.left === null) return currentNode.right;
    if (currentNode.right === null) return currentNode.left;

    // Case 3: the node has two children
    // Find the in-order successor (the smallest node in the right subtree).
      let successor = this.findMinNode(currentNode.right);
      currentNode.data = successor.data;
      currentNode.right = this.delete(successor.data, currentNode.right);
      return currentNode;
    }
    return currentNode;
  }

  findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint(tree.root);
