// Fragment Shader for hologram effect with mask reveal
uniform float uTime;
uniform float uProgress;
uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Fresnel effect for edge glow
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
  
  // Scanline effect
  float scanline = sin(vUv.y * 50.0 + uTime * 2.0) * 0.1 + 0.9;
  
  // Mask reveal based on progress (hover)
  float maskY = smoothstep(uProgress - 0.1, uProgress + 0.1, vUv.y);
  
  // Texture for project thumbnail
  vec4 texColor = texture2D(uTexture, vUv);
  
  // Combine effects
  vec3 finalColor = mix(
    uColor * fresnel * scanline,
    texColor.rgb,
    maskY
  );
  
  float alpha = max(fresnel * 0.3, maskY * texColor.a);
  
  gl_FragColor = vec4(finalColor, alpha);
}
