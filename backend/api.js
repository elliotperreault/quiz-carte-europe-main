import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET not found in .env. Please set it.");
  process.exit(1); // Exit if the secret isn't found
}

async function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

// Admin Login
app.post("/admin/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return res.status(401).send("Incorrect credentials.");

    const validPassword = password === admin.password ? true : false;
    if (!validPassword) return res.status(401).send("Incorrect credentials.");

    const accessToken = jwt.sign({ username: admin.username, id: admin.id }, JWT_SECRET);
    res.json(accessToken);
  } catch {
    res.sendStatus(500);
  }
});

// Get all users (protected route - requires admin authentication)
app.get("/users", authenticateToken, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.delete("/users", authenticateToken, async (req, res) => {
  const users = await prisma.user.deleteMany();
  res.status(200);
});

// Get a specific user by ID (protected)
app.get("/users/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Get Map data
app.get("/map/:id", async (req, res) => {
  const { id } = req.params;
  const map = await prisma.map.findUnique({ where: { id } });
  if (map) {
    res.json(map);
  } else {
    res.status(404).json({ message: "Map not found" });
  }
});

// Create a new user
app.post("/users", async (req, res) => {
  const data = req.body;
  try {
    const user = await prisma.user.create({ data });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Update user score
app.put("/users/:id/score", async (req, res) => {
  const { id } = req.params;
  const { score_countries, score_capitals } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        score_countries: score_countries,
        score_capitals: score_capitals,
        last_update: new Date(),
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user score:", error);
    res.status(400).json({ error: "Failed to update user score" }); // Send a more specific error
  }
});

const port = 8756;
const server = app.listen(port, () => console.log(`Server ready at: http://localhost:${port}`));
