# Code Roadmap (Work in progress)

This roadmap has some links that highlight multiple lines of code. This feature may not work if viewing this file locally in your code editor. Be sure to view this file on github.com where this feature will work properly.

## General Design Pattern (Model View Controller):

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

### Routing for View Navigation:

#### Client-Side Views Navigation with React Router:

Routing for browser navigation within the React app is handled by a [React Router component](client/src/components/App.js#L46-L89) in [App.js](client/src/components/App.js).

URL paths for top-level React components are defined within React Route components.
For example [lines 49-51 in App.js](client/src/components/App.js#L49-L51) will cause the ProjectList component to be rendered at the base URL.

```javascript
<Route exact path={"/"}>
  <ProjectList projectsPerPage={projectsPerPage} user={currentUser} />
</Route>
```

## HTTP Routing within the Express.js Server

All routing concerns within the Express.js app are handled by an [express.Router() named rootRouter](server/src/routes/rootRouter.js#L11), which is the parent Express.Router() for all other express.Router()s.

### Server Side Fallback for Client Views:

rootRouter uses [clientRouter](server/src/routes/clientRouter.js) to handle serving the [React app contained in index.html](client/public/index.html#L15) to the user.  All HTTP requests are first matched against paths defined in [the clientRoutes array](server/src/routes/clientRouter.js#L7).  If the URL path in a request matches one of the [clientRoutes](server/src/routes/clientRouter.js#L7), [index.html is served to the client](server/src/routes/clientRouter.js#L26-L28).  

```javascript
clientRouter.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath())
})
```
Therefore, it is important to add all paths defined in your React Route components in App.js to the [clientRoutes array](server/src/routes/clientRouter.js#L7) so that the React app is served if the user makes an HTTP request to a path defined in a Route component.

### Routing for RESTful API Endpoints:

In addition to handling when to serve the [index.html](client/public/index.html) file, [rootRouter](server/src/routes/rootRouter.js#L11) also [uses express.Router()'s that handle serving data from API endpoints](server/src/routes/rootRouter.js#L14-L20).  

## REST is achieved through the Fetch API making HTTP requests to Express.js API routes

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
