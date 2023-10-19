import { Router, Request, Response } from 'express'; // Express modul és típusok importálása
import passport from 'passport';
import { authRegisterController } from '../controllers/auth';
import User from '../database/schemas/User';
import { hashPassword, comparePassword } from '../utils/helpers';

const router = Router();

router.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
  console.log('Logged In');
  res.sendStatus(200); // A válasz státuszkódjának javítása
});

router.post('/register', authRegisterController);

router.get('/discord', passport.authenticate('discord'), (req: Request, res: Response) => {
  res.sendStatus(200); // A válasz státuszkódjának javítása
});

router.get('/discord/redirect', passport.authenticate('discord'), (req: Request, res: Response) => {
  res.sendStatus(200); // A válasz státuszkódjának javítása
});

export default router;
