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
    "revision": "227efa7965af7e2fb1f0b0966a7cf535"
  }, {
    "url": "/js//vendor.js",
    "revision": "186535c5032b285634919d9f310d2aec"
  }, {
    "url": "/js/0.js",
    "revision": "be840d03ce2eaafb79a6a964f7a7e459"
  }, {
    "url": "/js/1.js",
    "revision": "19c17f33d2ddb8b3c50049e5ceeca8df"
  }, {
    "url": "/js/10.js",
    "revision": "8ede55d7ba8d8fba08dca30b6d661479"
  }, {
    "url": "/js/11.js",
    "revision": "fc757b6b54fdfecae98a768336339f20"
  }, {
    "url": "/js/12.js",
    "revision": "92dc3ad605063aa65c52d8430f1ab2d0"
  }, {
    "url": "/js/13.js",
    "revision": "5b4ae32e7cbfa5dce040f73e73b37810"
  }, {
    "url": "/js/14.js",
    "revision": "ca859f9d8cd8bf98d6392c76d9aa8cdb"
  }, {
    "url": "/js/15.js",
    "revision": "bad8b53893e7cde29d574baef51eeaca"
  }, {
    "url": "/js/16.js",
    "revision": "29e1ebe1ca64fe81bca58dc6ab37a618"
  }, {
    "url": "/js/17.js",
    "revision": "6a82bbe460d933f704084d50b5b3ea21"
  }, {
    "url": "/js/18.js",
    "revision": "ecbab2d077e39be4886e0bd14bf95fe0"
  }, {
    "url": "/js/19.js",
    "revision": "6a0864152d3cb25d3930ed9146557015"
  }, {
    "url": "/js/2.js",
    "revision": "ad7b3f3471d54ba7953114f7d87ceeb6"
  }, {
    "url": "/js/20.js",
    "revision": "5e0c839dca41eeea1047121ff01d4779"
  }, {
    "url": "/js/21.js",
    "revision": "a190a3388c720574f45247cb588abf74"
  }, {
    "url": "/js/22.js",
    "revision": "e5535e254a0e539c16c0d1d57c85ae7d"
  }, {
    "url": "/js/23.js",
    "revision": "f6f1508c7876ba14944b47575f3bdbdc"
  }, {
    "url": "/js/24.js",
    "revision": "495a25abeb032c365518acca4b93ab8c"
  }, {
    "url": "/js/25.js",
    "revision": "7e56f8ee40ca3234c1ec7b17284e6d92"
  }, {
    "url": "/js/26.js",
    "revision": "20c8b9cb912d0c10088aafddca971ffb"
  }, {
    "url": "/js/27.js",
    "revision": "fe100dfd934f8120985106182da628ca"
  }, {
    "url": "/js/28.js",
    "revision": "7ebfcc262628241f325b0d205e18a089"
  }, {
    "url": "/js/29.js",
    "revision": "01b6dc434ba0d17796a915184e0e0308"
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
    "revision": "9445bf618252713a375e464c9e57659a"
  }, {
    "url": "/js/35.js",
    "revision": "8c6b55c740010b2c9c16bee13d5d3dfb"
  }, {
    "url": "/js/36.js",
    "revision": "df2f2d7f6a65488a379faf0c82896a81"
  }, {
    "url": "/js/37.js",
    "revision": "63a5a82c382f4c1f9ffd2b487f9b8964"
  }, {
    "url": "/js/38.js",
    "revision": "a6033c9d961a3ec1e1e193494d96f1c1"
  }, {
    "url": "/js/39.js",
    "revision": "8a449f64e8f94c6e5ba76932ba0260a1"
  }, {
    "url": "/js/4.js",
    "revision": "734e1d7e38a2a92da65dd9f258fc1ba0"
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
    "url": "/js/48.js",
    "revision": "0212973359b75c7eb8870f9dbcb9c320"
  }, {
    "url": "/js/49.js",
    "revision": "eb4b6588feb1156dcd79400c722308f9"
  }, {
    "url": "/js/5.js",
    "revision": "dc3220881b5a86feefef7d42a47e576f"
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
    "revision": "6bc4b8c735f40576b0c5fdb37d128f40"
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
    "url": "/js/6.js",
    "revision": "612298418988333fc9076de3004e96b6"
  }, {
    "url": "/js/7.js",
    "revision": "be1a729ef2d2cbc97430c07df4a9cb44"
  }, {
    "url": "/js/8.js",
    "revision": "f0fa59512da55b9fca2605c988a6fc83"
  }, {
    "url": "/js/9.js",
    "revision": "180d49e4782994f2f63e8f4b435a6a06"
  }, {
    "url": "/js/AboutMeTabProfile.js",
    "revision": "594d713ef91e5a2451d20921565fa937"
  }, {
    "url": "/js/ContactTabProfile.js",
    "revision": "5f28554a9beac390f930cf101d535c00"
  }, {
    "url": "/js/LawsModal.js",
    "revision": "9d2c0c7d5c25a95e306d0f5d2f1e9b8e"
  }, {
    "url": "/js/LikesModal.js",
    "revision": "c37b1c4761ad8f72eb8f5a15a6cdc057"
  }, {
    "url": "/js/NewPostCard.js",
    "revision": "ae840d0be1daa306f40f1cf0f230f24a"
  }, {
    "url": "/js/NewPostModal.js",
    "revision": "24e7285e2ad134e83616f747624c6110"
  }, {
    "url": "/js/TextareaAutosize.js",
    "revision": "f42d5bcc56ba937c53ce376adf075bb4"
  }, {
    "url": "/js/Tselect.js",
    "revision": "03cc888eaa85c94082846d1022a974fa"
  }, {
    "url": "/js/UserInfoCard.js",
    "revision": "598ec111e755376c9847dfaf9bf8db13"
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
