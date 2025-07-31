import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { barData } from "../../apis/bar_data";

function Bar() {
  // js 자리
  const [data, setData] = useState([]);

  // 화면보일때 셋팅
  useEffect(() => {
    setData(barData);
  }, []);
  // jsx 자리
  return (
    <div>
      <h1>Bar 차트 예제</h1>
      <div style={{ width: "100%", height: 600 }}>
        <ResponsiveBar /* or Bar for fixed dimensions */
          data={data}
          keys={["point"]}
          indexBy="date"
          labelSkipWidth={12}
          labelSkipHeight={12}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              translateX: 120,
              itemsSpacing: 3,
              itemWidth: 100,
              itemHeight: 16,
            },
          ]}
          axisBottom={{ legend: "country (indexBy)", legendOffset: 32 }}
          axisLeft={{ legend: "food", legendOffset: -40 }}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        />
      </div>
    </div>
  );
}

export default Bar;
