const mergeFiles = require('merge-files');

  const outputPath = __dirname + '/index.html';
 
  const inputPathList = [
      __dirname + '/start.txt',
      __dirname + '/data.txt',
      __dirname + '/end.txt'
  ];
   
  // status: true or false
  const status = mergeFiles(inputPathList, outputPath);
  // or
//   mergeFiles(inputPathList, outputPath).then((status) => {
//       // next
//   });