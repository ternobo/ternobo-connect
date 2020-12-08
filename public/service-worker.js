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
    "revision": "a60a4abb2dea9d9877d61b930e3263cc"
  }, {
    "url": "/js/13.js",
    "revision": "ab3a999f23fe36de926cf0aa7067bdd3"
  }, {
    "url": "/js/14.js",
    "revision": "2a4d82da160e0f1d531837c809d1a876"
  }, {
    "url": "/js/15.js",
    "revision": "ed30b1a38b9df3cfb000f529a5098d8e"
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
    "revision": "1b2af5479e45a7e6a86b6960c982f155"
  }, {
    "url": "/js/2.js",
    "revision": "ad7b3f3471d54ba7953114f7d87ceeb6"
  }, {
    "url": "/js/20.js",
    "revision": "7f101381dbc8bddf9e6fce785d4c8383"
  }, {
    "url": "/js/21.js",
    "revision": "578acd051343ac393b334db571ba49b9"
  }, {
    "url": "/js/22.js",
    "revision": "a8e21efe0c33317542b76dfd55dd3784"
  }, {
    "url": "/js/23.js",
    "revision": "fad8d86c2fde4d922232e79da03ec474"
  }, {
    "url": "/js/24.js",
    "revision": "27ab16d6e396d7666da659522cb56ca3"
  }, {
    "url": "/js/25.js",
    "revision": "293d86a47bbb4172e2f8639df2750c80"
  }, {
    "url": "/js/26.js",
    "revision": "20c8b9cb912d0c10088aafddca971ffb"
  }, {
    "url": "/js/27.js",
    "revision": "80464c0e8e883b9a4c76346c1f9a7463"
  }, {
    "url": "/js/28.js",
    "revision": "df95e1a426633e725288794c12587b01"
  }, {
    "url": "/js/29.js",
    "revision": "e4c24d668339e52c459dca5c97ba0515"
  }, {
    "url": "/js/3.js",
    "revision": "b3d1e7d3a7cbbba662e388158382036b"
  }, {
    "url": "/js/30.js",
    "revision": "a602481cce14062d9b193910cc745be6"
  }, {
    "url": "/js/31.js",
    "revision": "60b3c9f23ed1fdd7736bf152902bae09"
  }, {
    "url": "/js/32.js",
    "revision": "06c28d72afb81bbd993671ff5f081330"
  }, {
    "url": "/js/33.js",
    "revision": "63f8d303deea330595c5149a580b3d18"
  }, {
    "url": "/js/34.js",
    "revision": "4a1bc194e6cfe86fe2349c1529345f5a"
  }, {
    "url": "/js/35.js",
    "revision": "86489004d5ecc525c84f5426f66a1a5d"
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
    "revision": "293b53a00e2436fd480e95bd09176c49"
  }, {
    "url": "/js/40.js",
    "revision": "9a13142d857143e82cf2e6eac949b6bd"
  }, {
    "url": "/js/41.js",
    "revision": "fde7c478f7d47d3e8e72a3603867a760"
  }, {
    "url": "/js/42.js",
    "revision": "07bf5839790df3dcdc0e6f912ee3b249"
  }, {
    "url": "/js/43.js",
    "revision": "5ad47bc774e481d50fbb45e022488206"
  }, {
    "url": "/js/44.js",
    "revision": "c5e2baed5d4ea4cf01b6d36c99ff7363"
  }, {
    "url": "/js/45.js",
    "revision": "9e02429db5194743509358b3885055a3"
  }, {
    "url": "/js/46.js",
    "revision": "3874a2bb64629bb4cff0073db75cf3ba"
  }, {
    "url": "/js/47.js",
    "revision": "2d73d213bbd9b918dd748891cbff5a9f"
  }, {
    "url": "/js/48.js",
    "revision": "77791e1ef72b5e937886001ffbdec457"
  }, {
    "url": "/js/49.js",
    "revision": "40ec19f17196ec66c85be8fe22b3bee5"
  }, {
    "url": "/js/5.js",
    "revision": "1011497c9fa0872faa8fc01246352aad"
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
    "revision": "fb99a135bab2fbbe124495ddaa0efcc6"
  }, {
    "url": "/js/7.js",
    "revision": "46f3fe689ae9007974b22f141f45dfc6"
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
