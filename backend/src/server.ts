import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";

const port = process.env.PORT || 5000;

(async () => {
  await connectDB(process.env.MONGO_URI!);
  app.listen(port, () => console.log(`Server on ${port}`));
})();
