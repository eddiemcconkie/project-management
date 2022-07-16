const {
  Types: { ObjectId },
} = require("mongoose");

const MockModel = require("jest-mongoose-mock");
jest.mock("../models/project", () => new MockModel());
jest.mock("../models/task", () => new MockModel());
const Project = require("../models/project");
const Task = require("../models/task");
const projectController = require("../controllers/project");
const TestResponse = require("../lib/test-response");
const TestDocument = require("../lib/test-document");
const createdDate = new Date("2022-06-29T14:42:36.904+00:00");

describe("Project Routes", () => {
  let res;
  beforeEach(() => {
    jest.clearAllMocks();
    res = new TestResponse();
  });

  test("Get one project", async () => {
    const projectDoc = new TestDocument({
      _id: ObjectId("62bc64dcff745674c4436493"),
      title: "Project 1",
      description: "First real project",
      tasks: [],
      createdAt: createdDate,
    });
    Project.findById.mockReturnValue(projectDoc);

    const req = {
      params: { projectId: "62bc64dcff745674c4436493" },
    };

    const res = new TestResponse();

    await projectController.retrieveOne(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual(projectDoc);
    expect(Project.findById.mock.calls.length).toBe(1);
  });

  test("Add task to project", async () => {
    const taskDoc = new TestDocument({
      _id: ObjectId("62d23253a71b4b3f21abfc34"),
      title: "Awesome Task",
      description: "Awesome Description",
      dueDate: "2022-07-21T00:00:00.000+00:00",
      completed: false,
      createdAt: "2022-07-16T03:36:51.508+00:00",
    });
    Task.create.mockReturnValue(taskDoc);

    const req = {
      params: {
        projectId: "62bc64dcff745674c4436493",
      },
      body: {
        title: "Awesome Task",
        description: "Awesome Description",
        completed: false,
      },
    };

    await projectController.addTaskToProject(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.data).toEqual(taskDoc);
    expect(Task.create.mock.calls.length).toBe(1);
    expect(Project.findByIdAndUpdate.mock.calls.length).toBe(1);
  });

  test("Update project", async () => {
    const projectDoc = new TestDocument({
      _id: ObjectId("62d19dc6abcd9783e2a2befd"),
      title: "Project 6",
      description: "The Best Project",
      tasks: [],
      createdAt: "2022-07-15T17:03:02.272+00:00",
    });
    Project.findByIdAndUpdate.mockReturnValue(projectDoc);

    const req = {
      params: {
        projectId: "62d19dc6abcd9783e2a2befd",
      },

      body: {
        title: "project 6",
        description: "the best",
      },
    };

    await projectController.updateProject(req, res);
    expect(res.statusCode).toBe(204);
    expect(Project.findByIdAndUpdate.mock.calls.length).toBe(1);
  });
});
