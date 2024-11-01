const express = require("express");
const cors = require("cors");
let app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

let department = [
  {
    id: 2,
    name: "IT",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ipsam nisi praesentium eligendi esse in sed, dolore voluptatibus architecto nihil animi voluptate ducimus dolorem consequuntur temporibus magni quam repellendus qui. ",
  },
  {
    id: 2,
    name: "Finance",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ipsam nisi praesentium eligendi esse in sed, dolore voluptatibus architecto nihil animi voluptate ducimus dolorem consequuntur temporibus magni quam repellendus qui. ",
  },
  {
    id: 3,
    name: "Finance",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ipsam nisi praesentium eligendi esse in sed, dolore voluptatibus architecto nihil animi voluptate ducimus dolorem consequuntur temporibus magni quam repellendus qui. ",
  },
  {
    id: 4,
    name: "Marketing",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ipsam nisi praesentium eligendi esse in sed, dolore voluptatibus architecto nihil animi voluptate ducimus dolorem consequuntur temporibus magni quam repellendus qui. ",
  },
];

// app.get("/", (req, res) => {
//   res.send(department);
// });

app.get("/departments", (req, res) => {
  res.status(200).json(department);
});

app.get("/departments/:id", (req, res) => {
  const departmentId = parseInt(req.params.id);
  const Fdepartment = department.find((d) => d.id === departmentId);
  if (!Fdepartment) {
    return res.status(404).json({ message: "Department not found" });
  }
  res.status(200).json(Fdepartment);
});

app.delete("/department/:id", (req, res) => {
  const departmentId = parseInt(req.params.id);
  const Fdepartment = department.find((d) => d.id === departmentId);
  const index = department.indexOf(Fdepartment);
  department.splice(index, 1);
  res.status(201).json({
    delete: department,
    departments: department,
  });
});

app.post("/addDepartment", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const desc = req.body.desc;
  if (!id || !name || !desc) {
    return res.status(400).json({ message: "Invalid request" });
  }
  const newDepartment = {
    id,
    name,
    desc,
  };

  department.push(newDepartment);
  res
    .status(201)
    .json({ newDepartment: newDepartment, alldepartment: department });
});

app.patch("/departments/:id", (req, res) => {
  const departmentId = parseInt(req.params.id);
  const Fdepartment = department.find((d) => d.id === departmentId);
  if (!Fdepartment) {
    return res.status(404).json({ message: "Department not found" });
  }
  const updatedDepartment = {
    ...Fdepartment,
    ...req.body,
  };
  const index = department.indexOf(Fdepartment);

  department[index] = updatedDepartment;
  res
    .status(200)
    .json({ updatedDepartment: updatedDepartment, alldepartment: department });
});

app.listen(8000, () => console.log("app started on port 8000"));
