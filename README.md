# Toy Robot Simulator

### Install the app locally

```bash
$ npm install

$ npm start
```

### Getting Started

1. Go to the app at http://localhost:3000

2. First valid command is `PLACE` so input the position (X,Y,F) of the robot then click on the `PLACE` command.
   - Position is auto-masked and it must be in the format (X,Y,F). For example:
     - 0,0,NORTH - The origin (0,0) can be considered to be the SOUTH WEST most corner. `F` must be in capital letters.
     - 1,1,EAST
     - 2,2,WEST
     - 3,3,SOUTH
     - and so on.
   - Any move that would cause the robot to fall will be ignored.

3. Succeeding commands can either be `PLACE`, `MOVE`, `LEFT`, `RIGHT`.
   - The current position of the robot will be `reported` on the `Position (X,Y,F)` field.

3. The `RESET` button will refresh the page.

