# bp

## task 1 "marko polo"
### get started

- http

**server**  
`cd backend/markoPolo`  
`npm run start:http`  
default http://localhost:8080  
_there is postman collection in .devel directory._

**client**  
`cd front/markoPolo`  
`npm run start:http`  
default http://localhost:3000  
_after starting you can open front interface on http://localhost:3000.  
on page you will see three fields.  
at the very bottom, under the 'result' label, you can obtain the API's output._

_for checking logic with random number it has CLI command_
`npm run cli markoPolo:randomInRangeFrom1to1000`

- ws

**server**  
`cd backend/markoPolo`  
`npm run start:ws`  
default http://localhost:8080

**client**  
`cd front/markoPolo`  
`npm run start:ws`  
_after starting of client on terminal you will get console for input commands._

commands:  
-n 'number' - play with one number  
-l 'number[]' - play with array of numbers  
-r 'number[]' - play with range of array of two numbers  
close - to close connect


example:  
`-n 15` // Марко Поло  
`-l 1,15,20` // [1,"Марко Полло","Полло"]  
`-r 1,20` // [1,2,"Марко",4,"Полло","Марко",7,8,"Марко","Полло",11,"Марко",13,14,"Марко Полло",16,17,"Марко",19,"Полло"]
