'use client';
import { useRouter } from 'next/navigation';
import usePaddle from '../hooks/usePaddle';

interface CheckoutButtonProps {
  priceId?: string;
  appName?: string;
}

export default function CheckoutButton({
  priceId = 'pri_01k611462xk2zy6240fghhves7',
  appName = 'dub',
}: CheckoutButtonProps) {
  const router = useRouter();

  // Define the event callback function to handle checkout completion
  const handlePaddleEvent = (event: any) => {
    if (event?.name === 'checkout.completed') {
      console.log('Paddle checkout completed:', event);

      // UI: redirect, show toast, etc.
      router.push('/thanks'); // Redirect to thank you page

      // OPTIONAL (not authoritative): ping your backend to start verification/processing
      fetch('/api/paddle/client-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkoutId: event.data?.id,
          transactionId: event.data?.transaction_id,
          customData: event.data?.custom_data,
        }),
      }).catch(error => {
        console.error('Error sending client notification:', error);
      });
    }
  };

  const paddle = usePaddle(handlePaddleEvent);

  const openCheckout = () => {
    if (!paddle) {
      console.error('Paddle not initialized yet');
      return;
    }

    // Check if we're in a browser environment (not server-side)
    if (typeof window === 'undefined') {
      console.error(
        'Paddle checkout can only be opened in a browser environment'
      );
      return;
    }

    try {
      // Retrieve user ID from localStorage
      let userId = null;
      if (typeof window !== 'undefined') {
        const userInfo = localStorage.getItem('user-info');
        if (userInfo) {
          try {
            const parsedUserInfo = JSON.parse(userInfo);
            userId = parsedUserInfo._id || parsedUserInfo.id;
          } catch (e) {
            console.error('Error parsing user-info from localStorage:', e);
          }
        }
      }

      if (!userId) {
        console.error('User ID not found in localStorage');
        router.push('/login');
        return;
      }

      paddle.Checkout.open({
        items: [
          {
            priceId: priceId,
            quantity: 1,
          },
        ],
        settings: {
          successUrl: `${window.location.origin}/thanks`,
        },
        customData: {
          userId: userId,
          appName: appName,
        },
      });
    } catch (error) {
      console.error('Error opening Paddle checkout:', error);
    }
  };

  return (
    <button
      onClick={openCheckout}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
    >
      Purchase Now
    </button>
  );
}
