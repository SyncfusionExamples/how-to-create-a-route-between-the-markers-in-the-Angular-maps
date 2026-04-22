# How-to-create-a-route-between-the-markers-in-the-Angular-maps

Repository description: Angular sample showing how to plot navigation routes between markers by combining the Google Maps Directions API with Syncfusion Maps.

Project Overview

This repository is an Angular sample that demonstrates obtaining route coordinates and navigation instructions from the Google Maps Directions API and rendering those routes on Syncfusion Maps components. The sample shows how to convert Directions API responses into marker coordinates and polyline paths for display.

Features

- Uses Google Maps Directions API to retrieve route data.
- Integrates Directions results with Syncfusion Maps for visualization.
- Demonstrates plotting polylines and marker-based routing in Angular.

Prerequisites

- Node.js and npm installed
- An Angular-compatible environment (Angular CLI optional)
- A Google Maps Directions API key

Installation & Usage

1. Add your Google Maps Directions API key to the index.html file in the src folder.
2. Install dependencies with `npm install`.
3. Start the app with `npm start` and open the app in your browser.

Configuration

Add the API key in [src/index.html](src/index.html) where the Maps script or configuration expects it. The sample reads Directions responses and maps coordinates to Syncfusion Maps layers.

Contributing

Contributions welcome: open issues or pull requests to improve clarity and compatibility.

License

This sample is provided as-is for demonstration purposes.
