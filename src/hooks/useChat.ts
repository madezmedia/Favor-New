import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const SYSTEM_PROMPT = `You are an AI betting analyst assistant with access to NBA betting data. 
You can help analyze trends, provide insights, and make recommendations based on historical data and current odds.
Always provide clear, concise responses and explain your reasoning.`;

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  // Get latest odds data for context
  const { data: latestOdds } = useQuery({
    queryKey: ['latestOdds'],
    queryFn: async () => {
      const { data } = await supabase
        .from('odds')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);
      return data;
    },
  });

  // Get recent games data for context
  const { data: recentGames } = useQuery({
    queryKey: ['recentGames'],
    queryFn: async () => {
      const { data } = await supabase
        .from('games')
        .select('*')
        .order('start_time', { ascending: false })
        .limit(10);
      return data;
    },
  });

  // Send message mutation
  const { mutateAsync: sendMessage, isLoading } = useMutation({
    mutationFn: async (content: string) => {
      // Add user message
      const userMessage: Message = {
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);

      // Prepare context for AI
      const context = {
        latestOdds,
        recentGames,
        messageHistory: messages.slice(-5), // Last 5 messages for context
      };

      // Call OpenRouter API
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-haiku',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: `Context: ${JSON.stringify(context)}\n\nUser question: ${content}` }
          ],
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      return assistantMessage;
    },
  });

  return {
    messages,
    sendMessage,
    isLoading,
  };
}