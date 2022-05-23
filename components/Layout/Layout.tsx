import { PropsWithChildren, ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';

export default function Layout({ children }: PropsWithChildren<any>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
