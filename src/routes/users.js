// router

import express from 'express';
import UserRepo from '../repos/user-repo.js';

const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await UserRepo.find();

  res.send(users);
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await UserRepo.findById(id);

  user ? res.send(user) : res.sendStatus(404);
});

router.post('/users', async (req, res) => {
  const { username, bio } = req.body;

  const user = await UserRepo.insert(username, bio);

  res.send(user);
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, bio } = req.body;

  const user = await UserRepo.update(id, username, bio);

  user ? res.send(user) : res.sendStatus(404);
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await UserRepo.delete(id);

  user ? res.send(user) : res.sendStatus(404);
});

export default router;












