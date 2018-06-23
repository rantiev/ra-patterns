import Mediator from './Mediator.js'

const mediator = new Mediator()
const component1 = {
  handleComponent3Changes: data => {
    console.log(`Component 3 changed, component 1 sees the changes,
     changes are ${JSON.stringify(data)}`)
  }
}

const component2 = {
  handleComponent3Changes: data => {
    console.log(`Component 3 changed, component 2 sees the changes,
     changes are  ${JSON.stringify(data)}`)
  }
}

const component4 = {
  handleComponent3Changes: data => {
    console.log(`Component 3 changed, component 4 sees the changes,
     changes are  ${JSON.stringify(data)}`)
  }
}

const component3 = {
  component3changed: () => {
    mediator.publish('component3changed', {
      change1: 'change 1',
      change2: 'change 2',
    })
  }
}

mediator.subscribe('component3changed', component1.handleComponent3Changes)
mediator.subscribe('component3changed', component2.handleComponent3Changes)

const unsubscribe = mediator.subscribe('component3changed', component4.handleComponent3Changes)
unsubscribe()

setTimeout(component3.component3changed, 1000)