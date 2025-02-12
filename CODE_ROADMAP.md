# Code Roadmap

## General design pattern (Model View Controller):

Project Builder is a React.js/ Express.js/ PostgreSQL monolith application. The PostgreSQL database is connected to Knex.js query builder. Objection.js is an ORM, built on top of Knex.js, used to build relational queries in Javascript and Model-level schema validations for database insertions.

### Models:

Objection Models are located in:  
[/server/src/models](/server/src/models)

### Views:

Views (React components) are located in:
[/client/src/components](/client/src/components)

### Controllers:

RESTful API Routes using Express Routers are located in:  
[/server/src/routes/api/v1](/server/src/routes/api/v1)

### Routing for view navigation:

Client-Side Views Navigation with React Router:
Routing for browser navigation within the React app is handled by a [React Router component](client/src/components/App.js#L46).

URL paths for top-level components are defined within React Route components.
For example [this code found in App.js](client/src/components/App.js#L49-L51) will cause the ProjectList component to be rendered at the base URL.
```javascript
<Route exact path={"/"}>
  <ProjectList projectsPerPage={projectsPerPage} user={currentUser} />
</Route>
```

### Server Side Fallback for Client Views:

URL paths defined in App.js should also be defined in the array named [clientRoutes](/server/src/routes/clientRouter.js#L7) in the file:  
[/server/src/routes/clientRouter.js](/server/src/routes/clientRouter.js).

### Routing for RESTful API Endpoints:

React components in Project Builder use the Fetch API to handle client-side HTTP requests to the Express.js server.
[rootRouter](server/src/routes/rootRouter.js#L12) defined in  
[server/src/routes/rootRouter.js](server/src/routes/rootRouter.js)

is the parent express.Router() for all other Express.js routers. It is used to organize and separate http routing concerns.

in [rootRouter.js](server/src/routes/rootRouter.js), the HTTP request path is first matched against the [clientRoutes](/server/src/routes/clientRouter.js#L7) see [Server Side Fallback for Client Views](#server-side-fallback-for-client-views) above.

## REST is achieved through the Fetch API making HTTP requests to Express.js API routes

REST
[/server/src/routes/api/v1](/server/src/routes/api/v1)

There is a process to find which API endpoint is being triggered by a given Fetch request. As an example, let’s consider the Fetch request used by the [getProject()](client/src/components/layout/ProjectShow.js#L49) function in the React component located in [client/src/components/layout/ProjectShow.js](client/src/components/layout/ProjectShow.js#L49):

```javascript
const getProject = async () => {
  try {
    const response = await fetch(`/api/v1/projects/${id}`)
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    const responseBody = await response.json()
    const project = responseBody.project
    if (project.userId === props.user?.id) {
      setShouldRedirect(true)
    }
    prepForFrontEnd(project)
    setProject(project)
  } catch (error) {
    console.log(error)
  }
}
```

Go to [server/src/routes/rootRouter.js](server/src/routes/rootRouter.js) and locate the Express router being used for the path in the request. In this case [/api/v1/projects](/api/v1/projects/) and a parameter of id (the project's id number in the database). in [rootRouter.js](server/src/routes/rootRouter.js), you will find the following line:

[rootRouter.use("/api/v1/projects", projectsRouter)](server/src/routes/rootRouter.js#L16)

Which indicates the Express router named projectsRouter is being used to handle the request.

In rootRouter.js, check the imports to find which file defines projectsRouter. You will find the import:

[import projectsRouter from "./api/v1/projectsRouter.js"](server/src/routes/rootRouter.js)

Open the file that’s handling the request. in this case: server/src/routes/api/v1/projectsRouter.js

In projectsRouter.js locate the endpoint which takes a parameter of “id” as the Fetch request would indicate:

```javascript
projectsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const project = await Project.query().findById(id)
    const serializedProject = await ProjectSerializer.getProjectShowPageDetails(project)
    return res.status(200).json({ project: serializedProject })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})
```

Transferring Backend State to the React Front End:

The purpose of the endpoint above which was triggered by the Fetch Request in ProjectShow.js is to
Query the database for the project whose id was in the Fetch Request
Gather relevant information from other tables and external API’s
Respond to the Fetch request with the serializedProject as JSON with a key of “project.”

React State:
