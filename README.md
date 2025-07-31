# Nivo Chart

- https://nivo.rocks
- https://github.com/plouc/nivo#readme

## 1. 기본형 설치

```bash
npm i @nivo/core --force
```

## 2. Line Chart 설치

```bash
npm i @nivo/line --force
```

- 실제 회사에서는 fetch 로 호출해서 사용함.

```jsx
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
  useEffect(() => {
    getData();
  }, []);
  // jsx 자리
  return (
    <div>
      <h1>Line 차트 예제</h1>
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
```

- 로컬스토리지로 우선 진행하기
- 기억해야 할 사항
  - `localstorage.getItem(이름)`
  - `localstorage.setItem(이름, 데이터)`

```jsx
import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { lineData } from "../../apis/line_data";

function Line() {
  // js 자리
  const [data, setData] = useState([]);
  // 데이터 부르는 함수 만들기
  const getData = () => {
    try {
      // fetch 를 이용한 데이터 호출
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
```

## 3. Bar Chart 설치

```bash
npm i @nivo/bar --force
```

```jsx
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
          keys={["burger", "sandwich", "kebab", "fries", "donut"]}
          indexBy="country"
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
```

## 응용예제

- 채현님 예

```jsx
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
```

```json
[
  {
    "id": "monthcook",
    "data": [
      {
        "x": "1월",
        "y": 3
      },
      {
        "x": "2월",
        "y": 8
      },
      {
        "x": "3월",
        "y": 2
      },
      {
        "x": "4월",
        "y": 20
      },
      {
        "x": "5월",
        "y": 10
      },
      {
        "x": "6월",
        "y": 11
      },
      {
        "x": "7월",
        "y": 5
      }
    ]
  }
]
```

- 지양님 예제

```jsx
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
```

```js
export const barData = [
  {
    date: "2025-07-07",
    point: 62,
  },
  {
    date: "2025-07-08",
    point: 32,
  },
  {
    date: "2025-07-09",
    point: 72,
  },
  {
    date: "2025-07-10",
    point: 22,
  },
];
```
