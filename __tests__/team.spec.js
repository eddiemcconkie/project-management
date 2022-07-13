const mockingoose = require('mockingoose')
// const mongoose = require('mongoose')
const {
  Types: { ObjectId },
} = require('mongoose')
const Team = require('../models/team')
const Project = require('../models/project')

const { retrieveOne, addProjectToTeam } = require('../controllers/team')
const TestResponse = require('../lib/test-response')

jest.setTimeout(60000)

describe('Team routes', () => {
  test('Get one team', async () => {
    const _doc = {
      _id: ObjectId('58c767386f1d58ebc37af1eb'),
      members: [],
      projects: [],
    }

    mockingoose(Team).toReturn(_doc, 'findOne')

    const req = {
      params: { teamId: '58c767386f1d58ebc37af1eb' },
    }
    const res = new TestResponse()

    await retrieveOne(req, res)
    expect(res.data).toEqual(_doc)
  })
})

describe('Add project to team', () => {})
