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
    }
    Pipe.prototype.render = function(){
        game.draw.drawImage(game.allImg["pipe_down"],0,320-this.top_h,52,this.top_h,this.x,0,52,this.top_h);
        game.draw.drawImage(game.allImg["pipe_up"],0,0,52,this.bottom_h,this.x,game.canvas.height-112-this.bottom_h,52,this.bottom_h);
    }
    window.Pipe = Pipe;
})();