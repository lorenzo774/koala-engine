# TODO

-   Core

    -   [x] Create a way to get a component from the entity inside a component
    -   [x] Create SpriteRenderer component
    -   [x] Create Transform Component
    -   [x] Copy Input system from sad-html-cat project
    -   [x] Add gravity
    -   [x] Create Debugger
    -   [x] Create Rigidbody
    -   [x] Create CollisionBox component
    -   [x] Create CollisionSystem
    -   [x] Check collision in CollisionBody
    -   [x] Add debugger UI
    -   [x] Improve Jump in Player movement
    -   [x] Add fixed FPS
    -   [x] Create Tilemap
    -   [x] Create sound manager
    -   [x] Fix tilemap not loading at first
    -   [x] Create camera component
    -   [x] Move tilemap debug grid with Camera
    -   [x] Improve FPS handler (no setInterval)
    -   [ ] Create UI manager
    -   [ ] Move settings to core, implement settings load system

-   Physics

    -   [x] Create collision detection and resolution system (Swept AABB)
    -   [x] Fix collision jitter
    -   [x] Fix swept bug (the player sometimes can move inside the collision)
    -   [x] Move physics engine on a different loop
    -   [x] Adapt PhysicsEngine to bodies logic
    -   [x] Add onGround method
    -   [ ] Fix physics to work with Camera system
    -   [ ] Improve PhysicsEngine performance (Tile based checking)
    -   [ ] Create Collision system for Tilemap

-   Editor

    -   [x] Create HTTP server with 2 routes for html view
    -   [ ] Create editor page (HTML)
    -   [ ] Create Save/Load system for tilemap
    -   [ ] Create Save/Load system for game (entities, components, textures path, etc...)
    -   [ ] Create UI to handle entities and components
    -   [ ] Create game engine menu

-   Utils

    -   [ ] Improve _loadImage_ to wait the loading

-   CLI ?
