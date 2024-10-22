import express from 'express';
import cors from 'cors';
import userRouter from './route';

const app = express();

app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);

app.use(express.json());

app.use('/api', userRouter);

app.listen(8080, () => {
	console.log(`Server is running on PORT 8080`);
});
