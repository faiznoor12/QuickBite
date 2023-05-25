import { connect, ConnectOptions } from "mongoose";

export const dbconnect = () => {
  connect(process.env.MONGODB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions).then(
    () => console.log("connected"),
    (err) => console.log(err)
  );
};
 