This is a simple app for test task, client-server application which provides a “mini game” for users. Initially, user gets to the page, where he/she is able to select a room. User can select any existing or create a new room.
When the room is selected, user sees a shape (circle/square) in the center of the page. Any number of users can open the same room. When one of users clicks on a shape, the color of the shape must be changed for all users who opened the same room. Every user may change a color of the shape and then all users should see the same app state.

To run app you need to set up database config 
Put in file db_config.json your db info (user needs to have a permision to create table)
Install all packages using command "npm i"
Run app using command "node app"
Open your browser on "localhost:3000"
