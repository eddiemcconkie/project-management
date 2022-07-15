const mockingoose = require("mockingoose");
const Task = require("../models/task");
const {
  Types: { ObjectId },
} = require("mongoose");

const { retrieveTask } = require("../controllers/task");
const TestResponse = require("../lib/test-response");
const dueDate = new Date("2022-07-21T00:00:00.000+00:00");
const createdDate = new Date("2022-07-15T17:08:14.354+00:00");

describe("Task routes", () => {
  test("Get one task", async () => {
    const _doc = {
      _id: ObjectId("62d19efeabcd9783e2a2bf03"),
      title: "Homework",
      description: "Web Design",
      dueDate: dueDate,
      completed: false,
      createdAt: createdDate,
    };

    mockingoose(Task).toReturn(_doc, "findOne");

    const req = {
      params: { taskId: "62d19efeabcd9783e2a2bf03" },
    };

    const res = new TestResponse();

    await retrieveTask(req, res);
    expect(res.statusCode).toEqual(200);
    expect(res.data).toEqual(_doc);
  });
});
