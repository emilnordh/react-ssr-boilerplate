import express from 'express';
import createRender from './render';

const app = express();
const port = 3000;

app.use(createRender());

app.listen(port, () => console.log(`Server running on ${port}`));
