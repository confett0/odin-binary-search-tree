class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    // Remove duplicates, sort the array, and build the binary search tree.
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  // Build a balanced binary search tree from a sorted array.
  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }

    const middle = Math.floor((start + end) / 2);
    const node = new Node(arr[middle]);

    // Recursively build left and right subtrees.
    node.left = this.buildTree(arr, start, middle - 1);
    node.right = this.buildTree(arr, middle + 1, end);

    return node;
  }

  // Insert a new node with the given key into the tree.
  insert(key, currentNode = this.root) {
    if (currentNode === null) { // If the current node is null, create a new node.
      currentNode = new Node(key);
      return currentNode;
    }

    if (key < currentNode.data) {
      // Insert into the left subtree recursively.
      currentNode.left = this.insert(key, currentNode.left);
    }
    if (key > currentNode.data) {
      // Insert into the right subtree recursively.
      currentNode.right = this.insert(key, currentNode.right);
    }
    return currentNode;
  }

  // Delete a node with the given key from the tree.
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

  // Find the node with the minimum value in the subtree.
  findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Find a node with the given key in the tree.
  find(key, currentNode = this.root) {
    if (currentNode === null || key === currentNode.data) {
      return currentNode;
    }
  
    if (key < currentNode.data) {
      return this.find(key, currentNode.left);
    } else {
      return this.find(key, currentNode.right);
    }
  }

  // Perform a level-order traversal of the tree, optionally applying a callback function.
  levelOrder(callback = null, head = this.root) {
    if (!head) {
      return [];
    }

    const queue = [head];
    const result = [];

    while (queue.length !== 0) {
      let currentNode = queue.shift();
      if (callback) {
        callback(currentNode.data);
      } else {
      result.push(currentNode.data);
    }
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    if (callback) return;

    return result;
  }

  // Perform a pre-order traversal of the tree, optionally applying a callback function.
  preOrder(currentNode = this.root, callback = null) {
    const result = [];
    if (currentNode === null) return;

    if (callback) {
      callback(currentNode.data);
    } else {
    result.push(currentNode.data);
    }
    this.preOrder(currentNode.left);
    this.preOrder(currentNode.right);

    if (callback) return;

    return result;
  }

  // Perform a in-order traversal of the tree, optionally applying a callback function.
  inOrder(currentNode = this.root, callback = null) {
    const result = [];
    if (currentNode === null) return;

    this.inOrder(currentNode.left);
    if (callback) {
      callback(currentNode.data);
    } else {
    result.push(currentNode.data);
    }
    this.inOrder(currentNode.right);

    if (callback) return;

    return result;
  }

  // Perform a post-order traversal of the tree, optionally applying a callback function.
  postOrder(currentNode = this.root, callback = null) {
    const result = [];
    if (currentNode === null) return;

    this.postOrder(currentNode.left);
    this.postOrder(currentNode.right);
    if (callback) {
      callback(currentNode.data);
    } else {
    result.push(currentNode.data);
    }

    if (callback) return;

    return result;
  }

  // Log the tree to the console.
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
