varying mediump vec2 vTexcoord;
varying lowp vec4 vDiffuse;

uniform sampler2D sampler;

void main(void) {
    gl_FragColor = texture2D(sampler, vTexcoord) * vDiffuse;
}
