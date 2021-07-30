const config = {
  url: "https://api.recursionist.io/builder/computers",
  parent: document.getElementById("parent"),
};

class PC {
  constructor(cpu, gpu, ram, storage) {
    this.cpu = cpu;
    this.gpu = gpu;
    this.ram = ram;
    this.storage = storage;
  }
}

class View {
  static createInitialForm(data) {
    let container = document.createElement("div");
    container.classList.add("min-vh-100", "bg-green");

    container.innerHTML = `
    <div class="d-flex flex-wrap justify-content-center">
      <div class="bg-dark col-12 py-3">
        <h1 class="text-white text-center">Build Your Own PC</h1>
      </div>
      <div class="cpu-form col-12 p-3 d-flex flex-wrap">

      </div>
      <div class="gpu-form col-12 p-3 d-flex flex-wrap">

      </div>
      <div class="ram-form col-12 p-3 d-flex flex-wrap">

      </div>
      <div class="storage-form col-12 p-3 d-flex flex-wrap">

      </div>
      <div class="col-12 d-flex justify-content-center">
        <button class="evaluateBtn col-3 btn btn-dark">ADD PC</button>
      </div>
      <div class="pc-specs col-12">

      </div>
    </div>
    `;

    container.querySelectorAll(".cpu-form")[0].append(View.createCpuForm());
    container.querySelectorAll(".gpu-form")[0].append(View.createGpuForm());
    container.querySelectorAll(".ram-form")[0].append(View.createRamForm());
    container.querySelectorAll(".storage-form")[0].append(View.createStorageForm());
    container.querySelectorAll(".evaluateBtn")[0].addEventListener("click", function () {
      container.querySelectorAll(".pc-specs")[0].append(View.createPcSpecsTable());
    });

    return container;
  }

  static createCpuForm() {
    let container = document.createElement("div");
    container.classList.add("col-lg-6", "col-12");
    container.innerHTML = `
    <h4>Step1: Select your CPU</h4>
    <form>
      <div class="row">
        <div class="form-group col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="cpuBrand">Brand</label>
          <div class="col-sm">
            <select class="form-control" id="cpuBrand">
              <option selected>Choose...</option>
            </select>
          </div>
        </div>
        <div class="form-group col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="cpuModel">Model</label>
          <div class="col-sm">
            <select class="form-control" name="" id="cpuModel">
              <option selected>-</option>
            </select>
          </div>
        </div>
      </div>
    </form>
    `;

    let cpuBrand = container.querySelectorAll("#cpuBrand")[0];
    let cpuModel = container.querySelectorAll("#cpuModel")[0];
    cpuBrand.addEventListener("change", function () {
      Controller.setCpuModel(cpuBrand, cpuModel);
    });

    return container;
  }

  static createGpuForm() {
    let container = document.createElement("div");
    container.classList.add("col-lg-6", "col-12");
    container.innerHTML = `
    <h4>Step2: Select your GPU</h4>
    <form>
      <div class="row">
        <div class="form-group col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="gpuBrand">Brand</label>
          <div class="col-sm">
            <select class="form-control" name="" id="gpuBrand">
              <option selected>Choose...</option>
            </select>
          </div>
        </div>
        <div class="form-group col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="gpuModel">Model</label>
          <div class="col-sm">
            <select class="form-control" name="" id="gpuModel">
              <option selected>-</option>
            </select>
          </div>
        </div>
      </div>
    </form>
    `;

    let gpuBrand = container.querySelectorAll("#gpuBrand")[0];
    let gpuModel = container.querySelectorAll("#gpuModel")[0];
    gpuBrand.addEventListener("change", function () {
      Controller.setGpuModel(gpuBrand, gpuModel);
    });

    return container;
  }

  static createRamForm() {
    let container = document.createElement("div");
    container.classList.add("col-lg-8", "col-12");
    container.innerHTML = `
    <h4>Step3: Select your memory card</h4>
    <form>
      <div class="row">
        <div class="form-group col-4 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="numOfRam">How many?</label>
          <div class="col-sm">
            <select class="form-control" name="" id="numOfRam">
              <option selected>Choose...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
          </div>
        </div>
        <div class="form-group col-4 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="ramBrand">Brand</label>
          <div class="col-sm">
            <select class="form-control" name="" id="ramBrand">
              <option selected>-</option>
            </select>
          </div>
        </div>
        <div class="form-group col-4 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="ramModel">Model</label>
          <div class="col-sm">
            <select class="form-control" name="" id="ramModel">
              <option selected>-</option>
            </select>
          </div>
        </div>
      </div>
    </form>
    `;

    let numOfRam = container.querySelectorAll("#numOfRam")[0];
    let ramBrand = container.querySelectorAll("#ramBrand")[0];
    let ramModel = container.querySelectorAll("#ramModel")[0];
    numOfRam.addEventListener("change", function () {
      Controller.setRamBrand(numOfRam.value, ramBrand);
    });
    ramBrand.addEventListener("change", function () {
      Controller.setRamModel(numOfRam.value, ramBrand, ramModel);
    });

    return container;
  }

