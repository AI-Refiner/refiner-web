import React from "react";
import { Title, Box } from "./BaseStyles";
import styled from "styled-components";
const FormContainer = styled.div`
  width: 40%;
  margin: 0 auto;
  margin-top: 100px;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 0 5px darkgrey;
`;

const AccountForm = (props) => {
  return (
    <FormContainer>
      <Box width="90%" margin="0 auto 20px auto">
        <Title>Account Settings</Title>
      </Box>

      <Box
        border="1px solid whitesmoke"
        padding="20px"
        justify="space-between"
        display="flex"
        width="80%"
        border-radius="5px"
        margin="0 auto 20px auto"
      >
        <Box align-self="flex-start">Email</Box>
        <Box align-self="flex-end" color="rgb(255, 228, 126)">
          {props.user?.email}
        </Box>
      </Box>

      <Box
        border="1px solid whitesmoke"
        padding="20px"
        justify="space-between"
        display="flex"
        width="80%"
        borderRadius="5px"
        margin="0 auto"
      >
        <Box align-self="flex-start">Client ID</Box>
        <Box align-self="flex-end" color="rgb(255, 228, 126)">
          {props.user?.pk}
        </Box>
      </Box>
    </FormContainer>
  );
};

export default AccountForm;
