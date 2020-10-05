const dom = require("./vendor/dom");
import { Navigation } from "./main/navigation";

dom.documentReady(() => {
  const navigation = new Navigation();
});
