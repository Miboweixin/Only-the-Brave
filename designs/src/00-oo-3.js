class jQuery {
    constructor(selector){
        var slice = Array.prototype.slice;
        var dom = slice.call(document.querySelectorAll(selector));
        var len = dom ? dom.length : 0;
        for(var i = 0;i<len;i++){
            this[i] = dom[i]
        }
        this.length = len;
        this.selector = selector;
    }
    addClass(){
        console.log("待实现")
    }
}
window.$ = function(selector){
    return new jQuery(selector)
}

var element = $("p");
console.info(element);
console.info(element.addClass)