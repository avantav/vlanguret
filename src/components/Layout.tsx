'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: ReactNode;
  isHomePage?: boolean;
}

const Layout = ({ children, isHomePage = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow ${isHomePage ? '' : 'pt-20'}`}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
