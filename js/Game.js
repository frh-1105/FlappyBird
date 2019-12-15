;(function(window){
    function Game(){
        //获取canvas元素
        this.canvas = document.getElementById('canvas');
        //设置绘制环境
        this.draw = this.canvas.getContext("2d");
        //获取一屏的宽和高
        let w = document.documentElement.clientWidth;
        let h = document.documentElement.clientHeight;
        //设置canvas的宽和高
        this.canvas.width = w>420?420:w;
        this.canvas.height = h>750?750:h;
    }
    // Game.prototype
    window.Game = Game;
})(window);