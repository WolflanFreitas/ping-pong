const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");
const gapX = 10;
const lineWidth = 15;

const field = {
    width: window.innerWidth,
    height: window.innerHeight,
    draw: function () {
        // desenha o campo
        canvasCtx.fillStyle = "#286047";
        canvasCtx.fillRect(0, 0, this.width, this.height);
    },
};

const line = {
    width: 15,
    height: field.height,
    draw: function () {
        canvasCtx.fillStyle = "#ffffff";
        // desenha a linha central
        canvasCtx.fillRect(
            field.width / 2 - this.width / 2,
            0,
            this.width,
            this.height
        );
    },
};

const leftPaddle = {
    x: gapX,
    y: 400,
    w: line.width,
    h: 200,
    draw: function () {
        // desenha a raquete esquerda
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    },
};

const rightPaddle = {
    x: field.width - line.width - 10,
    y: 120,
    w: line.width,
    h: 200,
    draw: function () {
        // desenha a raquete direita
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    },
};

const ball = {
    x: 500,
    y: 300,
    radius: 20,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    draw: function () {
        // desenha a bolinha
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath();
        canvasCtx.arc(
            this.x,
            this.y,
            this.radius,
            this.startAngle,
            this.endAngle,
            false
        );
        canvasCtx.fill();
    },
};

const score = {
    human: 1,
    computer: 2,
    draw: function () {
        // desenhar o placar
        canvasCtx.font = "bold 72px Arial";
        canvasCtx.textAlign = "center";
        canvasCtx.textBaseline = "top";
        canvasCtx.fillStyle = "#01341D";
        canvasCtx.fillText(this.human, field.width / 4, 50);
        canvasCtx.fillText(
            this.computer,
            field.width / 4 + field.width / 2,
            50
        );
    },
};
function setup() {
    canvasEl.width = canvasCtx.width = field.width;
    canvasEl.height = canvasCtx.height = field.height;
}

function draw() {
    field.draw();
    line.draw();
    leftPaddle.draw();
    rightPaddle.draw();
    score.draw();
    ball.draw();
}

setup();
draw();
