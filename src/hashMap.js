/* Use the following snippet whenever you access a bucket through an index. We want to throw an error if we try to access an out of bound index:

if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bound");
} 

*/

import { LinkedList } from "./linkedList";

export class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = [];

    for (let i = 1; i <= capacity; i++) {
      this.buckets.push(new LinkedList);
    }
  }

  pickBucket(key) {
    const bucket = this.buckets[this.hash(key) % this.capacity];
    return bucket;
  }

  hash(key) {
    let hashCode = 0;
      
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    const bucket = this.pickBucket(key);
    if(!bucket.contains(key)) {
      bucket.append(key, value)
    } else {
      bucket.overwrite(key, value)
    }
  }

  get(key) {
    const bucket = this.pickBucket(key);
    if(bucket.contains(key)) {
      return bucket.read(bucket.find(key))
    } else return null
  }

  has(key) {
    const bucket = this.pickBucket(key);
    if(bucket.contains(key)) return true
    else return false
  }

  remove(key) {
    const bucket = this.pickBucket(key);
    if(this.has(key)) {
      bucket.removeAt(bucket.find(key))
    } else return false
  }

  length() {
    let counter = 0;
    for(let i = 0; i < this.buckets.length; i++) {
      counter = counter + this.buckets[i].size();
    }
    return counter
  }

  clear() {
    this.buckets.forEach((bucket) => bucket.clear())
  }

  keys() {
    const keys = [];
    this.buckets.forEach((bucket) => {
      if(bucket.size() > 0) {
        let current = bucket.next;
        while(current) {
          keys.push(current.key)
          current = current.next
        }
      }
    })
    return keys;
  }

  values() {
    const values = [];
    this.buckets.forEach((bucket) => {
      if(bucket.size() > 0) {
        let current = bucket.next;
        while(current) {
          values.push(current.value)
          current = current.next
        }
      }
    })
    return values;
  }

  entries() {
    const entries = [];
    this.buckets.forEach((bucket) => {
      if(bucket.size() > 0) {
        let current = bucket.next;
        while(current) {
          entries.push([current.key, current.value])
          current = current.next
        }
      }
    })
    return entries;
  }
}