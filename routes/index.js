const express = require("express");
const router = express.Router();

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
router.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

// GET route for new message form
router.get("/new", (req, res) => {
    res.render("form");
});

// POST route to handle form submission
router.post("/new", (req, res) => {
    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;

    messages.push({
        text: messageText,
        user: messageUser,
        added: new Date(),
    });

    res.redirect("/");
});

// GET route for individuals message details
router.get("/message/:id", (req, res) => {
    const messageId = parseInt(req.params.id);
    const message = messages[messageId];
    res.render("message-detail", { message: message, messageId: messageId });
});

module.exports = router;
