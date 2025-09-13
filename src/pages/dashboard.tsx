"use client";
// Wires to /health/generate-insights; streaming for insights pane
// Preserve charts (Recharts unchanged), add AI coach sidebar with streaming text
import { streamAgentResponse } from '../utils/streamAgent';
import { BarChart, Bar, XAxis, YAxis } from 'recharts'; // Existing
import { useState } from 'react';


interface AgentResponseResult {
  action_plan?: string[];
  // Add other expected properties here
}

interface StatEntry {
  calories: number;
  name: string;
  // Add other expected properties here, e.g.:
  // protein: number;
  // carbs: number;
  // fat: number;
}


export default function AIHealthDashboard() {
  const [insights, setInsights] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [stats, setStats] = useState<StatEntry[]>([]);

  // const getInsights = async () => {
  //   setIsStreaming(true);
  //   // Use streamAgentResponse, append chunks to insights
  //   const result = await streamAgentResponse('Generate recovery advice', stats, { agents: ['recovery_advisor', 'habit_coach'] });
  //   setInsights(result.aggregate.action_plan.join('\n'));
  //   setIsStreaming(false);
  // };
 const getInsights = async () => {
  setIsStreaming(true);
  const result = await streamAgentResponse('Generate recovery advice', stats, { agents: ['recovery_advisor', 'habit_coach'] });
  // Assert the type so TypeScript knows about action_plan
  const agentResult = result.result as AgentResponseResult;
  setInsights(
    Array.isArray(agentResult.action_plan)
      ? agentResult.action_plan.join('\n')
      : 'No action plan found.'
  );
  setIsStreaming(false);
};
   return (
    <div className="grid md:grid-cols-3 gap-4 p-4">
      <div className="col-span-2">
        {/* Use stats as chart data */}
        <BarChart data={stats}>
          <Bar dataKey="calories" fill="#8884d8" />
          <XAxis dataKey="name" />
          <YAxis />
        </BarChart>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">AI Coach</h3>
        {isStreaming && <div className="skeleton h-32">Streaming...</div>}
        <p>{insights}</p>
        <button onClick={getInsights} className="bg-green-500 text-white px-4 py-2 rounded w-full mt-2">
          Get Insights
        </button>
      </div>
    </div>
  );
}