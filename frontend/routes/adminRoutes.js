import express from "express";
import axios from "axios";
const router = express.Router();

const API_BASE_URL = "http://localhost:8756";

router.use(express.urlencoded({ extended: true }));

router.get("/admin", (req, res) => {
  res.render("admin/dashboard.ejs");
});

router.get("/admin/users", (req, res) => {
  axios
    .get("http://localhost:8756/users", {
      headers: {
        Authorization: req.query.id,
      },
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.sendStatus(500);
    });
});

router.delete("/admin/users", (req, res) => {
  console.log("hello");
  axios
    .delete("http://localhost:8756/users", {
      headers: {
        Authorization: req.query.id,
      },
    })
    .then((response) => {
      res.status(200);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.sendStatus(500);
    });
});

router.get("/admin/login", (req, res) => {
  res.render("admin/login.ejs");
});
router.post("/admin/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    console.log(0);
    const axiosResponse = await axios.post(
      `${API_BASE_URL}/admin/login`,
      {
        username: name,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.redirect(`/admin?id=${axiosResponse.data}`);
  } catch {
    return res.status(400).redirect("/admin/login");
  }
});

export default router;
