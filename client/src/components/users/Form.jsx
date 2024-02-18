import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;  
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.name.value = onEdit.name;
      user.email.value = onEdit.email;
      user.phone.value = onEdit.phone;
      user.dob.value = onEdit.dob;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;
    if (!user.name.value || !user.email.value || !user.phone.value || !user.dob.value) {
      return toast.warn("Fill up all the required fields");
    }

    if (onEdit) {
      await axios.put(`http://localhost:8000/users/${onEdit.id}`, {
        name: user.name.value,
        email: user.email.value,
        phone: user.phone.value,
        dob: user.dob.value
      }).then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));
    } else {
      await axios.post("http://localhost:8000/users", {
        name: user.name.value,
        email: user.email.value,
        phone: user.phone.value,
        dob: user.dob.value
      }).then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));
    }

    user.name.value = "";
    user.email.value = "";
    user.phone.value = "";
    user.dob.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <label>Name</label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <label>E-mail</label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <label>Phone</label>
        <Input name="phone" />
      </InputArea>
      <InputArea>
        <label>Date of Birth</label>
        <Input name="dob" type="date" />
      </InputArea>
      <Button type="submit">Save</Button>
    </FormContainer>
  )
}

export default Form;