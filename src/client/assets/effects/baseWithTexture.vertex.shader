attribute vec2 vertex;
attribute vec2 texcoord;
attribute vec4 diffuse;

varying mediump vec2 vTexcoord;
varying lowp vec4 vDiffuse;

void main(void) {
    vTexcoord = texcoord;
    vDiffuse = diffuse;
    gl_Position = vec4(vertex, 0.0, 1.0);
}