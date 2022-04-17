<template>

<h1>Hello Home Page</h1>

<li v-for="(item, index) in assets" :key="index">
    {{ item.name }} - {{ item.amount }}
</li>

<form action="" class="form-inline" ref="form" v-on:submit="addAssets">
        <div class="form-group">
            <label>Cash: </label>
            <input type="text" class="form-control" v-model="cash" placeholder="Cash Amount">
        </div>
        <div class="form-group">
            <label>Investments: </label>    
            <input type="text" class="form-control" v-model="investment" placeholder="Investment Amount">   
        </div>
        <div class="form-group">
            <label>Retirement: </label>    
            <input type="text" class="form-control" v-model="retirement" placeholder="Retirement Amount">   
        </div>
    <button type="submit" class="btn btn-default">Submit</button>
</form>
</template>

<script>
import { Asset } from '../../assets/helper/constants.js';

export default {
    name: "HomePage",
    methods: {
        addAssets: () => {
            console.log(this);
            // this.assets.push(new Asset(data.name, data.amount));
        }
    },
    data() {
        // Custom class , Asset : String , Amount : Decimal , Class.asset    (Cash : 200) , (Investments : 300) 
        // Asset : Amount(200.30)
        return {
            assets: [new Asset('Cash', 30.0), new Asset('Investments', 40.0), new Asset('Retirement', 30.0)]
        }
    }
}
</script>

<style>
h1{
    color: black;
}
</style>
