import express from "express";
import axios from "axios";
const router = express.Router();

const API_BASE_URL = "http://localhost:8756";

router.get("/app/countries", (req, res) => {
  res.render("app/quizCountries.ejs");
});

router.get("/app/capitals", (req, res) => {
  res.render("app/quizCapitals.ejs");
});

router.get("/app/info", (req, res) => {
  if (!req.query.name || !parseInt(req.query.group)) return res.send("error");

  res.render("app/info.ejs");
});
router.get("/app/finish", (req, res) => {
  res.render("app/finish.ejs");
});

router.post("/app/finish", async (req, res) => {
  // console.log("Received data:", req.query);

  const { name, group, validation, countries: countriesJson, capitals: capitalsJson } = req.query;

  if (!name || !group || !countriesJson || !capitalsJson) {
    return res.status(400).json({ error: "Missing required fields in request body." });
  }

  let userAnswersCountries;
  let userAnswersCapitals;

  try {
    userAnswersCountries = Object.fromEntries(
      Object.entries(JSON.parse(countriesJson)).map(([key, value]) => [key, value.toLowerCase()])
    );
    userAnswersCapitals = JSON.parse(capitalsJson);
  } catch (parseError) {
    console.error("Error parsing JSON from request:", parseError);
    return res.status(400).json({ error: "Invalid JSON format for countries or capitals." });
  }

  let groupInt;

  try {
    groupInt = parseInt(group);
  } catch (parseError) {
    console.error("Error parsing INT from request:", parseError);
    return res.status(400).json({ error: "Invalid Int format for group" });
  }

  const countriesMapIdToValidate = "585aae34-95df-4385-b572-5403df10366c";
  const capitalsMapIdToValidate = "ce5cc595-141d-43b6-aff0-1a8e5bc58bd3";

  try {
    const mapCountries = await axios.get(`${API_BASE_URL}/map/${countriesMapIdToValidate}`);
    const correctCountries = mapCountries.data.association;

    const mapCapitals = await axios.get(`${API_BASE_URL}/map/${capitalsMapIdToValidate}`);

    const correctCapitals = mapCapitals.data.association;

    let score_countries = 0;
    let score_capitals = 0;

    if (validation === "on") {
      for (const country in userAnswersCountries) {
        if (userAnswersCountries.hasOwnProperty(country) && correctCountries.hasOwnProperty(country)) {
          if (userAnswersCountries[country] === correctCountries[country]) {
            score_countries++;
          }
        }
      }

      for (const capital in userAnswersCapitals) {
        if (userAnswersCapitals.hasOwnProperty(capital) && correctCapitals.hasOwnProperty(capital)) {
          if (userAnswersCapitals[capital] === correctCapitals[capital]) {
            score_capitals++;
          }
        }
      }
      console.log(`Validation complete. Countries Score: ${score_countries}, Capitals Score: ${score_capitals}`);
    } else {
      console.log("Validation skipped as 'validation' flag is not 'on'.");
      return res.status(400).json({ error: "Validation was not granted" });
    }

    let userId;
    let user;
    try {
      console.log(`Attempting to create user: ${name}, Group: ${groupInt}`);
      const createUserResponse = await axios.post(`${API_BASE_URL}/users`, {
        username: name,
        group: groupInt,
      });
      user = createUserResponse.data;
      userId = user.id;
      console.log(`User created successfully with ID: ${userId}`);
    } catch (createUserError) {
      if (axios.isAxiosError(createUserError) && createUserError.response) {
        console.error(`Error creating user (${createUserError.response.status}):`, createUserError.response.data);
        throw new Error(`Failed to create or find user: ${createUserError.message}`);
      } else {
        console.error("Unknown error creating user:", createUserError);
        throw createUserError;
      }
    }

    if (userId) {
      console.log(`Updating score for user ID: ${userId}`);
      await axios.put(`${API_BASE_URL}/users/${userId}/score`, {
        score_countries: score_countries,
        score_capitals: score_capitals,
      });
      console.log("Score updated successfully.");

      res.status(200).json({
        message: "Test finished successfully.",
        userId: userId,
        calculated_score_countries: score_countries,
        calculated_score_capitals: score_capitals,
      });
    } else {
      throw new Error("Could not obtain user ID to update score.");
    }
  } catch (error) {
    console.error("Error processing /app/finish request:", error.message);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data || error.request || error.message);
      res.status(error.response?.status || 500).json({
        error: "API request failed",
        details: error.response?.data || error.message,
      });
    } else {
      res.status(500).json({ error: "Internal Server Error while processing test results." });
    }
  }
});

export default router;
