import { Controller } from "@hotwired/stimulus"

import React from "react"
import ReactDOM from "react-dom/client"
import { GraphiQL, HISTORY_PLUGIN } from "graphiql"
import { createGraphiQLFetcher } from "@graphiql/toolkit"
import { explorerPlugin } from "@graphiql/plugin-explorer"
import "graphiql/setup-workers/esm.sh"

import { createConsumer } from "@rails/actioncable"
import * as ActionCable from "@rails/actioncable"
import * as graphqlRubyClient from "graphql-ruby-client"
import createActionCableFetcher from "graphql-ruby-client/subscriptions/createActionCableFetcher"


//import { ApolloClient, HttpLink, ApolloLink, InMemoryCache } from '@apollo/client';
//import * as apollo from '@apollo/client'

//import * as apollo from 'https://esm.sh/apollo-client@2.6.10/'

import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';


export default class extends Controller {
  async connect() {

    //console.log(apollo)

    //console.log(apollo.default)

    //console.log(apollo.ApolloClient)

    //console.log(apollo.HttpLink);
    //console.log(apollo.ApolloLink);
    //console.log(apollo.InMemoryCache)
    //console.log(InMemoryCache)


    this.element.textContent = "Hello World!"
    console.log("sandbox controller connected")

    const actionCable = createConsumer()

    const fetcher = createActionCableFetcher({
      consumer: actionCable,
      url: "/graphql",
    })

    const plugins = [HISTORY_PLUGIN, explorerPlugin()]

    function App() {
      return React.createElement(GraphiQL, {
        fetcher,
        plugins,
        defaultEditorToolsVisibility: true,
      })
    }

    const query = `
          query {
            location(id:1){
              name
              id
            }
          }
        `

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    }

    let res = await fetch("http://localhost:3000/graphql", options)
      .then((r) => r.json())
      .then((data) => console.log("data returned", data))


    //
    
    const subscription = `
          subscription($roomId: ID!){
            locationPosted(roomId: $roomId){
              
            }
          }`
  }
}
