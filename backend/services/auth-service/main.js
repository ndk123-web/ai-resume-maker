import express from "express";

const app = express();

try {
  app.get(
    "/",
    (req, res, next) => {
      next();
    },
    (req, res) => {
      res.send({
        message: "This is Express",
      });
    }
  );

  app.listen(3000, () => {
    console.log("Express is Listening on Port 3000");
  });
} catch (err) {
  const error = {
    message: err.message,
  };
  console.log(error);
}
