import { defineStore } from 'pinia';
import { Asset } from '../assets/helper/constants';


export const useAssetStore = defineStore('assetStore', {
    id: 'assetStore',
    state: () => ({
        assets: () => {
            const asset_json = JSON.parse(localStorage.getItem('asset-user') ?? "[]");
            return asset_json.map(asset => new Asset(asset.name, asset.amount));
        },
    }),
    getters: {},
    actions: {
        setAssets(newAssets) {
            this.assets = newAssets;
            localStorage.setItem('asset-user', JSON.stringify(newAssets));
        },
        addAsset(newAsset) {
            this.assets.push(newAsset);
            localStorage.setItem('asset-user', JSON.stringify(this.assets));
        },
        removeAsset(index) {
            this.assets.splice(index, 1);
            localStorage.setItem('asset-user', JSON.stringify(this.assets));
        },
        updateAsset(index, newAsset) {
            for (var i in this.assets) {
                if (this.assets[i].name == newAsset.name) {
                    this.assets[i].amount = newAsset.amount;
                    if (i != index) {
                        this.assets.splice(index, 1);
                    }
                    break;
                }
            }
            localStorage.setItem('asset-user', JSON.stringify(this.assets));
        },
        getRunningTotal() {
            let total = 0.0;
            for (var i in this.assets) {
                total += this.assets[i].amount;
            }
            return total;
        },
        map(callback) {
            var mapping = [];
            for (let i = 0; i < this.assets.length; i++) {
                mapping.push(callback(this.assets[i], i));
            }
            return mapping;
        }
    }
})