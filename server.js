const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (for HTML, CSS)
app.use(express.static('public'));

// Endpoint to handle form submission
app.post('/submit-feedback', (req, res) => {
    const feedback = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    };

    // Save feedback to a JSON file
    const feedbackFilePath = path.join(__dirname, 'feedback.json');
    fs.readFile(feedbackFilePath, 'utf8', (err, data) => {
        const feedbackList = data ? JSON.parse(data) : [];
        feedbackList.push(feedback);

        fs.writeFile(feedbackFilePath, JSON.stringify(feedbackList, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving feedback');
            res.send('Thank you for your feedback!');
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
