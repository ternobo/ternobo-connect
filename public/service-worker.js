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
    "revision": "665a4caf71944af8cd47944d771cc03e"
  }, {
    "url": "/js/15.js",
    "revision": "018ab4890ab590465a5c6cad791118c1"
  }, {
    "url": "/js/16.js",
    "revision": "c66e907b16a97d640d31742843dc3c45"
  }, {
    "url": "/js/17.js",
    "revision": "8f38cccf79b1484ad8783dafd554f3bd"
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
    "revision": "999ed12327158667e14e1e3e6b9c823c"
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
    "revision": "dd51955171c57cef287d1c144700131a"
  }, {
    "url": "/js/28.js",
    "revision": "950704429ef1ff791f500b20aefadde9"
  }, {
    "url": "/js/29.js",
    "revision": "d585348794b1138f5a39a10c36652b89"
  }, {
    "url": "/js/3.js",
    "revision": "91fe8cafe5c457ea811fee67c534a917"
  }, {
    "url": "/js/30.js",
    "revision": "4b5aeb5d948981f0d4c0fdb26f81c3b3"
  }, {
    "url": "/js/31.js",
    "revision": "0603c604d5b023ae977dd8e455dfd666"
  }, {
    "url": "/js/32.js",
    "revision": "c89411a89823539a77e070f1bb59bc1c"
  }, {
    "url": "/js/33.js",
    "revision": "b3458adcf06f4219f43203f767e19687"
  }, {
    "url": "/js/34.js",
    "revision": "772b6cd643a1cda226d3bafa930f91ef"
  }, {
    "url": "/js/35.js",
    "revision": "f971ab315b4a142837f1525db6d4a8d1"
  }, {
    "url": "/js/36.js",
    "revision": "9655aaa84579a1893955c337e7a7a05a"
  }, {
    "url": "/js/37.js",
    "revision": "29ef365170317b3fd6cf76cd48175667"
  }, {
    "url": "/js/38.js",
    "revision": "1267c685cd35fa90226bf320995290cc"
  }, {
    "url": "/js/39.js",
    "revision": "6cbf0def134506386324e2b787034eb8"
  }, {
    "url": "/js/4.js",
    "revision": "1e7a17933cb50122972e151527b342b9"
  }, {
    "url": "/js/40.js",
    "revision": "b9eddcde9c02ce35c2cf61dd3374d256"
  }, {
    "url": "/js/41.js",
    "revision": "dc81710d1945c639a153d55a098c2ef3"
  }, {
    "url": "/js/42.js",
    "revision": "f5de2c5d65db371f4b4164e0a8b31eb6"
  }, {
    "url": "/js/43.js",
    "revision": "5c3dcc6db0c5889901e88cc118fed3a9"
  }, {
    "url": "/js/44.js",
    "revision": "7a3eb8d50fd52ada7f0d6b42fb74b0fc"
  }, {
    "url": "/js/45.js",
    "revision": "b36f28003cbd9960ac03c8f00504e526"
  }, {
    "url": "/js/46.js",
    "revision": "e5555ef32bb291458d37a24000177c8d"
  }, {
    "url": "/js/47.js",
    "revision": "f7f057d7a1eaff84156e956b843d9496"
  }, {
    "url": "/js/48.js",
    "revision": "80d737d186b177fd5c62cec67598603a"
  }, {
    "url": "/js/49.js",
    "revision": "7ee855503062b2dfd6046140c805d431"
  }, {
    "url": "/js/5.js",
    "revision": "1f931e98d82172911b031e1942ef8bfb"
  }, {
    "url": "/js/50.js",
    "revision": "ae621a6a39e9b9988de98e1af37046f9"
  }, {
    "url": "/js/6.js",
    "revision": "d5662f7f1a9542bcd5f078c0bb6fa7b0"
  }, {
    "url": "/js/7.js",
    "revision": "0a3c89369f82542208e08ef9726fe68d"
  }, {
    "url": "/js/8.js",
    "revision": "6e0898445850f1492db4108c6c875dfc"
  }, {
    "url": "/js/9.js",
    "revision": "025e0ad4e76c7c02eaa62dc9005968b1"
  }, {
    "url": "/js/AboutMeTabProfile.js",
    "revision": "543973b1028faa0b4caccf064fbcd13a"
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
    "revision": "c135478af6ecae4c0f282adfcc91badc"
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
