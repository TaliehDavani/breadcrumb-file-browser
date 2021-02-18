import * as React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  useRouteMatch,
  useParams
} from 'react-router-dom'

const topics = [
  {
    name: 'projects',
    id: 'projects',
    description: '',
    resources: [
      {
        name: 'mysupersecretproject',
        id: 'mysupersecretproject',
        description: "",
        resources: [{name:'mysupersecretfile',id:"mysupersecretfile", description: 'THIS IS FILE: mysupersecretfile'}
        ]
      }
      
    ]
  },
  {
    name: 'fileb.txt',
    id: 'fileb.txt',
    description: 'THIS IS FILE: fileb.txt',
    resources: [
      
    ]
  },
  {
    name: 'filea.txt',
    id: 'filea.txt',
    description: 'THIS IS FILE: filea.txt',
    resources: [
      
    ]
  }
]

function Home() {
  return (
    <div></div>
  )
}

function Resource() {
  const { topicId, subId } = useParams()
  const topic = topics.find(({ id }) => id === topicId)
    .resources.find(({ id }) => id === subId)
  return (
    <div>
      <p>{topic.resources.map((f)=>(f.description))}</p>
    </div>
  )
}


function TopicSub() {
  const { topicId } = useParams()
  const { url, path } = useRouteMatch()
  const topic = topics.find(({ id }) => id === topicId)
  return (
    <div>
      <ul>
        {topic.resources.map((sub) => (
          <li key={sub.id}>
            <Link to={`${url}/${sub.id}`}>{sub.resources.map((s)=>(s.name))}</Link>
          </li>
        ))}
      </ul>
      <hr style={{ marginBottom:'5px',marginTop:'5px' }}/>
       <Route path={`${path}/:subId`}>
        <Resource />
      </Route>
    </div>
  )
}


function Topic() {
  const { topicId } = useParams()
  const { url, path } = useRouteMatch()
  const topic = topics.find(({ id }) => id === topicId)
  return (
    <div>
     <p>{topic.description}</p>
      <ul>
        {topic.resources.map((sub) => (
          <li key={sub.id}>
            <Link to={`${url}/${sub.id}`}>{sub.name}</Link>
          </li>
        ))}
      </ul>
      <hr style={{ marginBottom:'5px',marginTop:'5px' }}/>
       <Route path={`${path}/:subId`}>
        <TopicSub />
      </Route>
    </div>
  )
}

function Topics() {
  const { url, path } = useRouteMatch()
  return (
    <div>
      <ul>
        {topics.map(({ name, id }) => (
          <li key={id}>
            <Link to={`${url}/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <hr style={{ marginBottom:'5px',marginTop:'5px' }}/>
      <Route path={`${path}/:topicId`}>
        <Topic />
      </Route>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div style={{ width: 1000, margin: '0 auto',padding:'20px' }}>
        <ul >
          <li><Link to='/home'>home</Link></li>
          <li><Link to='/home/myname'>myname</Link></li>
        </ul>
        <hr style={{ marginBottom:'5px',marginTop:'5px' }}/>
        <Route exact path='/home'>
          <Home />
        </Route>
        <Route path='/home/myname'>
          <Topics />
        </Route>
      </div>
    </Router>
  )
}
