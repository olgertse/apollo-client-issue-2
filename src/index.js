import React from "react";
import { render } from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { link } from "./graphql/link";
import App from "./App";

import "./index.css";

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      ComputerType: {
        fields: {
          cpu: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
    },
  }),
  link
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
