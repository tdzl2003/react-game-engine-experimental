/**
 * Created by tdzl2003 on 2017/3/19.
 */
import {AssetType} from "./AssetsManager";

export default class Effect extends AssetType {
  streams;
  passes;

  constructor(gl, key) {
    super(gl);

    if (typeof(key) === 'string') {
      key = require('../../../assets/effects/' + key + '.effect.js');
    }
    this.streams = key.streams;
    this.passes = key.passes.map(v => this.loadPass(v));
  }

  loadPass(pass) {
    const vs = this.loadShader(gl.VERTEX_SHADER, pass.vs);
    const fs = this.loadShader(gl.FRAGMENT_SHADER, pass.fs);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    for (let i = 0; i < this.streams.length; i++) {
      const stream = this.streams[i];
      if (stream) {
        console.log(i, stream.name);
        gl.bindAttribLocation(program, i, stream.name);
      }
    }

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
    }

    // bind streams.
    // gl.useProgram(program);
    return program;
  }

  loadShader(type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  drawArrays(mode, first, count) {
    if (gl.lastUsedEffect) {
      for (let i = this.streams.length; i < gl.lastUsedEffect.stream.length; i++) {
        gl.disableVertexAttribArray(i);
      }
    }
    for (const pass of this.passes) {
      gl.useProgram(pass);
      gl.drawArrays(mode, first, count);
    }
  }

  drawElements(mode, count, type, offset) {
    if (gl.lastUsedEffect && gl.lastUsedEffect !== this) {
      for (let i = this.streams.length; i < gl.lastUsedEffect.stream.length; i++) {
        gl.disableVertexAttribArray(i);
      }
    }
    for (const pass of this.passes) {
      gl.useProgram(pass);
      gl.drawElements(mode, count, type, offset);
    }
    gl.lastUsedEffect = this;
  }
};
