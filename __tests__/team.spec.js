const {
  Types: { ObjectId },
} = require('mongoose')

const MockModel = require('jest-mongoose-mock')
jest.mock('../models/team', () => new MockModel())
jest.mock('../models/project', () => new MockModel())
const Team = require('../models/team')
const Project = require('../models/project')
const teamController = require('../controllers/team')
const TestResponse = require('../lib/test-response')
const TestDocument = require('../lib/test-document')

const helpers = require('../lib/helpers')
const getUser = jest.fn(helpers.getUser)
getUser.mockReturnValue({ _id: 'userid' })
// jest.setTimeout(60000)

describe('Team routes', () => {
  let res
  beforeEach(() => {
    jest.clearAllMocks()
    res = new TestResponse()
  })

  test('Get one team', async () => {
    // setup
    const teamDoc = new TestDocument({
      _id: ObjectId('58c767386f1d58ebc37af1eb'),
      members: [],
      projects: [],
    })
    Team.findById.mockReturnValue(teamDoc)

    const req = {
      params: { teamId: '58c767386f1d58ebc37af1eb' },
    }
    const res = new TestResponse()

    // exercise
    await teamController.retrieveOne(req, res)

    // verify
    expect(res.statusCode).toBe(200)
    expect(res.data).toEqual(teamDoc)
    expect(Team.findById.mock.calls.length).toBe(1)
  })

  test('Add project to team', async () => {
    // setup
    const projectDoc = new TestDocument({
      _id: ObjectId('58c767386f1d58ebc37af1eb'),
      title: 'Title',
      description: 'Description',
      tasks: [],
      createdAt: '2022-06-29T15:09:08.828+00:00',
    })
    Project.create.mockReturnValue(projectDoc)

    const req = {
      params: {
        teamId: '62bc6db16471a1628f7c6f56',
      },
      body: {
        title: 'Title',
        description: 'Description',
      },
    }

    // exercise
    await teamController.addProjectToTeam(req, res)

    // verify
    expect(res.statusCode).toBe(201)
    expect(res.data).toEqual(projectDoc)
    expect(Project.create.mock.calls.length).toBe(1)
    expect(Team.findByIdAndUpdate.mock.calls.length).toBe(1)
  })

  test('Leave team', async () => {
    // setup
    const teamDoc = new TestDocument({
      _id: ObjectId('58c767386f1d58ebc37af1eb'),
      name: 'Name',
      members: [],
      projects: [],
    })
    Team.findByIdAndUpdate.mockReturnValue(teamDoc)

    const req = {
      params: {
        teamId: '62bc6db16471a1628f7c6f56',
      },
    }
    // getUser.mockReturnValue({ _id: 'userid' })

    // exercise
    teamController.leaveTeam(req, res)

    // verify
    expect(res.statusCode).toBe(204)
    expect(Team.findByIdAndUpdate.mock.calls.length).toBe(1)
  })
})
