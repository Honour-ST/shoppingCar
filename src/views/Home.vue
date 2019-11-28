<template>
  <div class="home">
    <div class="nav">
      <van-nav-bar title="购物车" left-text="返回" left-arrow>
        <van-icon name="ellipsis" slot="right" size="24px" />
      </van-nav-bar>
    </div>
    <div class="section">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="listbox" v-for="(item,index) in pros" :key="index">
          <div class="checkbox">
            <van-checkbox :name="index" v-model="item.bool" @click="add(item)"></van-checkbox>
          </div>
          <div class="picbox">
            <img :src="item.url" alt />
          </div>
          <div class="itembox">
            <p class="name">{{item.name}}</p>
            <p class="Price">
              &yen;&nbsp;限时价:{{item.price}}
              <i
                class="vipPrice"
                v-show="item.vip"
              >会员价: &yen;&nbsp;{{item.vipPirce}}</i>
              <span>x{{item.num}}</span>
            </p>
            <p>
              <van-stepper v-model="item.num" @input="changecount"/>
            </p>
          </div>
        </div>
      </van-checkbox-group>
    </div>
    <div class="foot">
      <van-submit-bar :price="total" button-text="提交订单">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      pros: null,
      result: [],
      value: 1,
      total: 0
    };
  },
  methods: {
    http(data) {
      return new Promise((reslove, reject) => {
        var datastr = "";
        for (var key in data) {
          datastr += key + "=" + data[key] + "&";
        }
        datastr = datastr.slice(0, -1);
        var xhr = new XMLHttpRequest();
        (xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            reslove(this.response);
          }
        }),
          xhr.open(
            "GET",
            "http://api.kangliuyong.com:9002/pros?" + datastr,
            true
          );
        xhr.responseType = "json";
        xhr.send(null);
      });
    },
    checkAll() {
      if (!this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
      this.sum();
    },
    add(item) {
      item.bool = !item.bool;
      this.checked = this.pros.every(item1 => item1.bool);
      this.total = this.sum();
    },
    sum() {
      var amount = 0;
      this.pros.forEach(el => {
        if (el.bool) {
          console.log("sum",el.num)
          amount += el.num * el.price;
          console.log(amount);
        }
      });
      return amount*100;
    },
    changecount(){
      console.log("触发")
      this.total = this.sum();
    }
  },
  created() {
    let parms = this.$route.query;
    this.http(parms).then(result => {
      result.forEach(element => {
        element.num = 1;
        element.bool = false;
      });
      this.pros = result;
      console.log("pros", this.pros);
    });
  }
};
</script>

<style lang="less">
.nav {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
}

.section {
  position: fixed;
  top: 48px;
  bottom: 50px;
  width: 100%;
  box-sizing: border-box;
  background-color: #eeeeee;
}

.foot {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  .van-submit-bar {
    padding-left: 10px;
  }
}

.listbox {
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
  margin: 10px 0px;
  background-color: #fff;
  .checkbox {
    float: left;
    width: 0.53rem;
    margin: 0px 10px;
  }
  .picbox {
    width: 2.5rem;
    color: red;
    float: left;
    img {
      display: block;
      width: 100%;
    }
  }
  .itembox {
    width: 100%;
    overflow: hidden;
    p {
      margin: 5px 0px;
      text-align: center;
      height: 20px;
      line-height: 20px;
    }
    .name {
      color: #000;
      font-size: 14px;
      font-weight: bold;
    }
    .Price {
      font-size: 14px;
      color: #666;
    }
    .vipPrice {
      margin-left: 10px;
      color: #ff6700;
      font-size: 12px;
    }
  }
}
</style>