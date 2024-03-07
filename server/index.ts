import express, { Express, Request, Response , Application } from 'express';
import { router } from './Router/routes';
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from 'body-parser' ;
import cors from 'cors' ;



dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors({
    credentials : true , 
}));
app.use(bodyParser.json());

app.use('/',router);


const port = process.env.TS_PORT_KEY || 8000;
const connection=process.env.TS_MONGODB_URL;


declare global {
  namespace Express {
    interface Request {
      genid?:string;
    }
  }
}


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, async() => {
  await connect_to_db(connection);
  console.log(`Server is FiredUp at http://localhost:${port}`);
});


async function connect_to_db(connection:string |undefined){
  if(typeof connection!== "string"){
      console.log(`Error In Connecting Database To Server Due To wrong Connection Key`);
      return;
  }
  try{ 
      await mongoose.connect(connection);


      console.log("hello")

      console.log(`Database Is Connecting To Server:${port}`);
  }catch(e){
      console.log(`Error In Connecting Database To Server:${port}`);
      }
  }
