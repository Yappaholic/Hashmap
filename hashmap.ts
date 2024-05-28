class LinkedList {
  public head: any;
  public length: number;
  constructor() {
    this.head = null;
    this.length = 0;
  }
  append(name: string, value: any) {
    const node = new Node(name, value, null);
    if (this.head === null && this.length === 0) {
      this.head = node;
    } else {
      let tail = this.showTail();
      tail.next = node;
    }
    this.length++;
    return this.head;
  }
  prepend(name: string, value: any) {
    const node = new Node(name, value, this.head);
    if (this.head === null && this.length === 0) {
      this.head = node;
    } else {
      const tmp = this.head;
      this.head = node;
      this.head.next = tmp;
    }
    this.length++;
  }
  size() {
    return this.length;
  }
  showHead() {
    return this.head;
  }
  showTail() {
    let node = this.head;
    if (this.length === 0) {
      return null;
    }
    while (node) {
      if (node.next === null) {
        return node;
      } else {
        node = node.next;
      }
    }
  }
  at(idx: number) {
    let node = this.head;
    let curr = null;
    if (idx >= this.length) {
      return undefined;
    }
    for (let i = 0; i <= idx; i++) {
      curr = node;
      node = node.next;
    }
    return curr;
  }
  pop() {
    let node = this.head;
    if (this.length === 1) {
      this.head = null;
      this.length = 0;
      return this.head;
    }
    while (node) {
      if (node.next.next === null) {
        node.next = null;
        this.length--;
        return this.head;
      } else {
        node = node.next;
      }
    }
  }
  contains(value: any) {
    let node = this.head;
    while (node) {
      if (node.next === null) {
        return false;
      }
      if (node.value === value) {
        return true;
      } else {
        node = node.next;
      }
    }
  }
  find(value: any) {
    let node = this.head;
    let idx = 0;
    while (node) {
      if (node.next === null && node.value != value) {
        return undefined;
      }
      if (node.value === value) {
        return idx;
      } else {
        node = node.next;
        idx++;
      }
    }
  }
  toString() {
    return JSON.stringify(this.head);
  }
  insertAt(name: string, value: any, idx: number) {
    let node = this.head;
    let prev = this.head;
    if (idx === 0) {
      const tmp = this.head;
      this.head = new Node(name, value, tmp);
      return this.head;
    }
    for (let i = 0; i <= idx; i++) {
      if (node.next === null) {
        break;
      }
      prev = node;
      node = node.next;
    }
    prev.next = new Node(name, value, node);
    this.length++;
    return this.head;
  }
  removeAt(idx: number) {
    if (idx >= this.length) {
      return undefined;
    }
    if (idx === 0) {
      this.head = this.head.next;
      this.length--;
      return this.head;
    }
    let node = this.at(idx);
    let prev = this.at(idx - 1);
    const tmp = node.next;
    node = null;
    prev.next = tmp;
    this.length--;
    return this.head;
  }
}
class Node {
  public name: string;
  public value: any;
  public next: any;
  constructor(name: string, value: any, next: any) {
    this.name = name;
    this.value = value;
    this.next = next;
  }
}

class Hashmap {
  public storage;
  constructor() {
    this.storage = new LinkedList();
  }
  set(key: string, value: string) {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage.at(i).name === key) {
        this.storage.at(i).value = value;
        return this.storage;
      }
    }
    this.storage.append(key, value);
    return this.storage;
  }
  get(key: string) {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage.at(i).name === key) {
        return this.storage.at(i).value;
      }
    }
    return null;
  }
  has(key: string) {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage.at(i).name === key) {
        return true;
      }
    }
    return false;
  }
  remove(key: string) {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage.at(i).name === key) {
        this.storage.removeAt(i);
      }
    }
    return false;
  }
  length() {
    return this.storage.length;
  }
  clear() {
    this.storage.head = [];
    this.storage.length = 0;
  }
  keys() {
    let array: string[] = [];
    if (this.storage.length === 0) {
      return array;
    }
    for (let i = 0; i < this.storage.length; i++) {
      array.push(this.storage.at(i).name);
    }
    return array;
  }
  values() {
    let array: string[] = [];
    if (this.storage.length === 0) {
      return array;
    }
    for (let i = 0; i < this.storage.length; i++) {
      array.push(this.storage.at(i).value);
    }
    return array;
  }
  entries() {
    let array: any[][] = [];
    if (this.storage.length === 0) {
      return array;
    }
    for (let i = 0; i < this.storage.length; i++) {
      array.push([this.storage.at(i).name, this.storage.at(i).value]);
    }
    return array;
  }
}
let hash = new Hashmap();
hash.set("foo", "bar");
hash.remove("foo");
console.log(hash.entries());
