/**
 * Created by tdzl2003 on 3/26/17.
 */

import { GLNode, GLContainer } from 'glsurface/native';
import { nativeComponent, prop } from 'uimanager';
import {translate2D, scale2D, rotate2D} from 'glsurface/common/matrix';

@nativeComponent('gl-2d-layer')
export class GLLayer extends GLContainer {
  // defaults to -1 to 1
  @prop x = 0;
  @prop y = 0;
  @prop width = 2;
  @prop height = 2;

  renderGL(gl) {
    gl.matrixStack.pushOrtho2D(this.width, this.height, this.x, this.y);
    super.renderGL(gl);
    gl.matrixStack.pop();
  }
}

@nativeComponent('gl-2d-node')
export class GLNode2D extends GLContainer {
  // defaults to -1 to 1
  @prop x = 0;
  @prop y = 0;
  @prop rotate = 0;
  @prop scaleX = 1;
  @prop scaleY = 1;

  renderGL(gl) {
    const { matrixStack } = gl;
    matrixStack.push();
    const { top } = matrixStack;
    scale2D(top, this.scaleX, this.scaleY);
    rotate2D(top, this.rotate);
    translate2D(top, this.x, this.y);

    super.renderGL(gl);
    matrixStack.pop();
  }
}

@nativeComponent('gl-2d-rect')
export class GLRect extends GLNode {
  @prop x = 0;
  @prop y = 0;
  @prop w = 0;
  @prop h = 0;

  @prop r = 1;
  @prop g = 1;
  @prop b = 1;
  @prop a = 1;

  renderGL(gl) {
    gl.painter2d.drawRect(
      gl,
      this.x, this.y, this.w, this.h,
      this.r, this.g, this.b, this.a,
    );
  }
}

@nativeComponent('gl-2d-image')
export class GLImage extends GLRect {
  texture = null;
  uri = null;

  @prop tx = 0;
  @prop ty = 0;
  @prop tw = 1;
  @prop th = 1;

  @prop
  set src(value) {
    this.releaseTexture();
    this.uri = value;
  }

  unmount() {
    this.releaseTexture();
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
    if (this.texture.loaded) {
      gl.painter2d.drawTexture(
        gl,
        this.texture.texture,
        this.x, this.y, this.w, this.h,
        this.tx, this.ty, this.tw, this.th,
        this.r, this.g, this.b, this.a,
      );
    }
  }
}