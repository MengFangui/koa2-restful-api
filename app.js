//引入 Koa 服务器
const koa = require('koa');

const app = new koa();
// 路由配置
const router = require('koa-router')();

// 解决post方法获取参数问题
const bodyParser = require('koa-bodyparser');

// 配置中间件
app.use(bodyParser());
// 解决跨域问题
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Cache-Control', 'no-cache');
    await next();
})
// router.routes作用：启动路由
// allowedMethods作用：当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头.
app.use(router.routes()).use(router.allowedMethods())

// get请求示例
router.get('/test', async (ctx) => {
    // 获取请求
    // console.log(ctx.request); 

    // 获取的是请求参数   
    // console.log(ctx.query);  //{ aid: '123' }  用的最多的方式  推荐
    // console.log(ctx.request.query); // 也可以
    // console.log(ctx.querystring);  //aid=123&name=zhangsan // 获取的是一个字符串 
    // 获取url地址
    // console.log(ctx.url);    // 可以
    // console.log(ctx.request.url);  //可以

    // 响应体
    ctx.body = {
        code: 200,
        status: 1,
        message: 'success',
        data: ctx.query
    };
});
//动态路由：在路由里面加入：   /:参数
// http://localhost:3000/test-dynamic-routing/888
router.get('/test-dynamic-routing/:aid', async (ctx, next) => {
    // 获取动态路由参数 
    console.log(ctx.params) // {aid:888}
    ctx.body = {
        code: 200,
        status: 1,
        message: 'success',
        data: ctx.params
    };
})

router.post('/testPost', async (ctx) => {
    // 请求参数
    let data = ctx.request.body
    ctx.body = {
        code: 200,
        status: 1,
        message: 'success',
        data
    };
});

//监听端口
app.listen(3000, function () {
    console.log('start in 3000 port ...')
});
