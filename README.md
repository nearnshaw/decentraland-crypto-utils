# decentraland-crypto-utils

This library includes a number of helpful pre-built tools that include components, methods, and systems. They offer simple solutions to common scenarios that you're likely to run into.

- [Avatar](#Avatar)
	- [Get user information](#get-user-information)
	- [Get user inventory](#get-user-inventory)
	- [Do user has an item](#do-user-has-an-item)
	- [Do user has one of those items](#do-user-has-one-of-those-items)
- [ERC20](#ERC20)
	- [Send ERC20](#send-ERC20)
	- [Send MANA](#send-MANA)
	- [Get allowance](#get-allowance)
	- [Set approval](#set-approval)
- [ERC721](#ERC721)
	- [Transfer ERC721](#transfer-ERC721)
	- [Get allowance](#get-allowance)
	- [Set approval](#set-approval-for-all)
- [Marketplace](#Marketplace)
	- [Search](#search)
	- [Create order](#create-order)
	- [Execute order](#execute-order)
	- [Cancel order](#cancel-order)
	- [Authorizations](#authorization)
- [Third Parties](#Third-Parties)
	- [Kyberswap](#Kyberswap)
		- [Retrieve currencies](#retrieve-currencies)
		- [Retrieve  a currency](#retrieve-a-currency)
		- [Get pairs](#get-pairs)
		- [Get quote](#get-quote)
		- [Get rate](#get-rate)
		- [Exchange](#exchange)

## Using the Crypto library

To use any of the helpers provided by the utils library

1. Install it as an `npm` package. Run this command in your scene's project folder:

```
npm install https://github.com/HPrivakos/decentraland-crypto-utils.git
```

2. Import the library into the scene's script. Add this line at the start of your `game.ts` file, or any other TypeScript files that require it:

```ts
import crypto from '../node_modules/decentraland-crypto-utils/index'
```

3. In your TypeScript file, write `crypto.` and let the suggestions of your IDE show the available helpers.

## Avatar

### Get user information

To get information about an user, use the `getUserInfo` function.

`getUserInfo` has one optional argument:

- `address`: `string` which is the ETH address of an user

If an address is not specified, the function will use the address of the user

This example retrieves to data of an address and print the username in the console:

```ts
import avatar from '../node_modules/decentraland-crypto-utils/avatar/index'

avatar
  .getUserInfo('0x521b0fef9cdcf250abaf8e7bc798cbe13fa98692')
  .then(userInfo => {
    log(userInfo.metadata.avatars[0].name)
  })
```

### Get user inventory

To get information about an user, use the `getUserInventory` function.

`getUserInventory` has one optional argument:

- `address`: `string` which is the ETH address of an user

If an address is not specified, the function will use the address of the user

This example retrieves to data of an address and print a list of items in the console:

```ts
import avatar from '../node_modules/decentraland-crypto-utils/avatar/index'

avatar
  .getUserInventory('0x521b0fef9cdcf250abaf8e7bc798cbe13fa98692')
  .then(inventory => {
    log(inventory)
  })
```

### Do user has an item

To check the inventory of an user, use the `itemInInventory` function.

`itemInInventory` has one required argument:

- `wearable`: `string` which is the name of a wearable (e.g.: `dcl://dcl_launch/razor_blade_upper_body`)

and one optional argument:
- `equiped`: `boolean` if true, the item has to be equiped (default: false)

This example check if the user has the Razor Blade Jacket equiped:

```ts
import avatar from '../node_modules/decentraland-crypto-utils/avatar/index'

avatar
  .itemInInventory('dcl://dcl_launch/razor_blade_upper_body', true)
  .then(isItemEquiped => {
    if(isItemEquiped) log("The Razor Blade jacket is equiped")
    else log("This item is not equiped equiped")
  })
```

### Do user has one of those items

To check the inventory of an user, use the `itemsInInventory` function.

`itemsInInventory` has one required argument:

- `wearables`: `string` which is the name of a wearable (e.g.: `dcl://dcl_launch/razor_blade_upper_body`)

and one optional argument:
- `equiped`: `boolean` if true, the item has to be equiped (default: false)

This example check if the user has the Razor Blade Jacket equiped:

```ts
import avatar from '../node_modules/decentraland-crypto-utils/avatar/index'

avatar
  .itemInInventory('dcl://dcl_launch/razor_blade_upper_body', true)
  .then(isItemEquiped => {
    if(isItemEquiped) log("The Razor Blade jacket is equiped")
    else log("This item is not equiped equiped")
  })
```

### Rotate an entity

To rotate an entity over a period of time, from one direction to another, use the `rotateTransformComponent` component, which works very similarly to the `MoveTransformComponent` component.

`rotateTransformComponent` has three required arguments:

- `start`: `Quaternion` for the start rotation
- `end`: `Quaternion` for the end rotation
- `duration`: duration (in seconds) of the rotation

This example rotates an entity from one rotation to another over 2 seconds:

```ts
import utils from '../node_modules/decentraland-ecs-utils/index'

// Create entity
const box = new Entity()

// Give entity a shape and transform
box.addComponent(new BoxShape())
box.addComponent(new Transform())

//Define start and end directions
let StartRot = Quaternion.Euler(90, 0, 0)
let EndRot = Quaternion.Euler(270, 0, 0)

// Rotate entity
box.addComponent(new utils.RotateTransformComponent(StartRot, EndRot, 2))

// Add entity to engine
engine.addEntity(box)
```

### Sustain rotation

To rotates an entity continuously, use `KeepRotatingComponent`. The entity will keep rotating forever until it's explicitly stopped or the component is removed.

`KeepRotatingComponent` has one required argument:

- `rotationVelocity`: A quaternion describing the desired rotation to perform each second second. For example `Quaternion.Euler(0, 45, 0)` rotates the entity on the Y axis at a speed of 45 degrees per second, meaning that it makes a full turn every 8 seconds.

The component also contains the following method:

- `stop()`: stops rotation and removes the component from any entities its added to.

In the following example, a cube rotates continuously until clicked:

```ts
import utils from '../node_modules/decentraland-ecs-utils/index'

// Create entity
const box = new Entity()

// Give entity a shape and transform
box.addComponent(new BoxShape())
box.addComponent(new Transform({ position: new Vector3(1, 1, 1) }))

// Rotate entity
box.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 45, 0)))

// Listen for click
box.addComponent(
  new OnClick(() => {
    box.getComponent(utils.KeepRotatingComponent).stop()
  })
)

// Add entity to engine
engine.addEntity(box)
```

### Change scale

To adjust the scale of an entity over a period of time, from one size to another, use the `ScaleTransformComponent` component, which works very similarly to the `MoveTransformComponent` component.

`ScaleTransformComponent` has three required arguments:

- `start`: `Vector3` for the start scale
- `end`: `Vector3` for the end scale
- `duration`: duration (in seconds) of the scaling

This example scales an entity from one size to another over 2 seconds:

```ts
import utils from '../node_modules/decentraland-ecs-utils/index'

// Create entity
const box = new Entity()

// Give entity a shape and transform
box.addComponent(new BoxShape())
box.addComponent(new Transform())

//Define start and end positions
let StartSize = new Vector3(1, 1, 1)
let EndSize = new Vector3(0.75, 2, 0.75)

// Move entity
box.addComponent(new utils.ScaleTransformComponent(StartSize, EndSize, 2))

// Add entity to engine
engine.addEntity(box)
```

### Non-linear changes

All of the translation components, the `MoveTransformComponent`, `rotateTransformComponent`, `ScaleTransformComponent`, and `FollowPathComponent` have an optional argument to set the rate of change. By default, the movement, rotation, or scaling occurs at a linear rate, but this can be set to other options.

The following values are accepted:

- `Interpolation.LINEAR`
- `Interpolation.EASEINQUAD`
- `Interpolation.EASEOUTQUAD`
- `Interpolation.EASEQUAD`

The following example moves a box following an ease-in rate:

```ts
box.addComponent(
  new utils.MoveTransformComponent(
    StartPos,
    EndPos,
    2,
    null,
    utils.InterpolationType.EASEINQUAD
  )
)
```

### Callback on finish

All of the translation components, the `MoveTransformComponent`, `rotateTransformComponent`, `ScaleTransformComponent`, and `FollowPathComponent` have an optional argument that executes a function when the translation is complete.

- `onFinishCallback`: function to execute when movement is done.

The following example logs a message when the box finishes its movement. The example uses `MoveTransformComponent`, but the same applies to `rotateTransformComponent` and `ScaleTransformComponent`.

```ts
box.addComponent(
  new utils.MoveTransformComponent(StartPos, EndPos, 2, () => {
    log('finished moving box')
  })
)
```

The `FollowPathComponent` has a two optional arguments that execute functions when a section of the path is complete and when the whole path is complete.

- `onFinishCallback`: function to execute when movement is complete.

- `onPointReachedCallback`: function to execute when each section of the path is done.

The following example logs a messages when the box finishes each segment of the path, and another when the entire path is done.

```ts
box.addComponent(
  new utils.FollowPathComponent(
    path,
    2,
    () => {
      log('finished moving box')
    },
    () => {
      log('finished a segment of the path')
    }
  )
)
```

## Toggle

Use the `ToggleComponent` to switch an entity between two possible states, running a same function on every transition.

The `ToggleComponent` has the following arguments:

- `startingState`: Starting state of the toggle (ON or OFF)
- `onValueChangedCallback`: Function to call every time the toggle state changed.

It exposes three methods:

- `toggle()`: switches the state of the component between ON and OFF
- `isOn()`: reads the current state of the component, without altering it. It returns a boolean, where `true` means ON.
- `setCallback()`: allows you to change the function to be executed by `onValueChangedCallback`, for the next time it's toggled.

The following example switches the color of a box between two colors each time it's clicked.

```ts
import utils from '../node_modules/decentraland-ecs-utils/index'

// Create entity
const box = new Entity()

// Give entity a shape and transform
box.addComponent(new BoxShape())
box.addComponent(new Transform())

//Define two different materials
let greenMaterial = new Material()
greenMaterial.albedoColor = Color3.Green()
let redMaterial = new Material()
redMaterial.albedoColor = Color3.Red()

// Add a Toggle component
box.addComponent(
  new utils.ToggleComponent(utils.ToggleState.Off, value => {
    if (value == utils.ToggleState.On) {
      //set color to green
      box.addComponentOrReplace(greenMaterial)
    } else {
      //set color to red
      box.addComponentOrReplace(redMaterial)
    }
  })
)

//listen for click on the box and toggle it's state
box.addComponent(
  new OnClick(event => {
    box.getComponent(utils.ToggleComponent).toggle()
  })
)

// Add entity to engine
engine.addEntity(box)
```

### Combine Toggle with Translate

This example combines a toggle component with a move component to switch an entity between two positions every time it's clicked.

```ts
import utils from '../node_modules/decentraland-ecs-utils/index'

// Create entity
const box = new Entity()

// Give entity a shape and transform
box.addComponent(new BoxShape())
box.addComponent(new Transform())

//Define two positions for toggling
let Pos1 = new Vector3(1, 1, 1)
let Pos2 = new Vector3(1, 1, 2)

//toggle for wine bottle
box.addComponent(
  new utils.ToggleComponent(utils.ToggleState.Off, value => {
    if (value == utils.ToggleState.On) {
      box.addComponentOrReplace(
        new utils.MoveTransformComponent(Pos1, Pos2, 0.5)
      )
    } else {
      box.addComponentOrReplace(
        new utils.MoveTransformComponent(Pos2, Pos1, 0.5)
      )
    }
  })
)

//listen for click on the box and toggle it's state
box.addComponent(
  new OnClick(event => {
    box.getComponent(utils.ToggleComponent).toggle()
  })
)

// Add entity to engine
engine.addEntity(box)
```

## Time

These tools are all related to the passage of time in the scene.

### Delay a function

Add a `Delay` component to an entity to execute a function only after an `n` amount of milliseconds.

This example creates an entity that only becomes visible in the scene after 100000 milliseconds (100 seconds) have passed.

```ts
import utils from '../node_modules/decentraland-ecs-utils/index'

// create entity
const easterEgg = new Entity()

// give entity a shape and set invisible
const easterEggShape = new BoxShape()
easterEggShape.visible = false
easterEgg.addComponent(easterEggShape)

// add a delayed function
easterEgg.addComponent(
  new utils.Delay(100000, () => {
    easterEgg.getComponent(BoxShape).visible = true
  })
)

// add entity to scene
engine.addEntity(easterEgg)
```

To delay the execution of a task that isn't directly tied to any entity in the scene, create a dummy entity that only holds a `Delay` component.

### Delay removing an entity

Add an `ExpireIn` component to an entity to remove it from the scene after an `n` amount of milliseconds.

This example creates an entity that is removed from the scene 500 milliseconds after it's clicked.

```ts
import utils from '../node_modules/decentraland-ecs-utils/index'

// create entity
const box = new Entity()

// give entity a shape
box.addComponent(new BoxShape())

// add a function to run when clicked
box.addComponent(
  new OnClick(() => {
    box.addComponent(new utils.ExpireIn(500))
  })
)

// add entity to scene
engine.addEntity(box)
```

### Repeat at an Interval

Add an `Interval` component to an entity to make it execute a same function every `n` milliseconds.

This example creates an entity that changes its scale to a random size every 500 milliseconds.

```ts
import utils from '../node_modules/decentraland-ecs-utils/index'

// create entity
const box = new Entity()

// give entity a shape and transform
box.addComponent(new BoxShape())
box.addComponent(new Transform())

// add a repeated function
box.addComponent(
  new utils.Interval(500, () => {
    let randomSize = Math.random()
    box.getComponent(Transform).scale.setAll(randomSize)
  })
)

// add entity to scene
engine.addEntity(box)
```

To repeat the execution of a task that isn't directly tied to any entity in the scene, create a dummy entity that only holds an `Interval` component.

## Triggers

The trigger component can execute whatever you want whenever the player's position or the position of a specific entity or type of entity overlaps with an area.

The `TriggerComponent` has the following arguments:

- `shape`: Shape of the triggering collider area, either a cube or a sphere (`TriggerBoxShape` or `TriggerSphereShape`)
- `layer`: Layer of the Trigger, useful to discriminate between trigger events. You can set multiple layers by using a `|` symbol.
- `triggeredByLayer`: Against which layers to check collisions
- `onTriggerEnter`: Callback when an entity of a valid layer enters the trigger area
- `onTriggerExit`: Callback function for when an entity of a valid layer leaves the trigger area
- `onCameraEnter`: Callback function for when the player enters the trigger area
- `onCameraExit`: Callback function for when the player leaves the trigger area
- `enableDebug`: When true, makes the trigger area visible for debug purposes.

The following example creates a trigger that changes its position randomly when triggered by the player.

```ts
import utils from '../node_modules/decentraland-ecs-utils/index'

//create entity
const box = new Entity()

//create shape for entity and disable its collision
box.addComponent(new BoxShape())
box.getComponent(BoxShape).withCollisions = false

//set transform component with initial position
box.addComponent(new Transform({ position: new Vector3(2, 0, 2) }))

// create trigger area object, setting size and relative position
let triggerBox = new utils.TriggerBoxShape(Vector3.One(), Vector3.Zero())

//create trigger for entity
box.addComponent(
  new utils.TriggerComponent(
    triggerBox, //shape
    0, //layer
    0, //triggeredByLayer
    null, //onTriggerEnter
    null, //onTriggerExit
    () => {
      //onCameraEnter
      log('triggered!')
      box.getComponent(Transform).position = new Vector3(
        1 + Math.random() * 14,
        0,
        1 + Math.random() * 14
      )
    },
    null //onCameraExit
  )
)

//add entity to engine
engine.addEntity(box)
```

> Note: The trigger shape can be positioned or stretched, but it can't be rotated on any axis. This is a design decision taken for performance reasons. To cover a slanted area, we recommend adding multiple triggers if applicable.

### Dissable a collision component

`TriggerComponent` components have an `enabled` property, which is set to `true` by default when creating it. You can use this property to disable the behavior of the component without removing it.

```TypeScript
box.getComponent(utils.TriggerComponent).enabled = false
```

### Set a custom shape for player

You can optionally configure a custom shape and size for the player's trigger area, according to your needs:

```ts
utils.TriggerSystem.instance.setCameraTriggerShape(
  new utils.TriggerBoxShape(
    new Vector3(0.5, 1.8, 0.5),
    new Vector3(0, -0.91, 0)
  )
)
```

### Trigger layers

You can define different layers (bitwise) for triggers, and set which other layers can trigger it.

The following example creates a scene that has:

- food (cones)
- mice (spheres)
- cats (boxes)

Food is triggered (or eaten) by both cats or mice. Also, mice are eaten by cats, so a mouse's trigger area is triggered by only cats.

Cats and mice always move towards the food. When food or mice are eaten, they respawn in a random location.

```ts
import utils from '../node_modules/decentraland-ecs-utils/index'

//define layers
const foodLayer = 1
const mouseLayer = 2
const catLayer = 4

//define a reusable collision shape object
let triggerBox = new utils.TriggerBoxShape(Vector3.One(), Vector3.Zero())

//create food
const food = new Entity()
food.addComponent(new ConeShape())
food.getComponent(ConeShape).withCollisions = false
food.addComponent(
  new Transform({
    position: new Vector3(1 + Math.random() * 14, 0, 1 + Math.random() * 14)
  })
)
food.addComponent(
  new utils.TriggerComponent(
    triggerBox,
    foodLayer,
    mouseLayer | catLayer,
    () => {
      food.getComponent(Transform).position = new Vector3(
        1 + Math.random() * 14,
        0,
        1 + Math.random() * 14
      )
      mouse.addComponentOrReplace(
        new utils.MoveTransformComponent(
          mouse.getComponent(Transform).position,
          food.getComponent(Transform).position,
          4
        )
      )
      cat.addComponentOrReplace(
        new utils.MoveTransformComponent(
          cat.getComponent(Transform).position,
          food.getComponent(Transform).position,
          4
        )
      )
    }
  )
)

//create mouse
const mouse = new Entity()
mouse.addComponent(new SphereShape())
mouse.getComponent(SphereShape).withCollisions = false
mouse.addComponent(
  new Transform({
    position: new Vector3(1 + Math.random() * 14, 0, 1 + Math.random() * 14),
    scale: new Vector3(0.5, 0.5, 0.5)
  })
)
mouse.addComponent(
  new utils.TriggerComponent(triggerBox, mouseLayer, catLayer, () => {
    mouse.getComponent(Transform).position = new Vector3(
      1 + Math.random() * 14,
      0,
      1 + Math.random() * 14
    )
    mouse.addComponentOrReplace(
      new utils.MoveTransformComponent(
        mouse.getComponent(Transform).position,
        food.getComponent(Transform).position,
        4
      )
    )
  })
)

//create cat
const cat = new Entity()
cat.addComponent(new BoxShape())
cat.getComponent(BoxShape).withCollisions = false
cat.addComponent(
  new Transform({
    position: new Vector3(1 + Math.random() * 14, 0, 1 + Math.random() * 14)
  })
)
cat.addComponent(new utils.TriggerComponent(triggerBox, catLayer))

//set initial movement for mouse and cat
mouse.addComponentOrReplace(
  new utils.MoveTransformComponent(
    mouse.getComponent(Transform).position,
    food.getComponent(Transform).position,
    4
  )
)
cat.addComponentOrReplace(
  new utils.MoveTransformComponent(
    cat.getComponent(Transform).position,
    food.getComponent(Transform).position,
    4
  )
)

//add entities to engine
engine.addEntity(food)
engine.addEntity(mouse)
engine.addEntity(cat)
```

## Action sequence

Use an action sequence to play a series of actions one after another.

### IAction

The `IAction` interface defines the actions that can be added into a sequence. It includes:

- `hasFinished`: Boolean for the state of the action, wether it has finished its execution or not.
- `onStart()`: First method that is called upon the execution of the action.
- `update()`: Called on every frame on the action's internal update.
- `onFinish()`: Called when the action has finished executing.

### Action Sequence Builder

This object creates action sequences, using simple building blocks.

The `SequenceBuilder` exposes the following methods:

- `then()`: Enqueue an action so that it's executed when the previous one finishes.
- `if()`: Use a condition to branch the sequence
- `else()`: Used with if() to create an alternative branch
- `endIf()`: Ends the definition of the conditional block
- `while()`: Keep running the actions defined in a block until a condition is no longer met.
- `breakWhile()`: Ends the definition of the while block

### Action Sequence System

The action sequence system takes care of running the sequence of actions. The `ActionsSequenceSystem` exposes the following methods:

- `startSequence()`: Starts a sequence of actions
- `setOnFinishCallback()`: Sets a callback for when the whole sequence is finished
- `isRunning()`: Returns a boolean that determines if the sequence is running
- `stop()`: Stops a running the sequence
- `resume()`: Resumes a stopped sequence
- `reset()`: Resets a sequence so that it starts over

### Full example

The following example creates a box that changes its scale until clicked. Then it resets its scale and moves.

```ts
import utils from '../node_modules/decentraland-ecs-utils/index'
import { ActionsSequenceSystem } from '../node_modules/decentraland-ecs-utils/actionsSequenceSystem/actionsSequenceSystem'

//set clicked flag
let boxClicked = false

//create box entity
const box = new Entity()
box.addComponent(new BoxShape())
box.addComponent(new Transform({ position: new Vector3(14, 0, 14) }))
box.addComponent(new OnClick(() => (boxClicked = true)))
engine.addEntity(box)

//Use IAction to define action for scaling
class ScaleAction implements ActionsSequenceSystem.IAction {
  hasFinished: boolean = false
  entity: Entity
  scale: Vector3

  constructor(entity: Entity, scale: Vector3) {
    this.entity = entity
    this.scale = scale
  }

  //Method when action starts
  onStart(): void {
    const transform = this.entity.getComponent(Transform)
    this.hasFinished = false

    this.entity.addComponentOrReplace(
      new utils.ScaleTransformComponent(
        transform.scale,
        this.scale,
        1.5,
        () => {
          this.hasFinished = true
        },
        utils.InterpolationType.EASEINQUAD
      )
    )
  }
  //Method to run on every frame
  update(dt: number): void {}
  //Method to run at the end
  onFinish(): void {}
}

//Use IAction to define action for movement
class MoveAction implements ActionsSequenceSystem.IAction {
  hasFinished: boolean = false
  entity: Entity
  position: Vector3

  constructor(entity: Entity, position: Vector3) {
    this.entity = entity
    this.position = position
  }

  //Method when action starts
  onStart(): void {
    const transform = this.entity.getComponent(Transform)

    this.entity.addComponentOrReplace(
      new utils.MoveTransformComponent(
        transform.position,
        this.position,
        4,
        () => {
          this.hasFinished = true
        }
      )
    )
  }
  //Method to run on every frame
  update(dt: number): void {}
  //Method to run at the end
  onFinish(): void {}
}

//Use sequence builder to create a sequence
const sequence = new utils.ActionsSequenceSystem.SequenceBuilder()
  .while(() => !boxClicked)
  .then(new ScaleAction(box, new Vector3(1.5, 1.5, 1.5)))
  .then(new ScaleAction(box, new Vector3(0.5, 0.5, 0.5)))
  .endWhile()
  .then(new ScaleAction(box, new Vector3(1, 1, 1)))
  .then(new MoveAction(box, new Vector3(1, 0, 1)))

//Create a sequence system, and add it to the engine to run the sequence
engine.addSystem(new utils.ActionsSequenceSystem(sequence))
```
