
    window.onload=function(){

        function tanchishe(){
            this.box=document.querySelector('.box');
            this.fengshu=document.querySelector('.fengshu').innerText;
            this.str='<div class="fengshu">0</div>';
            this.she=she=[{x:0,y:0}, {x:1,y:0}, {x:2,y:0}];
            this.food={};
            this.tblr='r';
            this.speed=200;
            this.but1=document.querySelector('.but1');
            this.but2=document.querySelector('.but2');

        }
        tanchishe.prototype={
            changjing:function(){
                for(let i=0;i<20;i++){
                    for(let j=0;j<20;j++){
                        this.str+=`<div id="c${j}-${i}"></div>`

                    }
                }
                this.box.innerHTML=this.str;
            },
            shekuang:function(){
                this.she.forEach(function(obj){
                    var id=`#c${obj.x}-${obj.y}`;
                    var div=document.querySelector(id);
                    div.classList.add('she');
                })
            },
            chick:function(a,b){
                return this.she.some(function(value){
                   return value.x==a&&value.y==b;
                })
            },
            foodkuang:function(){
                do {
                    var x = Math.floor(Math.random() * 20);
                    var y = Math.floor(Math.random() * 20);
                } while (this.chick(x, y));
                this.food.x=x;
                this.food.y=y;
                var fod=document.querySelector(`#c${x}-${y}`);
                fod.classList.add('food');
            },
            dong:function(){
                var that=this;
                var t=setInterval(move,this.speed);

//        move();
                function move() {
                    var newobj = {};
//     根据dong的值更改she的最后一个对象，删除第一个对象
                    switch (that.tblr) {
                        case 'r':
                            newobj.x = she[she.length - 1].x + 1;
                            newobj.y = she[she.length - 1].y;
                            break;
                        case 'l':
                            newobj.x = she[she.length - 1].x - 1;
                            newobj.y = she[she.length - 1].y;
                            break;
                        case 't':
                            newobj.x = she[she.length - 1].x, newobj.y = she[she.length - 1].y - 1;
                            break;
                        case 'b':
                            newobj.x = she[she.length - 1].x, newobj.y = she[she.length - 1].y + 1;
                            break;

                    }
                    if ((0 > newobj.x || newobj.x >= 20 || 0 > newobj.y || newobj.y >= 20) || that.chick(newobj.x,newobj.y)) {
                        alert('游戏结束');
                        clearInterval(t);
                    } else {
                        that.she.push(newobj);
                        document.querySelector(`#c${that.she[that.she.length - 1].x}-${that.she[that.she.length - 1].y}`).className = 'she';
//                console.log( newfood())  吃到食物
                        if (that.she[that.she.length - 1].x ==that.food.x && that.she[that.she.length - 1].y == that.food.y) {
                            that.foodkuang();
                            that.fengshu++;
                            switch (that.fengshu){
                                case 5:that.speed=180;break;
                                case 10:that.speed=160;break;
                                case 15:that.speed=140;break;
                                case 20:that.speed=120;break;
                                case 25:that.speed=100;break;
                                case 30:that.speed=80;break;
                                case 35:that.speed=60;break;
                                case 40:that.speed=40;break;
                                case 45:that.speed=20;break;

                            }
                            document.querySelector('.fengshu').innerHTML=that.fengshu;
                        } else {
                            document.querySelector(`#c${that.she[0].x}-${that.she[0].y}`).classList.remove('she');
                            that.she.shift();
                        }
                    }
                }
                this.but1.onclick=function(){
                    clearInterval(t)
                }
                this.but2.onclick=()=>{
                    t=setInterval(move,this.speed);
                }

            },
            fangxiang:function(){
                var that=this;
                document.onkeydown=function(e){
//            console.log(e.keyCode)
                    switch (e.keyCode){
                        case 37:
                            if(that.tblr=='r'){
                                return;
                            }else {
                                that.tblr='l'
                            }
                            ;break;
                        case 38:
                            if(that.tblr=='b'){
                                return;
                            }else {
                                that.tblr='t'
                            }
                            ;break;
                        case 39:
                            if(that.tblr=='l'){
                                return;
                            }else {
                                that.tblr='r'
                            }
                            break;
                        case 40:
                            if(that.tblr=='t'){
                                return;
                            }else {
                                that.tblr='b'
                            }
                            break;

                    }
                }
            },
            play:function(){
                console.log(this.but1)
                this.changjing();
                this.shekuang();
                this.foodkuang();
                this.fangxiang();
                this.dong();
            }

        }
        var obj=new tanchishe();
        console.log(obj)
        obj.play();
}