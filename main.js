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
      // Takes out the first "node element" in the queue
      let current = queue.shift();

      // Does whatever with current, ex: print the value, add the value to, etc...
      callback(current);

      // Pushes the left node if is != null
      if (current.left !== null) {
        queue.push(current.left);
      }

      // Pushes the right node if is != null
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
    if (node === null) {
      console.error("Error: Node not found.");
      return -1;
    }

    const _height = (n) => {
      if (n === null) return -1;

      let leftHeight = _height(n.left);
      let rightHeight = _height(n.right);

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return _height(node);
  }

  depth(node) {
    if (node === null) {
      console.error("Error: Node not found.");
      return -1;
    }

    return this._depth(this.root, node);
  }

  _depth(root, node, depth = 0) {
    if (root === null) return -1;

    if (node.data === root.data) return depth;
    else if (node.data < root.data) {
      return this._depth(root.left, node, depth + 1);
    } else {
      return this._depth(root.right, node, depth + 1);
    }
  }

  isBalanced() {
    // to-do...
    console.log("Checking if tree is balanced...");
    return this._isBalanced(this.root) !== -1;
  }

  _isBalanced(node) {
    if (node === null) return 0;

    let leftHeight = this._isBalanced(node.left);
    if (leftHeight === -1) return -1;

    let rightHeight = this._isBalanced(node.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance() {
    // to-do...
  }

  _rebalance() {
    if (this.isBalanced === true) return;
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

// Testing

const values = [7, 3, 8, 5, 4, 1, 6, 2, 18, 19, 29, 30];
const tree = new Tree(values);

console.log("Printing tree... ");
tree.insert(19);
prettyPrint(tree.root);

console.log(tree.isBalanced());

console.log("levelOrder");
tree.levelOrder((node) => console.log(node.data));

console.log("inOrder");
tree.inOrder((node) => console.log(node.data));

console.log("preOrder");
tree.preOrder((node) => console.log(node.data));

console.log("postOrder");
tree.postOrder((node) => console.log(node.data));

console.log("Find node... ");
const nodeToCheck = tree.find(1);

console.log(`Find node's height given node: ${tree.height(nodeToCheck)}`);
console.log(`Find node's depth given node: ${tree.depth(nodeToCheck)}`);
