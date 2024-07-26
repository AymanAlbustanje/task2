import { Request, Response, Express } from "express";
import express from 'express'
import dataSource from "./db/dbConfig.js";


const app: Express = express();
const PORT: Number = 3000;
const Root: "/" = "/";
let con: number = 0;
let connections: any = [];




// Route.
app.get(Root, (req: Request, res: Response) => {
    res.send("hello world");
})

app.get("/data", (req: Request, res: Response) => {
    res.json({
        data: 'success',
        Type: true,
    });

})


dataSource.initialize().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});


app.listen(PORT, () => {
    console.log(`server is running on host: http://localhost:${PORT}`);
});

export default app;








module.exports = app
