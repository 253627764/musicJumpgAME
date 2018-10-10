
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.trun_off_light();
        this.light = this.node.getChildByName('guang');
    },
    turn_on_light() {
        this.light.active = true;
        this.light.runAction(cc.fadeIn(0.5));
    },
    turn_off_light() {
        this.light.active = false;
    },
    start () {

    },

    // update (dt) {},
});
