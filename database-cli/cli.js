const Blog = require("./models/blog");

const printAll = async () => {
  const blogs = await Blog.findAll()
  blogs.forEach((blog) => {
    console.log(`${blog.dataValues.author}: '${blog.dataValues.title}', ${blog.dataValues.likes} likes`)
  });
}

printAll()