/* eslint-disable @typescript-eslint/no-explicit-any */
// Similar wiring; calls /api/ai/generate-workout non-streaming for quick plans
import { useEffect, useState } from 'react';

export default function AIWorkoutGenerator() {
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWorkout();
  }, []);

  const fetchWorkout = async () => {
    setLoading(true);
    const res = await fetch('/api/ai/generate-workout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ prompt: 'Generate intermediate strength workout' })
    });
    const data = await res.json();
    setWorkout(data);
    setLoading(false);
  };

  if (loading) return <div className="skeleton h-96 bg-gray-200 rounded">Loading...</div>;

  return (
    <div className="p-4"> {/* Unchanged Tailwind */}
      <h1 className="text-2xl font-bold">AI Workout Generator</h1>
      {workout && (
        <>
          <h2>{workout.title} ({workout.duration_minutes} min)</h2>
          <div className="space-y-2">
            {workout.exercises.map((ex: any) => (
              <div key={ex.name} className="bg-gray-100 p-2 rounded">
                {ex.name} - {ex.sets} sets of {ex.reps}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p>Tips: {workout.tips.join(', ')}</p>
            <p>Progression: {JSON.stringify(workout.progression)}</p>
          </div>
          <button onClick={fetchWorkout} className="bg-purple-500 text-white px-4 py-2 rounded">Regenerate</button>
          {/* CTAs: Save, Timer, Calendar */}
        </>
      )}
    </div>
  );
}