'use client';

import Link from 'next/link';

interface UserInfo {
  name?: string;
}

interface ChartNavProps {
  userInfo?: UserInfo;
}

export default function ChartNav({ userInfo }: ChartNavProps) {
  return (
    <>
      <li>
        <Link
          href="/charts"
          className="text-white hover:text-gray-300 block py-2 md:py-0"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/charts/chart-app"
          className="text-white hover:text-gray-300 block py-2 md:py-0"
        >
          Create Chart
        </Link>
      </li>
      <li>
        <Link
          href="/charts/pricing"
          className="text-white hover:text-gray-300 block py-2 md:py-0"
        >
          Pricing
        </Link>
      </li>
      {userInfo?.name && (
        <li>
          <Link
            href="/charts/account"
            className="text-white hover:text-gray-300 block py-2 md:py-0"
          >
            Account
          </Link>
        </li>
      )}
    </>
  );
}
