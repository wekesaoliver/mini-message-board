const express = require("express");
const router = express.Router();
const db = require("../db/queries");

// sample messages
const messages = [
    {
        text: "Hello there!",
        user: "Oliver",
        added: new Date(),
    },
    {
        text: "Hello world!",
        user: "Charles",
        added: new Date(),
    },
];

// GET route for index page
router.get("/", async (req, res) => {
    try {
        const messages = await db.getAllMessages();
        res.render("index", { title: "Mini Messageboard", messages: messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("Error loading messages");
    }
});

// GET route for new message form
router.get("/new", (req, res) => {
    res.render("form");
});

// POST route to handle form submission
router.post("/new", async (req, res) => {
    const messageText = req.body.messageText?.trim();
    const messageUser = req.body.messageUser?.trim();

    // Server-side validation
    if (!messageText || messageText.length === 0) {
        return res.status(400).send("Message text is required");
    }

    if (!messageUser || messageUser.length === 0) {
        return res.status(400).send("Author name is required");
    }

    if (messageText.length > 1000) {
        return res
            .status(400)
            .send("Message text is too long (max 1000 characters)");
    }

    if (messageUser.length > 255) {
        return res
            .status(400)
            .send("Author name is too long (max 255 characters)");
    }

    try {
        await db.insertMessage(messageUser, messageText);
        res.redirect("/");
    } catch (error) {
        console.error("Error inserting message:", error);
        res.status(500).send("Error saving message");
    }

    // messages.push({
    //     text: messageText,
    //     user: messageUser,
    //     added: new Date(),
    // });

    // res.redirect("/");
});

// GET route for individuals message details
router.get("/message/:id", async (req, res) => {
    const messageId = parseInt(req.params.id);

    if (isNaN(messageId)) {
        return res.status(400).send("Invalid message ID");
    }

    try {
        const message = await db.getMessageById(messageId);
        if (!message) {
            return res.status(404).send("Message not found");
        }
    } catch (error) {
        console.error("Error fetching message:", error);
        res.status(500).send("Error loading message");
    }
});

module.exports = router;
