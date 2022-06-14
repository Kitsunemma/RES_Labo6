# Answers

Reminder: answer the following questions [here](https://forms.gle/6SM7cu4cYhNsRvqX8).

## Task 1: design the application architecture and protocols

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | How can we represent the system in an **architecture diagram**, which gives information both about the Docker containers, the communication protocols and the commands? |
|          | _Insert your diagram here..._                                |
| Question | Who is going to **send UDP datagrams** and **when**?         |
|          | _The `Musician` application send an UDP datagram every second_. |
| Question | Who is going to **listen for UDP datagrams** and what should happen when a datagram is received? |
|          | _The `Auditor` application listen for UDP datagrams. When a UDP datagram is received, the data about active musicians should be updated so that they are up-to-date when a TCP client asks for it_. |
| Question | What **payload** should we put in the UDP datagrams?         |
|          | _The UDP diagram must contain the sound played and the UUID of the musician_. |
| Question | What **data structures** do we need in the UDP sender and receiver? When will we update these data structures? When will we query these data structures? |
|          | _The sender must save the sound that he plays and his UUID. The receiver must have a list of active musicians with their UUID, instrument and latest activity datetime._ |

## Task 2: implement a "musician" Node.js application

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | In a JavaScript program, if we have an object, how can we **serialize it in JSON**? |
|          | _By using the `JSON.stringify()` function._                  |
| Question | What is **npm**?                                             |
|          | _npm is the default package manager of the Node.js environment_. |
| Question | What is the `npm install` command?                           |
|          | _It is the command to install all dependencies described in the package.json file_ |
| Question | How can we use the `https://www.npmjs.com/` web site?        |
|          | _We can use this website to find all packages and their descriptions, dependencies, GitHub URLs..._ |
| Question | In JavaScript, how can we **generate a UUID** compliant with RFC4122? |
|          | _By using the `UUID` package_                                |
| Question | In Node.js, how can we execute a function on a **periodic** basis? |
|          | _By using the `setInterval()` function_                      |
| Question | In Node.js, how can we **emit UDP datagrams**?               |
|          | _By using the `send()` function of a socket created with the `createSocket()` function of the `dgram` module_ |
| Question | In Node.js, how can we **access the command line arguments**? |
|          | _By using the `process.argv` array (form third position in our case)_ |

## Task 3: package the "musician" app in a Docker image

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | How do we **define and build our own Docker image**?         |
|          | _To define a Docker image, we must write a Dockerfile file and to build the Docker image, we must run the command `docker build -t [imageName] [folderContainingDockerfile]`._ |
| Question | How can we use the `ENTRYPOINT` statement in our Dockerfile? |
|          | _We can use the `ENTRYPOINT` statement to define the command launched by the Docker container. Contrary to `CMD` statement, `ENTRYPOINT` allows to easily pass argument from `docker run` command to the container's command._ |
| Question | After building our Docker image, how do we use it to **run containers**? |
|          | _By using the command `docker run -d [imageName] [instrument]`_ |
| Question | How do we get the list of all **running containers**?        |
|          | _By using the command `docker ps`_.                          |
| Question | How do we **stop** and **kill** one running container?       |
|          | _By using the commands `docker stop [containerId]` and `docker kill [containerId]`_. |
| Question | How can we check that our running containers are effectively sending UDP datagrams? |
|          | _With a `Wireshark` capture_.                                |

## Task 4: implement an "auditor" Node.js application

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | With Node.js, how can we listen for UDP datagrams in a multicast group? |
|          | _By using the `addMembership([multicast-ip-address])` function of a socket created by `createSocket()` of the `dgram` module._ |
| Question | How can we use the `Map` built-in object introduced in ECMAScript 6 to implement a **dictionary**? |
|          | _We create it with `let dictionary = new Map();`, add a dictionary entry with `dictionary.set('one', 1)` and consult an entry with `dictionary.get('one') // returns 1` . _ |
| Question | How can we use the `Day.js` npm module to help us with **date manipulations** and formatting? |
|          | _This package allows to easily compute time differences between two dates, display a datetime using ISO format etc. The package's interface is easier to use than the default `Date` one._ |
| Question | When and how do we **get rid of inactive players**?          |
|          | _At the very least, when a TCP client asks for the musicians list. However we also clean the list when a musician sound is received to avoid accumulating too much data and having too much work when a TCP request is received._ |
| Question | How do I implement a **simple TCP server** in Node.js?       |
|          | _By using the `listen()` function of a server created with the `createServer()` function of the `net` module._ |

## Task 5: package the "auditor" app in a Docker image

| #        | Topic                                                        |
| -------- | ------------------------------------------------------------ |
| Question | How do we validate that the whole system works, once we have built our Docker image? |
|          | _By launching the validation script (and also by checking the container outputs with `docker logs`)._ |

## Constraints

Please be careful to adhere to the specifications in this document, and in particular

- the Docker image names
- the names of instruments and their sounds
- the TCP PORT number

Also, we have prepared two directories, where you should place your two `Dockerfile` with their dependent files.

### Validation

Have a look at the `validate.sh` script located in the top-level directory. This script automates part of the validation process for your implementation (it will gradually be expanded with additional operations and assertions). As soon as you start creating your Docker images (i.e. creating your Dockerfiles), you should **try to run it** to see if your implementation is correct. When you submit your project in the [Google Form](https://forms.gle/6SM7cu4cYhNsRvqX8), the script will be used for grading, together with other criteria.