function loadImg(src){
    let promise = new Promise(function(resolve,reject){
        let img = document.createElement('img');
        img.onload = function(){
            resolve(img)
        }
        img.onerror = function(){
            reject("图片加载失败")
        }
        img.src = src;
    })
    return promise;
}

let src = "https://www.baidu.com/img/bd_logo1.png?where=super";
let result = loadImg(src);
result.then(img=>{
    alert(`width:${img.width}`)
    return img
}).then(img=>{
    alert(`height:${img.height}`)
}).catch((ex)=>{

})