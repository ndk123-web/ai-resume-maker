import express from "express";
import proxy from "express-http-proxy";

const app = express();

// Parse JSON bodies
app.use(express.json());

const proxyOptions = {
  proxyReqPathResolver: (req) => {
    console.log(`Proxying ${req.method} ${req.originalUrl}`);
    return req.originalUrl; // Keep the full path: /api/v1/user/...
  },
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers["host"] = "localhost:3000";
    console.log(
      "✅ Request to backend:",
      proxyReqOpts,
      proxyReqOpts.method,
      proxyReqOpts.path
    );
    return proxyReqOpts;
  },
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    console.log(`✅ Response from backend: ${userRes.statusCode}`);
    return proxyResData;
  },
  proxyErrorHandler: (err, res, next) => {
    console.error("❌ Proxy Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Gateway Error",
      error: err.message,
    });
  },
};

app.use("/api/v1/user", proxy("localhost:3000", proxyOptions));

app.listen(5000, () => {
  console.log("Api Gateway For Microservices is running on port 5000");
});
