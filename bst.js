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

  insert(data, currentNode = this.root) {
    if (currentNode === null) {
        currentNode = new Node(data);
        return currentNode;
    }

    if (data < currentNode.data) {
        currentNode.left = this.insert(data, currentNode.left);
    }
    if (data > currentNode.data) {
        currentNode.right = this.insert(data, currentNode.right);
    }
    return currentNode;
  }


  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint(tree.root);
