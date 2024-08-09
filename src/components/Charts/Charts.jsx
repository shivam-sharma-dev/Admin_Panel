// Charts.js

import React from "react";

const Charts = () => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL; // Use import.meta.env
  const chartIds = [
    import.meta.env.VITE_APP_CHARTID_1,
    import.meta.env.VITE_APP_CHARTID_2,
    import.meta.env.VITE_APP_CHARTID_3,
    import.meta.env.VITE_APP_CHARTID_4,
  ];

  return (
    <div className="flex flex-wrap gap-20 justify-between px-10">
      {chartIds.map((chartId, index) => (
        <div key={index} className="w-full max-w-[600px]">
          <iframe
            title={`Chart ${index + 1}`}
            src={`${baseUrl}/embed/charts?id=${chartId}&autoRefresh=true&theme=light`}
            className="w-full h-96 border-none rounded-lg"
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default Charts;