const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");
const gapX = 10;
const lineWidth = 15;

const mouse = { x: 0, y: 0 };

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
    y: 0,
    w: line.width,
    h: 200,
    _move: function () {
        this.y = mouse.y - this.h / 2;
    },
    draw: function () {
        // desenha a raquete esquerda
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);

        this._move();
    },
};

const rightPaddle = {
    x: field.width - line.width - 10,
    y: 120,
    w: line.width,
    h: 200,
    _move: function () {
        this.y = ball.y;
    },
    draw: function () {
        // desenha a raquete direita
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);

        this._move();
    },
};

const ball = {
    x: 0,
    y: 10,
    radius: 20,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    speed: 5,
    directionX: 1,
    directionY: 1,
    _calcPosition: function () {
        // Verifica se o jogador 1 fez um ponto (x > largura do campo)
        if (this.x > field.width - this.radius - rightPaddle.w - gapX) {
            //Verifica se a raquete direita está na posição y da bola
            if (
                this.y + this.radius > rightPaddle.y &&
                this.y - this.radius < rightPaddle.y + rightPaddle.h
            ) {
                // Rebate a bola invertendo o sinal de X
                this._reverseX();
            } else {
                // Pontuar o jogador 1
                score.increaseHuman();
                this._pointUp();
            }
        }
        // Verifica se o jogador 2 fez um ponto (x < 0)
        if (this.x < this.radius + leftPaddle.w + gapX) {
            // Verifica se a raquete esquerda está na posição Y da bola
            if (
                this.y + this.radius > leftPaddle.y &&
                this.y - this.radius < leftPaddle.y + leftPaddle.h
            ) {
                // Rebate a bola invertendo o sinal de X
                this._reverseX();
            } else {
                // Pontuar o jogador 2
                score.increaseComputer();
                this._pointUp();
            }
        }
        // Verifica as laterais superior e inferior do campo
        if (
            (this.y - this.radius < 0 && this.directionY < 0) ||
            (this.y > field.height - this.radius && this.directionY > 0)
        ) {
            this._reverseY();
        }
    },
    _reverseX: function () {
        this.directionX *= -1;
    },
    _reverseY: function () {
        this.directionY *= -1;
    },
    _move: function () {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
    },
    _pointUp: function () {
        this.x = field.width / 2;
        this.y = field.height / 2;
    },
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

        this._calcPosition();
        this._move();
    },
};

const score = {
    human: 0,
    computer: 0,
    increaseHuman: function () {
        this.human++;
    },
    increaseComputer: function () {
        this.computer++;
    },
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

window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        }
    );
})();

const main = () => {
    animateFrame(main);
    draw();
};

setup();
main();
//window.setInterval(draw, 1000 / 60);

canvasEl.addEventListener("mousemove", (e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
});
