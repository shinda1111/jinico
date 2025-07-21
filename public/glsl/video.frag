#version 300 es

precision mediump float;

uniform sampler2D u_video;
in vec2 v_texcoord;
out vec4 outColor;


vec4 sdf_three(vec2 uv) {
    
    vec2 adjust_size = 1.0 / vec2(320.0,240.0);
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
        values[i]=min(colors[i].r,min(colors[i].g,colors[i].b));
        //アルファ地の値を反転させることでSDFを取り出す
        sdfs[i]=clamp(10.0-(10.0*colors[i].a),0.0,10.0);
        //すでにcolorにはアルファ値がかけられているので取り出す
        if (colors[i].a  > 0.001) {
            colors[i]=colors[i]/max(colors[i].a,0.001);
        }
    }
    vec3 color=colors[4].rgb;
    if(uv.x>=1.0)
    {
        return vec4(color.rgb,1.0);
    }
    float deviation=values[4]-(values[0]+values[1]+values[2]+values[3])*0.25;
    float mix_color=0.5;
    if(abs(deviation*2.0)>=0.1)
    {
        if(sdfs[0]<sdfs[1] && sdfs[0]<sdfs[4])
        {
            deviation=1.1*values[4]-values[0];
            color=mix(colors[0].rgb,colors[4].rgb,mix_color);
        }
        else if(sdfs[1]<sdfs[0] && sdfs[1]<sdfs[4])
        { 
            deviation=1.1*values[4]-values[1];
            color=mix(colors[1].rgb,colors[4].rgb,mix_color);
        }
        else if(sdfs[2]<sdfs[3] && sdfs[2]<sdfs[4])
        {
            deviation=1.1*values[4]-values[2];
            color=mix(colors[2].rgb,colors[4].rgb,mix_color);
        }
        else if(sdfs[3]<sdfs[2] && sdfs[3]<sdfs[4])
        { 
            deviation=1.1*values[4]-values[3];
            color=mix(colors[3].rgb,colors[4].rgb,mix_color);
        }
    }
    return vec4(color.rgb*(1.0+deviation*4.0),1.0);
    //return vec4(color.rgb,1.0);
}

void main() {
    vec2 uv=v_texcoord;
    uv.x*=2.0;
    outColor = sdf_three(uv);
}
