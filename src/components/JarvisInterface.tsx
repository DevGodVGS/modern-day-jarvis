import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Send, Zap, Brain, Volume2, VolumeX, Code, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

export const JarvisInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your personal coding assistant JARVIS. I can help you with programming questions, code reviews, debugging, and architectural decisions. You can type or speak to me - I\'ll respond both ways. What are you working on today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognitionConstructor();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        
        // Auto-send voice messages
        setTimeout(() => {
          handleSendMessage(transcript, true);
        }, 100);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = useCallback((text: string) => {
    if (!synthRef.current || !voiceEnabled) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Try to find a suitable voice (preferably male for JARVIS feel)
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('male') || 
      voice.name.toLowerCase().includes('david') ||
      voice.name.toLowerCase().includes('alex')
    ) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  }, [voiceEnabled]);

  const handleSendMessage = async (messageText?: string, isVoiceMessage = false) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
      isVoice: isVoiceMessage,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI response (replace with OpenAI integration)
    setTimeout(() => {
      const responses = [
        "I understand you're working on that. Let me help you think through this step by step. What specific part would you like me to focus on?",
        "That's a great question! For this type of implementation, I'd recommend considering the following approach...",
        "I can definitely help with that. Based on what you've described, here are a few solutions you might want to explore...",
        "Interesting challenge! Let me break this down for you and suggest some best practices...",
        "I see what you're trying to achieve. Have you considered using a different approach that might be more efficient?",
      ];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
      
      // Speak the response if voice is enabled
      if (voiceEnabled) {
        setTimeout(() => {
          speakText(assistantMessage.content);
        }, 500);
      }
    }, 1500);
  };

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-jarvis-surface to-background opacity-90" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-jarvis-glow opacity-5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-jarvis-glow-soft opacity-5 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-jarvis-glass-border backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Code className="w-8 h-8 text-jarvis-glow animate-pulse-glow" />
                <div className="absolute inset-0 bg-jarvis-glow blur-sm opacity-50" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">JARVIS</h1>
                <p className="text-sm text-muted-foreground">Personal Coding Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="jarvis-ghost"
                size="icon"
                onClick={toggleVoice}
                className="h-10 w-10"
              >
                {voiceEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </Button>
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  isProcessing ? "bg-yellow-500 animate-pulse" : 
                  isSpeaking ? "bg-jarvis-glow-soft animate-pulse" :
                  "bg-jarvis-glow shadow-jarvis"
                )} />
                <span className="text-sm text-muted-foreground">
                  {isProcessing ? 'Processing...' : 
                   isSpeaking ? 'Speaking...' : 
                   'Ready'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <main className="relative z-10 flex flex-col h-[calc(100vh-80px)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-full",
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <Card className={cn(
                  "max-w-[80%] backdrop-blur-sm transition-all duration-300",
                  message.type === 'user'
                    ? "bg-gradient-jarvis border-jarvis-glass-border shadow-jarvis"
                    : "bg-jarvis-surface border-border shadow-surface"
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      {message.type === 'assistant' && (
                        <div className="flex-shrink-0">
                          <Terminal className="w-5 h-5 text-jarvis-glow mt-0.5" />
                        </div>
                      )}
                      {message.type === 'user' && message.isVoice && (
                        <div className="flex-shrink-0">
                          <Mic className="w-4 h-4 text-jarvis-glow mt-0.5" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className={cn(
                          "text-sm leading-relaxed",
                          message.type === 'user' ? "text-jarvis-glow" : "text-foreground"
                        )}>
                          {message.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <Card className="bg-jarvis-surface border-border shadow-surface backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Terminal className="w-5 h-5 text-jarvis-glow animate-pulse" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-jarvis-glow rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-jarvis-glow rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-jarvis-glow rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-jarvis-glass-border backdrop-blur-sm">
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-end space-x-3">
              <Button
                variant="jarvis-ghost"
                size="icon"
                onClick={toggleListening}
                className={cn(
                  "flex-shrink-0 h-12 w-12 rounded-full",
                  isListening && "shadow-jarvis-intense bg-jarvis-glass animate-pulse-glow"
                )}
              >
                {isListening ? (
                  <Mic className="w-5 h-5" />
                ) : (
                  <MicOff className="w-5 h-5" />
                )}
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about coding, or click the mic to speak..."
                  className="bg-jarvis-surface border-jarvis-glass-border text-foreground placeholder:text-muted-foreground focus:border-jarvis-glow focus:shadow-jarvis pr-12 transition-all duration-300"
                  disabled={isProcessing || isListening}
                />
                <Button
                  variant="jarvis-ghost"
                  size="icon"
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isProcessing || isListening}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};