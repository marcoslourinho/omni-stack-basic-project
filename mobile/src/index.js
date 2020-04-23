import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import api from './services/api'

const App = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, []);

  async function handleAddProject () {
    const response = await api.post('projects', {
      title: `React Native ${Date.now()}`,
      owner: "Marcos Lourinho",
    })

    const project = response.data
    setProjects([...projects, project])
  }

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={style.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (<Text style={style.text}>{project.title}</Text>)}
        />
        <TouchableOpacity
          style={style.button}
          activeOpacity={0.6}
          onPress={handleAddProject}>
          <Text>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default App;