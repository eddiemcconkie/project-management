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
    const _team = {
      _id: ObjectId('58c767386f1d58ebc37af1eb'),
      members: [],
      projects: [],
    }

    mockingoose(Team).toReturn(_team, 'findOne')

    const req = {
      params: { teamId: '58c767386f1d58ebc37af1eb' },
    }
    const res = new TestResponse()

    await retrieveOne(req, res)
    expect(res.data).toEqual(_team)
  })

  // test('Add project to team', async () => {
  //   const _project = {
  //     _id: ObjectId('58c767386f1d58ebc37af1eb'),
  //     title: 'Title',
  //     description: 'Description',
  //     tasks: [],
  //     createdAt: '2022-06-29T15:09:08.828+00:00',
  //   }
  //   const _team = {
  //     _id: ObjectId('62bc6db16471a1628f7c6f56'),
  //     name: 'Name',
  //     members: [],
  //     projects: ['58c767386f1d58ebc37af1eb'],
  //   }

  //   mockingoose(Project).toReturn(_project, 'save')
  //   mockingoose(Team).toReturn(_team, 'findOneAndUpdate')

  //   const req = {
  //     params: {
  //       teamId: '62bc6db16471a1628f7c6f56',
  //     },
  //     body: {
  //       title: 'Title',
  //       description: 'Description',
  //     },
  //   }
  //   const res = new TestResponse()

  //   await addProjectToTeam(req, res)
  //   expect(res.data).toEqual(_project)
  // })
})
