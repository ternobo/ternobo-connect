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
    "revision": "3a6d14b8478b25d9210482f1536ed8f2"
  }, {
    "url": "/js/1.js",
    "revision": "524636445335f6aa2bdff70ed2a1c021"
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
    "revision": "ab3a999f23fe36de926cf0aa7067bdd3"
  }, {
    "url": "/js/14.js",
    "revision": "8015b8f72a0fdf81e7e029cb918cebcf"
  }, {
    "url": "/js/15.js",
    "revision": "32acc2fe068e28590ab58c4e57c85167"
  }, {
    "url": "/js/16.js",
    "revision": "74e6ca245c3206b629353fa213d6c8b1"
  }, {
    "url": "/js/17.js",
    "revision": "c542ab8c30943298388604cee6780d03"
  }, {
    "url": "/js/18.js",
    "revision": "624b7680713d9201d070e9f98f3b5dd5"
  }, {
    "url": "/js/19.js",
    "revision": "ba0811b42895823f89f2e9f9378346e2"
  }, {
    "url": "/js/2.js",
    "revision": "ad7b3f3471d54ba7953114f7d87ceeb6"
  }, {
    "url": "/js/20.js",
    "revision": "10e138b4c894ca9af8f7c5cbbd58c8e5"
  }, {
    "url": "/js/21.js",
    "revision": "193d4978e548241224554235ab85dee6"
  }, {
    "url": "/js/22.js",
    "revision": "fbb0e6e10a06a7958121997888112d68"
  }, {
    "url": "/js/23.js",
    "revision": "202b5b4c8406be8ca9124c5b9cac641f"
  }, {
    "url": "/js/24.js",
    "revision": "b21c99138f3122cc7fd22a8314939ec3"
  }, {
    "url": "/js/25.js",
    "revision": "495f346fdc71d0625e9d11f8550f988e"
  }, {
    "url": "/js/26.js",
    "revision": "f4225d8965569a59bb49cffa4a5559aa"
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
    "revision": "5909b24088fcb3ff9141f6441c4c50cf"
  }, {
    "url": "/js/33.js",
    "revision": "ef2f67c76b8382316b31a682772b0608"
  }, {
    "url": "/js/34.js",
    "revision": "4a1bc194e6cfe86fe2349c1529345f5a"
  }, {
    "url": "/js/35.js",
    "revision": "47cf97d181809340e5ec4af9109612c1"
  }, {
    "url": "/js/36.js",
    "revision": "4a701e63fdc8f5cc17bc4c85afd8d332"
  }, {
    "url": "/js/37.js",
    "revision": "afba1081bb1405be964cdc3ba80c7142"
  }, {
    "url": "/js/38.js",
    "revision": "22c26e09a2c94fda5af7986df5bed0ab"
  }, {
    "url": "/js/39.js",
    "revision": "eec0ed22d445c5ddb727b68ca254106b"
  }, {
    "url": "/js/4.js",
    "revision": "2b93cbed33094fffeb18be4faf11f35b"
  }, {
    "url": "/js/40.js",
    "revision": "b14600052b98266ab44bde8507f6fd34"
  }, {
    "url": "/js/41.js",
    "revision": "072d7c00d4ab5d66fc56351dd00834cf"
  }, {
    "url": "/js/42.js",
    "revision": "96b1fa8d539f8a5e684600833bb392c6"
  }, {
    "url": "/js/43.js",
    "revision": "0eb76f36edfa2594f5ee7f93f266b25a"
  }, {
    "url": "/js/44.js",
    "revision": "c5e2baed5d4ea4cf01b6d36c99ff7363"
  }, {
    "url": "/js/45.js",
    "revision": "cbd15a294d3a09b1994649b2a0cdf89e"
  }, {
    "url": "/js/46.js",
    "revision": "3874a2bb64629bb4cff0073db75cf3ba"
  }, {
    "url": "/js/47.js",
    "revision": "f54b004ca2031cdc25069a47800aa7c5"
  }, {
    "url": "/js/48.js",
    "revision": "77791e1ef72b5e937886001ffbdec457"
  }, {
    "url": "/js/49.js",
    "revision": "40ec19f17196ec66c85be8fe22b3bee5"
  }, {
    "url": "/js/5.js",
    "revision": "597291ba5813f85deadd96c8914056bf"
  }, {
    "url": "/js/50.js",
    "revision": "abcf69363a05b8330e33f9dd3a11c146"
  }, {
    "url": "/js/51.js",
    "revision": "8431a767f0b34853a656ab219bfe1584"
  }, {
    "url": "/js/52.js",
    "revision": "9a67059b7987f9c72f9ed2ae29f85317"
  }, {
    "url": "/js/53.js",
    "revision": "9401043d1c77dcdd99ee9f512f9cdae9"
  }, {
    "url": "/js/54.js",
    "revision": "5b3907a94a78d3cdc62fa3bbb8adf483"
  }, {
    "url": "/js/55.js",
    "revision": "6c6707140b130f51fa5c3be83c0f00f5"
  }, {
    "url": "/js/56.js",
    "revision": "8dc27e6f6fe2ab6f2aaefdaa68e3aedf"
  }, {
    "url": "/js/6.js",
    "revision": "a12f2b75ecffe343d06b644425846ddb"
  }, {
    "url": "/js/7.js",
    "revision": "c878f688c9cc6d5ce46c8f051f39a38f"
  }, {
    "url": "/js/8.js",
    "revision": "b0c4e1444b532b4711d8fb5a9db4669b"
  }, {
    "url": "/js/9.js",
    "revision": "180d49e4782994f2f63e8f4b435a6a06"
  }, {
    "url": "/js/AboutMeTabProfile.js",
    "revision": "b6a5bdd2f6239babd3ddf067303ba243"
  }, {
    "url": "/js/ContactTabProfile.js",
    "revision": "5f28554a9beac390f930cf101d535c00"
  }, {
    "url": "/js/LawsModal.js",
    "revision": "9d2c0c7d5c25a95e306d0f5d2f1e9b8e"
  }, {
    "url": "/js/LikesModal.js",
    "revision": "a6730216e0172f91b95256880f6b9fdb"
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
