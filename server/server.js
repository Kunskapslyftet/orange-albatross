var koa = require('koa');
var static = require('koa-static');

var app = koa();

app.use(static('client'));

app.listen(3000);