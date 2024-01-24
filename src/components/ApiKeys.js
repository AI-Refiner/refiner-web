import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HTTP from "../HTTP";
import { Flex } from "../components/BaseStyles";
import { API_URL } from "../Constants";

const GenerateKeyContainer = styled.p`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 15px;
  margin-bottom: 20px;
  background-color: #44c3c30f;
`;

const GenerateButton = styled.button`
  background-color: #44c3c30f;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #ccc;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const GeneratedKey = styled.input`
  font-size: 12px;
  padding: 5px;
  border-radius: 4px;
  overflow: scroll;
  width: 95%;
  border: 1px solid #ccc;
  background-color: #333;
  color: white;
`;

const ApiKeys = (props) => {
  return (
    <GenerateKeyContainer>
      <h2>API Keys</h2>
      <p>
        {" "}
        Use the default key to use with the REST API. Use it as the header value
        of <b>x-api-key</b>
      </p>
      <br />
      {props.apiKey && (
        <GeneratedKey defaultValue={props.apiKey}></GeneratedKey>
      )}
      {!props.apiKey && (
        <GenerateButton disabled={props.loading} onClick={props.getApiKey}>
          {props.loading ? "Loading API Key" : "Show Default Key"}
        </GenerateButton>
      )}
    </GenerateKeyContainer>
  );
};

export default ApiKeys;
