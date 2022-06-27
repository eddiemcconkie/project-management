const Project = require("../models/project");

exports.retrieveAll = async (req, res) => {
  try {
    const projects = await Project.find();
    console.log(projects);
    res.status(200).send(projects);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.retriveOne = async (req, res) => {
  try {
    const project = await Project.findById(req.params.ObjectId);
    console.log(project);
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateProject = async (req, res) => {
  Project.findByIdAndUpdate(
    req.params.ObjectId,
    req.body,
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(result);
    }
  );
};
