uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = position;

  // modelViewMatrix = modelMatrix * viewMatrix;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
}