import React from 'react';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'online' | 'processing' | 'offline';
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          color: 'bg-jarvis-glow',
          label: 'Online',
          animate: 'animate-pulse-glow'
        };
      case 'processing':
        return {
          color: 'bg-yellow-500',
          label: 'Processing',
          animate: 'animate-pulse'
        };
      case 'offline':
        return {
          color: 'bg-red-500',
          label: 'Offline',
          animate: ''
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn(
        "w-3 h-3 rounded-full transition-all duration-300 shadow-sm",
        config.color,
        config.animate
      )} />
      <span className="text-sm text-muted-foreground">
        {config.label}
      </span>
    </div>
  );
};