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
    "url": "//css/app.css",
    "revision": "82b7a5fe0f9407ec76cfd99aa1d2f767"
  }, {
    "url": "//manifest.js",
    "revision": "227efa7965af7e2fb1f0b0966a7cf535"
  }, {
    "url": "/js//vendor.js",
    "revision": "de2743ad5573bed06749a85cdea71d7e"
  }, {
    "url": "/js/0.js",
    "revision": "04bbc7bfa52370d238e00ce387782317"
  }, {
    "url": "/js/1.js",
    "revision": "11c4beb95973a9ecb67120c7dcb554e8"
  }, {
    "url": "/js/10.js",
    "revision": "8ede55d7ba8d8fba08dca30b6d661479"
  }, {
    "url": "/js/11.js",
    "revision": "fc757b6b54fdfecae98a768336339f20"
  }, {
    "url": "/js/12.js",
    "revision": "3373e3bb2828d8c2c939e2fb16ef39a0"
  }, {
    "url": "/js/13.js",
    "revision": "b804363080be59ea0df743439b605251"
  }, {
    "url": "/js/14.js",
    "revision": "0d1b906b44bd46efe0d1adb893144cd4"
  }, {
    "url": "/js/15.js",
    "revision": "34b557510b4001d498ba356df93c4300"
  }, {
    "url": "/js/16.js",
    "revision": "eba7ae369836c2cd6de8d419755ca254"
  }, {
    "url": "/js/17.js",
    "revision": "30e1208aff63f215c27602ce5caeb6c6"
  }, {
    "url": "/js/18.js",
    "revision": "665eb88ef88338e18ff576cde8fdf86c"
  }, {
    "url": "/js/19.js",
    "revision": "b8d60ff31cfcc3a76654cd0a35b66a9c"
  }, {
    "url": "/js/2.js",
    "revision": "3266a781e323375cf62ff8d621655a97"
  }, {
    "url": "/js/20.js",
    "revision": "6d74a82e57c211726eaba531ce76be10"
  }, {
    "url": "/js/21.js",
    "revision": "e35ba7284c82bed4a34fe699ad7c14db"
  }, {
    "url": "/js/22.js",
    "revision": "8a7894546a2c26793cc07c0a41737c14"
  }, {
    "url": "/js/23.js",
    "revision": "34519aeb4274685fb64803ead7300989"
  }, {
    "url": "/js/24.js",
    "revision": "597b6058ea1a99320498846e3c78a547"
  }, {
    "url": "/js/25.js",
    "revision": "da148ac9fd864baa47c014d3282165f8"
  }, {
    "url": "/js/26.js",
    "revision": "b0c197647690b577ab2494906b09c4d0"
  }, {
    "url": "/js/27.js",
    "revision": "ce4440c93a635748d3f0790ebea79202"
  }, {
    "url": "/js/28.js",
    "revision": "4c48bd30f07c75684f3e40cca25bf18f"
  }, {
    "url": "/js/29.js",
    "revision": "4c8ce92ec4716bbf68222b02ae69dadc"
  }, {
    "url": "/js/3.js",
    "revision": "b3d1e7d3a7cbbba662e388158382036b"
  }, {
    "url": "/js/30.js",
    "revision": "5e6d7c16abcc5feac11729925b61297d"
  }, {
    "url": "/js/31.js",
    "revision": "e3b2d0552463d75e9cf22f0167c06acf"
  }, {
    "url": "/js/32.js",
    "revision": "aef80a34cfdec882ed2af67a58960620"
  }, {
    "url": "/js/33.js",
    "revision": "5ce2479a6e7f370c0368556c0605f7a2"
  }, {
    "url": "/js/34.js",
    "revision": "f0dd3fad9f16bd8653ca59dd853afa3c"
  }, {
    "url": "/js/35.js",
    "revision": "adb7d7eff73730b92dba76ab7a5e7572"
  }, {
    "url": "/js/36.js",
    "revision": "c5565c1e8beea61b373df7cdd88de49d"
  }, {
    "url": "/js/37.js",
    "revision": "f633204d6c912b8f828bc698629a216f"
  }, {
    "url": "/js/38.js",
    "revision": "65e0fd70bb8983473742d2fe2107a718"
  }, {
    "url": "/js/39.js",
    "revision": "00d074474e20ef43b0f0bc8ef0552dcc"
  }, {
    "url": "/js/4.js",
    "revision": "77837aa8272046a77c48a26dfa2e5cc1"
  }, {
    "url": "/js/40.js",
    "revision": "7a49d3d05de66c4491bf009c1b3adf90"
  }, {
    "url": "/js/41.js",
    "revision": "de903138ab7b50bd188b24ce6476fddc"
  }, {
    "url": "/js/42.js",
    "revision": "2f9a9e6bff2700d751fbccf122c39a11"
  }, {
    "url": "/js/43.js",
    "revision": "998de8b33c03bd23a33398591fc827ab"
  }, {
    "url": "/js/44.js",
    "revision": "02abcba70bc42fe587fc45dbc084c1ee"
  }, {
    "url": "/js/45.js",
    "revision": "6ffa4f45928dfe012115019c407bbb51"
  }, {
    "url": "/js/46.js",
    "revision": "956c9237d2811c4908a3bd6daedb1dda"
  }, {
    "url": "/js/47.js",
    "revision": "2fa6e662259e2f8a3e348be1cb7b8a06"
  }, {
    "url": "/js/48.js",
    "revision": "9b2c718de5aa1875fa344918b6040634"
  }, {
    "url": "/js/49.js",
    "revision": "38899fcf2c7bc1717a6fbd335ec5bb16"
  }, {
    "url": "/js/5.js",
    "revision": "597291ba5813f85deadd96c8914056bf"
  }, {
    "url": "/js/50.js",
    "revision": "3118068d78b8c266e43f5a9ad8f8c0f1"
  }, {
    "url": "/js/51.js",
    "revision": "efb2d3df7c5c1564f4e66f734d23c1a3"
  }, {
    "url": "/js/52.js",
    "revision": "7d8b73f80bbf445a3a864383fdb35d1d"
  }, {
    "url": "/js/53.js",
    "revision": "35d60a2b51592be6d6ba6811be669dea"
  }, {
    "url": "/js/54.js",
    "revision": "62211146e192e6f8b0a0adab8281993f"
  }, {
    "url": "/js/55.js",
    "revision": "2eb0cd8c93e23cbc16119d50adb14629"
  }, {
    "url": "/js/6.js",
    "revision": "29d1ec4e3443e8ddb027211d33b0230e"
  }, {
    "url": "/js/7.js",
    "revision": "b1c7545610cdc35c27321e634fdab7d5"
  }, {
    "url": "/js/8.js",
    "revision": "45af1d5ab5b974eb6cd3e02d9734426f"
  }, {
    "url": "/js/9.js",
    "revision": "180d49e4782994f2f63e8f4b435a6a06"
  }, {
    "url": "/js/AboutMeTabProfile.js",
    "revision": "b6a5bdd2f6239babd3ddf067303ba243"
  }, {
    "url": "/js/ContactTabProfile.js",
    "revision": "3bbeb064573d2e6e4cf69dbd676aa86c"
  }, {
    "url": "/js/LawsModal.js",
    "revision": "9d2c0c7d5c25a95e306d0f5d2f1e9b8e"
  }, {
    "url": "/js/LikesModal.js",
    "revision": "a6730216e0172f91b95256880f6b9fdb"
  }, {
    "url": "/js/NewPostCard.js",
    "revision": "eee1d25a2513549bb946c0707dbd0d17"
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
