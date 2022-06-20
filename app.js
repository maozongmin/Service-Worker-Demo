const http = require('http'); // 引入node内置的http模块
const path = require('path'); // 引入node内置的path模块
const fs = require('fs'); // 引入node内置的fs模块
const Koa = require('koa'); // 引入Koa
const Router = require('koa-router'); // 引入koa-router
const static = require('koa-static'); // 引入koa-static

/* 创建Koa应用实例 */
const app = new Koa();
const router = new Router();
/* 创建挂载Koa应用程序的http服务 */
const server = http.createServer(app.callback());

/* 制定路由规则 */
router
    .get('/aa', (ctx) => {
        (ctx.type = 'text/html'), (ctx.body = 'hello world mao');
    })
    .get('/', (ctx) => {
        /* 指定返回的数据格式为 text/html */
        ctx.type = 'html';
        /* fs创建文件读取流，将页面文件的内容返回 */
        ctx.body = fs.createReadStream('./public/index.html');
    })
    /* 可链式调用 */
    .get('/api', (ctx) => {
        /* ctx.type用来指定返回的数据格式，默认为 text/plain */
        ctx.type = 'json';
        ctx.body = {
            msg: 'hello',
        };
    });

app
    /* 在Koa应用实例上应用制定好的路由规则 */
    .use(router.routes())
    .use(router.allowedMethods())
    /* 指定一个目录作为静态资源的根目录（亦即站点根目录） */
    .use(static(path.join(__dirname, './public')));

/* 开始监听/启动服务（指定3000端口与成功回调） */
server.listen(3000, () => {
    console.log('listening on port 3000 ...');
});
