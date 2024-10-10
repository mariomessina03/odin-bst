class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // Delete duplicates and sort the values
    let uniqueArray = [...new Set(array)];
    let sortedArray = uniqueArray.sort((a, b) => a - b);

    // Base cases
    if (sortedArray.length === 0) {
      return null;
    }
    if (sortedArray.length === 1) {
      return new Node(sortedArray[0]);
    }

    let centerIndex = Math.floor(sortedArray.length / 2);
    let centerValue = sortedArray[centerIndex];

    let node = new Node(centerValue);

    let left = sortedArray.slice(0, centerIndex);
    let right = sortedArray.slice(centerIndex + 1);

    node.left = this.buildTree(left);
    node.right = this.buildTree(right);

    return node;
  }

  insert(value) {
    // If there isn't a node root...
    if (this.root === null) {
      this.root = new Node(value);
    } else {
      this._insert(value, this.root);
    }
  }

  _insert(value, node) {
    // If value < node
    if (value < node.data) {
      if (node.left === null) {
        node.left = new Node(value);
      } else {
        this._insert(value, node.left);
      }
    }

    // If value > node
    else if (value > node.data) {
      if (node.right === null) {
        node.right = new Node(value);
      } else {
        this._insert(value, node.right);
      }
    }

    // If value = node, do nothing so we manage duplications cases
  }
  deleteItem(value) {
    this.root = this._deleteItem(value, this.root);
  }

  _deleteItem(value, node) {
    if (node === null) return node;

    if (value < node.data) {
      node.left = this._deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this._deleteItem(value, node.right);
    }
    // Cases where we find value
    else {
      // If value is a leaf node
      if (node.left === null && node.right === null) {
        return null;
      }

      // If value is a node with only a child
      else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // If value is a node with two childs
      else {
        let minRightSubtree = this._findMin(node.right);
        node.data = minRightSubtree.data;
        node.right = this._deleteItem(minRightSubtree.data, node.right);
      }
    }

    return node;
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    return this._find(value, this.root);
  }

  _find(value, node) {
    if (node === null) return null;

    if (value < node.data) {
      return this._find(value, node.left);
    } else if (value > node.data) {
      return this._find(value, node.right);
    } else {
      return node;
    }
  }

  levelOrder(callback) {
    // Error handling
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (this.root === null) return;

    let queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let current = queue.shift();

      callback(current);

      if (current.left !== null) {
        queue.push(current.left);
      }

      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  inOrder(callback) {
    this._inOrder(this.root, callback);
  }

  _inOrder(node, callback) {
    // Error handling
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (node === null) return;
    this._inOrder(node.left, callback);
    callback(node);
    this._inOrder(node.right, callback);
  }

  preOrder(callback) {
    this._preOrder(this.root, callback);
  }

  _preOrder(node, callback) {
    // Error handling
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (node === null) return;
    callback(node);
    this._preOrder(node.left, callback);
    this._preOrder(node.right, callback);
  }

  postOrder(callback) {
    this._postOrder(this.root, callback);
  }

  _postOrder(node, callback) {
    // Error handling
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (node === null) return;
    this._postOrder(node.left, callback);
    this._postOrder(node.right, callback);
    callback(node);
  }

  height(node) {
    if (node === null) return -1;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    // to-do...
  }

  isBalanced() {
    // to-do...
  }

  rebalance() {
    // to-do...
  }
}

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

const values = [7, 3, 8, 5, 4, 1, 6, 2, 18];
const tree = new Tree(values);

console.log("Stampa dell'albero:");
tree.insert(19);
prettyPrint(tree.root);

console.log("levelOrder");
tree.levelOrder((node) => console.log(node.data));

console.log("inOrder");
tree.inOrder((node) => console.log(node.data));

console.log("preOrder");
tree.preOrder((node) => console.log(node.data));

console.log("postOrder");
tree.postOrder((node) => console.log(node.data));

const nodeToCheck = tree.find(1);
console.log(tree.height(nodeToCheck));
console.log(tree.depth(nodeToCheck));
