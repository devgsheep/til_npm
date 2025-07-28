import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { lineData } from "../../apis/line_data";

function Line() {
  // js 자리
  const [data, setData] = useState([]);
  // 데이터 부르는 함수 만들기
  const getData = () => {
    try {
      // fetch를 이용한 데이터 호출
      const res = localStorage.getItem("line_data");
      const json = JSON.parse(res);
      // 데이터 갱신
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };
  // 로컬스토리지에 데이터 저장하기
  const saveData = () => {
    const tempData = [
      {
        id: "food",
        data: [
          { x: "hambuger", y: 123 }, //  { x: "hambuger", y: 123, date: "2025-07-21" } 날짜별
          { x: "chicken", y: 136 },
          { x: "pizza", y: 257 },
          { x: "피자", y: 122 },
          { x: "sandwich", y: 199 },
          { x: "bread", y: 170 },
          { x: "soup", y: 205 },
          { x: "cake", y: 297 },
          { x: "cookie", y: 118 },
          { x: "rice", y: 127 },
          { x: "meat", y: 32 },
          { x: "others", y: 264 },
        ],
      },
    ];
    const jsData = JSON.stringify(tempData);
    localStorage.setItem("line_data", jsData);
  };
  useEffect(() => {
    getData();
  }, []);
  // jsx 자리
  return (
    <div>
      <h1>Line Chart 예제</h1>
      <button onClick={saveData}>localstorage 저장하기</button>
      <div style={{ width: "100%", height: 600 }}>
        <ResponsiveLine /* or Line for fixed dimensions */
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          axisBottom={{ legend: "transportation", legendOffset: 36 }}
          axisLeft={{ legend: "count", legendOffset: -40 }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "seriesColor" }}
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              translateX: 100,
              itemWidth: 80,
              itemHeight: 22,
              symbolShape: "circle",
            },
          ]}
        />
        )
      </div>
    </div>
  );
}

export default Line;
