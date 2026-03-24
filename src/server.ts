import app from "./app";
import config from "./config";

const port = config.PORT;

app.listen(port, () => {
     console.log(`L2B6A2 listening on port: ${port}`);
});
