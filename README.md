# Team Member Registry

Clean and simple way to manage our team members. I built this with a "config-first" approach, so we can add new data fields (like departments or roles) in seconds without touching the core UI components.

## Getting Started

First, install the goods:
npm install

Then fire it up:
npm run dev
Note: This command starts both the React frontend (port 3000) and the local mock database (port 3001) at once.

## How to add new fields

If you need to track something new (like a Slack handle or a Department), you don't need to go digging through the JSX. Just:

1. Open `src/config/formConfig.js`
2. Drop a new field object into the array.

Example:
{
    name: 'department',
    label: 'Department',
    type: 'text',
    required: true,
    validation: {
        pattern: /^[a-zA-Z\s]+$/,
        message: 'Only letters, please'
    }
}

The form and the table will both update themselves automatically.

## A few notes on the design

* Config-Driven UI: I wanted to keep the components as "dumb" as possible. The app just reads the schema and renders what it's told. 
* Separation of Concerns: Logic is handled in the main container, the form is its own thing for rendering, and API calls are tucked away in a service file. 
* MUI and Styling: Used Material-UI for the heavy lifting so it looks professional and handles mobile users properly without me writing a ton of custom CSS. 
* Mock Backend: Since there isn't a "real" database yet, I'm using `json-server`. It's great for local testing because it mimics a real REST API.
