;
(function () {
    function SceneManager() {
        this.bindEvent();
    }
    SceneManager.prototype.enter = function (number) {
        switch (number) {
            case 0:
                this.titleY = -48;
                this.buttonY = game.canvas.height;
                this.birdY = 300;
                this.birdChangeY = 1.2;
                break;
            case 1:
                game.scene = 1;
                this.tutorialAlpha = 0;
                this.tutorialAlphaChange = 0.05;
                break;
            case 2:
                // game.score = 0;
                game.scene = 2;
                //实例化背景和小鸟
                game.bg = new Background();
                game.land = new Land();
                game.bird = new Bird();
                //记录所有管道的数组
                game.pipeArr = [];
                break;
            case 3:
                game.scene = 3;
                break;
            case 4:
                game.scene = 4;
                break;
        }
    }
    SceneManager.prototype.updateAndRender = function () {
        switch (game.scene) {
            case 0:
                staticBg();
                //画标题和按钮
                this.titleY += 12;
                if (this.titleY >= 150) this.titleY = 150;
                this.buttonY -= 10;
                if (this.buttonY <= 370) this.buttonY = 370;
                game.draw.drawImage(game.allImg["title"], (game.canvas.width - 178) / 2, this.titleY);
                game.draw.drawImage(game.allImg["button_play"], (game.canvas.width - 116) / 2, this.buttonY);
                //画小鸟
                if (this.birdY <= 250 || this.birdY >= 300) this.birdChangeY *= -1;
                this.birdY += this.birdChangeY;
                game.draw.drawImage(game.allImg["bird0_0"], (game.canvas.width - 48) / 2, this.birdY);
                break;
            case 1:
                staticBg();
                game.draw.drawImage(game.allImg["bird0_0"], (game.canvas.width - 48) / 2, 150);
                if (this.tutorialAlpha > 1 || this.tutorialAlpha < 0) {
                    this.tutorialAlphaChange *= -1;
                }
                this.tutorialAlpha += this.tutorialAlphaChange;
                game.draw.save();
                game.draw.globalAlpha = this.tutorialAlpha;
                game.draw.drawImage(game.allImg["tutorial"], (game.canvas.width - 114) / 2, 250);
                game.draw.restore();
                break;
            case 2:
                
                game.bg.update();
                game.bg.render();
                game.land.update();
                game.land.render();
                game.bird.update();
                game.bird.render();
                if(game.frame%100 == 0){
                    new Pipe();
                }
                game.pipeArr.forEach((item)=>{
                    item.update();
                    item.render();
                })
                scoreRender();
                break;
            case 3:

                break;
            case 4:

                break;
        }
    }
    SceneManager.prototype.bindEvent = function () {
        game.canvas.onclick = (e) => {
            switch (game.scene) {
                case 0:
                    if (e.clientX >= (game.canvas.width - 116) / 2 && e.clientX <= (game.canvas.width - 116) / 2 + 116 && e.clientY >= 370 && e.clientY <= 440) {
                        this.enter(1);
                    }
                    break;
                case 1:
                    this.enter(2);
                    break;
                case 2:
                    game.bird.fly();
                    break;
                case 3:

                    break;
                case 4:

                    break;
            }
        }
    }
    //静态背景
    function staticBg() {
        game.draw.fillStyle = "#4ec0ca";
        game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height);
        game.draw.drawImage(game.allImg["bg_day"], 0, game.canvas.height - 512);
        game.draw.drawImage(game.allImg["bg_day"], 218, game.canvas.height - 512);
        game.draw.drawImage(game.allImg["land"], 0, game.canvas.height - 112);
        game.draw.drawImage(game.allImg["land"], 336, game.canvas.height - 112);
    }
    //渲染分数
    function scoreRender (){
        //根据得分的位数拼接图片个数
        let score = game.score.toString();
        let centerline = (game.canvas.width-score.length*24)/2;
        for(let i = 0;i < score.length;i++){
            game.draw.drawImage(game.allImg["number"+score[i]],centerline+i*24,100);
        }
    }
    window.SceneManager = SceneManager;
})()