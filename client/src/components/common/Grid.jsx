import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`;

const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`).then(({ data }) => {
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      toast.success(data);
    }).catch(({ data }) => toast.error(data));
  };

  const handleEdit = (user) => {
    setOnEdit(user);
  };

  return (
    <Table>
      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th onlyWeb>Phone</Th>
          <Th></Th>
          <Th></Th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => (
          <tr key={user.id}>
            <Td width="30%">{user.name}</Td>
            <Td width="30%">{user.email}</Td>
            <Td width="20%" onlyWeb>{user.phone}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(user)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(user.id)}  />
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Grid;