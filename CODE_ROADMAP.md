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

All routing concerns within the Express.js app are handled in the file [rootRouter.js](server/src/routes/rootRouter.js) by an [express.Router() named rootRouter](server/src/routes/rootRouter.js#L11), which is the parent express.Router() for all other express.Router()'s.

### Server Side Fallback for Client Views:

[rootRouter](server/src/routes/rootRouter.js) uses [clientRouter](server/src/routes/clientRouter.js) to handle serving the [React app contained in index.html](client/public/index.html#L15) to the user. All HTTP requests are first matched against paths defined in the [clientRoutes array](server/src/routes/clientRouter.js#L7). If the URL path in a request matches one of the [clientRoutes](server/src/routes/clientRouter.js#L7), [index.html is served to the client](server/src/routes/clientRouter.js#L26-L28).

```javascript
clientRouter.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath())
})
```

Therefore, it is important to add all paths defined in your React Route components in App.js to the [clientRoutes array](server/src/routes/clientRouter.js#L7) so that the React app is served if the user makes an HTTP request to a path defined in a Route component.

### Routing for RESTful API Endpoints:

In addition to handling when to serve the [index.html](client/public/index.html) file, [rootRouter](server/src/routes/rootRouter.js#L11) also [uses a set of express.Router()'s that handle serving data from API endpoints](server/src/routes/rootRouter.js#L14-L20). express.Router()'s used for RESTful API endpoints are defined in the files contained within the folder [/server/src/routes/api/v1](/server/src/routes/api/v1).

### REST is achieved through the Fetch API

When navigating the code within a component, There is a process to find which API endpoint is being triggered by a given Fetch request. As an example, consider the Fetch request used by the [ProjectShow](client/src/components/layout/ProjectShow.js) component. For components that fetch data from the Express.js back-end, an asyncronous function within a useEffect hook is used to retrieve the data. These functions are defined in the client directory's [api folder](client/src/api).

- The useEffect hook in ProjectShow.js:

```javascript
useEffect(() => {
  getProject(id).then((projectData) => {
    prepForFrontEnd(projectData)
    setProject(projectData)
    setLoading(false)
  })
}, [id])
```

- [getProject(id)](client/src/api/getProject.js) defined in the client directory's [api folder](client/src/api):

```javascript
const getProject = async (id) => {
  try {
    const response = await fetch(`/api/v1/projects/${id}`)
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    const responseBody = await response.json()
    const project = responseBody.project
    return project
  } catch (error) {
    console.error(`Error in Fetch: ${error.message}`)
    throw error
  }
}
```

To find the endpoint for a request made within a React component, navigate to [server/src/routes/rootRouter.js](server/src/routes/rootRouter.js) and locate the Express.router() being used for the relative path used in the component's fetch request. In this case [/api/v1/projects](/api/v1/projects/) and a parameter of id (the project's id number in the database). This is a GET request (when no method is provided, Fetch requests default to GET). In [rootRouter.js](server/src/routes/rootRouter.js), you will find the following line:

[rootRouter.use("/api/v1/projects", projectsRouter)](server/src/routes/rootRouter.js#L16)

Which indicates the express.Router() named [projectsRouter](server/src/routes/api/v1/projectsRouter.js#L10) is being used to handle requests to "/api/v1/projects".

In rootRouter.js, check the imports to find which file defines the express.Router() named projectsRouter. You will find the import:

[import projectsRouter from "./api/v1/projectsRouter.js"](server/src/routes/rootRouter.js#L5)

Open the file that’s handling the request, in this case [server/src/routes/api/v1/projectsRouter.js](server/src/routes/api/v1/projectsRouter.js).

In projectsRouter.js locate the [endpoint which handles GET requests that take a parameter of id](server/src/routes/api/v1/projectsRouter.js#L53) as the [Fetch request would indicate](client/src/components/layout/ProjectShow.js#L52):

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
