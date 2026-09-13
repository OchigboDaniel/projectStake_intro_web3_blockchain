async function activityTable(day) {
  let logFileList = await textFile("camera_logs.txt");
  // Your code here
  let dayTable = new Array(24).fill(0);

  for (let filename of logFileList.split("\n")) {
    let logLines = (await textFile(filename)).split("\n");
    for (let line of logLines) {
      let timestamp = Number(line);
      let date = new Date(timestamp);
      if (date.getDay() == day) {
        dayTable[date.getHours()]++;
      }
    }
  }
  return dayTable;
}

activityTable(1)
  .then(table => console.log(activityGraph(table)));