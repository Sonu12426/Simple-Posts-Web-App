const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// Set view engine to EJS and specify views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "sonu",
    content: "i love coding",
  },
  {
    id: uuidv4(),
    username: "Aditi",
    content: "hard work help to achieve success",
  },
  {
    id: uuidv4(),
    username: "Rahul",
    content: "hard work",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts }); // Passing the 'posts' array to the template
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post }); // Pass the 'post' object to the template
}); 

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  let newContent = req.body.content;
  post.content = newContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  console.log(post);
  res.render("edit.ejs", { post }); // Pass the 'post' object to the template
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
   posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
}); 

// app.delete("/posts/:id", (req, res) => {
//   let { id } = req.params;
//   posts = posts.filter((p) => id !== p.id);
//   res.redirect("/posts");
// });

// Start listening on specified  port
app.listen(port, () => {
  console.log("listening on port " + port);
});
