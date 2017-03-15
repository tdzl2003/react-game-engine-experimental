/**
 * Created by tdzl2003 on 2017/3/15.
 */
import { method } from './Module';

export default class Bridge{
  name = 'Bridge';

  // local modules
  modules = [this];

  // remote modules, name as key, methods/constants as value
  remoteModules = {};

  // saved callback for promise call
  callbacks = [];
  callbackId = 0;

  remote = null;

  install(worker = global) {
    if (this.remote) {
      throw new Error('Bridge cannot install multi times!');
    }
    worker.onmessage = this.processMessage;
    this.remote = worker;

    this.modules.forEach((module, moduleId) => {
      this.callRemoteVoid(0, 1, module.name, moduleId, module.constants, module.__methods);
    })
  }

  processMessage = e => {
    e.data.forEach(v => {
      if (__DEV__) {
        if (!this.modules[v[0]]) {
          console.error(`Cannot find module ${v[0]}`);
        } else if (!this.modules[v[0]].__methods[v[1]]) {
          console.error(`Cannot find method ${this.modules[v[0]].__methods[v[1]]} in module ${this.modules[v[0]].name}`);
        }
      }
      const module = this.modules[v[0]];
      const [name] = module.__methods[v[1]];

      if (!v[3]) {
        // void call
        module[name](...v[2]);
      } else {
        const [resolve, reject] = v[3];
        // promise call
        Promise.resolve(module[name](...v[2]))
          .then(() => {
            this.invokeRemoteCallback(resolve);
          }, () => {
            this.invokeRemoteCallback(reject);
          });
      }
    });
  };

  callRemoteVoid(moduleId, methodId, ...args) {
    this.remote.postMessage([[moduleId, methodId, args]]);
  }

  callRemotePromise(moduleId, methodId, ...args) {
    return new Promise((resolve, reject) => {
      const id = this.callbackId;
      this.callbacks[this.callbackId++] = resolve;
      this.callbacks[this.callbackId++] = reject;
      this.remote.postMessage([[moduleId, methodId, args, id, id+1]]);
    })
  }

  invokeRemoteCallback(callbackId, arg) {
    this.callRemoteVoid(0, 0, callbackId, arg);
  }

  @method
  invokeCallback(callbackId, arg) {
    const callback = this.callbacks[callbackId];
    if (__DEV__) {
      if (!callback) {
        console.error('Internal error: callback maybe called multi times.');
        return;
      }
    }
    delete this.callbacks[callbackId];
    delete this.callbacks[callbackId ^ 1];
    callback(arg);
  }

  @method
  addRemoteModule(moduleId, name, constants, methods) {
    const mod = this.remoteModules[name] = {};
    if (constants) {
      Object.assign(mod, constants);
    }
    methods.forEach(([name, async], methodId) => {
      mod[name] = (...args) => {
        this.remote.postMessage([moduleId, methodId, args]);
      };
    });
  }
}
