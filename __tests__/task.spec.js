const {
  Types: { ObjectId },
} = require('mongoose')

const MockModel = require('jest-mongoose-mock')
jest.mock('../models/task', () => new MockModel())
jest.mock('../models/project', () => new MockModel())
const Task = require('../models/task')
const Project = require('../models/project')
const taskController = require('../controllers/task')
const TestResponse = require('../lib/test-response')
const TestDocument = require('../lib/test-document')

describe('Task routes', () => {
  let res
  beforeEach(() => {
    jest.clearAllMocks()
    res = new TestResponse()
  })

  test('Get one task', async () => {
    const taskDoc = new TestDocument({
      _id: ObjectId('62d23253a71b4b3f21abfc34'),
      title: 'Awesome Task',
      description: 'Awesome Description',
      dueDate: '2022-07-21T00:00:00.000+00:00',
      completed: false,
      createdAt: '2022-07-16T03:36:51.508+00:00',
    })
    Task.findById.mockReturnValue(taskDoc)

    const req = {
      params: { taskId: '62d23253a71b4b3f21abfc34' },
    }

    const res = new TestResponse()

    await taskController.retrieveTask(req, res)
    expect(res.statusCode).toBe(200)
    expect(res.data).toEqual(taskDoc)
    expect(Task.findById.mock.calls.length).toBe(1)
  })

  test('Update Task', async () => {
    const taskDoc = new TestDocument({
      _id: ObjectId('62d23253a71b4b3f21abfc34'),
      title: 'Awesome Task',
      description: 'Awesome Description',
      dueDate: '2022-07-21T00:00:00.000+00:00',
      completed: false,
      createdAt: '2022-07-16T03:36:51.508+00:00',
    })
    Task.findByIdAndUpdate.mockReturnValue(taskDoc)

    const req = {
      params: {
        taskId: '62d23253a71b4b3f21abfc34',
      },

      body: {
        completed: true,
      },
    }

    await taskController.updateTask(req, res)
    expect(res.statusCode).toBe(204)
    expect(Task.findByIdAndUpdate.mock.calls.length).toBe(1)
  })

  test('Delete a task', async () => {
    const req = {
      params: {
        taskId: '62d23253a71b4b3f21abfc34',
      },
    }

    await taskController.deleteTask(req, res)

    expect(res.statusCode).toBe(204)
    expect(Project.findOneAndUpdate.mock.calls.length).toBe(1)
    expect(Task.findByIdAndDelete.mock.calls.length).toBe(1)
  })
})
