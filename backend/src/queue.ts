import Bull from 'bull';
import sendMail from './mail';

const emailQueue = new Bull('emailQueue');

emailQueue.process(async (job) => {
	const emailProcessTimeStart = performance.now();
	await sendMail(job.data.email);
	const endTime = performance.now();
	console.log(`It took this long for it process the email: ${endTime - emailProcessTimeStart}`);
});

export default emailQueue;
