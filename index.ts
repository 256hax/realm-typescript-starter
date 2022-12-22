// Source: https://www.mongodb.com/docs/realm/sdk/node/quick-start/#std-label-node-client-quick-start
import Realm from 'realm';
import { v4 as uuidv4 } from 'uuid';

export const main = async () => {
  // ----------------------------------------
  //  Schema
  // ----------------------------------------
  interface TaskType {
    _id: string;
    name: string;
    status: string;
  }

  const TaskSchema = {
    name: "Task",
    properties: {
      _id: "string",
      name: "string",
      status: "string?",
      owner_id: "string?",
    },
    primaryKey: "_id",
  };

  // ----------------------------------------
  //  Open Realm
  // ----------------------------------------
  const realm = await Realm.open({
    path: "realm-files/myreal",
    schema: [TaskSchema],
  });

  // ----------------------------------------
  //  Write Data
  // ----------------------------------------
  console.log('\n--- Write Data ---');

  let task1, task2;
  const task1Uuid = uuidv4();
  const task2Uuid = uuidv4();

  console.log('task1Uuid =>', task1Uuid);
  console.log('task2Uuid =>', task2Uuid);

  realm.write(() => {
    task1 = realm.create<TaskType>("Task", {
      _id: task1Uuid,
      name: "Shopping",
      status: "Open",
    });

    task2 = realm.create<TaskType>("Task", {
      _id: task2Uuid,
      name: "Exercise",
      status: "Open",
    });
    console.log(`created two tasks: ${task1.name} & ${task2.name}`);

    /*
      Source: https://www.mongodb.com/docs/realm/sdk/node/quick-start/#modify-an-object
      --- Quote ---
      Modify an Object
      As with writes, any changes to a Realm object must occur within a Write transaction block. To modify an object, you update the object properties:

      In the following example, an application developer updates task1 from the 
      Create Realm Objects
      example above. The developer begins progress on the "go grocery shopping task" and sets task1 to "InProgress".

      realm.write(() => {
        task1.status = "InProgress";
      });
      --------------
    */
  });

  // ----------------------------------------
  //  Read Data
  // ----------------------------------------
  console.log('\n--- Read Data ---');

  // query realm for all instances of the "Task" type
  const tasks = realm.objects("Task");
  console.log(`The lists of tasks are: ${tasks.map((task: any) => task.name)}`);

  // filter for all tasks with a status of "Open"
  const openTasks = tasks.filtered("status = 'Open'");
  console.log(
    `The lists of open tasks are: ${openTasks.map(
      (openTask: any) => openTask.name
    )}`
  );

  // Sort tasks by name in ascending order
  const tasksByName = tasks.sorted("name");
  console.log(
    `The lists of tasks in alphabetical order are: ${tasksByName.map(
      (taskByName: any) => taskByName.name
    )}`
  );

  // ----------------------------------------
  //  Delete Data
  // ----------------------------------------
  realm.write(() => {
    const tasks = realm.objects("Task");
    const openTask1 = tasks.filtered("_id == $0", task1Uuid);
    realm.delete(openTask1);
    console.log('\n Delete the task from the realm:', task1Uuid);

    // Discard the reference.
    task1 = null;
  });
  
  // ----------------------------------------
  //  Close Realm
  // ----------------------------------------
  // Remember to close the realm
  realm.close();
};

main();