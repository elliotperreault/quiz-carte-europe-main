import express from "express";
import defaultRoutes from "./routes/defaultRoutes.js";
import appRoutes from "./routes/appRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const port = 8734;

app.use(express.static("public"));

// axios.get('http://localhost:3000/users')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

app.use("/", defaultRoutes);
app.use("/", appRoutes);
app.use("/", adminRoutes);

app.use(express.urlencoded({ extended: true }));


app.get("*", (req, res) => {
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
