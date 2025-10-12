import { useEffect, useRef } from 'react';

interface TelegramLoginButtonProps {
  botUsername: string;
  onAuth: (user: any) => void;
  buttonSize?: 'large' | 'medium' | 'small';
  cornerRadius?: number;
  requestAccess?: boolean;
}

declare global {
  interface Window {
    TelegramLoginWidget?: any;
  }
}

export default function TelegramLoginButton({
  botUsername,
  onAuth,
  buttonSize = 'large',
  cornerRadius = 10,
  requestAccess = true,
}: TelegramLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    (window as any).onTelegramAuth = (user: any) => {
      onAuth(user);
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', botUsername);
    script.setAttribute('data-size', buttonSize);
    script.setAttribute('data-radius', cornerRadius.toString());
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', requestAccess ? 'write' : 'read');

    containerRef.current.appendChild(script);

    return () => {
      delete (window as any).onTelegramAuth;
    };
  }, [botUsername, buttonSize, cornerRadius, requestAccess]);

  return <div ref={containerRef} className="flex justify-center" />;
}
