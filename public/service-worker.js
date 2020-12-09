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
    "revision": "a60a4abb2dea9d9877d61b930e3263cc"
  }, {
    "url": "/js/13.js",
    "revision": "5b4ae32e7cbfa5dce040f73e73b37810"
  }, {
    "url": "/js/14.js",
    "revision": "0a1d374e388b78624dcf9c1370e79355"
  }, {
    "url": "/js/15.js",
    "revision": "3f96fe82282972c2cb3bf4727e5dded9"
  }, {
    "url": "/js/16.js",
    "revision": "0ea5c187e6203f9f535734e31ccb2624"
  }, {
    "url": "/js/17.js",
    "revision": "ba21f835bda4593555d1d69c2d9ae788"
  }, {
    "url": "/js/18.js",
    "revision": "eceff46068499ac7fc5853e37838d442"
  }, {
    "url": "/js/19.js",
    "revision": "1b2af5479e45a7e6a86b6960c982f155"
  }, {
    "url": "/js/2.js",
    "revision": "ad7b3f3471d54ba7953114f7d87ceeb6"
  }, {
    "url": "/js/20.js",
    "revision": "a1d5eca096ea013e893c7d9403bec1e6"
  }, {
    "url": "/js/21.js",
    "revision": "afa253ee25af7eecab83b7afd87d6399"
  }, {
    "url": "/js/22.js",
    "revision": "a8e21efe0c33317542b76dfd55dd3784"
  }, {
    "url": "/js/23.js",
    "revision": "47904280f84a4d424ac89c3560699a1e"
  }, {
    "url": "/js/24.js",
    "revision": "90aa6876a6c1051cc2e17b7904c7fa2a"
  }, {
    "url": "/js/25.js",
    "revision": "954ad14efc4e1a4744e88606feae4f7d"
  }, {
    "url": "/js/26.js",
    "revision": "576bbb5d355318e7d194b85ff355c638"
  }, {
    "url": "/js/27.js",
    "revision": "6d788fbba99d7b2275012eb5e504192e"
  }, {
    "url": "/js/28.js",
    "revision": "df95e1a426633e725288794c12587b01"
  }, {
    "url": "/js/29.js",
    "revision": "13387a9b42cc67f72af8e8e675d2f496"
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
    "revision": "12cfe4e033ae86903aaa4ddc56b5ea82"
  }, {
    "url": "/js/34.js",
    "revision": "73f26e1a3c87c2d730af65b21a9e7ab4"
  }, {
    "url": "/js/35.js",
    "revision": "802a2c01c37b8582679e678d454e9b42"
  }, {
    "url": "/js/36.js",
    "revision": "7eefde9d3eed24dff597f99ce992be05"
  }, {
    "url": "/js/37.js",
    "revision": "ab11f8c7cb97563b9f26a17ada080283"
  }, {
    "url": "/js/38.js",
    "revision": "002e6456376969f2595c993c0ba56e02"
  }, {
    "url": "/js/39.js",
    "revision": "e311be430a634ef1e8ca318f96ccca0a"
  }, {
    "url": "/js/4.js",
    "revision": "734e1d7e38a2a92da65dd9f258fc1ba0"
  }, {
    "url": "/js/40.js",
    "revision": "420fcb1d96a800c98296c8bb7b7d2a09"
  }, {
    "url": "/js/41.js",
    "revision": "d9da19e89f2fd1839bd3ac921f5870f2"
  }, {
    "url": "/js/42.js",
    "revision": "a94d148d5fb540040956da93e464d86b"
  }, {
    "url": "/js/43.js",
    "revision": "4f3b1cd826ec5da350fed95be36ba86c"
  }, {
    "url": "/js/44.js",
    "revision": "06410a5bfe115840b302fb47c73f1cf4"
  }, {
    "url": "/js/45.js",
    "revision": "32450f36d8a9fddcde428612c5f58ed5"
  }, {
    "url": "/js/46.js",
    "revision": "d630372a5460e83472d8425534911de3"
  }, {
    "url": "/js/47.js",
    "revision": "17ffb05aca5b7173216a9400c44f1ae5"
  }, {
    "url": "/js/48.js",
    "revision": "998317dc69e3f998132f633dc6a379a1"
  }, {
    "url": "/js/49.js",
    "revision": "7e185f5fa72038933da449f43bc60b0e"
  }, {
    "url": "/js/5.js",
    "revision": "dc3220881b5a86feefef7d42a47e576f"
  }, {
    "url": "/js/50.js",
    "revision": "d015a7e507601571f43832ba85ad538b"
  }, {
    "url": "/js/51.js",
    "revision": "e22cc2e222a01ff60c98f2a95a4f0800"
  }, {
    "url": "/js/52.js",
    "revision": "280546054f13be011833e2f59bd5a08d"
  }, {
    "url": "/js/53.js",
    "revision": "ad19b913367855e97a5f10a17b383bb9"
  }, {
    "url": "/js/54.js",
    "revision": "40db093c2e71cde1764a793b29a1e074"
  }, {
    "url": "/js/55.js",
    "revision": "d05b618c60ff657c09b639c863659d3c"
  }, {
    "url": "/js/56.js",
    "revision": "18f9e79339e794fcbcc000b66868ea2c"
  }, {
    "url": "/js/6.js",
    "revision": "ac0361d2c0d8ccecc9ea648643c6c360"
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
