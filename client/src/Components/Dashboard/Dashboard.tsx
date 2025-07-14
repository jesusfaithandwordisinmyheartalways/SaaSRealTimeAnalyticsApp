import React, { useEffect, useState } from "react";
import { socket } from "../../WebSocket/socket";
import { UserEvents } from "../../Types/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface AggregateEvent {
  [eventType: string]: number | string;
  time: string;
}

const aggregateEvents = (
  events: UserEvents[],
  resolution: "minute" | "hour"
): AggregateEvent[] => {
  const buckets: { [time: string]: AggregateEvent } = {};

  for (let data of events) {
    const date = new Date(data.timestamp);
    let timeKey = "";

    if (resolution === "minute") {
      timeKey = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
    } else {
      timeKey = `${date.getHours()}:00`;
    }

    if (!buckets[timeKey]) {
      buckets[timeKey] = { time: timeKey };
    }

    buckets[timeKey][data.eventType] = (buckets[timeKey][data.eventType] || 0) as number + 1;
  }

  return Object.values(buckets);
};

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<UserEvents[]>([]);
  const [userFilter, setUserFilter] = useState<string>("");
  const [groupBy, setGroupBy] = useState<"minute" | "hour">("minute");

  // ✅ Fetch historical events once on load
  useEffect(() => {
    fetch("https://saasrealtimeanalyticsappserver.onrender.com/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  // ✅ WebSocket for real-time updates
  useEffect(() => {
    socket.onmessage = (message) => {
      const newEvent: UserEvents = JSON.parse(message.data);
      setEvents((prev) => [...prev, newEvent]);
    };
  }, []);

  const filteredEvents = userFilter
    ? events.filter((data) => data.userId === userFilter)
    : events;

  const chartData = aggregateEvents(filteredEvents, groupBy);
  const eventTypes = Array.from(new Set(filteredEvents.map((data) => data.eventType)));
  const userIds = Array.from(new Set(events.map((data) => data.userId)));

  return (
    <div className="p-4 bg-white shadow rounded-xl space-y-4">
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="font-semibold mr-2">Filter by user:</label>
          <select
            className="border p-2 rounded"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          >
            <option value="">All</option>
            {userIds.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold mr-2">Group by:</label>
          <select
            className="border p-2 rounded"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as "minute" | "hour")}
          >
            <option value="minute">Minute</option>
            <option value="hour">Hour</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {eventTypes.map((type, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={type}
              stroke="#3b82f6"
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;