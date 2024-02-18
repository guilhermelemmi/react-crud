import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import GlobalStyle from "../styles/global";
import { ToastContainer, toast } from "react-toastify";
import UserForm from '../components/users/Form';
import Grid from "../components/common/Grid";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/users");
      setUsers(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (err) {
      toast.error(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <h2>Users</h2>
        <UserForm onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
