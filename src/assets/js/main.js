const dom = require("./vendor/dom");
import { Navigation } from "./main/navigation";

dom.documentReady(() => new Navigation().init());
