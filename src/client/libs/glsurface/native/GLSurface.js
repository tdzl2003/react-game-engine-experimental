/**
 * Created by tdzl2003 on 2017/3/19.
 */
import {nativeComponent, NativeComponent} from "../../uimanager/index";
import BatchDraw2D from "./BatchDraw2D";
import AssetManager from "./AssetsManager";
import Effect from "./Effect";

@nativeComponent('gl-surface')
class GLSurface extends NativeComponent {
  renderTimer = null;

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

    const width = this.el.width = this.el.offsetWidth;
    const height = this.el.height = this.el.offsetHeight;

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
    const {offsetWidth:width, offsetHeight:height} = this.el;
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

    gl.painter2d.drawRect(-0.5, -0.5, 1, 1, 1, 0, 0, 1);

    gl.painter2d.flush();
  }
}