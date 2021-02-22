# Calendar #

The calendar is created to help users keep track of their daily schedule

## Features Of This App: ##
- The Calendar app allow users to create events using the top right button create  :dizzy:. They can **create, edit, and delete an event**.
- Each event would have the following spesc: title, description, start time and end time to show infomation that would help user to allocate acitivities in their busy schedule. The user can modify the event accordingly
- User can select an event to move it the any loccation on the page

## To Start ##

**npm install && npm run start**
    
## App View ###
- Completed CRUD APP
<img src="/images/app-snap-shot.png" width="800">


### Folder Structure ###
<img src="/images/folder-structure.png" width="300">

### ADA Compliance ###
<img src="/images/ada-compliance.png" width="800">
note: This is a basic ada compliance requirement. There isn't ada compliance for the popup form yet.

### Redux Store ###
<img src="/images/redux-store.png" width="600">

### Calculate Date ###
<img src="/images/eventPositionLogic.png" width="600">

### Form ###
<img src="/images/form.png" width="600">

## My Process ##

   - Built out Static calendar first and then implement the data flow
   - Currently the events would be automatically arrange with a helper function calculatePosition from "helper/eventTimeline". See the comment there for explanation (2hours)
   - Spent a lot of time trying to solve the drag and drop issue without libraries
   - Refactor(Folder structure, component names, css naming, handler naming)
   - Wrote Test cases using enzyme for components


## Implementation ##
    - Clean Folder structure with straight forward naming convention.
    - Using Redux for state management - seperate of concerns. It will be easily to scale in a team
    - Clean code with good naming convention(function, component,css name)
    - Events are editable and has a popup form.
    - I wrote a function to sort out positions using function calculatePosition from helper/eventTimeline
    - I use redux since it will be easy for state management
    - I calculated the days' difference and apply to the new day by doing ```javascript ${zoomWidth * (diff)}px ``` when I move the event to a new line

## To Do ##
   - Improve Drag and Drop for moving event across the calendar
