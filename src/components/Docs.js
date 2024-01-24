import React, { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
import ApiKeyGenerator from "../components/ApiKeys";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { Flex, Box, Title, Spinner } from "../components/BaseStyles";
import HTTP from "../HTTP";
import { API_HOST, API_URL } from "../Constants";

const DocumentationContainer = styled.div`
  display: flex;
  height: 85vh;
  width: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 20px;
  }
`;

const TocsColumn = styled.div`
  top: 0px;
  padding: 20px;
  font-size: 12px;
  position: fixed;
  width: 19%;
  margin-top: 70px;
`;

const DocsColumn = styled.div`
  width: 80%;
`;

const EndpointSection = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  text-wrap: wrap;
`;

const EndpontTOC = styled.div`
  margin-bottom: 20px;
  font-size: 12px;
  transition: opacity 0.5s ease-in-out;
  opacity: 1;

  & > div:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: ${(props) => props.padding || "auto"};
  width: 100%;

  & > pre {
    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
  }
`;

const FieldName = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const CopyButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
`;

const MethodDiv = styled.div`
  color: rgb(255, 228, 126);
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: bold;
  padding: 5px 5px;
  margin-right: 10px;
  min-width: 32px;
`;

const SectionTitleSpan = styled.span`
  color: white;
  border: none;
  padding: 5px 5px;
  border-radius: 4px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
`;

const HeadersValueDiv = styled.div`
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 12px;
  background-color: #333;
`;

const BodyDiv = styled.div`
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
  background-color: #333;
  width: 100%;
`;

const WelcomeMessage = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  background-color: #44c3c30f;

  & > p > a {
    color: rgb(255, 228, 126);
    text-decoration: none;
  }
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: lightgray;
`;

const Docs = (props) => {
  const [endpoints, setEndpoints] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [refs, setRefs] = useState([]);

  const handleClick = (id) => {
    // if (refs[id.name] === undefined) window.scrollTo(0, 0);
    refs[id].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    getDocs();
  }, []);

  // set refs when endpoints are loaded
  useEffect(() => {
    if (endpoints && endpoints.item && endpoints.item.length) {
      const refs = endpoints.item.reduce((acc, value) => {
        acc[value.name] = React.createRef();
        return acc;
      }, endpoints.item[0]);
      setRefs(refs);
    }
  }, [endpoints]);

  const getDocs = async () => {
    const response = await HTTP.get(`${API_URL}/docs`);
    setEndpoints(response.data);
  };

  const getApiKey = async () => {
    const pk = JSON.parse(localStorage.getItem("user")).pk;
    const response = await HTTP.get(`${API_URL}/users/${pk}/apiKey`);
    const key = response.data.apiKey;
    setApiKey(key);
  };

  // const notify = (message) => toast(message);

  // const handleCopy = (value) => {
  //   navigator.clipboard
  //     .writeText(value)
  //     .then(() => {
  //       console.log("Copied to clipboard:", value);
  //       notify("Copied to clipboard");
  //     })
  //     .catch((error) => {
  //       console.error("Error copying to clipboard:", error);
  //       notify("Error copying to clipboard");
  //     });
  // };

  return (
    <DocumentationContainer>
      {props.loading ? (
        <Box
          position="absolute"
          maxWidth="-webkit-fill-available"
          width="100%"
          height="100%"
          display="flex"
          align="center"
          justify="center"
          backgroundColor="rgba(44,44,44, .9)"
          zIndex="2"
          top="70px"
        >
          <Flex align="center" justify="flex-start" margin="0 40px">
            <Box margin="0 10px 0 0">Loading</Box>
            <Box margin="0.5px 0 0 0">
              <Spinner size="8px" />
            </Box>
          </Flex>
        </Box>
      ) : null}
      <>
        <Flex direction="column" width="30%">
          <TocsColumn>
            <WelcomeMessage>
              <ReactMarkdown>
                {endpoints &&
                  endpoints.info &&
                  endpoints.info.description &&
                  endpoints.info.description}
              </ReactMarkdown>
            </WelcomeMessage>
            <ApiKeyGenerator {...props} getApiKey={getApiKey} apiKey={apiKey} />
            <EndpointSection>
              <Title>BASE URL</Title>
              <FieldContainer padding="0 0 0 5px">
                <pre>{API_HOST}/prod</pre>
              </FieldContainer>
            </EndpointSection>
            <EndpontTOC>
              {endpoints && endpoints.item && endpoints.item.length
                ? endpoints.item.map((endpoint) => {
                    return (
                      <div
                        key={endpoint.name + "-toc"}
                        onClick={() => handleClick(endpoint.name)}
                      >
                        <Flex margin="0 0 10px 0">
                          <MethodDiv fontSize="12px">
                            {endpoint.request.method}
                          </MethodDiv>
                          <Title fontSize="12px">{endpoint.name}</Title>
                        </Flex>
                      </div>
                    );
                  })
                : null}
            </EndpontTOC>
          </TocsColumn>
        </Flex>

        <DocsColumn>
          {endpoints && endpoints.item && endpoints.item.length
            ? endpoints.item.map((endpoint) => {
                return (
                  <EndpointSection
                    id={endpoint.name}
                    key={endpoint.name}
                    ref={refs[endpoint.name]}
                  >
                    <Flex margin="0 0 10px 0">
                      <MethodDiv>{endpoint.request.method}</MethodDiv>
                      <Title>{endpoint.name}</Title>
                    </Flex>

                    {endpoint.request.url && endpoint.request.url.raw ? (
                      <FieldContainer>
                        <pre>{endpoint.request.url.raw}</pre>
                      </FieldContainer>
                    ) : null}

                    <FieldContainer>
                      <SectionTitleSpan>HEADERS</SectionTitleSpan>
                    </FieldContainer>

                    <FieldContainer>
                      {endpoint.request.header.map((header, i) => (
                        <HeadersValueDiv key={i}>
                          {header.key}: {header.value}
                        </HeadersValueDiv>
                      ))}
                    </FieldContainer>

                    <FieldContainer>
                      <SectionTitleSpan>BODY</SectionTitleSpan>
                    </FieldContainer>

                    {endpoint.request.body && endpoint.request.body.raw ? (
                      <FieldContainer>
                        <BodyDiv>
                          <pre>{endpoint.request.body.raw}</pre>
                        </BodyDiv>
                      </FieldContainer>
                    ) : null}
                  </EndpointSection>
                );
              })
            : null}
        </DocsColumn>
      </>
    </DocumentationContainer>
  );
};

export default Docs;
