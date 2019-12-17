;(function(){
    function Bird(){
        this.x = (game.canvas.width-48)/2;
        this.y = (game.canvas.height)*(1-0.618);
        this.img = [game.allImg["bird0_0"],game.allImg["bird0_1"],game.allImg["bird0_2"]];
        this.changeY = 0;
        this.rotate = 0;
        this.status = "drop";
        this.wing = 0;
    }
    Bird.prototype.update = function(){
        if(this.status == "drop"){
            this.changeY += 0.6;
            this.y += this.changeY;
            this.rotate += 0.05;
        } else if (this.status == "up"){
            this.changeY -= 0.8;
            if(this.changeY <= 0){
                this.status = "drop";
                return;
            }
            this.y -= this.changeY;
            this.y<24?this.y=24:null;
            this.wing++;
            this.wing>2?this.wing = 0:null;
        }
        // 碰撞检测需要的数据
        // 记录小鸟的上下左右的坐标
        this.x1 = this.x - 12;
        this.x2 = this.x + 12;
        this.y1 = this.y - 12;
        this.y2 = this.y + 12;

        //落地检测
        if(this.y > game.canvas.height -112 -15){
            game.sm.enter(4);
        }
        
    }
    Bird.prototype.render = function(){
        game.draw.save();
        game.draw.translate(this.x,this.y);
        game.draw.rotate(this.rotate);
        game.draw.drawImage(this.img[this.wing],-24,-24);
        game.draw.restore();
    }
    Bird.prototype.fly = function () {
        this.status = "up";
        this.changeY = 10;
        this.rotate = -1;
    }
    window.Bird = Bird;
})();