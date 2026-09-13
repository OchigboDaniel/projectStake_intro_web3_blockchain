function activityTable(day) {
  // Your code 
  return textFile("camera_logs.txt")
    .then(fileList => fileList.split("\n"))
    .then(filenames => Promise.all(filenames.map(textFile)))
    .then(contents => {
      for (let content of contents) {
        for (let line of content.split("\n")) {
          let date = new Date(Number(line));
          if (date.getDay() == day) {
            dayTable[date.getHours()]++;
          }
        }
      }
      return dayTable;
    });
}

activityTable(6)
  .then(table => console.log(activityGraph(table)));