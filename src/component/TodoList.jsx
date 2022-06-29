import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { mobile } from "../responsive.js";
import { useFormik } from "formik";
import axios from "axios";
import { TbPokeball } from "react-icons/tb";
import { RiDeleteBin4Line } from "react-icons/ri";
import { bounce } from "react-animations";

const Background = styled.div`
  background-image: url("https://wallpaperaccess.com/full/418495.jpg");
  background-repeat: repeat-y;
  background-size: auto;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  font-family: "PokemonFont";
  font-weight: 700;
  background-position: center;
  margin: 0;
  flex-direction: column;
  align-items: center;
`;
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1500px;
`;
const Card = styled.div`
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  margin: 20px 20px;
`;
const baseTitle = css`
  background-color: white;
  text-align: center;
  padding: 10px 0;
  border-radius: 10px;
`;
const baseContentContainer = css`
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
`;

const baseContentTitle = css`
  background-color: #ffebfe;
  width: 95%;
  margin: 10px auto;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//Todo
const TodoTitle = styled.div`
  ${baseTitle}
`;
const TodoContentContainer = styled.div`
  ${baseContentContainer}
  border-radius: 10px;
`;
const TodoContentTitle = styled.form`
  ${baseContentTitle}
  ${mobile({ flexDirection: "column", gap: "10px" })}
`;

const TodoInput = styled.input`
  margin-right: 40px;
  ${mobile({ maxWidth: "250px", marginRight: "0" })}
`;

const Todos = styled.div`
  background-color: #b4e4d6;
  padding: 10px;
  margin: 10px 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TodoContainer1 = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;
const TodoContainer2 = styled.div`
  display: flex;
  gap: 15px;
  margin-right: 15px;
`;

const Todo = styled.p`
  margin: auto 0;
`;

const bounceAnimation = keyframes`${bounce}`;

const TodoPokemon = styled.img`
  height: 60px;
  width: 60px;
  filter: ${(props) => (props.status === true ? "none" : "brightness(0)")};
`;

const CatchText = styled.p`
  display: ${(props) => (props.status === true ? "block" : "none")};
  width: 100%;
  animation: 2s ${bounceAnimation} ease-in;
`;

//Current Pokemon
const MyPokemon = styled.img`
  height: 300px;
  width: 300px;
  margin: 0 0 20px;
  ${mobile({ height: "200px", width: "200px" })}
`;

//Note
const NoteTitle = styled.div`
  ${baseTitle}
`;
const NoteContentContainer = styled.div`
  ${baseContentContainer}
  border-radius: 10px;
`;
const NoteContentTitle = styled.div`
  ${baseContentTitle}
  cursor: pointer;
`;

const NoteContent = styled.form`
  background-color: white;
  margin: 0 30px;
  display: ${(props) => (props.status === false ? "none" : "block")};
`;

const NoteInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
`;
const Textarea = styled.textarea`
  overflow-x: hidden;
  overflow-y: scroll;
  height: 250px;
  width: 100%;
  ${mobile({ height: "180px" })}
`;

const Text = styled.p``;
const Notes = styled.div`
  background-color: #b4e4d6;
  padding: 10px;
  margin: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Note = styled.p`
  margin: auto 0;
`;
const NoteBody = styled.p`
  display: ${(props) => (props.status === false ? "none" : "block")};
  margin: auto 0;
  ${mobile({ fontSize: ".75rem" })}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0 20px; ;
`;
const Button = styled.button``;
const NoteButton = styled.button`
  display: ${(props) => (props.status === false ? "none" : "block")};
`;

//Dex

const DexBackground = styled.div`
  background-image: url("https://wallpaperaccess.com/full/418495.jpg");
  background-position: center;
  background-repeat: repeat-y;
  background-size: auto;
  padding: 20px 15px;
  display: ${(props) => (props.status === "open" ? "block" : "none")};
`;

const DexContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1800px;
  margin: 0 auto;
  gap: 10px;
`;

const DexPokemonImages = styled.img`
  height: 100px;
  width: 100px;
  filter: ${(props) => (props.status ? "none" : "brightness(0)")};
  ${mobile({ height: "65px", width: "65px" })}
`;

const DexNumbers = styled.p`
  font-family: "PokemonFont";
  text-align: center;
`;

