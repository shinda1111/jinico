#version 300 es

precision mediump float;

uniform sampler2D u_video;
in vec2 v_texcoord;
out vec4 outColor;

vec4 sdf_three(vec2 uv) {
    
    vec2 adjust_size = 1.0 / vec2(640.0,480.0);
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
