// const mockingoose = require("mockingoose");
// const Project = require("../models/project");
// const { retriveOne } = require("./project");

// describe("retriveOne", () => {
//   it("should return a project", async () => {
//     mockingoose(Project).toReturn(
//       {
//         _id: "62bc64dcff745674c4436493",
//         title: "Project 1",
//         description: "First real project",
//         tasks: [],
//         // createdAt: 2022-06-29T14:42:36.904+00:00
//       },
//       "findOne"
//     );
//     const results = await retriveOne("62bc64dcff745674c4436493");
//     expect(results).toBe("test");
//   });
// });

// // const request = require("supertest");

// // describe("Project Test Suite", () => {
// //   it("test get /:projectid", async () => {
// //     const response = await request(
// //       "https://cse341-project-management.herokuapp.com"
// //     ).get("/projects/62bc64dcff745674c4436493");
// //     expect(response.body).toEqual({
// //       _id: "62bc64dcff745674c4436493",
// //       title: "Project 1",
// //       description: "First real project",
// //       tasks: [],
// //       createdAt: "2022-06-29T14:42:36.904+00:00",
// //     });
// //     expect(response.statusCode).toBe(200);
// //   });
// // });
