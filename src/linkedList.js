export class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}
export class LinkedList {
  constructor() {
    this.next = null;
  }

  append(key, value) {
    let newNode = new Node(key, value);
    if (!this.next) this.next = newNode;
    else {
      let current = this.next;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    return;
  }

  prepend(key, value) {
    let newNode = new Node(key, value);
    if (!this.next) this.next = new Node();
    else {
      newNode.next = this.next;
      this.next = newNode;
    }
  }

  size() {
    if (!this.head) return 0;
    else {
      let counter = 0;
      let current = this.next;
      while (current) {
        current = current.next;
        counter++;
      }
      return counter;
    }
  }

  head() {
    return this.next;
  }

  tail() {
    let current = this.next;
    while (current.next) {
      current = current.next;
    }
    return current;
  }

  at(index) {
    if (!this.next) return null;
    else {
      let current = this.next;
      let elementIndex = 1;
      while (elementIndex !== index) {
        if (current.next) {
          current = current.next;
          elementIndex++;
        } else return null;
      }
      return current;
    }
  }

  pop() {
    if (!this.next) return null;
    else {
      let current = this.next;
      while (current.next.next) {
        current = current.next;
      }
      current.next = null;
    }
  }

  contains(key) {
    let current = this.next;
    while (current) {
      if (current.key === key) {
        return true;
      } else current = current.next;
    }
    return false;
  }

  read(index) {
    let target = this.at(index);
    return target.value;
  }

  find(key) {
    let current = this.next;
    let index = 1;
    while (current) {
      if (current.key === key) return index;
      index++;
      current = current.next;
    }
    return null;
  }

  overwrite(key, value) {
     if (this.find(key)) {
      let index = this.find(key);
      let target = this.at(index);
      target.value = value;
     } else return null;
  }

  toString() {
    let current = this.next;
    let arr = [];
    if (!current) return null
    while (current) {
      arr.push(`( ${current.key}: ${current.value} )`);
      current = current.next;
    }
    return arr.join(" -> ") + " -> null";
  }

  insertAt(value, index) {
    let newNode = new Node(value);
    let nodeBefore = this;
    let nodeAfter = this.next;
    for (let i = 0; i < index - 1; i++) {
      if (!nodeAfter) return "too far"
      nodeBefore = nodeBefore.next;
      nodeAfter = nodeBefore.next;
    }

    newNode.next = nodeAfter;
    nodeBefore.next = newNode;
  }

  removeAt(index) {
    let current = this;
    for (let i = 0; i < index - 1; i++) {
      if (!current.next.next) return "no node at this index"
      else current = current.next;
    }

    current.next = current.next.next
  }

  clear() {
    const length = this.size();

    for (let i = length - 1; i > 0; i--) {
      let node = this.at[i];
      node.next = null
    }

    this.next = null
  }
}

