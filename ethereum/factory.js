import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xE0DEef11f36aD82D013A44451fbBC251116E798F"
);
export default instance;
