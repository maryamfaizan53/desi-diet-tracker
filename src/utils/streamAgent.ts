/* eslint-disable @typescript-eslint/no-explicit-any */

// export async function streamAgentResponse(prompt: string, stats: any, options: any): Promise<any> {
//   const response = await fetch('/api/ai/stream-agent-response', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
//     body: JSON.stringify({ prompt, stats, options }),
//     // For streaming POST
//   });

//   const reader = response.body?.getReader();
//   const decoder = new TextDecoder();
//   let aggregated = { stage: '', agent: '', result: null };

//   while (true) {
//     const { done, value } = await reader?.read() ?? { done: true, value: undefined };
//     if (done) break;
//     const chunk = decoder.decode(value);
//     const lines = chunk.split('\n\n');
//     for (const line of lines) {
//       if (line.startsWith('data: ')) {
//         const data = JSON.parse(line.slice(6));
//         if (data.stage === 'done') {
//           aggregated.result = data.result;
//         } else if (data.stage === 'complete') {
//           aggregated = data.aggregated;
//         }
//         // Emit to UI (e.g., via callback)
//         console.log('Stream chunk:', data);
//       }
//     }
//   }
//   return aggregated;
// }
interface AgentStats {
  // Add expected properties, e.g.:
  // score?: number;
  // details?: string;
  [key: string]: any;
}

interface AgentOptions {
  // Add expected properties, e.g.:
  // timeout?: number;
  // verbose?: boolean;
  [key: string]: any;
}

interface AggregatedResult {
  stage: string;
  agent: string;
  result: unknown;
}

export async function streamAgentResponse(
  prompt: string,
  stats: AgentStats,
  options: AgentOptions
): Promise<AggregatedResult> {
  const response = await fetch('/api/ai/stream-agent-response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({ prompt, stats, options }),
    // For streaming POST
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let aggregated: AggregatedResult = { stage: '', agent: '', result: null };

  while (true) {
    const { done, value } = await reader?.read() ?? { done: true, value: undefined };
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6));
        if (data.stage === 'done') {
          aggregated.result = data.result;
        } else if (data.stage === 'complete') {
          aggregated = data.aggregated;
        }
        // Emit to UI (e.g., via callback)
        console.log('Stream chunk:', data);
      }
    }
  }
  return aggregated;
}