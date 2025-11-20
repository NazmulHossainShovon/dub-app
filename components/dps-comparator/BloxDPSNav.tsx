'use client';

import Link from 'next/link';

interface UserInfo {
  name?: string;
}

interface BloxDPSNavProps {
  userInfo?: UserInfo;
}

export default function BloxDPSNav({ userInfo }: BloxDPSNavProps) {
  return (
    <>
      <li>
        <Link
          href="/dps-comparator"
          className="text-white hover:text-gray-300 block py-2 md:py-0"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/dps-comparator/app"
          className="text-white hover:text-gray-300 block py-2 md:py-0"
        >
          Compare DPS
        </Link>
      </li>
      <li>
        <Link
          href="/dps-comparator/pricing"
          className="text-white hover:text-gray-300 block py-2 md:py-0"
        >
          Pricing
        </Link>
      </li>
      {userInfo?.name && (
        <li>
          <Link
            href="/dps-comparator/account"
            className="text-white hover:text-gray-300 block py-2 md:py-0"
          >
            Account
          </Link>
        </li>
      )}
    </>
  );
}