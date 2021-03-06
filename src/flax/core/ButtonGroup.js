/**
 * Created by long on 15/11/23.
 */

flax.ButtonGroup = flax.Class.extend({
    buttons:null,
    selectedButton:null,
    onSelected:null,
    ctor:function()
    {
        this.buttons = [];
        this.onSelected = new signals.Signal();
    },
    addButton:function(buttons)
    {
        if(!(buttons instanceof  Array)) {
            buttons = Array.prototype.slice.call(arguments);
        }
        for(var i = 0; i < buttons.length; i++){

            var btn = buttons[i];
            if(!flax.isButton(btn)) {
                throw "The element added to a ButtonGroup must be a flax button!"
                continue;
            }
            if(this.buttons.indexOf(btn) > -1) continue;
            this.buttons.push(btn);
            btn.group = this;
        }
    },
    removeButton:function(button)
    {
        var i = this.buttons.indexOf(button);
        if(i > -1){
            this.buttons.splice(i, 1);
            button.group = null;
            if(this.selectedButton == button){
                this.selectedButton = null;
//                this.selectedButton = this.buttons[0];
//                if(this.selectedButton) this.selectedButton.setState(ButtonState.SELECTED);
            }
        }
        if(this.buttons.length == 0){
            this.onSelected.dispose();
            this.onSelected = null;
        }
    },
    updateButtons:function(newSelected)
    {
        for(var i = 0; i < this.buttons.length; i++){
            var btn = this.buttons[i];
            if(btn != newSelected && btn.isMouseEnabled() && !btn.isLocked()){
                btn.setState(ButtonState.UP);
            }
        }
        this.selectedButton = newSelected;
        //If touched or just call setSelected
        var ifTouch = flax.mousePos && flax.ifTouched(newSelected, flax.mousePos);
        this.onSelected.dispatch(newSelected, ifTouch);
    },
    destroy: function() {
        this.buttons = null;
        this.onSelected.removeAll();
        this.onSelected = null;
        this.selectedButton = null;
    }
});