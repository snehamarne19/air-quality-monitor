const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ================= MONGODB CONNECTION =================

// Updated Connection (Fixed Error)
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/airqualitydb")
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err);
});

// ================= USER SCHEMA =================

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});

// Collection name = users
const User = mongoose.model("users", userSchema);

// ================= REGISTER API =================

app.post("/register", async (req, res) => {

    try {

        const { username, password } = req.body;

        // Check empty fields
        if (!username || !password) {
            return res.json({
                success: false,
                message: "Please fill all fields"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.json({
                success: false,
                message: "Username already exists"
            });
        }

        // Create new user
        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            password: passwordHash
        });

        // Save to MongoDB
        await newUser.save();

        res.json({
            success: true,
            message: "Registration Successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

// ================= LOGIN API =================

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        const passwordMatches = user && await bcrypt.compare(password, user.password);

        if (passwordMatches) {

            res.json({
                success: true,
                message: "Login Successful"
            });

        } else {

            res.json({
                success: false,
                message: "Invalid Username or Password"
            });
        }

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

// ================= OPENWEATHER AQI API =================

app.get("/api/aqi", async (req, res) => {
    const city = String(req.query.city || "").trim();
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!city) {
        return res.status(400).json({ success: false, message: "City is required" });
    }

    if (!apiKey) {
        return res.status(500).json({ success: false, message: "OpenWeather API key is not configured" });
    }

    try {
        const geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
        );
        const geoData = await geoResponse.json();

        if (!geoResponse.ok || !geoData.length) {
            return res.status(404).json({ success: false, message: "City not found" });
        }

        const { lat, lon, name, country } = geoData[0];
        const aqiResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const aqiData = await aqiResponse.json();

        if (!aqiResponse.ok || !aqiData.list?.length) {
            return res.status(502).json({ success: false, message: "Air-quality data is unavailable" });
        }

        res.json({ success: true, city: `${name}, ${country}`, data: aqiData.list[0] });
    } catch (error) {
        console.error("AQI API error:", error);
        res.status(500).json({ success: false, message: "Unable to retrieve air-quality data" });
    }
});

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
