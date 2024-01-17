let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createAccount = (req, res) => {
  const { name } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ success: false, msg: "please provide credentials" });

  res.status(201).json({ sucess: true, person: name });
};

const updateAccount = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((p) => Number(p.customer_id) === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `No person with id: ${id} found` });
  }

  console.log(id, name);

  people.forEach((person) => {
    if (Number(person.customer_id) === Number(id)) {
      person.name = name;
    }
  });

  res.status(200).json({ success: true, data: people });
};

const deleteAccount = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => {
    return Number(person.customer_id) === Number(id);
  });

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `No person with id: ${id} found` });
  }

  const updatedList = people.filter((person) => {
    return person.customer_id !== Number(req.params.id);
  });

  return res.status(200).json({ sucess: true, data: updatedList });
};

module.exports = { getPeople, createAccount, updateAccount, deleteAccount };
