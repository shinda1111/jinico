#version 300 es

precision mediump float;

uniform sampler2D u_video;
in vec2 v_texcoord;
out vec4 outColor;

<<<<<<< HEAD
vec4 sdf_three(vec2 uv) {
    
    vec2 adjust_size = 1.0 / vec2(640.0,480.0);
=======
float rand(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453);
}

float gradient_noise(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    
    // 4点のランダム値
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));

    // 補間
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 uv) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 5; ++i) {
        value += amplitude * gradient_noise(uv * frequency);
        uv *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

vec4 sdf_three(vec2 uv) {
    
    vec2 adjust_size = 1.0 / vec2(320.0,240.0);
>>>>>>> d08a2e9 (first commit)
    vec2 uvs[5];
    vec4 colors[5];
    float sdfs[5];
    float values[5];
    //SDFの勾配を抽出する際に使う値
    float extraction=10.0;
    uvs[0] = uv + vec2(-1.0,  0.0) * adjust_size;
    uvs[1] = uv + vec2( 1.0,  0.0) * adjust_size;
    uvs[2] = uv + vec2( 0.0, -1.0) * adjust_size;
    uvs[3] = uv + vec2( 0.0,  1.0) * adjust_size;
    uvs[4] = uv;
    for(int i=0;i<5;i+=1)
    {
        colors[i]=texture(u_video, uvs[i]);
        values[i]=max(colors[i].r,max(colors[i].g,colors[i].b));
        //アルファ地の値を反転させることでSDFを取り出す
        sdfs[i]=1.0-colors[i].a;
        //すでにcolorにはアルファ値がかけられているので取り出す
        if (colors[i].a  > 0.01) {
            colors[i]=colors[i]/max(colors[i].a,0.001);
        }
    }
    float dx=max(extraction*sdfs[0]-extraction*sdfs[1],0.5);
    float dy=max(extraction*sdfs[2]-extraction*sdfs[3],0.5);
    vec2 extract_vec=vec2(2.0*dx, 2.0*dy);
    float vd = values[4] - (values[0] + values[1] + values[2] + values[3]) / 4.0;
    //2.5をかけることで全体の明度を調整
    float vao = clamp((0.5 + vd * 5.0), 0.1, 1.0)*1.5*length(extract_vec);
    vec3 color=colors[4].rgb;
    //return vec4(color,1.0);
    if(sdfs[0]<sdfs[1] && sdfs[0]<sdfs[4])
    {
        color=mix(colors[0].rgb,colors[4].rgb,0.75);
        return vec4(color.rgb*vao,1.0);
    }
    else if(sdfs[1]<sdfs[0] && sdfs[1]<sdfs[4])
    { 
        color=mix(colors[1].rgb,colors[4].rgb,0.75);
        return vec4(color.rgb*vao,1.0);
    }
    else if(sdfs[2]<sdfs[3] && sdfs[2]<sdfs[4])
    {
        color=mix(colors[2].rgb,colors[4].rgb,0.75);
        return vec4(color.rgb*vao,1.0);
    }
    else if(sdfs[3]<sdfs[2] && sdfs[3]<sdfs[4])
    { 
        color=mix(colors[3].rgb,colors[4].rgb,0.75);
        return vec4(color.rgb*vao,1.0);
    }
    else
    {
        return vec4(color.rgb*vao,1.0);
    }
}

void main() {
    outColor = sdf_three(v_texcoord);
}
