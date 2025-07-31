import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { lineData } from "../../apis/line_data";

function Line() {
  // js 자리
  const [data, setData] = useState([]);
  // 데이터 부르는 함수 만들기
  const getData = async () => {
    try {
      // fetch 를 이용한 데이터 호출
      const res = await fetch("/line_data.json");
      const json = await res.json();
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
        id: "point1",
        data: [
          { x: "좋음", y: 5 },
          { x: "치킨", y: 78 },
          { x: "boat", y: 276 },
          { x: "train", y: 55 },
          { x: "subway", y: 144 },
          { x: "bus", y: 216 },
          { x: "car", y: 253 },
          { x: "moto", y: 102 },
          { x: "bicycle", y: 156 },
          { x: "horse", y: 131 },
          { x: "skateboard", y: 147 },
          { x: "others", y: 232 },
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
      <h1>Line 차트 예제</h1>
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
      </div>
    </div>
  );
}

export default Line;
