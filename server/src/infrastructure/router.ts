import { Router } from "express";
import { DBAccessor } from "./dbAccessor";
import express from "express";
import { TasksController } from "../interfaces/controllers/TasksController";
import { PostgresConnection } from "./PostgresConnection";

const dbAccessor = new DBAccessor();
const postgresConnection = new PostgresConnection();
const tasksController = new TasksController(postgresConnection);

export const createRouter = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    try {
      const resBody = await dbAccessor.get();
      res.status(200).send({ message: "get success", resBody });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "get failded" });
    }
  });

  router.post("/", async (req: express.Request, res: express.Response) => {
    let result = await tasksController.createTask(req, res);
    res.send(result);
    // try {
    //   if (!req.body.title) {
    //     res.status(400).send({ message: "title required" });
    //   }
    //   await dbAccessor.create(req.body.title);
    //   res.status(200).send({ message: "create success" });
    // } catch (err) {
    //   console.error(err);
    //   res.status(400).send({ message: "create failded" });
    // }
  });

  router.put("/:taskID", async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).send({ message: "body required" });
      }
      await dbAccessor.update({ uuid: req.params.taskID, ...req.body });
      res.status(200).send({ message: "update success" });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "update failded" });
    }
  });

  router.delete("/:taskID", async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).send({ message: "body required" });
      }
      await dbAccessor.delete({ uuid: req.params.taskID });
      res.status(200).send({ message: "delete success" });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "delete failded" });
    }
  });

  return router;
};
