'use client';
import {
  initializePaddle,
  InitializePaddleOptions,
  Paddle,
} from '@paddle/paddle-js';
import { useEffect, useState } from 'react';

export default function usePaddle(eventCallback?: (event: any) => void) {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment:
        process.env.NEXT_PUBLIC_PADDLE_ENV! === 'production'
          ? 'production'
          : 'sandbox',
      token: process.env.NEXT_PUBLIC_PADDLE_TOKEN!,
      debug: true,
      eventCallback,
    } as InitializePaddleOptions).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, [eventCallback]);

  return paddle;
}
