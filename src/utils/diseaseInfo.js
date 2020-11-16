export function getDesFromClassification(classification) {
  const map = {
    0: "正常",
    1: "疲劳",
    2: "炎性改变",
    3: "颈椎负荷过重",
    4: "颈肩综合症，颈椎退行性，颈椎病",
    100: "",
  };
  return map[classification];
}
