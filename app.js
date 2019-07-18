var body_parser = require('body-parser'), 
	expressSanitizer= require('express-sanitizer')
 methodOverride = require('method-override'),
	mongoose    = require('mongoose'),
	express     = require('express'),
	app 		= express();
mongoose.connect("mongodb+srv://admin-shree:atchaya@cluster0-uff5y.mongodb.net/blogapp");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(body_parser.urlencoded({extended:true}));
app.use(expressSanitizer()); 
app.use(methodOverride("_method"));
 var blogSchema = new mongoose.Schema({
 	title:String,
 	link:String,
 	desc:String,
 	created:{type:Date , default:Date.now}
 });
 var Blog = mongoose.model("Blog",blogSchema);
 //Routes
 // Blog.create({
 // 	title:"Dog Pic",
 // 	link:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
 // 	desc:"Any jbfjksdhfkjnsdjfgkjhdskjnfmdsfjhbsdkjfbjhdsbfjhbvdshjfbhjdsbfjhdsbfjhbdsjfbmxvkjsdihgEKJAF,JASGISFD"

 // })
 app.get("/blogs",function(req,res){
 	Blog.find({},function(err,blogvar){
 		if(err)
 			console.log(err);
 		else
 			res.render("index",{blogs:blogvar});
 	});
 	 
 });
 app.get("/blogs/new" ,function(req,res){
 	res.render("new");
 });
 app.get("/blogs/:id",function(req,res){
 	Blog.findById(req.params.id,function(err,foundBlog){
 		if(err)
 			res.redirect("/blogs");
 		else
 			res.render("show",{blog:foundBlog});
 	});
 });
 app.post("/blogs",function(req,res){
 	Blog.create(req.body.blog,function(err,newBlog){
 		if(err)
 			console.log(err);
 		else
 			res.redirect("/blogs");
 	});
 });
 app.get("/blogs/:id/edit",function(req,res){
 	Blog.findById(req.params.id,function(err,foundBlog){
 		if(err)
 			res.redirect("/blogs");
 		else
 			res.render("edit",{blog:foundBlog});
 	});
 });
 app.put("/blogs/:id",function(req,res){
 	req.body.blog.desc = req.sanitize(req.body.blog.desc);
 	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updateBlog){
 		if(err)
 			console.log(err);
 		else
 			res.redirect("/blogs/"+ req.params.id);
 	});
 });
 app.delete("/blogs/:id",function(req,res){
 	Blog.findByIdAndRemove(req.params.id,function(err){
 		if(err)
 			console.log(err);
 		else
 			res.redirect("/blogs");
 	})
 })
app.listen(process.env.PORT || 3000,function(){
	console.log("Blog server Started");
})