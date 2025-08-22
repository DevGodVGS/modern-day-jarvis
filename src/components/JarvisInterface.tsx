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
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-jarvis-surface/20 to-background" />
      
      {/* Moving Circuit Lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--jarvis-glow) / 0.3) 1px, transparent 1px),
            linear-gradient(hsl(var(--jarvis-glow) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-jarvis-glow/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-jarvis-neural/10 rounded-full blur-3xl animate-neural-pulse" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-jarvis-hologram/15 rounded-full blur-2xl animate-hologram" />
      </div>

      {/* Data Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-jarvis-glow rounded-full animate-particle-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${10 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Futuristic Header */}
      <header className="relative z-10 border-b border-jarvis-glass-border bg-jarvis-glass/80 backdrop-blur-xl shadow-hologram">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-jarvis-glow/20 rounded-xl blur-lg animate-pulse-glow" />
                <div className="relative p-3 bg-jarvis-surface/50 rounded-xl border border-jarvis-glass-border shadow-neural backdrop-blur-md">
                  <Brain className="w-6 h-6 text-jarvis-glow animate-neural-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-jarvis-glow to-jarvis-glow-soft bg-clip-text text-transparent animate-hologram">
                  JARVIS AI
                </h1>
                <p className="text-sm text-jarvis-glow font-mono">Neural Coding Interface v3.0</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="jarvis-ghost"
                size="icon"
                onClick={toggleVoice}
                className="h-10 w-10 shadow-neural"
              >
                {voiceEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-3 h-3 rounded-full transition-all shadow-lg",
                  isProcessing ? "bg-jarvis-energy animate-neural-pulse shadow-energy" : 
                  isSpeaking ? "bg-jarvis-glow-soft animate-pulse shadow-jarvis" :
                  "bg-jarvis-glow shadow-jarvis animate-pulse-glow"
                )} />
                <span className="text-sm text-jarvis-glow font-mono">
                  {isProcessing ? 'Neural Processing...' : 
                   isSpeaking ? 'Voice Output...' : 
                   'System Ready'}
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
                  "max-w-[80%] backdrop-blur-md transition-all duration-300 hover:shadow-hologram",
                  message.type === 'user'
                    ? "bg-gradient-jarvis border-jarvis-glass-border shadow-jarvis"
                    : "bg-jarvis-surface/80 border-jarvis-glass-border shadow-neural"
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      {message.type === 'assistant' && (
                        <div className="flex-shrink-0 relative">
                          <Brain className="w-4 h-4 text-jarvis-glow mt-0.5 animate-neural-pulse" />
                          <div className="absolute inset-0 bg-jarvis-glow/30 blur-sm rounded-full" />
                        </div>
                      )}
                      {message.type === 'user' && message.isVoice && (
                        <div className="flex-shrink-0">
                          <Mic className="w-4 h-4 text-jarvis-glow mt-0.5 animate-pulse" />
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
                <Card className="bg-jarvis-surface/90 border-jarvis-glass-border shadow-energy backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-neural opacity-30 animate-energy-flow" />
                  <CardContent className="p-4 relative">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Brain className="w-5 h-5 text-jarvis-glow animate-neural-pulse" />
                        <div className="absolute inset-0 bg-jarvis-glow blur-md opacity-50 animate-ping" />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-jarvis-glow rounded-full animate-bounce shadow-jarvis" />
                        <div className="w-3 h-3 bg-jarvis-neural rounded-full animate-bounce delay-150 shadow-neural" />
                        <div className="w-3 h-3 bg-jarvis-hologram rounded-full animate-bounce delay-300 shadow-hologram" />
                      </div>
                      <div className="text-sm text-jarvis-glow font-mono animate-typing">
                        Neural pathways activating...
                      </div>
                    </div>
                    {/* Scanning Lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-px bg-jarvis-glow opacity-60 animate-scan" />
                      <div className="w-full h-px bg-jarvis-neural opacity-40 animate-scan delay-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Futuristic Input Area */}
        <div className="border-t border-jarvis-glass-border bg-jarvis-glass/90 backdrop-blur-xl shadow-hologram">
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-end space-x-4">
              <div className="relative">
                <Button
                  variant="jarvis-ghost"
                  size="icon"
                  onClick={toggleListening}
                  className={cn(
                    "flex-shrink-0 h-12 w-12 rounded-full transition-all shadow-neural",
                    isListening 
                      ? "bg-gradient-energy shadow-energy animate-neural-pulse" 
                      : "bg-gradient-jarvis shadow-jarvis hover:shadow-hologram"
                  )}
                >
                  {isListening ? (
                    <Mic className="w-5 h-5 text-background animate-pulse" />
                  ) : (
                    <MicOff className="w-5 h-5" />
                  )}
                </Button>
                {isListening && (
                  <div className="absolute inset-0 bg-jarvis-energy rounded-full animate-ping opacity-50" />
                )}
              </div>
              
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-hologram rounded-lg opacity-20 animate-energy-flow" />
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Interface with JARVIS neural network..."
                  className="relative bg-jarvis-surface/80 border-jarvis-glass-border text-foreground placeholder:text-jarvis-glow/60 focus:border-jarvis-glow focus:shadow-hologram pr-12 backdrop-blur-md"
                  disabled={isProcessing || isListening}
                />
                <Button
                  variant="jarvis-ghost"
                  size="icon"
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isProcessing || isListening}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:shadow-neural"
                >
                  <Send className="w-4 h-4 group-hover:text-jarvis-glow transition-colors" />
                </Button>
                
                {/* Connection Indicator */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-jarvis-glow rounded-full animate-pulse-glow" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};