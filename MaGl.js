var express = require("express");
var fortune = require("./lib/fortune.js");
var app = express();

var handlebars = require("express-handlebars").create({
	defaultLayout:"main",
	helpers: {
		section: function (name,options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});


app.use(express.static(__dirname + "/public/"));

app.engine('handlebars', handlebars.engine);
app.set("view engine","handlebars");

app.set("port",process.env.PORT||3000);

app.use(function(req,res,next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.use(require("body-parser").urlencoded({extended:true}));
app.get("/newsletter", function(req,res){
    res.render("newsletter",{csrf:"CSRF token goes here"});
});
app.post("/process", function(req,res){
    if(req.xhr || req.accepts('json,html' )==='json' ){    
        // если здесь есть ошибка, то мы должны отправить { error: 'описание ошибки' }                
        res.send({ success: true });    
    } else {    
        // если бы была ошибка, нам нужно было бы перенаправлять на страницу ошибки        
        res.redirect(303, '/thank-you' );    
    } 
    // console.log('Form (from querystring): ' + req.query.form);
    // console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    // console.log('Name (from visible form field): ' + req.body.name);    
    // console.log('Email (from visible form field): ' + req.body.email);   
    // res.redirect(303, '/thank-you' );
});

app.get("/",function(req,res){
    res.render('home');
});

app.get("/about",function(req,res){
    res.render('about',{
        fortune:fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get("/tours/hood-river",function(req,res){
    res.render("tours/hood-river");
});

app.get("/tours/request-group-rate",function(req,res){
    res.render("tours/request-group-rate");
});


app.get("/todo",function(req,res){
    res.render("todo/todo")
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get("port"),function(){
    console.log("Express Запущен на http://localhost:"+app.get("port")+" ; Нажмите Ctrl+C для завершения.");
});

