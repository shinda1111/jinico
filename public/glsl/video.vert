#version 300 es

in vec2 a_position;
out vec2 v_texcoord;

void main() {
    // Y軸を逆様に反転
    v_texcoord = vec2((a_position.x + 1.0) * 0.5, 1.0 - (a_position.y + 1.0) * 0.5);
    gl_Position = vec4(a_position, 0, 1);
}