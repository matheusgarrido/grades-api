import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { gradeRouter } from './routes/gradeRouter.js';
import { db } from './models/index.js';
import gradeModel from './models/gradeModel.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let whitelist = [
  'https://desafio4-grade-app.herokuapp.com/',
  'http://localhost:3000',
];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
// app.use('/grade');

app.use('/', gradeRouter);

// app.get('/', (req, res) => {
//   res.send('API em execucao');
// });
// console.log('object');

app.listen(process.env.PORT || 8081, () => {});
