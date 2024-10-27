import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import userRouter from './route';
import healthRoute from './healthRoute';
const app = express();
const PORT = process.env.PORT || 8080;
app.use(
	cors({
		origin: ['http://localhost:5173', 'https://sdc-forms.vercel.app', 'https://sdc-forms-git-main-fyzanshaiks-projects.vercel.app', 'https://sdc-forms-86wal909i-fyzanshaiks-projects.vercel.app'],
	})
);

app.use(express.json());
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 50,
});
app.use(limiter);
app.get('/', healthRoute);

app.use('/api', userRouter);

app.listen(PORT, () => {
	console.log(`Server is running on PORT 8080`);
});
