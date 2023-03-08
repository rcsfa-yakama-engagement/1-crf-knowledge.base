/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/crypt/crypt.js
var require_crypt = __commonJS({
  "node_modules/crypt/crypt.js"(exports, module2) {
    (function() {
      var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", crypt = {
        rotl: function(n, b) {
          return n << b | n >>> 32 - b;
        },
        rotr: function(n, b) {
          return n << 32 - b | n >>> b;
        },
        endian: function(n) {
          if (n.constructor == Number) {
            return crypt.rotl(n, 8) & 16711935 | crypt.rotl(n, 24) & 4278255360;
          }
          for (var i = 0; i < n.length; i++)
            n[i] = crypt.endian(n[i]);
          return n;
        },
        randomBytes: function(n) {
          for (var bytes = []; n > 0; n--)
            bytes.push(Math.floor(Math.random() * 256));
          return bytes;
        },
        bytesToWords: function(bytes) {
          for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
            words[b >>> 5] |= bytes[i] << 24 - b % 32;
          return words;
        },
        wordsToBytes: function(words) {
          for (var bytes = [], b = 0; b < words.length * 32; b += 8)
            bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
          return bytes;
        },
        bytesToHex: function(bytes) {
          for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 15).toString(16));
          }
          return hex.join("");
        },
        hexToBytes: function(hex) {
          for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
          return bytes;
        },
        bytesToBase64: function(bytes) {
          for (var base64 = [], i = 0; i < bytes.length; i += 3) {
            var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
            for (var j = 0; j < 4; j++)
              if (i * 8 + j * 6 <= bytes.length * 8)
                base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63));
              else
                base64.push("=");
          }
          return base64.join("");
        },
        base64ToBytes: function(base64) {
          base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
          for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
            if (imod4 == 0)
              continue;
            bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
          }
          return bytes;
        }
      };
      module2.exports = crypt;
    })();
  }
});

// node_modules/charenc/charenc.js
var require_charenc = __commonJS({
  "node_modules/charenc/charenc.js"(exports, module2) {
    var charenc = {
      utf8: {
        stringToBytes: function(str) {
          return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
        },
        bytesToString: function(bytes) {
          return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
        }
      },
      bin: {
        stringToBytes: function(str) {
          for (var bytes = [], i = 0; i < str.length; i++)
            bytes.push(str.charCodeAt(i) & 255);
          return bytes;
        },
        bytesToString: function(bytes) {
          for (var str = [], i = 0; i < bytes.length; i++)
            str.push(String.fromCharCode(bytes[i]));
          return str.join("");
        }
      }
    };
    module2.exports = charenc;
  }
});

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports, module2) {
    module2.exports = function(obj) {
      return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
    };
    function isBuffer(obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    }
    function isSlowBuffer(obj) {
      return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
    }
  }
});

