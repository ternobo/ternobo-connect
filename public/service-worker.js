/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-3b8b670f'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "//manifest.js",
    "revision": "2ee59c95c3b228fb7c5cb69b42d0a2b5"
  }, {
    "url": "/js//vendor.js",
    "revision": "186535c5032b285634919d9f310d2aec"
  }, {
    "url": "/js/0.js",
    "revision": "be840d03ce2eaafb79a6a964f7a7e459"
  }, {
    "url": "/js/1.js",
    "revision": "582bd948016edeca204fb72b4ae147e3"
  }, {
    "url": "/js/10.js",
    "revision": "8ede55d7ba8d8fba08dca30b6d661479"
  }, {
    "url": "/js/11.js",
    "revision": "fc757b6b54fdfecae98a768336339f20"
  }, {
    "url": "/js/12.js",
    "revision": "8fb39119f3d9539b1b503f2678abcbe9"
  }, {
    "url": "/js/13.js",
    "revision": "ad79129af5c0e8846a16b40af8153bb4"
  }, {
    "url": "/js/14.js",
    "revision": "ca859f9d8cd8bf98d6392c76d9aa8cdb"
  }, {
    "url": "/js/15.js",
    "revision": "6a96e4ff4314e0a1440fe7a7a68bdace"
  }, {
    "url": "/js/16.js",
    "revision": "ce0f9be29962ab0fa61e4e54af89a902"
  }, {
    "url": "/js/19.js",
    "revision": "c072b22f6a6403f6e02df57290a1f4d4"
  }, {
    "url": "/js/2.js",
    "revision": "ad7b3f3471d54ba7953114f7d87ceeb6"
  }, {
    "url": "/js/20.js",
    "revision": "476698a0727cd23ca9cf268043bfcbe4"
  }, {
    "url": "/js/22.js",
    "revision": "a2b93940ecd5b2e1c0f4538e572b3f26"
  }, {
    "url": "/js/25.js",
    "revision": "602b7d4363089b01711832e7f2df5e7d"
  }, {
    "url": "/js/26.js",
    "revision": "88af204d78d10827a394778da187fe1a"
  }, {
    "url": "/js/29.js",
    "revision": "8f12035e06d7b14acbc23d9b19e07537"
  }, {
    "url": "/js/3.js",
    "revision": "b3d1e7d3a7cbbba662e388158382036b"
  }, {
    "url": "/js/30.js",
    "revision": "2a9c4b49d1d5352f6f67a30ec5c9cd86"
  }, {
    "url": "/js/31.js",
    "revision": "3b53f3210601461c92249827a22d643f"
  }, {
    "url": "/js/32.js",
    "revision": "b169935f513c922206e6f19adcb3774b"
  }, {
    "url": "/js/33.js",
    "revision": "0e79a9cfb3cd5edc17356b84fd6ab769"
  }, {
    "url": "/js/34.js",
    "revision": "3ccad5f387cbd0317725b22caf78c8d0"
  }, {
    "url": "/js/36.js",
    "revision": "7021515366a97973c02564189240a50a"
  }, {
    "url": "/js/38.js",
    "revision": "7acd89355e238b85e43912d70ffadeb1"
  }, {
    "url": "/js/39.js",
    "revision": "0eed46d9bbba18edb8e8a78cde4eac65"
  }, {
    "url": "/js/40.js",
    "revision": "d293e0ad3b9216e6f0ef782b1579ff77"
  }, {
    "url": "/js/41.js",
    "revision": "5314e81f036a68ff32f7375a05dce904"
  }, {
    "url": "/js/42.js",
    "revision": "140e723b70ef5d22bf5270a8a1de0b9e"
  }, {
    "url": "/js/43.js",
    "revision": "53ea5340e481446075416ceb3bd7b0a3"
  }, {
    "url": "/js/44.js",
    "revision": "2d7c5e1cdf84a4348ecb85fc21af3e6f"
  }, {
    "url": "/js/45.js",
    "revision": "48c2223244ba08e1d86f030685294874"
  }, {
    "url": "/js/46.js",
    "revision": "2b6ee3051ef272fb91fda88e18f8b4c4"
  }, {
    "url": "/js/47.js",
    "revision": "84a5af848bdede2135ec5acab55abe9f"
  }, {
    "url": "/js/5.js",
    "revision": "5d033d39d285f97a1f08219054b599f2"
  }, {
    "url": "/js/50.js",
    "revision": "874b4dc5cb96ad7bba02188995f27631"
  }, {
    "url": "/js/51.js",
    "revision": "76ba6838e6a076d7293c51abf4e84309"
  }, {
    "url": "/js/52.js",
    "revision": "d51b5b554da1fe5ba527f1c87232f93c"
  }, {
    "url": "/js/53.js",
    "revision": "afa1ae5c213d1557e6cc63495d7d57b7"
  }, {
    "url": "/js/54.js",
    "revision": "78eb3e5dbea443dd92d077aea0770227"
  }, {
    "url": "/js/55.js",
    "revision": "eca6e4540abf48a1eccd784a5be680b7"
  }, {
    "url": "/js/56.js",
    "revision": "927ad693a7a3d4826867533f59fb2f43"
  }, {
    "url": "/js/57.js",
    "revision": "56908ece0856b1ea017fd42ee7817a58"
  }, {
    "url": "/js/58.js",
    "revision": "d5687371b67daa7dd0dfbd3fbca577b7"
  }, {
    "url": "/js/59.js",
    "revision": "50d96f65339b2c4c47bcf3291f1bd554"
  }, {
    "url": "/js/6.js",
    "revision": "13f3cad962a1533d787b68b41471491e"
  }, {
    "url": "/js/60.js",
    "revision": "ada1ec20d42ed314c1ce7ddb9ff9f448"
  }, {
    "url": "/js/61.js",
    "revision": "c58224809ec7d5f55ff2f42ac06d8e3d"
  }, {
    "url": "/js/62.js",
    "revision": "8ae6fa8895ae4c0de5b23f65afc6bdc4"
  }, {
    "url": "/js/63.js",
    "revision": "c88446895cffc7fed7049acf47987d82"
  }, {
    "url": "/js/64.js",
    "revision": "b6b93435dc0cc0355721b7c5e589148c"
  }, {
    "url": "/js/65.js",
    "revision": "a1056f8218ac8cfcd2fa7fd343238945"
  }, {
    "url": "/js/66.js",
    "revision": "50cb8b30a20cea629e7eae7573deaf4f"
  }, {
    "url": "/js/67.js",
    "revision": "8c85633b0d88d9c56a7e4e4485280f27"
  }, {
    "url": "/js/68.js",
    "revision": "6736340e0a5fad908e6c85a0945e0720"
  }, {
    "url": "/js/69.js",
    "revision": "8f6fa0f28fbff913fb0a11098849d19d"
  }, {
    "url": "/js/7.js",
    "revision": "be1a729ef2d2cbc97430c07df4a9cb44"
  }, {
    "url": "/js/8.js",
    "revision": "8f6f85d59afa4c6841497f44c84ad682"
  }, {
    "url": "/js/9.js",
    "revision": "e6e3b538191650d6365ce18dad89e3f4"
  }, {
    "url": "/js/AboutMeTabProfile.js",
    "revision": "e06628eb60eb4dec3f181a186b2fb40d"
  }, {
    "url": "/js/ContactTabProfile.js",
    "revision": "5f28554a9beac390f930cf101d535c00"
  }, {
    "url": "/js/LawsModal.js",
    "revision": "9d2c0c7d5c25a95e306d0f5d2f1e9b8e"
  }, {
    "url": "/js/LikesModal.js",
    "revision": "091b82c46dc6edd82db159da089b603f"
  }, {
    "url": "/js/NewPostCard.js",
    "revision": "27f2da2140681ded1cee2e9a31ac6336"
  }, {
    "url": "/js/NewPostModal.js",
    "revision": "8e8280b1a3bf65a3f009c8a5f087ed5a"
  }, {
    "url": "/js/TextareaAutosize.js",
    "revision": "f42d5bcc56ba937c53ce376adf075bb4"
  }, {
    "url": "/js/Tselect.js",
    "revision": "03cc888eaa85c94082846d1022a974fa"
  }, {
    "url": "/js/UserInfoCard.js",
    "revision": "5192dfce6a9a6766b248395e77046e60"
  }, {
    "url": "/js/vendors~ContactTabProfile.js",
    "revision": "bc67c5354c542f16fa1f22617a041dd8"
  }, {
    "url": "/js/vendors~draggable.js",
    "revision": "687d2da7beccbee942b901b35e3e0812"
  }, {
    "url": "/js/vue-persian-datetime-picker.js",
    "revision": "89bc184ade0901462b9eef44955088c2"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
