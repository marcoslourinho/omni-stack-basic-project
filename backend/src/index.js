const express = require('express')
const cors = require('cors')
const { uuid, isUuid } = require('uuidv4')

const app = express();
app.use(cors())
app.use(express.json())

// Middleware log
function logs (req, res, next) {
  const { method, url } = req;
  const log = `[${method.toUpperCase()}]: ${url}`
  console.time(log)
  next();
  console.timeEnd(log)
}

// Middleware de validação de uuid
function validateId (req, res, next) {
  const { id } = req.params
  if (!isUuid(id))
    return res.status(400).json({ error: "Invalid ID" })

  return next()
}

app.use(logs)
app.use('/projects/:id', validateId)

const projects = []

app.get('/projects', (req, res) => {
  const { title } = req.query
  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects

  return res.json(results)
})

app.post('/projects', (req, res) => {
  const { title, owner } = req.body
  const project = { id: uuid(), title, owner }
  projects.push(project)
  return res.json(project)
})

app.put('/projects/:id', (req, res) => {
  const { id } = req.params
  const { title, owner } = req.body

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0)
    return res.status(400).json({ message: "Project Not Found" })

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project
  return res.json(project)
})

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params
  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0)
    return res.status(400).json({ message: "Project Not Found" })

  projects.splice(projectIndex, 1)
  return res.status(204).send()
})

app.listen(3333, () => {
  console.log('⚙️ API Started!')
})