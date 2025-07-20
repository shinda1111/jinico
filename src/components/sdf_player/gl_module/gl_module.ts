async function loadShaderSource(url: string): Promise<string> {
      const res = await fetch(url);
      return await res.text();
    }

function compileShader(gl: WebGL2RenderingContext, source: string, type: number): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Failed to create shader');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || 'Shader compile error');
    }
    return shader;
}

function createProgram(gl: WebGL2RenderingContext, vertSrc: string, fragSrc: string): WebGLProgram {
    const vs = compileShader(gl, vertSrc, gl.VERTEX_SHADER);
    const fs = compileShader(gl, fragSrc, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!program) throw new Error('Failed to create program');
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || 'Program link error');
    }
    return program;
}

function render(
    gl: WebGL2RenderingContext,
    video:HTMLVideoElement,
    canvas:HTMLCanvasElement,
    videoTexture:WebGLTexture
) {
    function actually_render() {
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, videoTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        }

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(actually_render);
    }
    actually_render();
}

export async function render_video(
    gl: WebGL2RenderingContext,
    video:HTMLVideoElement,
    canvas:HTMLCanvasElement) 
{
    const vertSrc = await loadShaderSource('./glsl/video.vert');
    const fragSrc = await loadShaderSource('./glsl/video.frag');
    const program = createProgram(gl, vertSrc, fragSrc);
    gl.useProgram(program);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
    gl.ARRAY_BUFFER,
        new Float32Array([
            -1, -1, 1, -1, 1, 1, -1, 1
        ]),
        gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 2, 3, 0]),
        gl.STATIC_DRAW
    );

    const videoTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, videoTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const samplerLoc = gl.getUniformLocation(program, 'u_video');
    gl.uniform1i(samplerLoc, 0);

    await video.play();
    render(gl,video,canvas,videoTexture);
            console.log("luige",video,canvas);
}
