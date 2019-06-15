
# koa-before-response

## Installation

```js
$ npm install koa-before-response
```

## Usage

used as middleware to hook before response for koa.

## Example

`const koa = require('koa');`

`const Router = require('koa-router');`

`const beforeResponse = require('koa-before-response');`

`const app = new koa();`

`app.use(async function(ctx, next) {`

​    `ctx.startTime = 'foo';`

​    `await next();`

​    `ctx.endTime = 'bar';`

`});`

`const router = new Router();`

`router.get('/test', async (ctx) => {`

​    `ctx.status = 200;`

​    `ctx.body = {`

​        `ha: 'hah'`

​    `}`

`})`

`app.use(beforeResponse({`

​    `beforeResponse: function(ctx) {`

​        `console.log('hooked, ctx.endTime:', ctx.endTime);`

​    `}`

`}));`

`app.use(r.routes());`

`app.listen(5000);`

