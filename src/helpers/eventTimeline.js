import randomColor from "randomcolor";

export const generateCleanDate = (testData) => {
  const processedArr = testData.map((item) => {
    const clone = { ...item };
    const convertedStart = clone.start.replace("-", "/");
    const convertedEnd = clone.end.replace("-", "/");

    clone.date = new Date(convertedStart);
    clone.end = new Date(convertedEnd);
    clone.title = clone.name;
    clone.description = clone.text;
    clone.color = randomColor();
    delete clone.name;
    delete clone.text;
    return clone;
  });
  return processedArr;
};

export const daysDifference = (d1, d2) => {
  var t2 = d2.getTime();
  var t1 = d1.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000));
};

// Illustration:
// 1)
// prevStartD                          prevEndD
// v                                        v
// #----------------------------------------#
//
//         #----------------------#
//         ^                      ^
//         startD              endD
//  startD >= startdate && endD <= enddate;

//
// 2)
// prevStartD     prevEndD
// v                v
// #----------------#
//
//         #----------------------#
//         ^                      ^
//         startD              endD
//
// 3)
//
//              prevStartD        prevEndD
//                 v                v
//                 #----------------#
//
//         #------------------#
//         ^                  ^
//       startD              endD
//  (startD >= startdate && startD <= enddate) ||
//        (startdate >= startD && startdate <= endD);

//position =>
// [
// 	[range, range,range],
// 	[range,range,range],
// 	[range]
// ]
//range => [id, start,end]

export const calculatePosition = ([id, start, end], position) => {
  const backTracking = () => {
    for (let row of position) {
      let validate = false;
      for (let i = 0; i < row.length; i++) {
        //compare
        const prevStartD = row[i][1].getTime();
        const prevEndD = row[i][2].getTime();
        const startD = start.getTime();
        const endD = end.getTime();

        const inBound =
          (prevStartD <= startD && endD <= prevEndD) ||
          (startD <= prevStartD && prevStartD <= endD) ||
          (startD <= prevEndD && prevEndD <= endD);

        if (inBound) {
          validate = true;
        }
      }

      if (validate) {
        //if doesn't fit go to a new row
        const newRow = [[id, start, end]];
        position.push(newRow);
        return;
      } else {
        row.push([id, start, end]);
        return;
      }
    }
  };
  if (!position.length) {
    position.push([]);
  }
  backTracking();
};
