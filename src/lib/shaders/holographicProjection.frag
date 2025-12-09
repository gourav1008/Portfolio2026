// Holographic Projection Fragment Shader
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;

uniform float uTime;
uniform vec3 uColor;
uniform float uIntensity;
uniform float uGridScale;
uniform float uAlphaStrength;

// Holographic grid pattern
float gridPattern(vec2 uv, float scale) {
  vec2 grid = fract(uv * scale);
  float lineWidth = 0.05;
  
  float horizontalLine = smoothstep(lineWidth, 0.0, abs(grid.y - 0.5));
  float verticalLine = smoothstep(lineWidth, 0.0, abs(grid.x - 0.5));
  
  return max(horizontalLine, verticalLine);
}

// Animated scan lines
float scanLines(vec2 uv, float time) {
  float line = sin((uv.y + time * 0.3) * 50.0) * 0.5 + 0.5;
  return pow(line, 3.0);
}

// Fresnel effect for edge glow
float fresnel(vec3 normal, vec3 viewDir, float power) {
  return pow(1.0 - max(dot(normal, viewDir), 0.0), power);
}

// Noise function for distortion
float noise(vec2 uv) {
  return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  // View direction for fresnel
  vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
  
  // Fresnel glow on edges
  float fresnelTerm = fresnel(vNormal, viewDirection, 3.0);
  
  // Animated grid pattern
  float grid = gridPattern(vUv, uGridScale);
  
  // Animated scan lines
  float scan = scanLines(vUv, uTime);
  
  // Noise-based alpha distortion
  vec2 distortedUV = vUv + vec2(
    noise(vUv + uTime * 0.1) * 0.02,
    noise(vUv - uTime * 0.1) * 0.02
  );
  float alphaDistortion = noise(distortedUV * 10.0);
  
  // Combine effects
  vec3 hologramColor = uColor * uIntensity;
  hologramColor += grid * uColor * 0.8;
  hologramColor += scan * uColor * 0.3;
  hologramColor += fresnelTerm * uColor * 2.0; // Edge glow
  
  // Pulsing effect
  float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
  hologramColor *= pulse;
  
  // Alpha with distortion and fresnel
  float alpha = (grid * 0.4 + scan * 0.2 + fresnelTerm * 0.6) * uAlphaStrength;
  alpha *= (alphaDistortion * 0.5 + 0.5); // Add noise-based variation
  alpha = clamp(alpha, 0.0, 0.9); // Keep slightly transparent
  
  // Vertical fade (stronger at bottom)
  alpha *= smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
  
  gl_FragColor = vec4(hologramColor, alpha);
}
