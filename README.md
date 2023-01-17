# TOOLS TO DISMANTLE THE MASTER’S HOUSE? (Workshop 7)

A workshop hosted by James Bryan Graves & Kees van Drongelen 16—20 JANUARY 2023

This repository contains code examples & resources used during the course of the workshop.

## Goals

Each student will make a virtual space (metaspace) in Roblox, which can visited by other students.

We will create a mechanism to collect "labor" into a virtual "currency".

The currency will be stored in a centeral server.

Students will then spend the currency in the virtual spaces.

## Roblox

Create an account at roblox.com

Download Roblox Studio, at roblox.com/create

Open Roblox Studio, and create a template world, and make it your own.  I would recommend using online resources like YouTube, to assist in helping you to do what you need (scaling, importing objects, etc.).

## Server

Can be run by installing [Nodejs](https://nodejs.org/en/)

and running the server code in this repository as follows:

```
$ npm install
```

```
$ node index.js
```

## Contents

### history.md

This is the presentation file for the introduction to JBG & the topic of the workshop.

### server

This is a nodejs server used as a central "bank" for the client teams as well as the IoT team.

### client

This is an example Roblox client script, or ServerScriptService, to communicate the fore mentioned nodejs server.

