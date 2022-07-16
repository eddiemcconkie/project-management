const { formatId, getUser } = require("../lib/helpers");
const Team = require("../models/team");
const Project = require("../models/project");
const Task = require("../models/task");

/** @type {RequestHandler} */
exports.retrieveAll = async (req, res) => {
  try {
    const user = await getUser(req);

    const teams = await Team.find({
      members: { $elemMatch: { $eq: user._id } },
    }).populate("projects");
    return res.status(200).json(teams.map((team) => team.projects).flat());
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.retrieveOne = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).lean();
    return res.status(200).json(project);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateProject = async (req, res) => {
  const { projectId } = req.params;

  if (!req.body?.title || !req.body?.description) {
    return res.status(400).json({
      message:
        "Invalid Project format. Please provide a title and description.",
    });
  }

  try {
    const project = await Project.findByIdAndUpdate(projectId, {
      $set: { title: req.body.title, description: req.body.description },
    }).lean();

    return res.status(204).json({
      message: "Project Updated Successfully",
      project: project,
    });
  } catch (err) {
    return res.status(500).json({ message: "Could not update the project" });
  }
};

exports.getProjectTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate("tasks")
      .lean();
    return res.status(200).json(project.tasks);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.addTaskToProject = async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({
      message: "Invalid format. Please provide title and description",
    });
  }

  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      tasks: [],
      dueDate: req.body.dueDate,
    });

    await Project.findByIdAndUpdate(req.params.projectId, {
      $push: { tasks: task._id },
    });

    return res.status(201).json(task.toObject());
  } catch (error) {
    res.status(500).json({ message: "Could not add task to project" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId);

    // Delete all tasks for the project
    for (const taskId of project.tasks) {
      await Task.findByIdAndDelete(taskId);
    }

    // Remove the project from its team
    await Team.findOneAndUpdate(
      {
        projects: { $elemMatch: { $eq: projectId } },
      },
      { $pull: { projects: projectId } }
    );

    await Project.findByIdAndDelete(projectId);
    return res.status(204).json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Could not delete project" });
  }
};
