const config = {
  url: "https://api.recursionist.io/builder/computers",
  target: document.getElementById("target"),
  scorefactors: [
    {
      usage: "gaming",
      cpu: 0.25,
      gpu: 0.6,
      ram: 0.125,
      storage: 0.025,
    },
    {
      usage: "work",
      cpu: 0.6,
      gpu: 0.25,
      ram: 0.1,
      storage: 0.05,
    },
  ],
  alert: "Fill all select form!",
};

// class TableData {
//   contents;
// }

class Table {
  contents;

  constructor(cpu, gpu, ram, storage) {
    this.cpu = cpu;
    this.gpu = gpu;
    this.ram = ram;
    this.storage = storage;
  }

  static addContent(tableContent) {
    if (this.contents === undefined) this.contents = [];
    this.contents.push(tableContent);
  }

  static getNewestContent() {
    if (this.contents === undefined) return null;
    else return this.contents[this.contents.length - 1];
  }

  static getScore(content, usage) {
    let index = 0;
    let factors = config.scorefactors;
    for (let i = 0; i < factors.length; i++) {
      if (factors[i].usage === usage) index = i;
    }

    let cpuScore = content.cpu.benchMark * factors[index].cpu;
    let gpuScore = content.gpu.benchMark * factors[index].gpu;
    let ramScore = content.ram.benchMark * factors[index].ram;
    let storageScore = content.storage.benchMark * factors[index].storage;
    return Math.floor(cpuScore + gpuScore + ramScore + storageScore);
  }
}

class Part {
  constructor(brand, model, benchMark, size, type) {
    this.brand = brand;
    this.model = model;
    this.benchMark = benchMark;
    this.size = size;
    this.type = type;
  }
}

