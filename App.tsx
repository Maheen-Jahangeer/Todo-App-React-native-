import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Button, Modal, Pressable } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons'

interface EditedDataProps {
  Id:number | null,
  data:string
}

const TodoApp = () => {
  const [changedTodo, setChangedTodo] = useState('');
  const [todoGoals, setTodoGoals] = useState<string[]>([]);

  const onChangeHandler = (enteredText: any) => {
    setChangedTodo(enteredText)
  };

  const onSubmitHandler = () => {
    setTodoGoals((prevValue) => [...prevValue, changedTodo]);
    setChangedTodo("")
  }

  const deleteHandler = (id: number) => {
    console.log("Clicked", id)
    setTodoGoals(prevState => prevState.filter((prev, index) => {
      return index != id
    }))
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [dataTobeEdited, setDataTobeEdited] = useState<EditedDataProps>({
    Id:null,
    data:''
  })
  const editHandler = (id:number, data:string) => {
    console.log("Clicked on edit button")
    setModalOpen(true);
    setDataTobeEdited({...dataTobeEdited, Id:id, data:data})
  }

  const updateHandler = (id:any) => {
    let temp_goals = [...todoGoals];
    let temp_item = temp_goals[id]
    temp_item = changedTodo
    temp_goals[0] = temp_item
    setTodoGoals(temp_goals);
    setChangedTodo("")
    setModalOpen(false);
  }

  const editOnchangeHandler = (eventText:string) => {
    setDataTobeEdited({...dataTobeEdited, data:eventText});
    setChangedTodo(eventText);
  }

  return (
    <View style={styles.wrapper}>
      <Modal visible={modalOpen} onRequestClose={()=>setModalOpen(!modalOpen)}>
        <View style={styles.centerContainer}>
          <View style={styles.modal}>
            <View style={styles.inputContainer}>
              <TextInput value={dataTobeEdited.data} onChangeText={editOnchangeHandler} style={styles.input}/>
              <Pressable style={styles.pressubleButton} onPress={() => updateHandler(dataTobeEdited.Id) } >
                <Text>Update</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={onChangeHandler} value={changedTodo} />
        <Button title='Add todo' onPress={() => onSubmitHandler()} />
      </View>
      <FlatList data={todoGoals} renderItem={(itemsData) => {
        return (
          <View style={styles.goalsItems}>
            <Text>{itemsData.item}</Text>
            <View style={styles.updateContainer}>
              <Ionicons name='pencil' size={20} color="white" onPress={() => editHandler(itemsData.index, itemsData.item)} />
              <Ionicons style={styles.deleteButton} name='trash-outline' size={20} color="white" onPress={() => deleteHandler(itemsData.index)} />
            </View>
          </View>
        )
      }} />
    </View>
  )
}

const TodoButton = ({ onClickHandler }: any) => {
  return (
    <View style={styles.buttonContainer} onStartShouldSetResponder={() => onClickHandler()}>
      <Text style={styles.buttonLabel}>Add todo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    minWidth: 100,
    height: 50,
    backgroundColor: "#7e43a3",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10
  },
  wrapper: {
    padding: 15,
    alignItems: 'center',
    justifyContent: "space-around",
    width: "100%"
  },
  input: {
    borderWidth: 2,
    borderColor: "#d5d5d5",
    width: "80%",
    height: 50,
    paddingLeft: 10,
    backgroundColor:'#fff'
    // fontFamily:"Convergence-Regular"
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#d5d5d5",
    width:'100%',
    maxWidth:"95%",
    margin:'auto'
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: '600'
  },
  seperator: {
    height: 4,
    width: '100%',
    backgroundColor: '#cccccc'
  },
  buttonWrapper: {
    // height:100,
    marginLeft: 10,
    width: "30%",
    padding: 10
  },
  goalsItems: {
    backgroundColor: "#7e43a3",
    padding: 20,
    marginTop: 50,
    borderRadius: 10,
    minWidth: 300,
    justifyContent: 'space-between',
    maxWidth: "95%",
    margin: "auto",
    width: '100%',
    flexDirection: 'row'
  },
  updateContainer: {
    flexDirection: 'row',
  },
  deleteButton: {
    marginLeft: 10
  },
  modal:{
    backgroundColor:"#d6d6d6",
    width:'100%',
    height:'auto',
    maxWidth:'96%',
    margin:'auto',
    borderRadius:10,
    borderWidth:2,
    borderColor:'#cccccc'
  },
  centerContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  pressubleButton:{
    borderRadius:10,
    backgroundColor:'#7cc26d',
    minWidth:100,
    height:50,
    borderWidth:0,
    alignItems:"center",
    justifyContent:"center"
  }
})

export default TodoApp;