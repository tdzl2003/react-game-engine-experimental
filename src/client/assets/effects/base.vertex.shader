attribute vec2 vertex;
attribute vec4 diffuse;

varying lowp vec4 vDiffuse;

void main(void) {
    vDiffuse = diffuse;
    gl_Position = vec4(vertex, 0.0, 1.0);
}