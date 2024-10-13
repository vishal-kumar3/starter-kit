import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Verification',
  description: 'Email Verification Page',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
