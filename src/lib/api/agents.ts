import { supabase } from '@/lib/supabase';
import { runAnalysis } from '@/lib/agents';

export async function startAgentAnalysis(agentId: string, data: any) {
  try {
    const result = await runAnalysis(data);

    // Store analysis results
    const { error } = await supabase
      .from('agent_analysis')
      .insert({
        agent_id: agentId,
        analysis: result,
        created_at: new Date().toISOString(),
      });

    if (error) throw error;
    return result;
  } catch (error) {
    console.error('Error running agent analysis:', error);
    throw error;
  }
}

export async function getAgentAnalysis(agentId: string) {
  try {
    const { data, error } = await supabase
      .from('agent_analysis')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching agent analysis:', error);
    throw error;
  }
}