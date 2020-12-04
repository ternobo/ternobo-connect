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
    "revision": "b2a278ecd5d9b6c3f926b6eef0d10a7b"
  }, {
    "url": "/js/10.js",
    "revision": "8ede55d7ba8d8fba08dca30b6d661479"
  }, {
    "url": "/js/11.js",
    "revision": "fc757b6b54fdfecae98a768336339f20"
  }, {
    "url": "/js/12.js",
    "revision": "c1ca1ca781f11fa2912d06f9a97077f8"
  }, {
    "url": "/js/13.js",
    "revision": "b804363080be59ea0df743439b605251"
  }, {
    "url": "/js/14.js",
    "revision": "0d1b906b44bd46efe0d1adb893144cd4"
  }, {
    "url": "/js/15.js",
    "revision": "56cd08ab06d8d5a059c1e239297b998a"
  }, {
    "url": "/js/16.js",
    "revision": "7c3b79a570b73822628131fa3ef926d3"
  }, {
    "url": "/js/17.js",
    "revision": "ebe5764570e438ba0b7d0674a063d641"
  }, {
    "url": "/js/18.js",
    "revision": "a6d572eaa90b03d137d4a01d52ef1657"
  }, {
    "url": "/js/19.js",
    "revision": "4a3d615bc1028acca2b7457215bff277"
  }, {
    "url": "/js/2.js",
    "revision": "3266a781e323375cf62ff8d621655a97"
  }, {
    "url": "/js/21.js",
    "revision": "85dab935836f4c162473157eb4ce6a08"
  }, {
    "url": "/js/23.js",
    "revision": "47544cb3c6cc342f29ccb14d12f392ad"
  }, {
    "url": "/js/24.js",
    "revision": "2416d98edec7a2cb812e5ae5fcb750a4"
  }, {
    "url": "/js/25.js",
    "revision": "c0ed6fa3f8fa04a3f8c143ef8541a4d3"
  }, {
    "url": "/js/26.js",
    "revision": "50e20131d7b6d8e96121ee0e99a27df2"
  }, {
    "url": "/js/27.js",
    "revision": "75a973f18328edc99ba2ddb18cb3a4e8"
  }, {
    "url": "/js/28.js",
    "revision": "5a977338ada36501e5715dd38e1cb79f"
  }, {
    "url": "/js/29.js",
    "revision": "e4c24d668339e52c459dca5c97ba0515"
  }, {
    "url": "/js/3.js",
    "revision": "eeab5687a81eda2679213baa254e9064"
  }, {
    "url": "/js/30.js",
    "revision": "a602481cce14062d9b193910cc745be6"
  }, {
    "url": "/js/31.js",
    "revision": "60b3c9f23ed1fdd7736bf152902bae09"
  }, {
    "url": "/js/32.js",
    "revision": "7a528436280d6c86a6220a48b95651c1"
  }, {
    "url": "/js/33.js",
    "revision": "bae6ed5bb801e82c460cd91068da22ce"
  }, {
    "url": "/js/34.js",
    "revision": "4a1bc194e6cfe86fe2349c1529345f5a"
  }, {
    "url": "/js/35.js",
    "revision": "9db93df4532f60305117a86fc028f9ce"
  }, {
    "url": "/js/36.js",
    "revision": "9a88b140d569be1fec36790f5dcf2055"
  }, {
    "url": "/js/37.js",
    "revision": "3880aa5360fe66399ce47a3986ee8a50"
  }, {
    "url": "/js/38.js",
    "revision": "100c340452bfbf18c292087bfaef5c6e"
  }, {
    "url": "/js/39.js",
    "revision": "e311be430a634ef1e8ca318f96ccca0a"
  }, {
    "url": "/js/4.js",
    "revision": "77837aa8272046a77c48a26dfa2e5cc1"
  }, {
    "url": "/js/40.js",
    "revision": "420fcb1d96a800c98296c8bb7b7d2a09"
  }, {
    "url": "/js/41.js",
    "revision": "f83f8679d0c86374c5bfac85c258dd10"
  }, {
    "url": "/js/42.js",
    "revision": "22316757e0c5eaaac955ce0f8448a101"
  }, {
    "url": "/js/43.js",
    "revision": "da5d1cb7a5105601173f9a412461cc4b"
  }, {
    "url": "/js/44.js",
    "revision": "c9a1fd36cfbff7224c9fc6341d887d77"
  }, {
    "url": "/js/45.js",
    "revision": "40a8992358e8119ade37ca33ab5705f1"
  }, {
    "url": "/js/46.js",
    "revision": "f220ff8d8915d9d2c3348bd7a5e0ec4c"
  }, {
    "url": "/js/47.js",
    "revision": "e497e673d8cd22c81831e582997e8b63"
  }, {
    "url": "/js/48.js",
    "revision": "896c9b593dacfcb31d2f4fef9514da42"
  }, {
    "url": "/js/49.js",
    "revision": "e10b213b5b4cd4d12c087eabcd9b6ce9"
  }, {
    "url": "/js/5.js",
    "revision": "3e63bdadee94a2e0a3a1d6081753b009"
  }, {
    "url": "/js/50.js",
    "revision": "bb8b205b55b1d0bf1c1c8b45f255a210"
  }, {
    "url": "/js/51.js",
    "revision": "4afcee82af71a1a8c72c0c60e00c31ad"
  }, {
    "url": "/js/52.js",
    "revision": "146c86d09eb3f2e4300c99fc204a3d1f"
  }, {
    "url": "/js/53.js",
    "revision": "cc62ca1882478e7f0009d5e16c4faeb9"
  }, {
    "url": "/js/54.js",
    "revision": "0cebf29c029db747a469f26928b2089d"
  }, {
    "url": "/js/56.js",
    "revision": "ef5665e022bdaa3da5e9f6eb27a9c022"
  }, {
    "url": "/js/6.js",
    "revision": "2c40299a11d4b24ea6f44b527e546136"
  }, {
    "url": "/js/60.js",
    "revision": "ce0b9ba77e428abd92e03ae020f29bd0"
  }, {
    "url": "/js/7.js",
    "revision": "d1dc77912a4b37c2ad8168161ab9c294"
  }, {
    "url": "/js/8.js",
    "revision": "466598dfe1e620dfed56f7c367ec9529"
  }, {
    "url": "/js/9.js",
    "revision": "f40cf88a233c101f463b8233c97bea9e"
  }, {
    "url": "/js/AboutMeTabProfile.js",
    "revision": "bdc722907a4f120dbf8631a1134b558d"
  }, {
    "url": "/js/ContactTabProfile.js",
    "revision": "f23ef12c9187ebbc50c2e7900a716f14"
  }, {
    "url": "/js/LawsModal.js",
    "revision": "9d2c0c7d5c25a95e306d0f5d2f1e9b8e"
  }, {
    "url": "/js/LikesModal.js",
    "revision": "d99f0493c55eea2607a065d9f3244ec3"
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
