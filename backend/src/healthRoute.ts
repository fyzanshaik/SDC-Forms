import { Router, Request, Response } from 'express';

import { healthCheck } from './healthController';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
	await healthCheck(req, res);
});

export default router;
