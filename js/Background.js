;
(function () {
    function Background() {
        this.x = 0;
        this.w = 288;
        this.h = 512;
        this.step = 1;
    }
    //更新
    Background.prototype.update = function () {
        this.x -= this.step;
        //临界值判断
        if (this.x <= -this.w) {
            this.x = 0;
        }
    }
    //渲染
    Background.prototype.render = function () {
        game.draw.drawImage(game.allImg["bg_day"], this.x, game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["bg_day"], this.x + this.w, game.canvas.height - this.h);
        game.draw.drawImage(game.allImg["bg_day"], this.x + this.w*2, game.canvas.height - this.h);
        //补齐上方的窟窿
        game.draw.fillStyle = "#4ec0ca";
        game.draw.fillRect(0,0,game.canvas.width,game.canvas.height-this.h);
    }
    window.Background = Background;
})();