const TodoList = (props) => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteCount, setNoteCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [openNote, setOpenNote] = useState(false);
  const [current_id, setCurrent_id] = useState(false);
  const [catchPokemon, setCatchPokemon] = useState("");
  const [caughtPokemon, setCaughtPokemon] = useState("");
  const [pokemonNumber, setPokemonNumber] = useState();
  const [pokedex, setPokedex] = useState("closed");
  const [userPokemon, setUserPokemon] = useState({});
  const [userOwned, setUserOwned] = useState();
  const [noteError, setNoteError] = useState("");
  const [error, setError] = useState("");

  const baseURL = process.env.REACT_APP_API_URL;

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      username: "",
    },
    onSubmit: async (value, { resetForm }) => {
      try {
        await axios.post(
          baseURL + "notes",
          {
            title: value.title,
            content: value.content,
            username: props.user.username,
            date: new Date().toISOString().split("T")[0],
          },
          { headers: { "x-auth-token": props.user.token } }
        );
        resetForm();
        setNoteCount(noteCount + 1);
        setNoteError("");
      } catch (err) {
        setNoteError("Title cannot be Empty!!");
      }
    },
  });

  const handleCatchPokemon = async (e) => {
    setCatchPokemon(e.id);
    setPokemonNumber(e.number);
    setCaughtPokemon(props.options[e.number].value);
    setTimeout(async () => {
      await axios.delete(baseURL + "todo/" + e.id);
      setTodoCount(todoCount - 1);
    }, 4000);
  };

  const handleDeleteTodo = async (e) => {
    await axios.delete(baseURL + "todo/" + e);
    setTodoCount(todoCount - 1);
  };

  function handleOpenNote() {
    if (openNote === false) setOpenNote(true);
    if (openNote === true) setOpenNote(false);
  }

  function handleOpenContent(e) {
    if (current_id === e) setCurrent_id(null);
    if (current_id !== e) setCurrent_id(e);
  }

  function handleTodo(e) {
    setTodoText(e.target.value);
  }

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        baseURL + "todo",
        {
          content: todoText,
          username: props.user.username,
          date: new Date().toISOString().split("T")[0],
        },
        { headers: { "x-auth-token": props.user.token } }
      );
      setTodoText("");
      setError("");
      setTodoCount(todoCount + 1);
      console.log(result);
    } catch (err) {
      setError("Cannot be empty!!");
    }
  };

  const handleDeleteNote = async (e) => {
    await axios.delete(baseURL + "notes/" + e);
    setNoteCount(noteCount - 1);
  };

  const changingPokemon = async (e) => {
    if (userOwned.includes(e)) {
      setUserPokemon(e);
      await axios.put(baseURL + "users", {
        username: props.user.username,
        pokemon: e,
      });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    console.log(e);
  };

  function handlePokedexOpen() {
    if (pokedex === "closed") setPokedex("open");
    if (pokedex === "open") setPokedex("closed");
    console.log(pokedex);
  }

  useEffect(() => {
    const fetchNote = async () => {
      await axios.get(baseURL + "notes").then((res) => {
        const response = res.data;
        setNotes(response.filter((t) => t.username === props.user.username));
      });
    };
    fetchNote();
  }, [props.user.username, noteCount]);

  useEffect(() => {
    const fetchNote = async () => {
      await axios.get(baseURL + "todo").then((res) => {
        const response = res.data;
        setTodos(response.filter((t) => t.username === props.user.username));
      });
    };
    fetchNote();
  }, [props.user.username, todoCount]);

  useEffect(async () => {
    if (props.user.username !== "") {
      await axios.put(baseURL + "users", {
        username: props.user.username,
        owned: pokemonNumber + 1,
      });
    }
  }, [handleCatchPokemon]);

  useEffect(async () => {
    if (props.user.username !== "") {
      const result = await axios.get(baseURL + "users/" + props.user.userId);
      setUserOwned(result.data.owned);
      setUserPokemon(result.data.pokemon);
      console.log(userOwned);
      console.log(userPokemon);
    }
  }, [props.user.username, todoCount]);

  return (
    <React.Fragment>
      <Background>
        {userPokemon !== null ? (
          <MyPokemon src={props.images[userPokemon - 1]} />
        ) : null}
        <CardContainer>
          <Card>
            <TodoTitle>To-Do List</TodoTitle>
            <TodoContentContainer>
              {todos &&
                todos.map((todo) => {
                  return (
                    <Todos key={todo._id}>
                      <TodoContainer1>
                        <Todo>{todo.content}</Todo>
                        <TodoPokemon
                          status={catchPokemon === todo._id}
                          src={props.images[todo.number]}
                        />
                      </TodoContainer1>
                      <TodoContainer2>
                        <TbPokeball
                          style={{
                            fontSize: "2rem",
                            backgroundColor: "green",
                            color: "white",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleCatchPokemon({
                              id: todo._id,
                              number: todo.number,
                            })
                          }
                        />
                        <RiDeleteBin4Line
                          style={{
                            fontSize: "2rem",
                            backgroundColor: "red",
                            color: "white",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteTodo(todo._id)}
                        />
                      </TodoContainer2>
                      <CatchText
                        style={{ flexBasis: "100%" }}
                        status={catchPokemon === todo._id}
                      >
                        {caughtPokemon} was caught!
                      </CatchText>
                    </Todos>
                  );
                })}
              <TodoContentTitle>
                <TodoInput
                  type="text"
                  id="To-Do"
                  name="To-Do"
                  onChange={handleTodo}
                  value={todoText}
                />
                <Button
                  style={{
                    padding: "2px 10px",
                    backgroundColor: "#F75231",
                    border: "none",
                  }}
                  onClick={handleTodoSubmit}
                >
                  Add
                </Button>
              </TodoContentTitle>
              <text style={{ textAlign: "center", color: "red" }}>{error}</text>
            </TodoContentContainer>
          </Card>
          <Card>
            <NoteTitle>Notes</NoteTitle>
            <NoteContentContainer>
              {notes &&
                notes.map((note) => {
                  return (
                    <Notes
                      key={note._id}
                      onClick={() => handleOpenContent(note._id)}
                    >
                      <Note>{note.title}</Note>
                      <NoteBody status={note._id === current_id}>
                        {note.content}
                      </NoteBody>
                      <Note>{note.date}</Note>
                      <NoteButton
                        style={{
                          backgroundColor: "#FF73A5",
                          border: "none",
                          padding: "5px",
                          width: "40%",
                          margin: "0 auto",
                        }}
                        onClick={() => handleDeleteNote(note._id)}
                        status={note._id === current_id}
                      >
                        DELETE
                      </NoteButton>
                    </Notes>
                  );
                })}
              <NoteContentTitle onClick={handleOpenNote}>
                Add new note!
              </NoteContentTitle>
              <NoteContent onSubmit={formik.handleSubmit} status={openNote}>
                <Text>Title</Text>

                <NoteInput
                  value={formik.values.title}
                  name="title"
                  id="title"
                  type="text"
                  onChange={formik.handleChange}
                  error={formik.errors.username}
                />
                <Text
                  style={{
                    color: "red",
                    marginBottom: "10px",
                    marginTop: "-5px",
                  }}
                >
                  {noteError}
                </Text>
                <Text>Content</Text>
                <Textarea
                  value={formik.values.content}
                  name="content"
                  id="content"
                  type="content"
                  onChange={formik.handleChange}
                  error={formik.errors.content}
                />
                <ButtonContainer>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#F75231", border: "none" }}
                  >
                    ADD
                  </Button>
                  <Button
                    type="reset"
                    onClick={formik.resetForm}
                    style={{ backgroundColor: "#7BCE52", border: "none" }}
                  >
                    RESET
                  </Button>
                </ButtonContainer>
              </NoteContent>
            </NoteContentContainer>
          </Card>
        </CardContainer>
        <NoteContentTitle
          style={{
            maxWidth: "180px",
            backgroundColor: "#d82430",
            color: "white",
            fontWeight: "400",
            marginTop: "40px",
          }}
          onClick={handlePokedexOpen}
        >
          Pokedex
        </NoteContentTitle>
      </Background>

      <DexBackground status={pokedex}>
        <DexContainer>
          {props.images &&
            props.images.map((image, index) => {
              return (
                <div>
                  <DexPokemonImages
                    src={image}
                    status={
                      userOwned === undefined
                        ? null
                        : userOwned.includes(index + 1)
                    }
                    onClick={() => changingPokemon(index + 1)}
                  />
                  <DexNumbers>#{String(index + 1).padStart(3, "0")}</DexNumbers>
                </div>
              );
            })}
        </DexContainer>
      </DexBackground>
    </React.Fragment>
  );
};

export default TodoList;
