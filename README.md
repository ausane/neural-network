# Neural Network Visualization with Node Manipulation

This is a **Neural Network Visualization** built with Next.js and **v0.dev**. It allows users to dynamically add and remove nodes, visualizing their connections in real time.

## Features

- **Interactive Neural Network**: Visualizes nodes and their connections on an HTML canvas.
- **Add/Remove Nodes**: You can add or remove nodes, and see how the network structure updates instantly.
- **Responsive Design**: The visualization is fully responsive and adjusts to different screen sizes.
- **Real-time Animation**: Nodes move with randomized velocity and bounce off the canvas boundaries.

## Components

The project contains four main components, each with a slightly different variation of the visualization:

### `NeuralNetworkV1Component`

- Initial implementation of the neural network.
- Basic functionality to add and remove nodes.

### `NeuralNetworkV2Component`

- Introduces node grouping and color differentiation.
- Smoother animations and more optimized canvas rendering.

### `NeuralNetworkV3Component`

- Updated with refined node movement logic.
- Connections between nodes are based on proximity.

### `NeuralNetworkV4Component`

- Final iteration with added interaction features.
- Node velocities are influenced by user input (e.g., dragging).

Each component uses the following structure:

- **Canvas Rendering**: Nodes and their connections are drawn on an HTML canvas.
- **Node Interactions**: Buttons for adding and removing nodes with real-time effects on the neural network.

  - **Add Node**: Adds a node with randomized position and velocity.
  - **Remove Node**: Removes the most recently added node.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

## Tech Stack

- **Next.js**: Framework for building React applications.
- **v0.dev**: Development toolchain used in the project.
- **Lucide.dev Icons**: For UI components such as buttons.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Usage

Once the app is running, you can:

- Click the **Add Node** button to add new nodes to the canvas.
- Click the **Remove Node** button to remove the last added node.
- Observe the nodes moving and their connections being dynamically updated.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the production build.

## License

This project is licensed under the MIT License.
