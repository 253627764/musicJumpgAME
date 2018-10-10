
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {       
        this.light = this.node.getChildByName('guang');
        this.turn_off_light();
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
