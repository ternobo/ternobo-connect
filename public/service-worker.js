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
    "revision": "c5f33940c7c8bade2b17c2e9debb62d0"
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
    "revision": "fedfe4ea0bc4a8f81f6c6b86d3d24579"
  }, {
    "url": "/js/13.js",
    "revision": "650ccb765bb2d69ea8361ac08fab6ae6"
  }, {
    "url": "/js/14.js",
    "revision": "2d6b86119bf4fd60522ad036f875335b"
  }, {
    "url": "/js/15.js",
    "revision": "018ab4890ab590465a5c6cad791118c1"
  }, {
    "url": "/js/16.js",
    "revision": "b44d771184446300ab2831a64d615198"
  }, {
    "url": "/js/17.js",
    "revision": "30481b46c47b0c49f84bd77e83612f7d"
  }, {
    "url": "/js/18.js",
    "revision": "01b48a962acb8b688243ef727b464830"
  }, {
    "url": "/js/19.js",
    "revision": "3fb46bb12973772bf8b412de315c3428"
  }, {
    "url": "/js/2.js",
    "revision": "3266a781e323375cf62ff8d621655a97"
  }, {
    "url": "/js/20.js",
    "revision": "df216eb049e2a5b62fceb4b94e354476"
  }, {
    "url": "/js/21.js",
    "revision": "21ee73071550ba00592c7248e14a6380"
  }, {
    "url": "/js/22.js",
    "revision": "c56a558c13ed92390a1552287a9436a7"
  }, {
    "url": "/js/23.js",
    "revision": "f82d24899552b604adb4d20defe5e7cd"
  }, {
    "url": "/js/24.js",
    "revision": "f37afddb7afcd0b7e9920116f71458c0"
  }, {
    "url": "/js/25.js",
    "revision": "5a836f8e465810ba619684d388cfd0e9"
  }, {
    "url": "/js/26.js",
    "revision": "548abaa10c5d480abfd6e75327eff953"
  }, {
    "url": "/js/27.js",
    "revision": "9d9b3b9b3e833702f7f9d8fab00ba809"
  }, {
    "url": "/js/28.js",
    "revision": "c8d56bf5e708a098b6571b63e838a19b"
  }, {
    "url": "/js/29.js",
    "revision": "03ab1f380ca6a3c81bc590693a352ae6"
  }, {
    "url": "/js/3.js",
    "revision": "91fe8cafe5c457ea811fee67c534a917"
  }, {
    "url": "/js/30.js",
    "revision": "afbe812e37a51b0d0daa8e96b5ee0d93"
  }, {
    "url": "/js/31.js",
    "revision": "384bea7a16c28c291391e5e5cccd851f"
  }, {
    "url": "/js/32.js",
    "revision": "b344a47913fd13b5622ca2462d4f4de0"
  }, {
    "url": "/js/33.js",
    "revision": "72b67df084cf4fe4dde9d8651279cf8c"
  }, {
    "url": "/js/34.js",
    "revision": "acf7e9aee4d8a7481217e820c0bb97ac"
  }, {
    "url": "/js/35.js",
    "revision": "c04bcf5c78105536caa387cd5c773241"
  }, {
    "url": "/js/36.js",
    "revision": "4bbb6bcd0743135ccfa384e14aa5f59e"
  }, {
    "url": "/js/37.js",
    "revision": "e47b503a8d5bde667a9bdd0bf520e0dd"
  }, {
    "url": "/js/38.js",
    "revision": "58db9eff2a1d32389a7a3e58e5f238c4"
  }, {
    "url": "/js/39.js",
    "revision": "428b47a1341b9558dd6180e76b2f8d28"
  }, {
    "url": "/js/4.js",
    "revision": "1e7a17933cb50122972e151527b342b9"
  }, {
    "url": "/js/40.js",
    "revision": "7fcb3d02af7a2864ea54b92c4da2a239"
  }, {
    "url": "/js/41.js",
    "revision": "c47480b51fca5ea072df2f2b76ec4168"
  }, {
    "url": "/js/42.js",
    "revision": "3dcc87a00b03b728d4522d267383ca1a"
  }, {
    "url": "/js/43.js",
    "revision": "4f722ee6e6c6faf96201a11a06b71e3c"
  }, {
    "url": "/js/44.js",
    "revision": "4d18b9b2c3fc49c5fa85f84bc474e63b"
  }, {
    "url": "/js/45.js",
    "revision": "b0f5b94ea8789d52256941da53fc7a9c"
  }, {
    "url": "/js/46.js",
    "revision": "0cf295a0c9c061b35925310a6bb5e835"
  }, {
    "url": "/js/47.js",
    "revision": "3f1c6684076ce4906bbc5577674d1593"
  }, {
    "url": "/js/48.js",
    "revision": "cd6622ab25359b098f367c590fd964c9"
  }, {
    "url": "/js/49.js",
    "revision": "f64088e19ff06bb2d76e6c7f6f5e68ec"
  }, {
    "url": "/js/5.js",
    "revision": "1f931e98d82172911b031e1942ef8bfb"
  }, {
    "url": "/js/6.js",
    "revision": "a492b2d46deaa73fd9505cb811d3993f"
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
    "revision": "cecdb77f34fa200462fdf44331dbca4e"
  }, {
    "url": "/js/ContactTabProfile.js",
    "revision": "f23ef12c9187ebbc50c2e7900a716f14"
  }, {
    "url": "/js/LawsModal.js",
    "revision": "9d2c0c7d5c25a95e306d0f5d2f1e9b8e"
  }, {
    "url": "/js/NewPostCard.js",
    "revision": "9d28124777ee5260431a0c94c92eadfe"
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
