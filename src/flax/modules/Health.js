/**
 * Created by long on 14-7-10.
 */

var flax  = flax || {};
if(!flax.Module) flax.Module = {};

flax.Module.Health = {
    maxHealth:100,
    health:100,
    hurtable:true,
    dead:false,
    ownerBody:null,//the body to be hurted, when health == 0, the body will disappear, default body is the gunner itself
    "onEnter":function(){
        this.health = this.maxHealth;
        this.dead = false;
    },
    "onExit":function(){
        this.ownerBody = null;
    },
    "onHit":function(bullet)
    {
        if(!this.hurtable) return false;
        if(this.dead) return true;
        this.health -= bullet.damage;
        if(this.health <= 0) {
            this.dead = true;
            this.health = 0;
            this.onDie();
            return true;
        }
        return false;
    },
    "onDie":function()
    {
        if(this.ownerBody) this.ownerBody.destroy();
        else this.destroy();
    }
};