// Holographic Projection Vertex Shader
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;

uniform float uTime;
uniform float uWaveStrength;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  
  // Wave distortion
  vec3 pos = position;
  float wave = sin(position.y * 10.0 + uTime * 2.0) * uWaveStrength;
  pos.x += wave * 0.05;
  pos.z += cos(position.y * 10.0 + uTime * 2.0) * uWaveStrength * 0.05;
  
  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
  vWorldPosition = worldPosition.xyz;
  
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
