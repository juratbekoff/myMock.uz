import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1000,
  max: 30,
  handler: (req, res) => {
    res.status(429).json({
      message: "Too many requests, please try again later.",
    });
  },
});
