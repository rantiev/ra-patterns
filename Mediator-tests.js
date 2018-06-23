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
     changes are ${JSON.stringify(data)}`)
  },
  handleComponent3Changes2: data => {
    console.log(`Component 3 changed, component 4 sees the changes (second handler),
     changes are ${JSON.stringify(data)}`)
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
mediator.subscribe('component3changed', component4.handleComponent3Changes2)

const unsubscribe = mediator.subscribe('component3changed', component4.handleComponent3Changes)

unsubscribe()

const customObject = {
  oldSchool: true,
  publishOldSchoolChanges: function () {
    this.publish('oldSchoolChanges', 'arg1', 'arg2', 'arg3')
      .publish('oldSchoolChanges', 'arg4', 'arg5', 'arg6')
  },
  handleOldSchoolChanges: (arg1, arg2, arg3) => {
    console.log(`OldSchoolChanges handled and arguments 
      are ${arg1}, ${arg2}, ${arg3}`)
  },
  handleOldSchoolChanges2: (arg1, arg2, arg3) => {
    console.log(`OldSchoolChanges handled (second handler) and arguments
     are ${arg1}, ${arg2}, ${arg3}`)
  },
  isOldSchool: function () {
    return this.oldSchool
  },
}

function isOldSchool () {
  console.log('isOldschool', this.isOldSchool())
}

Mediator(customObject)

const unsubsribe2 = customObject.subscribe('oldSchoolChanges', customObject.handleOldSchoolChanges)
customObject.subscribe('oldSchoolChanges', customObject.handleOldSchoolChanges2)
unsubsribe2()

customObject.subscribe('oldSchoolChanges', isOldSchool.bind(customObject))

setTimeout(() => {
  component3.component3changed()
  customObject.publishOldSchoolChanges()
}, 1000)