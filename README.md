 <!-- https://github.com/Nealyang/PersonalBlog/issues/48 -->
 * 1.<a href="#title1" id="title1n">记住密码操作cookie</a>
 * 2.<a href="./commonality/正则表达式.md" >正则表达式</a>
 * 3.<a href="#title2" id="title2n">JavaScript 复杂判断的更优雅写法</a>
 * 4.<a href="https://github.com/Miboweixin/Only-the-Brave/tree/master/designs/src" >js设计模式</a>
 * 5.



## 今年是我前端工作的第一年

### 我以此来记录我遇到的问题还有一些解决问题的知识点，不断地学习，因为我今年还很年轻，我会去努力的，哪怕和那些大神还差距一些距离，但是都是这样过来的加油！

<h2 id="title1" ><a href="#title1n">记住密码</a></h3>
=============================

![登陆页面](https://user-gold-cdn.xitu.io/2018/1/30/161462f165cc17dc?w=443&h=335&f=png&s=12535)
### 实现功能： 
1.记住密码勾选，点登陆时，将账号和密码保存到cookie，下次登陆自动显示到表单内 
 2.不勾选，点登陆时候则清空之前保存到cookie的值，下次登陆需要手动输入 
>大体思路就是通过存/取/删cookie实现的；每次进入登录页，先去读取cookie，如果浏览器的cookie中有账号信息，就自动填充到登录框中，存cookie是在登录成功之后，判断当前用户是否勾选了记住密码，如果勾选了，则把账号信息存到cookie当中，效果图如上：
### 直接上主要的代码

###  HTML部分
```html
<div class="ms-login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <!-- `checked` 为 true 或 false -->
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <br>
            <br>
            <div class="login-btn">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </div>
        </el-form>
    </div>

```
###  JS部分
```js

    //页面加载调用获取cookie值
    mounted() {
        this.getCookie();
    },
    methods: {
        submitForm(formName) {
			             const self = this;
                        //判断复选框是否被勾选 勾选则调用配置cookie方法
                        if (self.checked == true) {
                            console.log("checked == true");
                            //传入账号名，密码，和保存天数3个参数
                            self.setCookie(self.ruleForm.username, self.ruleForm.password, 7);
                        }else {
                          console.log("清空Cookie");
                          //清空Cookie
                          self.clearCookie();
                        }
                        
                        //与后端请求代码，本功能不需要与后台交互所以省略
                        
                        console.log("登陆成功");
                  
                });
            },
            //设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'userName') {
                            this.ruleForm.username = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'userPwd') {
                            this.ruleForm.password = arr2[1];
                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            }
    


```
> 浏览器中的cookie信息如下图，注意这里的cookie的expire/Max-Age过期时间，这个时间是格林尼治标准时间GMT，世界统一的时间，GMT+8小时就是北京时间。(这里不做加密功能)

![这里写图片描述](https://user-gold-cdn.xitu.io/2018/1/30/161462f165b73ac8?w=1649&h=283&f=png&s=47768)



<h2 id="title2" ><a href="#title2n">JavaScript 复杂判断的更优雅写法</a></h3>
=============================
## 前提
我们编写js代码时经常遇到复杂逻辑判断的情况，通常大家可以用if/else或者switch来实现多个条件判断，但这样会有个问题，随着逻辑复杂度的增加，代码中的if/else/switch会变得越来越臃肿，越来越看不懂，那么如何更优雅的写判断逻辑，本文带你试一下。

## 比如
```js

/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status)=>{
  if(status == 1){
    sendLog('processing')

    jumpTo('IndexPage')
  }else if(status == 2){
    sendLog('fail')

    jumpTo('FailPage')
  }else if(status == 3){
    sendLog('fail')

    jumpTo('FailPage')
  }else if(status == 4){
    sendLog('success')

    jumpTo('SuccessPage')
  }else if(status == 5){
    sendLog('cancel')

    jumpTo('CancelPage')
  }else {
    sendLog('other')

    jumpTo('Index')
  }
}

```

### 一般我们都会这样解决我们的问题 但是会有更简单的方法解决,借鉴摘抄来自掘金，掘金真香！

```js

const actions = new Map([
  [1, ['processing','IndexPage']],

  [2, ['fail','FailPage']],

  [3, ['fail','FailPage']],

  [4, ['success','SuccessPage']],

  [5, ['cancel','CancelPage']],

  ['default', ['other','Index']]
])
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status)=>{
  let action = actions.get(status) || actions.get('default')
  sendLog(action[0])
  jumpTo(action[1])
}

```
### 这样写用到了es6里的Map对象，是不是更爽了？Map对象和Object对象有什么区别呢？

#### 1.一个对象通常都有自己的原型，所以一个对象总有一个"prototype"键。<br>
#### 2.一个对象的键只能是字符串或者Symbols，但一个Map的键可以是任意值。<br>
#### 3.你可以通过size属性很容易地得到一个Map的键值对个数，而对象的键值对个数只能手动确认。<br>
