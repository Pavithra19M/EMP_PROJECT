import express from 'express';
const port = 5000;
const app = express();

app.get('/', (req, res) => {
  res.send('Api is running');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`API is running at port ${port}`));
}

export default app;
