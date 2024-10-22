import { Request, Response } from 'express';

export const healthCheck = async (req: Request, res: Response) => {
	console.log('Hit the health point');
	res.json({ message: 'Working!' });
};