// node_modules/md5/md5.js
var require_md5 = __commonJS({
  "node_modules/md5/md5.js"(exports, module2) {
    (function() {
      var crypt = require_crypt(), utf8 = require_charenc().utf8, isBuffer = require_is_buffer(), bin = require_charenc().bin, md52 = function(message, options) {
        if (message.constructor == String)
          if (options && options.encoding === "binary")
            message = bin.stringToBytes(message);
          else
            message = utf8.stringToBytes(message);
        else if (isBuffer(message))
          message = Array.prototype.slice.call(message, 0);
        else if (!Array.isArray(message) && message.constructor !== Uint8Array)
          message = message.toString();
        var m = crypt.bytesToWords(message), l = message.length * 8, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
        for (var i = 0; i < m.length; i++) {
          m[i] = (m[i] << 8 | m[i] >>> 24) & 16711935 | (m[i] << 24 | m[i] >>> 8) & 4278255360;
        }
        m[l >>> 5] |= 128 << l % 32;
        m[(l + 64 >>> 9 << 4) + 14] = l;
        var FF = md52._ff, GG = md52._gg, HH = md52._hh, II = md52._ii;
        for (var i = 0; i < m.length; i += 16) {
          var aa = a, bb = b, cc = c, dd = d;
          a = FF(a, b, c, d, m[i + 0], 7, -680876936);
          d = FF(d, a, b, c, m[i + 1], 12, -389564586);
          c = FF(c, d, a, b, m[i + 2], 17, 606105819);
          b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
          a = FF(a, b, c, d, m[i + 4], 7, -176418897);
          d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
          c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
          b = FF(b, c, d, a, m[i + 7], 22, -45705983);
          a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
          d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
          c = FF(c, d, a, b, m[i + 10], 17, -42063);
          b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
          a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
          d = FF(d, a, b, c, m[i + 13], 12, -40341101);
          c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
          b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
          a = GG(a, b, c, d, m[i + 1], 5, -165796510);
          d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
          c = GG(c, d, a, b, m[i + 11], 14, 643717713);
          b = GG(b, c, d, a, m[i + 0], 20, -373897302);
          a = GG(a, b, c, d, m[i + 5], 5, -701558691);
          d = GG(d, a, b, c, m[i + 10], 9, 38016083);
          c = GG(c, d, a, b, m[i + 15], 14, -660478335);
          b = GG(b, c, d, a, m[i + 4], 20, -405537848);
          a = GG(a, b, c, d, m[i + 9], 5, 568446438);
          d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
          c = GG(c, d, a, b, m[i + 3], 14, -187363961);
          b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
          a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
          d = GG(d, a, b, c, m[i + 2], 9, -51403784);
          c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
          b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
          a = HH(a, b, c, d, m[i + 5], 4, -378558);
          d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
          c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
          b = HH(b, c, d, a, m[i + 14], 23, -35309556);
          a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
          d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
          c = HH(c, d, a, b, m[i + 7], 16, -155497632);
          b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
          a = HH(a, b, c, d, m[i + 13], 4, 681279174);
          d = HH(d, a, b, c, m[i + 0], 11, -358537222);
          c = HH(c, d, a, b, m[i + 3], 16, -722521979);
          b = HH(b, c, d, a, m[i + 6], 23, 76029189);
          a = HH(a, b, c, d, m[i + 9], 4, -640364487);
          d = HH(d, a, b, c, m[i + 12], 11, -421815835);
          c = HH(c, d, a, b, m[i + 15], 16, 530742520);
          b = HH(b, c, d, a, m[i + 2], 23, -995338651);
          a = II(a, b, c, d, m[i + 0], 6, -198630844);
          d = II(d, a, b, c, m[i + 7], 10, 1126891415);
          c = II(c, d, a, b, m[i + 14], 15, -1416354905);
          b = II(b, c, d, a, m[i + 5], 21, -57434055);
          a = II(a, b, c, d, m[i + 12], 6, 1700485571);
          d = II(d, a, b, c, m[i + 3], 10, -1894986606);
          c = II(c, d, a, b, m[i + 10], 15, -1051523);
          b = II(b, c, d, a, m[i + 1], 21, -2054922799);
          a = II(a, b, c, d, m[i + 8], 6, 1873313359);
          d = II(d, a, b, c, m[i + 15], 10, -30611744);
          c = II(c, d, a, b, m[i + 6], 15, -1560198380);
          b = II(b, c, d, a, m[i + 13], 21, 1309151649);
          a = II(a, b, c, d, m[i + 4], 6, -145523070);
          d = II(d, a, b, c, m[i + 11], 10, -1120210379);
          c = II(c, d, a, b, m[i + 2], 15, 718787259);
          b = II(b, c, d, a, m[i + 9], 21, -343485551);
          a = a + aa >>> 0;
          b = b + bb >>> 0;
          c = c + cc >>> 0;
          d = d + dd >>> 0;
        }
        return crypt.endian([a, b, c, d]);
      };
      md52._ff = function(a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._gg = function(a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._hh = function(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._ii = function(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
        return (n << s | n >>> 32 - s) + b;
      };
      md52._blocksize = 16;
      md52._digestsize = 16;
      module2.exports = function(message, options) {
        if (message === void 0 || message === null)
          throw new Error("Illegal argument " + message);
        var digestbytes = crypt.wordsToBytes(md52(message, options));
        return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
      };
    })();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MarkdownExportPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");
var path2 = __toESM(require("path"));

// src/config.ts
var ATTACHMENT_URL_REGEXP = /!\[\[((.*?)\.(\w+))\]\]/g;
var EMBED_URL_REGEXP = /!\[\[(.*?)\]\]/g;
var GMT_IMAGE_FORMAT = "![]({0})";
var DEFAULT_SETTINGS = {
  output: "output",
  attachment: "attachment",
  GTM: true
};

// src/utils.ts
var path = __toESM(require("path"));
var import_md5 = __toESM(require_md5());
var import_obsidian = require("obsidian");
async function getImageLinks(markdown) {
  const imageLinks = markdown.matchAll(ATTACHMENT_URL_REGEXP);
  return Array.from(imageLinks);
}
async function getEmbeds(markdown) {
  const embeds = markdown.matchAll(EMBED_URL_REGEXP);
  return Array.from(embeds);
}
function allMarkdownParams(file, out, outputSubPath = ".", parentPath = "") {
  try {
    if (!file.extension) {
      for (const absFile of file.children) {
        if (!absFile.extension) {
          const extname2 = absFile.path.replace(file.path, "").slice(1);
          const outputSubPath2 = path.join(parentPath, extname2);
          allMarkdownParams(absFile, out, outputSubPath2, outputSubPath2);
        } else {
          out.push({
            file: absFile,
            outputSubPath
          });
        }
      }
    } else {
      out.push({
        file,
        outputSubPath
      });
    }
  } catch (e) {
    console.warn("Path Error:" + parentPath);
  }
  return out;
}
async function tryRun(plugin, file) {
  try {
    const params = allMarkdownParams(file, []);
    for (const param of params) {
      await tryCopyMarkdownByRead(plugin, param);
    }
  } catch (error) {
    if (!error.message.contains("file already exists")) {
      throw error;
    }
  }
}
async function tryCreateFolder(plugin, path3) {
  try {
    await plugin.app.vault.createFolder(path3);
  } catch (error) {
    if (!error.message.contains("Folder already exists")) {
      throw error;
    }
  }
}
async function tryCopyImage(plugin, contentPath) {
  try {
    await plugin.app.vault.adapter.read(contentPath).then(async (content) => {
      const imageLinks = await getImageLinks(content);
      for (const index in imageLinks) {
        const imageLink = imageLinks[index][1];
        const imageLinkMd5 = (0, import_md5.default)(imageLink);
        const imageExt = path.extname(imageLink);
        const ifile = plugin.app.metadataCache.getFirstLinkpathDest(imageLink, contentPath);
        if (ifile) {
          plugin.app.vault.adapter.copy(ifile.path, path.join(plugin.settings.output, plugin.settings.attachment, imageLinkMd5.concat(imageExt))).catch((error) => {
            if (!error.message.contains("file already exists")) {
              throw error;
            }
          });
        }
      }
    });
  } catch (error) {
    if (!error.message.contains("file already exists")) {
      throw error;
    }
  }
}
async function getEmbedMap(plugin, content, path3) {
  const embedMap = /* @__PURE__ */ new Map();
  const embedList = Array.from(document.documentElement.getElementsByClassName("internal-embed"));
  Array.from(embedList).forEach((el) => {
    const embedContentHtml = el.getElementsByClassName("markdown-embed-content")[0];
    if (embedContentHtml) {
      let embedValue = (0, import_obsidian.htmlToMarkdown)(embedContentHtml.innerHTML);
      embedValue = "> " + embedValue.replaceAll("# \n\n", "# ").replaceAll("\n", "\n> ");
      const embedKey = el.getAttribute("src");
      embedMap.set(embedKey, embedValue);
    }
  });
  return embedMap;
}
async function tryCopyMarkdownByRead(plugin, { file, outputSubPath = "." }) {
  try {
    await plugin.app.vault.adapter.read(file.path).then(async (content) => {
      const imageLinks = await getImageLinks(content);
      for (const index in imageLinks) {
        const rawImageLink = imageLinks[index][0];
        const imageLink = imageLinks[index][1];
        const imageLinkMd5 = (0, import_md5.default)(imageLink);
        const imageExt = path.extname(imageLink);
        const hashLink = path.join(plugin.settings.attachment, imageLinkMd5.concat(imageExt));
        if (plugin.settings.GTM) {
          content = content.replace(rawImageLink, GMT_IMAGE_FORMAT.format(hashLink));
        } else {
          content = content.replace(imageLink, hashLink);
        }
      }
      const cfile = plugin.app.workspace.getActiveFile();
      if (cfile != void 0) {
        const embedMap = await getEmbedMap(plugin, content, cfile.path);
        const embeds = await getEmbeds(content);
        for (const index in embeds) {
          const url = embeds[index][1];
          content = content.replace(embeds[index][0], embedMap.get(url));
        }
      }
      await tryCopyImage(plugin, file.path);
      await tryCreateFolder(plugin, path.join(plugin.settings.output, outputSubPath));
      plugin.app.vault.adapter.write(path.join(plugin.settings.output, outputSubPath, file.name), content);
    });
  } catch (error) {
    if (!error.message.contains("file already exists")) {
      throw error;
    }
  }
}

// src/main.ts
var MarkdownExportPlugin = class extends import_obsidian2.Plugin {
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new MarkdownExportSettingTab(this.app, this));
    this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => {
      const addMenuItem = (item) => {
        item.setTitle("Export all to package");
        item.onClick(async () => {
          await tryCreateFolder(this, path2.join(this.settings.output, this.settings.attachment));
          await tryRun(this, file);
          new import_obsidian2.Notice(`Exporting ${file.path} to ${path2.join(this.settings.output, file.name)}`);
        });
      };
      menu.addItem(addMenuItem);
    }));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var MarkdownExportSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Markdown Export" });
    new import_obsidian2.Setting(containerEl).setName("Custom default output path").setDesc("default directory for one-click export").addText((text) => text.setPlaceholder("Enter default output path").setValue(this.plugin.settings.output).onChange(async (value) => {
      this.plugin.settings.output = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName("Custom attachment path(optional)").setDesc("attachment path").addText((text) => text.setPlaceholder("Enter attachment path").setValue(this.plugin.settings.attachment).onChange(async (value) => {
      this.plugin.settings.output = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName("Use GitHub Flavored Markdown Format").setDesc("The format of markdown is more inclined to choose Github Flavored Markdown").addToggle((toggle) => toggle.setValue(this.plugin.settings.GTM).onChange(async (value) => {
      this.plugin.settings.GTM = value;
      await this.plugin.saveSettings();
    }));
  }
};
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */