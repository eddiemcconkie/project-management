const mockingoose = require("mockingoose");
const Project = require("../models/project");
const {
  Types: { ObjectId },
} = require("mongoose");

const { retrieveOne } = require("../controllers/project");
const createdDate = new Date("2022-06-29T14:42:36.904+00:00");

jest.setTimeout(60000);
describe("retrieveOne", () => {
  test("Get project", async () => {
    const _doc = {
      _id: ObjectId("62bc64dcff745674c4436493"),
      title: "Project 1",
      description: "First real project",
      tasks: [],
      createdAt: createdDate,
    };

    mockingoose(Project).toReturn(_doc, "findOne");

    const req = {
      params: { projectId: "62bc64dcff745674c4436493" },
    };

    const res = {
      statusCode: 0,
      status(code) {
        this.statusCode = code;
        return this;
      },
      data: {},
      json(data) {
        this.data = data;
      },
    };

    await retrieveOne(req, res);
    expect(res.data).toEqual(_doc);
  });
});
