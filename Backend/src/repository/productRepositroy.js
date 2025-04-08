"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileManager_js_1 = require("../utils/fileManager.js");
var utils_js_1 = require("../utils/utils.js");
var getProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, fileManager_js_1.readToFile)(utils_js_1.productPath)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
            case 2:
                err_1 = _a.sent();
                console.log("Error in product repository getProducts. Failed to get product data", err_1);
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
var getProductIndex = function (products, productid) {
    var productIndex = products.findIndex(function (product) { return product.productid === productid; });
    return productIndex;
};
var getProductById = function (productid) { return __awaiter(void 0, void 0, void 0, function () {
    var data, productIndex, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, fileManager_js_1.readToFile)(utils_js_1.productPath)];
            case 1:
                data = _a.sent();
                productIndex = getProductIndex(data, productid);
                console.log(productIndex);
                if (productIndex < 0) {
                    console.log("No product found");
                    return [2 /*return*/, []];
                }
                else {
                    return [2 /*return*/, data[productIndex]];
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log("Error in product repository getProductByID. Failed to get product data based on productid", err_2);
                throw err_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
var addProduct = function (product) { return __awaiter(void 0, void 0, void 0, function () {
    var products, productindex, totalProducts, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, fileManager_js_1.readToFile)(utils_js_1.productPath)];
            case 1:
                products = _a.sent();
                product.productid = (0, utils_js_1.generateId)();
                productindex = getProductIndex(products, product.productid);
                if (productindex >= 0) {
                    console.log("Product already exists in the database");
                    return [2 /*return*/, []];
                }
                totalProducts = __spreadArray(__spreadArray([], products, true), [product], false);
                return [4 /*yield*/, (0, fileManager_js_1.writeToFile)(utils_js_1.productPath, totalProducts)];
            case 2:
                _a.sent();
                return [2 /*return*/, totalProducts];
            case 3:
                err_3 = _a.sent();
                console.log("Error in product repository addProduct. Failed to add a product to database", err_3);
                throw err_3;
            case 4: return [2 /*return*/];
        }
    });
}); };
var addProducts = function (products) { return __awaiter(void 0, void 0, void 0, function () {
    var productsInDb, totalProducts, _i, products_1, product, productindex, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, fileManager_js_1.readToFile)(utils_js_1.productPath)];
            case 1:
                productsInDb = _a.sent();
                totalProducts = __spreadArray([], productsInDb, true);
                for (_i = 0, products_1 = products; _i < products_1.length; _i++) {
                    product = products_1[_i];
                    product.productid = (0, utils_js_1.generateId)();
                    productindex = getProductIndex(products, product.productid);
                    if (productindex < 0) {
                        console.log(product);
                        totalProducts = __spreadArray(__spreadArray([], totalProducts, true), [product], false);
                    }
                    else {
                        console.log("Product Already exists");
                    }
                }
                return [4 /*yield*/, (0, fileManager_js_1.writeToFile)(utils_js_1.productPath, totalProducts)];
            case 2:
                _a.sent();
                return [2 /*return*/, totalProducts];
            case 3:
                err_4 = _a.sent();
                console.log("Error in product repository addProducts. Failed to add products to the database", err_4);
                throw err_4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var updateProduct = function (productid, update) { return __awaiter(void 0, void 0, void 0, function () {
    var products, name_1, price, description, category, inventory, productIndex, product, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, fileManager_js_1.readToFile)(utils_js_1.productPath)];
            case 1:
                products = _a.sent();
                name_1 = update.name, price = update.price, description = update.description, category = update.category, inventory = update.inventory;
                productIndex = getProductIndex(products, productid);
                product = products[productIndex];
                if (productIndex < 0) {
                    throw new Error("No product found");
                }
                if (name_1)
                    product.name = name_1;
                if (price)
                    product.price = price;
                if (description)
                    product.description = description;
                if (category)
                    product.category = category;
                if (inventory)
                    product.inventory = inventory;
                // const newProducts = products.map((product) => {
                //   if (product.productid === productid) {
                //     return { ...product, ...update };
                //   }
                //   return product;
                // });
                return [4 /*yield*/, (0, fileManager_js_1.writeToFile)(utils_js_1.productPath, products)];
            case 2:
                // const newProducts = products.map((product) => {
                //   if (product.productid === productid) {
                //     return { ...product, ...update };
                //   }
                //   return product;
                // });
                _a.sent();
                return [2 /*return*/, products];
            case 3:
                err_5 = _a.sent();
                console.log("Error in product repository update. Failed to update a product", err_5);
                throw err_5;
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteProduct = function (productid) { return __awaiter(void 0, void 0, void 0, function () {
    var products, totalProducts, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, fileManager_js_1.readToFile)(utils_js_1.productPath)];
            case 1:
                products = _a.sent();
                totalProducts = products.filter(function (product) { return product.productid !== productid; });
                return [4 /*yield*/, (0, fileManager_js_1.writeToFile)(utils_js_1.productPath, totalProducts)];
            case 2:
                _a.sent();
                return [2 /*return*/, totalProducts];
            case 3:
                err_6 = _a.sent();
                console.log("Error in product repository delete", err_6);
                throw err_6;
            case 4: return [2 /*return*/];
        }
    });
}); };
var increaseProductInventory = function (id, quantity) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, fileManager_js_1.readToFile)(utils_js_1.productPath)];
            case 1:
                products = _a.sent();
                products = products.map(function (product) {
                    if (product.productid === id) {
                        var inventory = Number(product.inventory) + Number(quantity);
                        return __assign(__assign({}, product), { inventory: inventory });
                    }
                    return product;
                });
                return [4 /*yield*/, (0, fileManager_js_1.writeToFile)(utils_js_1.productPath, products)];
            case 2:
                _a.sent();
                return [2 /*return*/, products];
            case 3:
                err_7 = _a.sent();
                console.log("Error in product repository invenotry++", err_7);
                throw err_7;
            case 4: return [2 /*return*/];
        }
    });
}); };
var decreaseProductInventory = function (id, quantity) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, fileManager_js_1.readToFile)(utils_js_1.productPath)];
            case 1:
                products = _a.sent();
                products = products.map(function (product) {
                    if (product.productid === id) {
                        var inventory = void 0;
                        inventory = Number(product.inventory) - quantity;
                        return __assign(__assign({}, product), { inventory: inventory });
                    }
                    return product;
                });
                return [4 /*yield*/, (0, fileManager_js_1.writeToFile)(utils_js_1.productPath, products)];
            case 2:
                _a.sent();
                return [2 /*return*/, products];
            case 3:
                err_8 = _a.sent();
                console.log("Error in product repository invenotry--", err_8);
                throw err_8;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    getProducts: getProducts,
    getProductById: getProductById,
    addProduct: addProduct,
    addProducts: addProducts,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    increaseProductInventory: increaseProductInventory,
    decreaseProductInventory: decreaseProductInventory,
};
