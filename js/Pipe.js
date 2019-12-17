;(function (){
    function Pipe(){
        //上管道随机高度
        this.top_h = Math.random()*120+100;
        //空隙间隔
        this.space = 140;
        //下管道高度
        this.bottom_h = game.canvas.height-112-this.top_h-this.space;
        //水平位置
        this.x = game.canvas.width;
        this.step = 2;
        game.pipeArr.push(this);
        this.done = true;
    }
    Pipe.prototype.update = function(){
        this.x -= this.step;
        if (this.x <= -52){
            for(let i = 0;i <= game.pipeArr.length;i++){
                if(game.pipeArr[i]==this){
                    game.pipeArr.splice(i,1);
                    i--;
                }
            }
        }
        //记录上下管道口左边的坐标
        this.x1 = this.x;
        this.x2 = this.x +52;
        this.y1 = this.top_h;
        this.y2 = this.top_h+this.space;
        //碰撞检测
        if ((game.bird.x2>this.x1&&game.bird.y1<this.y1&&game.bird.x1<this.x2)||(game.bird.x2>this.x1&&game.bird.y2>this.y2&&game.bird.x1<this.x2)){
            clearInterval(game.timer);
        }
        //加分检测
        if (this.done&&game.bird.x1 > this.x2) {
            game.score++;
            this.done = false;
        }
    }
    Pipe.prototype.render = function(){
        game.draw.drawImage(game.allImg["pipe_down"],0,320-this.top_h,52,this.top_h,this.x,0,52,this.top_h);
        game.draw.drawImage(game.allImg["pipe_up"],0,0,52,this.bottom_h,this.x,game.canvas.height-112-this.bottom_h,52,this.bottom_h);
    }
    window.Pipe = Pipe;
})();