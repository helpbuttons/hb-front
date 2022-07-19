export interface ITemplateButton {
//JSON template contains info about the image and the description (standard) and also about booleans, radius, checklist and every other field related to the network module
  id: any,
  name: string,
  type: "need" | "exchange" | "offer",
  fields: {},
  owner: number,
}
