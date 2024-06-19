import express from 'express';

import getClientIndexPath from '../config/getClientIndexPath.js';

const router = new express.Router();

const clientRoutes = ['/', '/user-sessions/new', '/users/new', '/projects/:id', '/create-new-build', '/my-builds', '/my-builds/:id', '/edit-my-build/:id', '/fork/:id', '/project-forks/:id/fork-list', '/github-login', '/github-callback-component', "/project-list" ]
const authedClientRoutes = ['/profile'];

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

router.get(authedClientRoutes, (req, res) => {
  if (req.user) {
    res.sendFile(getClientIndexPath());
  } else {
    res.redirect('/user-sessions/new');
  }
});

export default router;
