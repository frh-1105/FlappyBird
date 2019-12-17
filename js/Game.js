;
(function (window) {
    function Game() {
        //获取canvas元素
        this.canvas = document.getElementById('canvas');
        //设置绘制环境
        this.draw = this.canvas.getContext("2d");
        //获取一屏的宽和高
        let w = document.documentElement.clientWidth;
        let h = document.documentElement.clientHeight;
        //设置canvas的宽和高
        this.canvas.width = w > 420 ? 420 : w;
        this.canvas.height = h > 750 ? 750 : h;
        this.loadImg();

        this.scene = 0;//场景编号
        this.score = 0;//分数
    }
    Game.prototype.clear = function () {
        //清屏
        this.draw.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    Game.prototype.start = function () {
        //游戏开始
        // this.bg = new Background();
        // this.land = new Land();
        // this.bird = new Bird();

        //实例化场景管理器
        this.sm = new SceneManager();
        //进入哪个场景
        this.sm.enter(0);

        //管道一屏里面可以有多个，所以把所有管道放进数组中储存
        // this.pipeArr = [];
        //记录帧数
        this.frame = 0;
        this.timer = setInterval(()=>{
            //先调用清屏方法，清屏
            this.clear();

            this.sm.updateAndRender();
            // this.bg.update();
            // this.bg.render();

            // this.land.update();
            // this.land.render();
            this.frame++;
            
            // this.pipeArr.forEach((item)=>{
            //     item.update();
            //     item.render();
            // });
            // if(this.frame%100 == 0){
            //     new Pipe();
            // }
            // this.bird.update();
            // this.bird.render();
        },20);
    }
    Game.prototype.loadImg = function(){
        //加载的图片
        this.allImg = {
            "bg_day": "images/bg_day.png",
            "land": "images/land.png",
            "pipe_down":"images/pipe_down.png",
            "pipe_up":"images/pipe_up.png",
            "bird0_0":"images/bird0_0.png",
            "bird0_1":"images/bird0_1.png",
            "bird0_2":"images/bird0_2.png",
            "title":"images/title.png",
            "button_play":"images/button_play.png",
            "tutorial":"images/tutorial.png",
            "number0":"images/font_048.png",
            "number1":"images/font_049.png",
            "number2":"images/font_050.png",
            "number3":"images/font_051.png",
            "number4":"images/font_052.png",
            "number5":"images/font_053.png",
            "number6":"images/font_054.png",
            "number7":"images/font_055.png",
            "number8":"images/font_056.png",
            "number9":"images/font_057.png",
        };
        //设置一个计数器，计数已经加载的图片个数
        let count = 0;
        //需要加载的图片个数
        let total = Object.keys(this.allImg).length;
        //遍历对象，加载图片
        for (let key in this.allImg) {
            ((src) => {
                this.allImg[key] = new Image;
                this.allImg[key].src = src;
                //图片加载完成后的方法
                this.allImg[key].onload = () => {
                    count++;
                    if (count == total) {
                        this.start();
                    }
                }
            })(this.allImg[key]);
        }
    }
    window.Game = Game;
})(window);