Custom Analytics Platform that has Real-time dashboards for tracking user behavior.-Full Stack 




Frontend (React + Recharts + WebSocket)
	•	Live Dashboard UI: Built a real-time dashboard in React to display analytics data with live updates.
	•	WebSocket Client: Connected to backend WebSocket server to receive and handle streaming data.
	•	State Management with Hooks: Used useState and useEffect to manage data flow and reactivity.
	•	Data Aggregation Logic:
	•	Grouped and processed incoming events by minute/hour.
	•	Transformed raw data for effective visualization.
	•	Data Filtering:
	•	Filtered events by userId using dropdown menus.
	•	Dynamically populated unique users and event types.
	•	Responsive Charting with Recharts:
	•	Used LineChart, Tooltip, Legend, and ResponsiveContainer for dynamic and readable data visuals.
	•	Tailwind CSS UI Styling:
	•	Styled components with Tailwind for modern, responsive design.
	•	Built clean UI with card layouts, select menus, and spacing.

⸻

Dev & Tooling Skills
	•	Full Stack TypeScript: Used TypeScript consistently across both frontend and backend.
	•	Modular Codebase: Separated logic into reusable modules and types.
	•	Local Development Workflow:
	•	Ran backend (npm run dev with ts-node or nodemon) and frontend (npm start) simultaneously.
	•	Debug Logging: Console logs for WebSocket connections, server events, and MongoDB status.
	•	Version Control Ready: File structure and naming conventions follow good Git practices.









Server-Side Features (Node.js, Express, WebSocket, MongoDB)
	1.	Real-Time WebSocket Server
	•	Streams simulated user events to connected clients every 2 seconds.
	2.	REST API Endpoint (/api/events)
	•	Returns the latest 500 events sorted by timestamp.
	3.	Simulated Data Generation
	•	Generates fake events using faker (e.g., click, view, purchase, etc.).
	4.	MongoDB Integration with Mongoose
	•	Stores each event persistently in MongoDB Atlas.
	•	Mongoose schema for event structure and validation.
	5.	CORS Configuration
	•	Allows requests from http://localhost:3000 (the frontend app) during development.
	6.	Environment Configuration
	•	Uses .env or defaults for PORT and MONGO_DB_URL.
	7.	Client Management
	•	Tracks connected WebSocket clients and handles connection/disconnection gracefully.
	8.	Project Structure
	•	Organized folders: models/, events/, types/, config/.

⸻

Client-Side Features (React + Recharts + WebSocket)
	1.	Real-Time Data Handling
	•	Connects to WebSocket server to receive live events and updates UI instantly.
	2.	Data Visualization with Recharts
	•	Responsive LineChart for visualizing event frequency over time.
	3.	Event Aggregation Logic
	•	Groups events by minute or hour for meaningful charting.
	4.	User Filtering
	•	Dropdown to filter events by userId.
	5.	Group-By Resolution Toggle
	•	Dropdown to switch between grouping by minute or hour.
	6.	Responsive Dashboard UI
	•	Clean, styled interface using Tailwind CSS for layout and design.
	7.	Dynamic Dropdowns
	•	Populates event types and user IDs dynamically based on live data.
	8.	Component-Based Architecture
	•	Dashboard logic encapsulated in its own component.




IMAGES:




<img width="2880" height="1308" alt=" RealTimeAnalytics" src="https://github.com/user-attachments/assets/c20b0a9c-4b0f-4819-8939-83448cf76b89" />











LIVE URL:



https://saasrealtimeanalyticsappclient.onrender.com/






