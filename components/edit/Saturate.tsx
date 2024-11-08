import { GLSL, Node, Shaders } from "gl-react";
import React from "react";
import { Platform } from "react-native";

type SaturationProps = {
  contrast: number;
  brightness: number;
  children: { uri: string };
};

const shaders = Shaders.create({
  Saturate: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D t;
      uniform float contrast, brightness;
      const vec3 L = vec3(0.2125, 0.7154, 0.0721);
      
      void main() {
        vec2 rotatedUV = vec2(1.0 - uv.y, uv.x);
        
        vec4 c = texture2D(t, ${Platform.OS === "ios" ? "rotatedUV" : "uv"});
        vec3 brt = c.rgb * brightness;
        gl_FragColor = vec4(mix(vec3(0.5), mix(vec3(dot(brt, L)), brt, 1.0), contrast), c.a);
      }`,
  },
});

export function Saturate({ contrast, brightness, children }: SaturationProps) {
  return (
    <Node
      shader={shaders.Saturate}
      uniforms={{ contrast, brightness, t: children }}
    />
  );
}
