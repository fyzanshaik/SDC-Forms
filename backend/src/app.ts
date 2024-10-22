import express from 'express';
import cors from 'cors';
import userRouter from './route';

const app = express();

app.use(
	cors({
		origin: ['http://localhost:5173', 'https://sdc-forms.vercel.app', 'https://sdc-forms-git-main-fyzanshaiks-projects.vercel.app', 'https://sdc-forms-86wal909i-fyzanshaiks-projects.vercel.app'],
	})
);

app.use(express.json());

app.use('/api', userRouter);

app.listen(8080, () => {
	console.log(`Server is running on PORT 8080`);
});
