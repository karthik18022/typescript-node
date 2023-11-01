"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require('axios');
const ExternalData = require('../models/externalData');
exports.getExternalDataCall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiUrl = 'https://sivaraja.atlassian.net/rest/agile/1.0/board/1/sprint';
    const userName = 'karthik18022@gmail.com';
    const password = 'ATATT3xFfGF0RukiZiapy2szSto3Ed0F6UNgv7DLlvLL3MwlKgICn4d494DCXxru1XDSZ-eJgdjeq4QyKU2Iep0vHtkEfNXbxWI04Iakr81JlXE1gXUy09cBGCf5hqLmSr5Dk90dFcwC_CfUzJqdsA7UawfQX6CE_XkRKcATCtPxpZH7BdMayXo=0EEA61C4';
    const base64Credentials = Buffer.from(`${userName}:${password}`).toString('base64');
    const config = {
        headers: {
            'Authorization': `Basic ${base64Credentials}`,
        }
    };
    axios.get(apiUrl, config)
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        const value = response.data.values;
        const newExternalData = new ExternalData({
            apiRequests: apiUrl,
            apiResponse: 'success',
            data: value
        });
        const newData = yield newExternalData.save();
        console.log(response.data);
        res.send(response.data); // Your API response data
        return newData;
    }))
        .catch((error) => {
        console.error(error);
    });
    return res;
});
