const express = require('express');
const router = express.Router();
const users = require('../data/users');
const validateUser = require('../middleware/validateUser');

// GET /users
router.get('/', (req, res) => {
    res.status(200).json(users);
});

// GET /users/:id
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
});

// POST /users
router.post('/', validateUser, (req, res) => {
    const { firstName, lastName, hobby } = req.body;
    const newUser = {
        id: String(users.length + 1),
        firstName,
        lastName,
        hobby
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /users/:id
router.put('/:id', validateUser, (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.hobby = req.body.hobby;

    res.status(200).json(user);
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    const deletedUser = users.splice(index, 1);
    res.status(200).json(deletedUser[0]);
});

module.exports = router;
