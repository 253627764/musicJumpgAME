const level1 = require('level1');
cc.Class({
    extends: cc.Component,

    properties: {
       drum_prefabs:{//分别将两个鼓托进去
        default:[],
        type:cc.Prefab,
       }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.map_root = this.node.getChildByName('map_root');
        this.drum_root = this.map_root.getChildByName('drum_root');
        this.player = this.map_root.getChildByName('player');
        this.start_game();
    },
    start_game() {
        this.gen_level1_map();
    },
    jump_drum(){
        if(this.next_step === this.drum_set.length){//成功跳过
            //播放激励动画
            //end
            return;
        }
    },
    //生成第一级地图
    gen_level1_map(){
        //删除地图下的所有子节点
        this.drum_root.removeAllChildren();
        var map_data = level1.map_data;
        var xpos = level1.start_xpos;
        var ypos = level1.start_ypos;
        //设置player的初始位置
        this.player.x = xpos;
        this.player.y = ypos;

        var dir = 1;//方向1为向右，0为向左
        var change_num = 0; 
        //用来保存生成的鼓,因为要知道下一次生成的鼓的位置，保存一下生成的这些drum
        this.drum_set = [];
        for (var i = 0;i<map_data.length;i++) {
            var drum_type = map_data[i];
            var drum = cc.instantiate(this.drum_prefabs[drum_type]);
            this.drum_root.addChild(drum);
            this.drum_set.push(drum);

            drum.x = xpos;  
            drum.y = ypos;
            change_num ++;
            //因为地图是呈现z字型分布的，所以弄一个计数
            if(change_num >= 3) {
                change_num = 0;
                dir = (dir === 1) ? 0 : 1; 
            }
            //更新xpos，ypos为下一个鼓的位置
            if(dir === 1){
                xpos += level1.offset;
            }else{
                xpos -= level1.offset;
            }
            //判断是否有障碍物，如果有加200，没有加100
            //说明他有下一个
            if (i < map_data.length - 1) {
                drum_type = map_data[i+1];
                ypos += level1.elem_height[drum_type]
            } 
        }
    },
    start () {

    },

    // update (dt) {},
});
