/**
 * Created by tdzl2003 on 2017/3/19.
 */
import {AssetType} from "./AssetsManager";

export class ImageTexture extends AssetType {
  uri;
  texture;
  loaded = false;

  constructor(gl, uri) {
    super(gl);
    this.uri = uri;
  }

  load(gl) {
    this.texture = gl.createTexture();

    const image = new Image();
    image.src = this.uri;
    image.onload = () => {
      if (this.texture) {
        const { width, height } = image;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        const err = gl.getError();
        if (err) {
          console.warn(`Load texture error: ${err}`);
        }

        if (__DEV__) {
          console.log(`Texture loaded: ${this.uri} ${width}x${height}`);
        }
        this.loaded = true;
      }
    };
  }

  unload(gl) {
    gl.deleteTexture(this.texture);
    this.texture = null;
  }

};
