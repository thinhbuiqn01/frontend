import React from "react";

const PageComponent = ({ title, children }) => {
  return <div>
       <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              {children}
            </div>
            {/* /End replace */}
          </div>
        </main>
  </div>;
};

export default PageComponent;
