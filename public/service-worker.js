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
    "revision": "ddc7c61286672d4e3fa5bb0c28be8464"
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
    "revision": "d34d12db97829883fbfa1820ce8231b6"
  }, {
    "url": "/js/15.js",
    "revision": "34b557510b4001d498ba356df93c4300"
  }, {
    "url": "/js/16.js",
    "revision": "2c58abf0e249a7782b3fa879e80eb595"
  }, {
    "url": "/js/17.js",
    "revision": "30e1208aff63f215c27602ce5caeb6c6"
  }, {
    "url": "/js/18.js",
    "revision": "665eb88ef88338e18ff576cde8fdf86c"
  }, {
    "url": "/js/19.js",
    "revision": "eb64af0cec41c4eb053ef789d30eac05"
  }, {
    "url": "/js/2.js",
    "revision": "3266a781e323375cf62ff8d621655a97"
  }, {
    "url": "/js/20.js",
    "revision": "6d74a82e57c211726eaba531ce76be10"
  }, {
    "url": "/js/21.js",
    "revision": "513a5300e9bd6bba084de9498bce60a7"
  }, {
    "url": "/js/22.js",
    "revision": "1ee425f6de725a09584a3de396641780"
  }, {
    "url": "/js/23.js",
    "revision": "fc996ec3b819f9e2d1986229cf190193"
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
    "revision": "6e282333c057a72d7fd27dace27b6dc7"
  }, {
    "url": "/js/30.js",
    "revision": "5e6d7c16abcc5feac11729925b61297d"
  }, {
    "url": "/js/31.js",
    "revision": "5e776efaf4b049b7cb39799b5322ac8c"
  }, {
    "url": "/js/32.js",
    "revision": "a80dd7b141b8762e7c282470c03baa4c"
  }, {
    "url": "/js/33.js",
    "revision": "5ce2479a6e7f370c0368556c0605f7a2"
  }, {
    "url": "/js/34.js",
    "revision": "da9694febf1edb22b960e7968161abc8"
  }, {
    "url": "/js/35.js",
    "revision": "47cf97d181809340e5ec4af9109612c1"
  }, {
    "url": "/js/36.js",
    "revision": "4a701e63fdc8f5cc17bc4c85afd8d332"
  }, {
    "url": "/js/37.js",
    "revision": "26e2f34a0752759dfadd41c104072801"
  }, {
    "url": "/js/38.js",
    "revision": "22c26e09a2c94fda5af7986df5bed0ab"
  }, {
    "url": "/js/39.js",
    "revision": "eec0ed22d445c5ddb727b68ca254106b"
  }, {
    "url": "/js/4.js",
    "revision": "1e7a17933cb50122972e151527b342b9"
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
    "revision": "c933350f80c8b9fc2a252276e94017a1"
  }, {
    "url": "/js/45.js",
    "revision": "cbd15a294d3a09b1994649b2a0cdf89e"
  }, {
    "url": "/js/46.js",
    "revision": "5c54bb913f94667244e0fd4b5d853536"
  }, {
    "url": "/js/47.js",
    "revision": "f54b004ca2031cdc25069a47800aa7c5"
  }, {
    "url": "/js/48.js",
    "revision": "ec6ee7ca1de636bde8a446f699ef3540"
  }, {
    "url": "/js/49.js",
    "revision": "6f65d9e06c1751a0ee38d55ca2dc4e0e"
  }, {
    "url": "/js/5.js",
    "revision": "1f931e98d82172911b031e1942ef8bfb"
  }, {
    "url": "/js/50.js",
    "revision": "b7d2ffd11685597551e085b8415e301d"
  }, {
    "url": "/js/51.js",
    "revision": "79ab73793daf14b033f3d76ab240dddb"
  }, {
    "url": "/js/52.js",
    "revision": "091196304258aa06aafa03aabecb9dfb"
  }, {
    "url": "/js/53.js",
    "revision": "4afc4b6016ff464ee42e703f74dc8862"
  }, {
    "url": "/js/6.js",
    "revision": "a46dff5c1243c4141236c2f7e2d0c204"
  }, {
    "url": "/js/7.js",
    "revision": "0a3c89369f82542208e08ef9726fe68d"
  }, {
    "url": "/js/8.js",
    "revision": "4bb96d90cdb73617d137b6a39b5b780f"
  }, {
    "url": "/js/9.js",
    "revision": "6f4edfa34fc8278d3559a4125a0e5149"
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
