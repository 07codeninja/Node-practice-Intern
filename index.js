const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const logger = require('./middleware/logger');

app.use(express.json());
app.use(logger);

app.use('/users', userRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
