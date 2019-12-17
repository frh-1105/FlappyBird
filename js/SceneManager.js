;
(function () {
    function SceneManager() {
        this.bindEvent();
        that = this;
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
                // this.isBooM = false;
                break;
            case 4:
                game.scene = 4;
                this.game_overY = 0;
                this.panelY = game.canvas.height;
                //获取存储在本地的成绩
                let arr = JSON.parse(localStorage.getItem("FB"));
                arr.sort((a, b) => b - a);
                //存储的数组不用太长
                // if (arr.length > 4) {
                //     arr.length = 4;
                // }
                //将最大记录获取出来,用来渲染计分板的
                this.best = arr[0];
                if (game.score > arr[0]) {
                    this.medal = "medals_1";
                    this.best = game.score;
                } else if (game.score > arr[1]) {
                    this.medal = "medals_2";
                } else if (game.score > arr[2]) {
                    this.medal = "medals_3";
                } else {
                    this.medal = "medals_0";
                }
                if (!arr.includes(game.score)) {
                    arr.push(game.score);
                }
                localStorage.setItem("FB", JSON.stringify(arr));
                console.log(this.best);
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
                if (game.frame % 100 == 0) {
                    new Pipe();
                }
                game.pipeArr.forEach((item) => {
                    item.update();
                    item.render();
                })
                scoreRender();
                break;
            case 3:
                game.bg.render();
                game.land.render();
                for (let i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i].render();
                }
                // if (this.isBooM) {
                //     //爆炸
                // } else {
                //     //下落过程
                //     game.bird.y += 5;
                //     if (game.bird.y >= game.canvas.height - 112) {
                //         game.bird.y = game.canvas.height - 112;
                //         this.isBooM = true;
                //     }
                //     game.bird.render();
                // }
                game.bird.y += 5;
                if (game.bird.y >= game.canvas.height - 112) {
                    game.bird.y = game.canvas.height - 112;
                    //落地后进入下一个场景
                    this.enter(4);
                }
                game.bird.render();

                break;
            case 4:
                game.bg.render();
                game.land.render();
                for (let i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i].render();
                }
                // scoreRender();
                //画出计分板和game_over
                this.game_overY += 5;
                if (this.game_overY >= 200) this.game_overY = 200;
                this.panelY -= 10;
                if (this.panelY <= 270) this.panelY = 270;
                game.draw.drawImage(game.allImg["score_panel"], (game.canvas.width - 238) / 2, this.panelY);
                //画奖牌
                game.draw.drawImage(game.allImg[this.medal], (game.canvas.width - 238) / 2 + 33, this.panelY + 45);
                //分数
                smallScoreRender(this.panelY);
                //历史最高分
                bestScoreRender(this.best,this.panelY);

                game.draw.drawImage(game.allImg["text_game_over"], (game.canvas.width - 204) / 2, this.game_overY);
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
    function scoreRender() {
        //根据得分的位数拼接图片个数
        let score = game.score.toString();
        let centerline = (game.canvas.width - score.length * 24) / 2;
        for (let i = 0; i < score.length; i++) {
            game.draw.drawImage(game.allImg["number" + score[i]], centerline + i * 24, 100);
        }
    }

    function smallScoreRender(y) {
        //根据得分的位数拼接图片个数
        let score = game.score.toString();
        for (let i = 0; i < score.length; i++) {
            game.draw.drawImage(game.allImg["number_score_0" + score[i]], (game.canvas.width - 238) / 2 + 193 -(score.length*16)/2 +i*16, y + 35);
        }
    }

    function bestScoreRender(best, y) {
        //根据得分的位数拼接图片个数
        let score = best.toString();
        for (let i = 0; i < score.length; i++) {
            game.draw.drawImage(game.allImg["number_score_0" + score[i]], (game.canvas.width - 238) / 2 + 193 -(score.length*16)/2 +i*16, y + 75);
        }
    }
    window.SceneManager = SceneManager;
})()