  static createStorageForm() {
    let container = document.createElement("div");
    container.classList.add("col-12");
    container.innerHTML = `
    <h4>Step4: Select your storage</h4>
    <form>
      <div class="row">
        <div class="form-group col-lg-3 col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="storageType">HDD or SSD</label>
          <div class="col-sm">
            <select class="form-control" name="" id="storageType">
              <option selected>Choose...</option>
              <option value="hdd">HDD</option>
              <option value="ssd">SSD</option>
            </select>
          </div>
        </div>
        <div class="form-group col-lg-3 col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="storageSize">Storage</label>
          <div class="col-sm">
            <select class="form-control" name="" id="storageSize">
              <option selected>-</option>
            </select>
          </div>
        </div>
        <div class="form-group col-lg-3 col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="storageBrand">Brand</label>
          <div class="col-sm">
            <select class="form-control" name="" id="storageBrand">
              <option selected>-</option>
            </select>
          </div>
        </div>
        <div class="form-group col-lg-3 col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="storageModel">Model</label>
          <div class="col-sm">
            <select class="form-control" name="" id="storageModel">
              <option selected>-</option>
            </select>
          </div>
        </div>
      </div>
    </form>
    `;

    let storageType = container.querySelectorAll("#storageType")[0];
    let storageSize = container.querySelectorAll("#storageSize")[0];
    let storageBrand = container.querySelectorAll("#storageBrand")[0];
    let storageModel = container.querySelectorAll("#storageModel")[0];
    storageType.addEventListener("change", function () {
      Controller.setStorageSize(storageType.value, storageSize);
    });
    storageSize.addEventListener("change", function () {
      Controller.setStorageBrand(storageType, storageSize, storageBrand);
    });
    storageBrand.addEventListener("change", function () {
      Controller.setStorageModel(storageType, storageSize, storageBrand, storageModel);
    });

    return container;
  }

  static createPcSpecsTable() {
    let container = document.createElement("div");
    container.innerHTML += `
    <div class="bg-white d-flex flex-wrap my-3 py-4">
      <table class="table table-striped ">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">Size</th>
            <th scope="col">HDD/SSD</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">CPU</th>
            <td>Intel</td>
            <td>Core i9-9900KS</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">GPU</th>
            <td>Nvidia</td>
            <td>RTX 3090</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Memory</th>
            <td>G.SKILL</td>
            <td>Ripjaws 4 DDR4 2400 C14</td>
            <td>8x16GB</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Storage</th>
            <td>Intel</td>
            <td>900P Optane NVMe PCIe</td>
            <td>280GB</td>
            <td>SSD</td>
          </tr>
        </tbody>
      </table>
      <div class="col-12 row justify-content-end">
        <h4>Gaming: 40 %</h4>
        <h4 class="pl-4">Work: 50 %</h4>
      </div>
    </div>
    `;
    return container;
  }

  static createOptions(values, parentEle) {
    let options = "";
    for (const value of values) {
      options += `<option value="${value}">${value}</option>`;
    }
    parentEle.innerHTML += options;
  }
}

class Controller {
  static buildPage() {
    config.parent.append(View.createInitialForm());
  }

  static getCpu(key, parentEle) {
    fetch(config.url + "?type=cpu")
      .then((response) => response.json())
      .then((data) => {
        let brands = Controller.getValues(data, key);
        View.createOptions(brands, parentEle);
      });
  }

  static getGpu(key, parentEle) {
    fetch(config.url + "?type=gpu")
      .then((response) => response.json())
      .then((data) => {
        let brands = Controller.getValues(data, key);
        View.createOptions(brands, parentEle);
      });
  }

  static getValues(data, keyName) {
    let hashmap = {};
    for (const product of data) {
      let current = product[keyName];
      if (hashmap[current] === undefined) hashmap[current] = current;
    }
    let result = Object.keys(hashmap);
    return result;
  }

