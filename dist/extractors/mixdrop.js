"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../models");
class MixDrop extends models_1.VideoExtractor {
    constructor() {
        super(...arguments);
        this.serverName = 'MixDrop';
        this.sources = [];
        this.extract = async (videoUrl) => {
            try {
                const { data } = await axios_1.default.get(videoUrl.href);
                const formated = eval(/(eval)(\(f.*?)(\n<\/script>)/s.exec(data)[2].replace('eval', ''));
                const [poster, source] = formated
                    .match(/poster="([^"]+)"|wurl="([^"]+)"/g)
                    .map((x) => x.split(`="`)[1].replace(/"/g, ''))
                    .map((x) => (x.startsWith('http') ? x : `https:${x}`));
                this.sources.push({
                    url: source,
                    isM3U8: source.includes('.m3u8'),
                    poster: poster,
                });
                return this.sources;
            }
            catch (err) {
                throw new Error(err.message);
            }
        };
    }
}
exports.default = MixDrop;
//# sourceMappingURL=mixdrop.js.map