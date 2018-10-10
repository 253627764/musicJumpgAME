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
        this.start_game();
    },
    start_game() {
        this.map_root.removeAllChildren();
        this.gen_level1_map();
    },
    //生成第一级地图
    gen_level1_map(){
        var map_data = level.map_data;
        var xpos = level1.start_xpos;
        var ypos = level1.start_ypos;
        var dir = 1;//1为向右，0为向左
        var change_num = 0;
        for (var i = 0;i<map_data.length;i++) {
            var drum_types = map_data[i];
            var drum = cc.instantiate(this.drum_prefabs[drum_type ]);
            this.x = xpos;
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