  //選択されたブランドのモデルのoptionを作成する
  static setCpuModel(brandEle, modelEle) {
    fetch(config.url + "?type=cpu")
      .then((response) => response.json())
      .then((data) => {
        let models = [];
        for (const product of data) {
          if (product.Brand === brandEle.value) {
            models.push(product.Model);
            modelEle.innerHTML = `<option selected>Choose...</option>`;
            View.createOptions(models, modelEle);
          }
        }
      });
  }
  static setGpuModel(brandEle, modelEle) {
    fetch(config.url + "?type=gpu")
      .then((response) => response.json())
      .then((data) => {
        let models = [];
        for (const product of data) {
          if (product.Brand === brandEle.value) {
            models.push(product.Model);
            modelEle.innerHTML = `<option selected>Choose...</option>`;
            View.createOptions(models, modelEle);
          }
        }
      });
  }

  static setRamBrand(numOfStick, brandEle) {
    let regex = new RegExp(String.raw`${numOfStick}x\d{1,2}GB`, "g");

    fetch(config.url + "?type=ram")
      .then((response) => response.json())
      .then((data) => {
        let hashmap = {};
        for (const product of data) {
          if (regex.test(product.Model) && hashmap[product.Brand] === undefined) {
            hashmap[product.Brand] = product.Brand;
          }
        }
        let brands = Object.keys(hashmap);
        brandEle.innerHTML = `<option selected>Choose...</option>`;
        View.createOptions(brands, brandEle);
      });
  }

  static setRamModel(numOfStick, brandEle, modelEle) {
    let regex = new RegExp(String.raw`${numOfStick}x\d{1,2}GB`, "g");

    fetch(config.url + "?type=ram")
      .then((response) => response.json())
      .then((data) => {
        let models = [];
        for (const product of data) {
          if (regex.test(product.Model) && product.Brand === brandEle.value) {
            models.push(product.Model);
            modelEle.innerHTML = `<option selected>Choose...</option>`;
            View.createOptions(models, modelEle);
          }
        }
      });
  }

  static setStorageSize(storageType, sizeEle) {
    let regex = /\d{1,3}[TG]B/g;

    fetch(config.url + `?type=${storageType}`)
      .then((response) => response.json())
      .then((data) => {
        let hashmap = {};
        for (const product of data) {
          let result = regex[Symbol.matchAll](product.Model);
          let size = Array.from(result, (x) => x[0]).join("");
          if (hashmap[size] === undefined) hashmap[size] = size;
        }
        let sizes = Object.keys(hashmap);
        sizeEle.innerHTML = `<option selected>Choose...</option>`;
        View.createOptions(sizes, sizeEle);
      });
  }

  static sortStorageSize(sizes) {}

  static setStorageBrand(typeEle, sizeEle, brandEle) {
    let regex = /\d{1,3}[TG]B/g;

    fetch(config.url + `?type=${typeEle.value}`)
      .then((response) => response.json())
      .then((data) => {
        let hashmap = {};
        for (const product of data) {
          let result = regex[Symbol.matchAll](product.Model);
          let size = Array.from(result, (x) => x[0]).join("");
          if (size === sizeEle.value && hashmap[product.Brand] === undefined) {
            hashmap[product.Brand] = product.Brand;
          }
        }
        let brands = Object.keys(hashmap);
        brandEle.innerHTML = `<option selected>Choose...</option>`;
        View.createOptions(brands, brandEle);
      });
  }

  static setStorageModel(typeEle, sizeEle, brandEle, modelEle) {
    let regex = /\d{1,3}[TG]B/g;

    fetch(config.url + `?type=${typeEle.value}`)
      .then((response) => response.json())
      .then((data) => {
        let models = [];
        for (const product of data) {
          let result = regex[Symbol.matchAll](product.Model);
          let size = Array.from(result, (x) => x[0]).join("");
          if (size === sizeEle.value && product.Brand === brandEle.value) {
            models.push(product.Model);
          }
        }
        modelEle.innerHTML = `<option selected>Choose...</option>`;
        View.createOptions(models, modelEle);
      });
  }
}

Controller.buildPage();

let ele1 = document.getElementById("cpuBrand");
let ele2 = document.getElementById("gpuBrand");
Controller.getCpu("Brand", ele1);
Controller.getGpu("Brand", ele2);

// Controller.setStorageSize("hdd");
