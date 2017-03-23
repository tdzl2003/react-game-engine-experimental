/**
 * Created by tdzl2003 on 2017/3/19.
 */
import {prop, nativeComponent, NativeComponent, NativeElementComponent} from "../../uimanager/index";
import BatchDraw2D from "./BatchDraw2D";
import AssetManager from "./AssetsManager";
import Effect from "./Effect";

class GLNode extends NativeComponent {
  prevSibling = null;
  nextSibling = null;

  parentNode = null;

  mount(parentNode, before) {
    if (__DEV__) {
      if (this.parentNode) {
        console.error('Mount before unmounted.');
      }
    }
    this.parentNode = parentNode;
    parentNode.insertBefore(this, before);
  }

  unmount() {
    this.parentNode.removeChild(this);
  }

  renderGL(gl) {
    // Override me.
  }
}

class GLContainer {
  firstChild = null;
  lastChild = null;

  appendChild(child) {
    this.insertBefore(child, null);
  }

  insertBefore(child, before) {
    if (__DEV__) {
      if (before && before.parentNode !== this) {
        console.error('Before is not child of this.');
      }
    }
    const after = before ? before.prevSibling : this.lastChild;
    if (after) {
      after.nextSibling = child;
      child.prevSibling = after;
    } else {
      this.firstChild = child;
    }
    if (before) {
      before.prevSibling = child;
      child.nextSibling = before;
    } else {
      this.lastChild = child;
    }

    child.parentNode = this;
  }

  removeChild(child) {
    if (__DEV__) {
      if (child.parentNode !== this) {
        console.error('removeChild target is not child of this.');
      }
    }

    const { nextSibling, prevSibling } = child;
    if (nextSibling) {
      nextSibling.prevSibling = child.prevSibling;
      child.nextSibling = null;
    } else {
      this.lastChild = prevSibling;
    }

    if (prevSibling) {
      prevSibling.nextSibling = child.nextSibling;
      child.prevSibling = null;
    } else {
      this.firstChild = nextSibling;
    }

    child.parentNode = null;
  }

  renderGL(gl) {
    for (let l = this.firstChild; l; l = l.nextSibling) {
      l.renderGL(gl);
    }
  }
}

@nativeComponent('gl-2d-rect')
class GLRect extends GLNode {
  @prop x = 0;
  @prop y = 0;
  @prop w = 0;
  @prop h = 0;

  @prop r = 0;
  @prop g = 0;
  @prop b = 0;
  @prop a = 1;

  renderGL(gl) {
    gl.painter2d.drawRect(
      this.x, this.y, this.w, this.h,
      this.r, this.g, this.b, this.a,
    );
  }
}

@nativeComponent('gl-surface')
class GLSurface extends NativeElementComponent {
  renderTimer = null;

  container = new GLContainer();

  createElement() {
    return document.createElement('canvas');
  }

  mount(parentNode, before) {
    super.mount(parentNode, before);

    if (!this.gl) {
      this.initGL();
      this.performRender();
    } else {
      // Remounted, size may changed.
      // this.render(this.gl);
    }
  }

  performRender = () => {
    if (this.reactId !== null) {
      this.renderTimer = requestAnimationFrame(this.performRender);
      this.renderGL(this.gl);
    }
  };

  initGL() {
    const canvas = this.el;
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const ratio = window.devicePixelRatio || 1;

    const width = this.el.width = (this.el.offsetWidth * ratio) | 0;
    const height = this.el.height = (this.el.offsetHeight * ratio) | 0;

    this.sendEvent('surfaceCreated', {
      width,
      height,
    });

    if (__DEV__) {
      global.gl = gl;
    }

    // If we don't have a GL context, give up now
    if (!gl) {
      console.error('Unable to initialize WebGL. Your browser may not support it.');
    }

    this.gl = gl;

    gl.effectManager = new AssetManager(Effect);

    gl.painter2d = new BatchDraw2D(gl);
  }

  renderGL(gl) {
    const {offsetWidth, offsetHeight} = this.el;
    const ratio = window.devicePixelRatio || 1;
    const width = (offsetWidth * ratio) | 0;
    const height = (offsetHeight * ratio) | 0;
    if (width !== this.el.width || height !== this.el.height) {
      this.el.width = width;
      this.el.height = height;
      this.sendEvent('sizeChanged', {
        width,
        height,
      });
    }
    if (__DEV__) {
      gl.viewport(0, 0, width, height);
      gl.clearColor(0.0, 0.0, 1.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    this.container.renderGL(gl);

    gl.painter2d.flush();
  }

  appendChild(child) {
    this.container.appendChild(child);
  }

  insertBefore(el, before) {
    this.container.insertBefore(el, before);
  }

  removeChild(child) {
    this.container.removeChild(child);
  }
}