# Realm x TypeScript Starter
Realm x TypeScript x Node.js minimal starter template.

## Source
[Realm Node.js SDK](https://www.mongodb.com/docs/realm/sdk/node/)

## Setup
```
% npm -g i ts-node
```

## Run
```
% npm i
% ts-node index.ts
```

Terminal log:
```
--- Write Data ---
task1Uuid => 6965e12f-cb6d-47b0-8de4-dccd43fe4b11
task2Uuid => 8f52884e-bec4-45f2-8dec-c4bda5d978e5
created two tasks: Shopping & Exercise

--- Read Data ---
The lists of tasks are: Shopping,Exercise
The lists of open tasks are: Shopping,Exercise
The lists of tasks in alphabetical order are: Exercise,Shopping

 Delete the task from the realm: 6965e12f-cb6d-47b0-8de4-dccd43fe4b11
```