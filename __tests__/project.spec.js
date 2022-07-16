// const mockingoose = require('mockingoose')
// const Project = require('../models/project')
// const {
//   Types: { ObjectId },
// } = require('mongoose')

// const { retrieveOne } = require('../controllers/project')
// const TestResponse = require('../lib/test-response')
// const createdDate = new Date('2022-06-29T14:42:36.904+00:00')

// jest.setTimeout(60000)
// describe('Project routes', () => {
//   test('Get one project', async () => {
//     const _doc = {
//       _id: ObjectId('62bc64dcff745674c4436493'),
//       title: 'Project 1',
//       description: 'First real project',
//       tasks: [],
//       createdAt: createdDate,
//     }

//     mockingoose(Project).toReturn(_doc, 'findOne')

//     const req = {
//       params: { projectId: '62bc64dcff745674c4436493' },
//     }

//     const res = new TestResponse()

//     await retrieveOne(req, res)
//     expect(res.statusCode).toEqual(200)
//     expect(res.data).toEqual(_doc)
//   })
// })

const {
  Types: { ObjectId },
} = require("mongoose");

const MockModel = require("jest-mongoose-mock");
jest.mock("../models/project", () => new MockModel());
const Project = require("../models/project");
const projectController = require("../controllers/project");
const TestResponse = require("../lib/test-response");
const TestDocument = require("../lib/test-document");

describe("Project Routes", () => {
  let res;
  beforeEach(() => {
    jest.clearAllMocks();
    res = new TestResponse();
  });

  test("Get one project", async () => {
    const teamDoc = new TestDocument({
      _id: ObjectId('62bc64dcff745674c4436493'),
      title: 'Project 1',
      description: 'First real project',
      tasks: [],
      createdAt: 
    });
  });
});
