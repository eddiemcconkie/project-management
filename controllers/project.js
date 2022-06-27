const Project = require("../models/project");

exports.retrieveAll = (req, res) => {
  Project.find()
    .then((projects) => {
      res.status(200).send(projects);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

exports.retriveOne = (req, res) => {
  Project.findById(req.params.ObjectId)
    .then((project) => {
      res.status(200).send(project);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

exports.updateProject = (req, res) => {
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
