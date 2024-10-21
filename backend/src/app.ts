import express from 'express';
import path from 'path';
import userRouter from './route';
const app = express();
app.use(express.json());

app.use('/api', userRouter);

app.listen(8080, () => {
	console.log(`Server is running on PORT 8080`);
});
