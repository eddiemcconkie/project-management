const mockingoose = require('mockingoose')
const Team = require('../models/team')
const Project = require('../models/project')

const { retrieveOne, addProjectToTeam } = require('../controllers/team')

jest.setTimeout(60000)

describe('Retrieve one', () => {
  test('Get team', async () => {
    const _doc = {
      _id: '58c767386f1d58ebc37af1eb',
      members: [],
      projects: [],
    }

    mockingoose(Team).toReturn(_doc, 'findOne')

    const req = {
      params: { teamId: '58c767386f1d58ebc37af1eb' },
    }
    const res = {
      statusCode: 0,
      status(code) {
        this.statusCode = code
        return this
      },
      data: {},
      json(data) {
        this.data = data
      },
    }

    await retrieveOne(req, res)
    // console.log(res.data)
    expect(res.data).toEqual(_doc)
  })
})

describe('Add project to team', () => {
  // test('Valid data', async () => {
  //   const _doc = {
  //     _id: '58c767386f1d58ebc37af1eb',
  //     title: 'Project title',
  //     description: 'Project description',
  //   }

  //   mockingoose(Project).toReturn(_doc, 'save')
  //   mockingoose(Team).toReturn({_id:'58c767386f1d58ebc37af1eb', projects:[]}, 'findOneAndUpdate')

  //   const req = {
  //     params: { teamId: '58c767386f1d58ebc37af1eb' },
  //     body: {
  //       title: 'New project',
  //       description: 'Test adding project to a team',
  //     },
  //   }
  //   const res = {
  //     statusCode: 0,
  //     status(code) {
  //       this.statusCode = code
  //       return this
  //     },
  //     data: {},
  //     json(data) {
  //       this.data = data
  //     },
  //   }

  //   await addProjectToTeam(req, res)

  //   console.log(res)
  //   expect(res.data).toEqual(_doc)
  // })
  test('Missing data', () => {})
  test('Invalid data', () => {})

  // test('Add project to team', () => {
  //   const req = {
  //     params: { teamId: '' },
  //     body: {
  //       title: 'New project',
  //       description: 'Test adding project to a team',
  //     },
  //   }
  //   const res = {
  //     statusCode: 0,
  //     jsonData: {},
  //     status(code) {
  //       this.statusCode = code
  //       return this
  //     },
  //     json(data) {
  //       this.jsonData = data
  //     },
  //   }

  //   addProjectToTeam(req, res)
  //   expect(res.statusCode).toBe(201)
  // })

  // test('Add incomplete project to team', () => {
  //   const req = {
  //     params: { teamId: '' },
  //     body: {
  //       title: 'New project',
  //     },
  //   }
  //   const res = {
  //     statusCode: 0,
  //     jsonData: {},
  //     status(code) {
  //       this.statusCode = code
  //       return this
  //     },
  //     json(data) {
  //       this.jsonData = data
  //     },
  //   }

  //   addProjectToTeam(req, res)
  //   expect(res.statusCode).toBe(401)
  // })

  // test('Add invalid project to team', () => {
  //   const req = {
  //     params: { teamId: '' },
  //     body: {
  //       title: true,
  //       description: 5,
  //     },
  //   }
  //   const res = {
  //     statusCode: 0,
  //     jsonData: {},
  //     status(code) {
  //       this.statusCode = code
  //       return this
  //     },
  //     json(data) {
  //       this.jsonData = data
  //     },
  //   }

  //   addProjectToTeam(req, res)
  //   expect(res.statusCode).toBe(500)
  // })
})
