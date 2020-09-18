# node-red-contrib-brewfather
A set of node-red nodes to simplify integration with the Brewfather API

# Getting started

## Install

To install the current live version, please use Node-RED's Palette Manager or issue following commands:
    $ cd ~/.node-red
    $ npm install node-red-contrib-brewfather

## brewfahter-api-request node

![node-red-contrib-brewfather CI](https://github.com/enorfelt/node-red-contrib-brewfather/workflows/node-red-contrib-brewfather%20CI/badge.svg?branch=master)

### Simple flow

Once installed, add a simple flow consisting of a trigger, a brewfather and a debug node all connected in order.  
Make sure that the trigger node injects on startup to trigger the Brewfahter node.  
Double click the brewfahter node to open it's settings.
1. Give the node a meaningful name like Get Batches
2. Enter User ID and API-Key obtained from the Brewfather app. [(Click here to read how to)](https://docs.brewfather.app/api#generate-api-key)
3. Select the action you would like to do. Select Get Batches
4. Select the batch status must have to be returned, e.g. Planning (Make sure you have some batches in Planning status)
5. Check the Complete checkbox to return all available data for the batch
6. Leave all other fields as is and click done
7. Deploy your changes and inspect the Debug messages
8. You should now see a msg.payload containing a list of objects containing Brewfather batch data

### Configuration

| Setting           | Description                                                                  |
| ----------------- | -----------------------------------------------------------------------------|
| `Name`            | What ever you name the node                                                  |
| `User ID`         | The user id obtained from the Brewfather app                                 |
| `API-Key`         | The password for using the Brewfahter API obtained from Brewfahter app       |
| `Action`          | Select what data you would like to get or modify                             |
| `Status`          | Related to get batches and update batch. Filter or update status             |
| `Complete`        | Gets all the data associated with a resource in Brewfahter                   |
| `Included fields` | A list of json paths to include in the response e.g. recipe.notes            |
| `Offset`          | Amount of documents to skip                                                  |
| `Limit`           | Amount of documents to fetch. Defaults to 10. Max 50                         |
| `Id`              | Related to get single resouce. Select from where to get the Id               |
| `Existing`        | Related to inventory operations. Only return inventory that have amount > 0  |
| `Adjust`          | Related to inventory update operations. Adjust the inventory by +/- amount   |
| `Amount`          | Related to inventory update operations. Sets the inventory to entered amount |

# Contributing

1. Fork this repo
2. Write a red unit test for your change
3. Implement the code and make the test green
4. Refactor your code to make it nice
5. Make a pull request

I will probably approve it ;)
