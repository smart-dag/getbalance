<template>
  <div class="home" v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>测试网水龙头</h3>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">帮助</el-button> -->
      </div>
      <div class="text item">当前水塔拥有 {{ balance }} SDG</div>
      <div class="text item">
        <el-input placeholder="输入你的SDAG钱包地址" suffix-icon="el-icon-wallet" v-model="useraddress"></el-input>
      </div>
      <div class="text item"></div>
      <div class="text item">
        <el-button type="primary" @click="getbalance">领取 100 SDG</el-button>
      </div>
    </el-card>
  </div>
</template>
<style>
.box-card {
  width: 80%;
  max-width: 1000px;
  margin: 20px auto;
}
.item {
  margin-top: 20px;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
const { default: Wallet } = require("sdagwallet.js");
let wallet = new Wallet();

export default {
  name: "home",
  data() {
    return {
      loading: true,
      mnemonic:
        "find exotic area bronze spider nerve produce anchor fortune inform involve impact",
      address: "",
      balance: "",
      useraddress: "" // user's address
    };
  },
  methods: {
    msg(title, text) {
      const h = this.$createElement;
      this.$notify({
        title: title,
        message: h("i", { style: "color: teal" }, text)
      });
    },
    getbalance() {
      this.loading = true;
      wallet
        .send({ amount: 100, to: this.useraddress, text: "用于测试的100枚SDG" })
        .then(() => {
          this.loading = false;
          this.msg("提示", "领取成功");
          this.useraddress = "";
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    // this.mnemonic = wallet.generateMnemonic();
    wallet.configHub("wss://explorer.sdag.io:20003");
    wallet.loginWithMnemonic(this.mnemonic).then(() => {
      this.address = wallet.getAddress();
      console.log("address", this.address);
      wallet.getBalance().then(balance => {
        this.balance = balance / 100000;
        this.loading = false;

        console.log("balance", balance);
      });
    });
  }
};
</script>
