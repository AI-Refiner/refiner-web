import React, { useEffect, useState } from "react";
import HTTP from "../HTTP";

const Loading = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    HTTP.interceptors.request.use((config) => {
      setLoading(true);
      return config;
    });

    HTTP.interceptors.response.use((config) => {
      setLoading(false);
      return config;
    });
  }, []);

  return <div>{children(loading)}</div>;
};

export default Loading;
