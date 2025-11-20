'use client';

import Dub from 'components/dub/Dub';
import ProtectedRoute from 'components/ProtectedRoute';

export default function DubPage() {
  return (
    <ProtectedRoute>
      <Dub />
    </ProtectedRoute>
  );
}
