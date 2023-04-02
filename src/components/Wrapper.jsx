import React from "react";

const Wrapper = ({ children, title }) => {
  return (
    <div>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <h2>{title ? title : ""}</h2>
          <div className="px-4 py-6 sm:px-0">{children}</div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};

export default Wrapper;
