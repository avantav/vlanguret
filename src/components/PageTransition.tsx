'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Only animate for project pages navigation
    const isProjectPage = pathname?.startsWith('/projects');
    
    if (isProjectPage) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  return (
    <div className="relative">
      {/* Folder Animation Overlay - Only for project pages */}
      {pathname?.startsWith('/projects') && (
        <div
          className={`fixed inset-0 z-50 pointer-events-none ${
            isTransitioning ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300 ease-in-out`}
        >
          <div className="absolute inset-0 bg-wood-100/80 backdrop-blur-[2px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`transform transition-all duration-300 ${
              isTransitioning ? 'scale-100 rotate-0' : 'scale-90 rotate-[-5deg]'
            }`}>
              <svg
                className="w-20 h-20 text-wood-600/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Content with fade animation */}
      <div
        className={`transition-opacity duration-500 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {displayChildren}
      </div>
    </div>
  );
};

export default PageTransition;

