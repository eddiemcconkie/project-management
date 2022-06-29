const User = require('../models/user')

/** @param {import('express').Request} req */
const getUser = async (req) => {
  const email = req.oidc.user?.email
  if (!email) return null

  try {
    const user = await User.findOne({ email })
    const id = user._id.toString()
    return { id, email }
  } catch (error) {
    return null
  }
}

const getIdFromEmail = async (email) => {
  const user = await User.findOne({ email }).catch(() => null)
  if (!user) return null

  return user._id
}

/** @param {{_id: import('mongoose').ObjectId}} document */
const formatId = (document) => ({ ...document, id: document._id.toString() })

module.exports = {
  getUser,
  getIdFromEmail,
  formatId,
}
