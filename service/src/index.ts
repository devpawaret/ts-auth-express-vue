import app from "./app";
import config from "./configs";

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
