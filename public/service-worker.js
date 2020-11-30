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
    "revision": "e87035c55c727983b6ae0c4d2c855aa7"
  }, {
    "url": "/js//vendor.js",
    "revision": "de2743ad5573bed06749a85cdea71d7e"
  }, {
    "url": "/js/0.js",
    "revision": "04bbc7bfa52370d238e00ce387782317"
  }, {
    "url": "/js/10.js",
    "revision": "39b9cd0ffd0e52065cf25a69433939b1"
  }, {
    "url": "/js/11.js",
    "revision": "93bcb4a3f7896d290b9fe120c0dcd5a7"
  }, {
    "url": "/js/12.js",
    "revision": "65608bba4a26906500fdb1bed74db1bf"
  }, {
    "url": "/js/13.js",
    "revision": "ab3a999f23fe36de926cf0aa7067bdd3"
  }, {
    "url": "/js/14.js",
    "revision": "665a4caf71944af8cd47944d771cc03e"
  }, {
    "url": "/js/15.js",
    "revision": "018ab4890ab590465a5c6cad791118c1"
  }, {
    "url": "/js/16.js",
    "revision": "425e0a10635129655a76dee29b3b531c"
  }, {
    "url": "/js/17.js",
    "revision": "a9d5a4e525c4775a12f138471fffbc9b"
  }, {
    "url": "/js/18.js",
    "revision": "31d60bd98db9d5e9e2619e81e0f5b2d5"
  }, {
    "url": "/js/19.js",
    "revision": "b3ee06b6b58582603cb0d6524c9a8501"
  }, {
    "url": "/js/2.js",
    "revision": "3266a781e323375cf62ff8d621655a97"
  }, {
    "url": "/js/20.js",
    "revision": "8f565bd41c17b86ffbb9c252e6e489a2"
  }, {
    "url": "/js/21.js",
    "revision": "f966a8fdff09d6341e89220ecdb6e8bd"
  }, {
    "url": "/js/22.js",
    "revision": "84607722715687f9002f476f4c13eae3"
  }, {
    "url": "/js/23.js",
    "revision": "289b16033ee309167b7c478f40695565"
  }, {
    "url": "/js/24.js",
    "revision": "333c5481693313ea191900fb701cdd99"
  }, {
    "url": "/js/25.js",
    "revision": "4afcb3e9280627a6eeb7a5b33d171a76"
  }, {
    "url": "/js/26.js",
    "revision": "84b9e34dd83a16b630b287cdd2820fe2"
  }, {
    "url": "/js/27.js",
    "revision": "dcad24f776cc82fc2e8737adfda77091"
  }, {
    "url": "/js/28.js",
    "revision": "950704429ef1ff791f500b20aefadde9"
  }, {
    "url": "/js/29.js",
    "revision": "d585348794b1138f5a39a10c36652b89"
  }, {
    "url": "/js/3.js",
    "revision": "6e282333c057a72d7fd27dace27b6dc7"
  }, {
    "url": "/js/30.js",
    "revision": "4b5aeb5d948981f0d4c0fdb26f81c3b3"
  }, {
    "url": "/js/31.js",
    "revision": "9161ea74556d5efed81f82fcda592518"
  }, {
    "url": "/js/32.js",
    "revision": "59f8789793a65fc67b15265cbb07f208"
  }, {
    "url": "/js/33.js",
    "revision": "9e2b566faf54c3b983c3e44ca34f6482"
  }, {
    "url": "/js/34.js",
    "revision": "f0dd3fad9f16bd8653ca59dd853afa3c"
  }, {
    "url": "/js/35.js",
    "revision": "adb7d7eff73730b92dba76ab7a5e7572"
  }, {
    "url": "/js/36.js",
    "revision": "1716385cd5973c8b20c9d329384063f9"
  }, {
    "url": "/js/37.js",
    "revision": "acccf24fd4c5524da2b5d8f7126f487e"
  }, {
    "url": "/js/38.js",
    "revision": "03acc2cdb4ad072019ba81aa02a0425f"
  }, {
    "url": "/js/39.js",
    "revision": "55a95f205cddb8974d2b95f37c04c392"
  }, {
    "url": "/js/4.js",
    "revision": "1e7a17933cb50122972e151527b342b9"
  }, {
    "url": "/js/40.js",
    "revision": "a423d514fd31b777bce427cf6dc72913"
  }, {
    "url": "/js/41.js",
    "revision": "c1fa81b668763fe20e322767645841d7"
  }, {
    "url": "/js/42.js",
    "revision": "8ea09f17d0737bbd2b4cc1b71b91e0bd"
  }, {
    "url": "/js/43.js",
    "revision": "05da85fa0bbc4e629c3994e304e906bd"
  }, {
    "url": "/js/44.js",
    "revision": "637ba34b70d99eb01849cff0afb3be7e"
  }, {
    "url": "/js/45.js",
    "revision": "1ac0cdba7a2de40f74df6c716f89c16d"
  }, {
    "url": "/js/46.js",
    "revision": "6c41a9f6fa932ddf382b0cc378dd09bf"
  }, {
    "url": "/js/47.js",
    "revision": "5cd0c9f4a1fcef89e1db00969cbbdaef"
  }, {
    "url": "/js/48.js",
    "revision": "f3a8e5195cb28397686b3b0ac250f07d"
  }, {
    "url": "/js/49.js",
    "revision": "c1d834e9b62e2a3e3d7fd9f498c05c47"
  }, {
    "url": "/js/5.js",
    "revision": "1f931e98d82172911b031e1942ef8bfb"
  }, {
    "url": "/js/50.js",
    "revision": "db92028d9552eb03a6f2e2f34b0a15f0"
  }, {
    "url": "/js/51.js",
    "revision": "1ff9a7d8e03ef675021c2a3129b4aba2"
  }, {
    "url": "/js/52.js",
    "revision": "9bc6bfb32be142e50635135329d43494"
  }, {
    "url": "/js/6.js",
    "revision": "1c83835f96f5ce5988969ec792f940b4"
  }, {
    "url": "/js/7.js",
    "revision": "0a3c89369f82542208e08ef9726fe68d"
  }, {
    "url": "/js/8.js",
    "revision": "6e0898445850f1492db4108c6c875dfc"
  }, {
    "url": "/js/9.js",
    "revision": "25bee48534a87d3ae3e6b624c7a08fc2"
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
    "url": "/js/NewPostCard.js",
    "revision": "07974b1d8e94d7e030a6d9f9b682dad7"
  }, {
    "url": "/js/NewPostModal.js",
    "revision": "56760a31d83269ba5a77653b3267f4d0"
  }, {
    "url": "/js/TextareaAutosize.js",
    "revision": "f42d5bcc56ba937c53ce376adf075bb4"
  }, {
    "url": "/js/Tselect.js",
    "revision": "03cc888eaa85c94082846d1022a974fa"
  }, {
    "url": "/js/UserInfoCard.js",
    "revision": "15d6e818434a6931fa6fba85d3e3273b"
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
