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
        if(!localStorage.getItem("FB")){
            localStorage.setItem("FB","[0,0,0,0]");
        }
    }
    Game.prototype.clear = function () {
        //清屏
        this.draw.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    Game.prototype.start = function () {
        //游戏开始

        //实例化场景管理器
        this.sm = new SceneManager();
        //进入哪个场景
        this.sm.enter(0);

        //记录帧数
        this.frame = 0;
        this.timer = setInterval(()=>{
            //先调用清屏方法，清屏
            this.clear();

            this.sm.updateAndRender();
            this.frame++;
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
            "small_number0":"images/number_context_00.png",
            "small_number1":"images/number_context_01.png",
            "small_number2":"images/number_context_02.png",
            "small_number3":"images/number_context_03.png",
            "small_number4":"images/number_context_04.png",
            "small_number5":"images/number_context_05.png",
            "small_number6":"images/number_context_06.png",
            "small_number7":"images/number_context_07.png",
            "small_number8":"images/number_context_08.png",
            "small_number9":"images/number_context_09.png",
            "number_score_00":"images/number_score_00.png",
            "number_score_01":"images/number_score_01.png",
            "number_score_02":"images/number_score_02.png",
            "number_score_03":"images/number_score_03.png",
            "number_score_04":"images/number_score_04.png",
            "number_score_05":"images/number_score_05.png",
            "number_score_06":"images/number_score_06.png",
            "number_score_07":"images/number_score_07.png",
            "number_score_08":"images/number_score_08.png",
            "number_score_09":"images/number_score_09.png",
            "medals_0":"images/medals_0.png",
            "medals_1":"images/medals_1.png",
            "medals_2":"images/medals_2.png",
            "medals_3":"images/medals_3.png",
            "text_game_over":"images/text_game_over.png",
            "text_ready":"images/text_ready.png",
            "score_panel":"images/score_panel.png"
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