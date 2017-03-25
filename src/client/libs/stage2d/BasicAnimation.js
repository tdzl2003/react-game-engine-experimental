/**
 * Created by tdzl2003 on 3/26/17.
 */

import { GLNode } from 'glsurface/native/GLSurface';
import { nativeComponent, prop } from 'uimanager';

function setAnimationInterval(onFrame) {
  let timer;
  function nextFrame() {
    if (timer !== null) {
      setNextFrame();
      onFrame();
    }
  }
  function setNextFrame() {
    timer = requestAnimationFrame(nextFrame);
  }
  setNextFrame();
  return () => {
    cancelAnimationFrame(timer);
    timer = null;
  }
}

@nativeComponent('gl-2d-basic-animation')
export class BasicAnimation extends GLNode {
  texture = null;
  uri = null;

  currentFrame = 0;
  disposeTimer = null;

  _interval = 0;
  _animationData = null;

  @prop r = 1;
  @prop g = 1;
  @prop b = 1;
  @prop a = 1;

  @prop
  tileW = 0;

  @prop
  tileH = 0;

  @prop
  columns = 1;  // 有多少列

  @prop
  set interval(value) {
    this._interval = value;
    this.resetTimer();
  }

  @prop
  set animationData(value) {
    this._animationData = value;
    this.resetTimer();
  }

  resetTimer() {
    if (this.disposeTimer !== null) {
      this.disposeTimer();
    }
    this.currentFrame = 0;
    if (this._interval > 0) {
      const timer = setInterval(this.onFrame, this._interval);
      this.disposeTimer = () => {
        clearInterval(timer);
      }
    } else {
      this.disposeTimer = setAnimationInterval(this.onFrame);
    }
  }

  onFrame = () => {
    if (++this.currentFrame >= this._animationData.length) {
      this.currentFrame = 0;
    }
  }

  @prop
  set src(value) {
    this.releaseTexture();
    this.uri = value;
  }

  unmount() {
    this.releaseTexture();
    if (this.disposeTimer) {
      this.disposeTimer();
      this.disposeTimer = null;
    }
  }

  releaseTexture() {
    if (this.texture) {
      this.texture.release();
      this.texture = null;
    }
  }

  renderGL(gl) {
    if (!this.texture && this.uri) {
      this.texture = gl.imageTextureManager.obtain(gl, this.uri);
    }
    if (!this.texture.loaded || !this._animationData || this.currentFrame >= this._animationData.length) {
      return;
    }
    const frameId = this._animationData[this.currentFrame];
    const tx = this.tileW * (frameId % this.columns);
    const ty = this.tileH * ((frameId / this.columns) | 0);

    gl.painter2d.drawTexture(
      gl,
      this.texture.texture,
      -0.5, -0.5, 1, 1,
      tx, ty, this.tileW, this.tileH,
      this.r, this.g, this.b, this.a,
    );
  }
}
