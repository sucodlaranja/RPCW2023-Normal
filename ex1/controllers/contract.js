const contract = require("../models/contract");

module.exports.list = () => {
  return contract.find().then((data) => data);
};

module.exports.getById = (id) => {
  return contract.find({ _id: id }).then((data) => data);
};

module.exports.getByYear = (year) => {
  return contract.find({ AnoDiploma: year }).then((data) => data);
};

module.exports.getByInst = (inst) => {
  return contract.find({ NomeInstituicao: inst }).then((data) => data);
};

module.exports.getCoursesDistinct = () => {
  return contract.distinct("Curso").then((data) => data);
};

module.exports.getinstitutionsDistinct = () => {
  return contract.distinct("NomeInstituicao").then((data) => data);
};

module.exports.add = (newContract) => {
  return contract.create(newContract).then((data) => data);
};

module.exports.delete = (id) => {
  return contract.deleteOne({ _id: id });
};
