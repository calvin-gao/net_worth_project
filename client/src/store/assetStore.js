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
            this.assets = newAssets.map(asset => new Asset(asset.name, asset.amount));
            localStorage.setItem('asset-user', JSON.stringify(newAssets));
        },
        addAsset(newAsset) {
            this.assets.push(new Asset(newAsset));
            localStorage.setItem('asset-user', JSON.stringify(this.assets));
        },
        removeAsset(index) {
            this.assets.splice(index, 1);
            localStorage.setItem('asset-user', JSON.stringify(this.assets));
        },
        updateAsset(index, newAsset) {
            this.assets[index] = new Asset(newAsset);
            localStorage.setItem('asset-user', JSON.stringify(this.assets));
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