const image = require("./image");

module.exports = (app) => {
    app.use("/api/image", image);
};