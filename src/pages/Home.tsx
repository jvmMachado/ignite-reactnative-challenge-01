import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existingTask = tasks.find(task => task.title === newTaskTitle);

    if(existingTask) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome',[
        {
          text: "Ok",
          style: "cancel"
        }
      ])
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(
      task => task.id === id ? {...task, done: !task.done} : task
    ))
  }

  function handleRemoveTask(id: number) {

    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',[
      {
        text: "Sim",
        onPress: () => setTasks(oldState => oldState.filter(
          task => (task.id !== id)
        ))
      },
      {
        text: "Não",
        style: "cancel"
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})