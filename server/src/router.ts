import { Router } from "express";

export const createRouter = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.status(200).send({ message: "hello, world" });
  });

  router.put("/", (req, res) => {
    res.status(200).send({ message: "hello, world" });
  });

  router.post("/:taskID", (req, res) => {
    res.status(200).send({ message: "hello, world" });
  });

  router.delete("/:taskID", (req, res) => {
    res.status(200).send({ message: "hello, world" });
  });

  return router;
};
