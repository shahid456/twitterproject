import React from "react";
export function FindMin(data) {
  let min = 0;
  if (data.length != 0) {
    min = data[0]["id"];
  }
  for (let k = 0; k < data.length; k++) {
    if (data[k]["id"] < min) {
      min = data[k]["id"];
    }
  }
  return min;
}
