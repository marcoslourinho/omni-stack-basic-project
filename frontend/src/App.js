import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import api from './services/api'
import './App.css'
// import background from './assets/background.jpg'

function App () {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, []);

  async function handleAdicionarProjeto () {
    // projects.push(`Novo projeto ${Date.now()}`)
    // setProjects([...projects, `Projeto ${Date.now()}`])
    const response = await api.post('projects',
      {
        title: `Novo projeto ${Date.now()}`,
        owner: "Marcos Lourinho"
      })

    project = response.data
    setProjects([...projects, project])
  }

  return (
    <>
      <Header title="Projects" />
      {/* <img width={300} src={background} /> */}
      <br />
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAdicionarProjeto}>Adicionar Projeto</button>
    </>
  );
}

export default App;