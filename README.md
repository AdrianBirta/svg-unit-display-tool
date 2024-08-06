# Unit Display Tool

This is a simple web application designed to display unit information on a floor plan. The application is built using React with TypeScript and Vite as the build tool.

## Features

- **Floor Plan Display**: Shows a floor plan with multiple units represented as colored rectangles.
- **Unit Selection**: Click on a unit to view its details in a sidebar. Clicking on an already selected unit will deselect it.
- **Data Logging**: Includes a button to log the current unit data to the console.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AdrianBirta/svg-unit-display-tool.git

2. **Navigate to the Project Directory**:
   ```bash
   cd my-unit-display-tool

3. **Install Dependencies**:
   ```bash
   npm install

4. **Start the Development Server**:
   ```bash
   npm run dev

5. **Open the Application**:

Open your browser and navigate to http://localhost:5173 to see the application in action

## Code Explanation

- **App.tsx**: Manages the state of the selected unit and handles clicks on units. Passes necessary props to the FloorPlan and Sidebar components.
- **FloorPlan.tsx**: Renders the SVG floor plan and units. Passes the selected unit state to each Unit component to apply the correct styling.
- **Unit.tsx**: Represents individual units within the SVG. Changes color based on selection status.
- **Sidebar.tsx**: Displays details of the currently selected unit.