class View {
  static createInitialForm() {
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
      <div class="table-container col-12">

      </div>
    </div>
    `;

    container.querySelectorAll(".cpu-form")[0].append(View.createCpuForm());
    container.querySelectorAll(".gpu-form")[0].append(View.createGpuForm());
    container.querySelectorAll(".ram-form")[0].append(View.createRamForm());
    container.querySelectorAll(".storage-form")[0].append(View.createStorageForm());
    container.querySelectorAll(".evaluateBtn")[0].addEventListener("click", () => {
      let selectEles = container.querySelectorAll(".part-info");
      if (Controller.validate(selectEles) === false) {
        alert(config.alert);
        return;
      }
      let newContent = Controller.makeTableContent();
      container.querySelectorAll(".table-container")[0].append(View.createTable(newContent));
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
            <select class="form-control part-info" id="cpuBrand">
              <option selected>Choose...</option>
            </select>
          </div>
        </div>
        <div class="form-group col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="cpuModel">Model</label>
          <div class="col-sm">
            <select class="form-control part-info" name="" id="cpuModel">
              <option selected>-</option>
            </select>
          </div>
        </div>
      </div>
    </form>
    `;

    let cpuBrand = container.querySelectorAll("#cpuBrand")[0];
    let cpuModel = container.querySelectorAll("#cpuModel")[0];
    cpuBrand.addEventListener("change", () => {
      Controller.setModel(cpuBrand, cpuModel, "cpu");
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
            <select class="form-control part-info" name="" id="gpuBrand">
              <option selected>Choose...</option>
            </select>
          </div>
        </div>
        <div class="form-group col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="gpuModel">Model</label>
          <div class="col-sm">
            <select class="form-control part-info" name="" id="gpuModel">
              <option selected>-</option>
            </select>
          </div>
        </div>
      </div>
    </form>
    `;

    let gpuBrand = container.querySelectorAll("#gpuBrand")[0];
    let gpuModel = container.querySelectorAll("#gpuModel")[0];
    gpuBrand.addEventListener("change", () => {
      Controller.setModel(gpuBrand, gpuModel, "gpu");
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
            <select class="form-control part-info" name="" id="numOfRam">
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
            <select class="form-control part-info" name="" id="ramBrand">
              <option selected>-</option>
            </select>
          </div>
        </div>
        <div class="form-group col-4 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="ramModel">Model</label>
          <div class="col-sm">
            <select class="form-control part-info" name="" id="ramModel">
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
    numOfRam.addEventListener("change", () => {
      Controller.setRamBrand(numOfRam.value, ramBrand);
    });
    ramBrand.addEventListener("change", () => {
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
            <select class="form-control part-info" name="" id="storageType">
              <option selected>Choose...</option>
              <option value="hdd">HDD</option>
              <option value="ssd">SSD</option>
            </select>
          </div>
        </div>
        <div class="form-group col-lg-3 col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="storageSize">Storage</label>
          <div class="col-sm">
            <select class="form-control part-info" name="" id="storageSize">
              <option selected>-</option>
            </select>
          </div>
        </div>
        <div class="form-group col-lg-3 col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="storageBrand">Brand</label>
          <div class="col-sm">
            <select class="form-control part-info" name="" id="storageBrand">
              <option selected>-</option>
            </select>
          </div>
        </div>
        <div class="form-group col-lg-3 col-6 row align-items-center justify-content-start">
          <label class="w-auto pl-3 col-form-label" for="storageModel">Model</label>
          <div class="col-sm">
            <select class="form-control part-info" name="" id="storageModel">
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
    storageType.addEventListener("change", () => {
      Controller.setStorageSize(storageType.value, storageSize);
    });
    storageSize.addEventListener("change", () => {
      Controller.setStorageBrand(storageType, storageSize, storageBrand);
    });
    storageBrand.addEventListener("change", () => {
      Controller.setStorageModel(storageType, storageSize, storageBrand, storageModel);
    });

    return container;
  }

  static createTable(content) {
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
            <td>${content.cpu.brand}</td>
            <td>${content.cpu.model}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">GPU</th>
            <td>${content.gpu.brand}</td>
            <td>${content.gpu.model}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Memory</th>
            <td>${content.ram.brand}</td>
            <td>${content.ram.model}</td>
            <td>${content.ram.size}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Storage</th>
            <td>${content.storage.brand}</td>
            <td>${content.storage.model}</td>
            <td>${content.storage.size}</td>
            <td>${content.storage.type}</td>
          </tr>
        </tbody>
      </table>
      <div class="col-12 row justify-content-end">
        <h4>Gaming: ${Table.getScore(content, "gaming")} %</h4>
        <h4 class="pl-4">Work: ${Table.getScore(content, "work")} %</h4>
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

  static createOptionsWithBenchMark(models, benchMarks, parentEle) {
    let options = "";
    for (let i = 0; i < models.length; i++) {
      options += `<option id="modelOption" value="${models[i]}" data-benchmark="${benchMarks[i]}">${models[i]}</option>`;
    }
    parentEle.innerHTML += options;
  }
}

class Controller {
  static buildPage() {
    config.target.append(View.createInitialForm());
    Controller.setBrand("Brand", document.getElementById("cpuBrand"), "cpu");
    Controller.setBrand("Brand", document.getElementById("gpuBrand"), "gpu");
  }

  static setBrand(key, parentEle, type) {
    fetch(config.url + `?type=${type}`)
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

  static setModel(brandEle, modelEle, type) {
    fetch(config.url + `?type=${type}`)
      .then((response) => response.json())
      .then((data) => {
        let models = [];
        let benchMarks = [];
        for (const product of data) {
          if (product.Brand === brandEle.value) {
            models.push(product.Model);
            benchMarks.push(product.Benchmark);
            modelEle.innerHTML = `<option selected>Choose...</option>`;
            View.createOptionsWithBenchMark(models, benchMarks, modelEle);
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
        let benchMarks = [];
        for (const product of data) {
          if (regex.test(product.Model) && product.Brand === brandEle.value) {
            models.push(product.Model);
            benchMarks.push(product.Benchmark);
            modelEle.innerHTML = `<option selected>Choose...</option>`;
            View.createOptionsWithBenchMark(models, benchMarks, modelEle);
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
        let sorted = Controller.getSortedStorageSize(sizes);
        sizeEle.innerHTML = `<option selected>Choose...</option>`;
        View.createOptions(sorted, sizeEle);
      });
  }

  //sizes配列を容量が大きい順に並べかえた、新しい配列を返す
  static getSortedStorageSize(sizes) {
    let tb = [];
    let gb = [];
    let ex = [];
    let tbResult = [];
    let gbResult = [];
    let exResult = [];
    for (const size of sizes) {
      let len = size.length;
      let num = parseInt(size.substring(0, len - 2));
      let unit = size.substring(len - 2, len);

      if (unit === "TB") {
        tb.push(num);
        tbResult = Controller.sortAndAddUnit(tb, unit);
      }
      else if (unit === "GB") {
        gb.push(num);
        gbResult = Controller.sortAndAddUnit(gb, unit);
      }
      else {
        ex.push(num);
        exResult = Controller.sortAndAddUnit(ex, unit);
      }
    }

    return tbResult.concat(gbResult, exResult);
  }

  static sortAndAddUnit(arr, unit) {
    if (arr.length === 0) return;

    arr.sort((a, b) => b - a);
    let arrWithUnit = arr.map((num) => num + unit);
    return arrWithUnit;
  }

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
        let benchMarks = [];
        for (const product of data) {
          let result = regex[Symbol.matchAll](product.Model);
          let size = Array.from(result, (x) => x[0]).join("");
          if (size === sizeEle.value && product.Brand === brandEle.value) {
            models.push(product.Model);
            benchMarks.push(product.Benchmark);
          }
        }
        modelEle.innerHTML = `<option selected>Choose...</option>`;
        View.createOptionsWithBenchMark(models, benchMarks, modelEle);
      });
  }

  static makeTableContent() {
    let cpu = Controller.getAllCpuInfo();
    let gpu = Controller.getAllGpuInfo();
    let ram = Controller.getAllRamInfo();
    let storage = Controller.getAllStorageInfo();

    let newContent = new Table(cpu, gpu, ram, storage);
    Table.addContent(newContent);
    return Table.getNewestContent();
  }

  static getAllCpuInfo() {
    let brand = document.querySelectorAll("#cpuBrand")[0].value;
    let model = document.querySelectorAll("#cpuModel")[0].value;
    let benchMark;
    let options = document.querySelectorAll("#modelOption");
    for (const option of options) {
      if (option.value === model) benchMark = parseInt(option.dataset.benchmark);
    }

    return new Part(brand, model, benchMark, null, null);
  }

  static getAllGpuInfo() {
    let brand = document.querySelectorAll("#gpuBrand")[0].value;
    let model = document.querySelectorAll("#gpuModel")[0].value;
    let benchMark;
    let options = document.querySelectorAll("#modelOption");
    for (const option of options) {
      if (option.value === model) benchMark = parseInt(option.dataset.benchmark);
    }

    return new Part(brand, model, benchMark, null, null);
  }

  static getAllRamInfo() {
    let brand = document.querySelectorAll("#ramBrand")[0].value;
    let model = document.querySelectorAll("#ramModel")[0].value;
    let benchMark;
    let options = document.querySelectorAll("#modelOption");
    for (const option of options) {
      if (option.value === model) benchMark = parseInt(option.dataset.benchmark);
    }

    let regex = /\dx\d{1,2}GB/g;
    let result = regex[Symbol.matchAll](model);
    let size = Array.from(result, (x) => x[0]).join("");

    return new Part(brand, model, benchMark, size, null);
  }

  static getAllStorageInfo() {
    let type = document.querySelectorAll("#storageType")[0].value.toUpperCase();
    let brand = document.querySelectorAll("#storageBrand")[0].value;
    let model = document.querySelectorAll("#storageModel")[0].value;
    let size = document.querySelectorAll("#storageSize")[0].value;
    let benchMark;
    let options = document.querySelectorAll("#modelOption");
    for (const option of options) {
      if (option.value === model) benchMark = parseInt(option.dataset.benchmark);
    }
    return new Part(brand, model, benchMark, size, type);
  }

  static validate(selectEles) {
    for (const ele of selectEles) {
      if (ele.value === "Choose...") return false;
    }
    return true;
  }
}

Controller.buildPage();
