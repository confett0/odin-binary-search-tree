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
    if (currentNode === null) {
      // If the current node is null, create a new node.
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

    const traverse = (node) => {
      if (node === null) return;

      if (callback) {
        callback(node.data);
      } else {
        result.push(node.data);
      }
      traverse(node.left);
      traverse(node.right);
    };
    traverse(currentNode);
    return result;
  }

  // Perform a in-order traversal of the tree, optionally applying a callback function.
  inOrder(currentNode = this.root, callback = null) {
    const result = [];

    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left);
      if (callback) {
        callback(node.data);
      } else {
        result.push(node.data);
      }
      traverse(node.right);
    };
    traverse(currentNode);
    return result;
  }

  // Perform a post-order traversal of the tree, optionally applying a callback function.
  postOrder(currentNode = this.root, callback = null) {
    const result = [];

    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left);
      traverse(node.right);

      if (callback) {
        callback(node.data);
      } else {
        result.push(node.data);
      }
    };
    traverse(currentNode);
    return result;
  }

  // Return the height of the tree.
  height(currentNode = this.root) {
    // If the tree is empty return 0;
    if (currentNode === null) return 0;

    // Get the max depth of the left and right subtree recursively.
    let leftHeight = this.height(currentNode.left);
    let rightHeight = this.height(currentNode.right);

    // Get the max of max depths of left and right subtrees and add 1 to it for the current node.
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Return the width of the tree.
  width(currentNode = this.root) {
    let maxWidth = 0;
    const h = this.height(currentNode);

    // Get width of a given level
    const levelWidth = (node, level) => {
      if (node === null) return 0;
      if (level === 1) return 1;
      if (level > 1) {
        return (
          levelWidth(node.left, level - 1) + levelWidth(node.right, level - 1)
        );
      }
    };

    for (let i = 0; i <= h; i++) {
      const width = levelWidth(currentNode, i);
      if (width > maxWidth) {
        maxWidth = width;
      }
    }
    return maxWidth;
  }

  // Checks if the tree is balanced.
  isBalanced(currentNode = this.root) {
    if (currentNode === null) return true; // An empty tree is balanced.

    const leftHeight = this.height(currentNode.left);
    const rightHeight = this.height(currentNode.right);

    // Check if the current node is balanced and both subtrees are balanced
    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(currentNode.left) &&
      this.isBalanced(currentNode.right)
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Rebalance an unbalanced tree 
  rebalance(currentNode = this.root) {
    // Use the inorder traversal method to provide a new array to the buildTree function
    const arr = this.inOrder(currentNode);
    // Rebuild the tree and update the root reference
    this.root = this.buildTree(arr);
  }

  // Log the tree to the console.
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
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

// Driver script

// Helper functions
const createRandomArray = () => {
  return Array.from({length: 10}, () => Math.floor(Math.random() * 100));
}

const addNumbers = () => {
  const arr = createRandomArray();
  arr.map(el => tree.insert(el));
}

const tree = new Tree(createRandomArray());
tree.prettyPrint();
console.log(`Is balanced? ${tree.isBalanced()}`);
console.log(`Level order traversal: ${tree.levelOrder()}`);
console.log(`Pre order traversal: ${tree.preOrder()}`);
console.log(`Post order traversal: ${tree.postOrder()}`);
console.log(`In order traversal: ${tree.inOrder()}`);
addNumbers();
console.log(`Added 10 numbers to the tree.`)
tree.prettyPrint();
console.log(`Is balanced? ${tree.isBalanced()}`);
tree.rebalance();
tree.prettyPrint();
console.log(`Is balanced? ${tree.isBalanced()}`);
console.log(`Level order traversal: ${tree.levelOrder()}`);
console.log(`Pre order traversal: ${tree.preOrder()}`);
console.log(`Post order traversal: ${tree.postOrder()}`);
console.log(`In order traversal: ${tree.inOrder()}`);

