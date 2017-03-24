/**
 * Created by tdzl2003 on 2017/3/19.
 */

export class AssetType {
  ref = 0;

  // return a promise if assets needs a async loading.
  load() {
  }

  unload() {
  }

  addRef() {
    ++this.ref;
  }

  release() {
    --this.ref;
  }

  destroy() {
  }
}

export default class AssetManager {
  clazz = null;
  assets = {}

  constructor(clazz) {
    this.clazz = clazz;
  }

  obtain(gl, key) {
    let ref = this.assets[key];
    if (!ref) {
      this.assets[key] = ref = new this.clazz(gl, key);
      ref.load(gl);
    }

    ref.addRef();
    return ref;
  }
}
