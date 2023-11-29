// 사용할 시간 단위
const translateUnit = {
  year: "년",
  month: "개월",
  date: "일",
  hour: "시간",
  min: "분"
};

/**
 * new Date를 통해 {year, month, date, hour, min} Object 로 반환하는 함수
 * @param {date} time new Date가 사용할 수 있는 시간
 * @returns - {year, month, date, hour, min} Object
 */
function changeDate(time) {
  const dataDate = new Date(time);

  const dateResult = {
    year: dataDate.getFullYear(),
    month: dataDate.getMonth() + 1,
    date: dataDate.getDate(),
    hour: dataDate.getHours(),
    min: dataDate.getMinutes()
  };

  return dateResult;
}

/**
 * letter에 출력해줄 시간 데이터를 반환하는 함수
 * @param {date} time new Date가 사용할 수 있는 시간
 * @returns 차이가 나는 시간을 반환 [ex) 1년 전, 5분 전 등]
 */
function expressLetterDate(time) {
  const dateObj = changeDate(time);
  const currentDate = changeDate(new Date());

  for (let key in translateUnit) {
    if (dateObj[key] !== currentDate[key]) {
      const difference = Math.abs(currentDate[key] - dateObj[key]);
      return `${difference}${translateUnit[key]} 전`;
    }
  }

  return "방금전";
}

export { changeDate, expressLetterDate };
