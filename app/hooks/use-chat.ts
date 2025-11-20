import { useEffect, useCallback } from 'react';
import { connectSocket, getSocket } from '../lib/socket-client';
import { useChat as useChatStore } from '../lib/chat-store';

type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  messageType?: string;
  chatRoomId: string;
};

export function useChatSocket(currentUserId: string) {
  const { state, dispatch } = useChatStore();

  // Join a chat room
  const joinRoom = useCallback((roomId: string) => {
    const socket = getSocket();
    if (socket) {
      socket.emit('joinRoom', roomId);
    }
  }, []);

  // Leave a chat room
  const leaveRoom = useCallback((roomId: string) => {
    const socket = getSocket();
    if (socket) {
      socket.emit('leaveRoom', roomId);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(
    (roomId: string, message: string) => {
      const socket = getSocket();
      if (socket) {
        socket.emit('chatMessage', {
          roomId,
          message,
          sender: currentUserId,
        });
      }
    },
    [currentUserId]
  );

  // Handle incoming messages and events
  useEffect(() => {
    const socket = connectSocket();
    if (!socket) return;

    const handleMessage = (msg: Message) => {
      // Defensive: If chatRoomId is missing, try to infer from msg.id or skip
      if (!msg.chatRoomId && (msg as any).roomId) {
        msg.chatRoomId = (msg as any).roomId;
      }
      dispatch({ type: 'ADD_MESSAGE', payload: msg });
    };
    const handleUserJoined = (userId: string) => {
      dispatch({
        type: 'SET_ONLINE_USERS',
        payload: [...state.onlineUsers, userId],
      });
    };
    const handleUserLeft = (userId: string) => {
      dispatch({
        type: 'SET_ONLINE_USERS',
        payload: state.onlineUsers.filter((id: string) => id !== userId),
      });
    };
    const handleTyping = (userId: string) => {
      if (!state.typingUsers.includes(userId)) {
        dispatch({
          type: 'SET_TYPING_USERS',
          payload: [...state.typingUsers, userId],
        });
      }
    };
    const handleStopTyping = (userId: string) => {
      dispatch({
        type: 'SET_TYPING_USERS',
        payload: state.typingUsers.filter((id: string) => id !== userId),
      });
    };

    socket.on('chatMessage', handleMessage);
    socket.on('userJoined', handleUserJoined);
    socket.on('userLeft', handleUserLeft);
    socket.on('typing', handleTyping);
    socket.on('stopTyping', handleStopTyping);

    return () => {
      socket.off('chatMessage', handleMessage);
      socket.off('userJoined', handleUserJoined);
      socket.off('userLeft', handleUserLeft);
      socket.off('typing', handleTyping);
      socket.off('stopTyping', handleStopTyping);
    };
    // eslint-disable-next-line
  }, [dispatch, state.onlineUsers, state.typingUsers]);

  // Typing indicator
  const sendTyping = useCallback(
    (roomId: string) => {
      const socket = getSocket();
      if (socket) {
        socket.emit('typing', { roomId, userId: currentUserId });
      }
    },
    [currentUserId]
  );

  const sendStopTyping = useCallback(
    (roomId: string) => {
      const socket = getSocket();
      if (socket) {
        socket.emit('stopTyping', { roomId, userId: currentUserId });
      }
    },
    [currentUserId]
  );

  return {
    state,
    joinRoom,
    leaveRoom,
    sendMessage,
    sendTyping,
    sendStopTyping,
  };
}
