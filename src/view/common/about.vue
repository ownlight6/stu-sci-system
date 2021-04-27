<template>
  <div class="aboutContainer">
    <div class="aboutBox">
      <div class="aboutImg">
        <img src="../../static/img/logo.png" alt="" />
      </div>
      <div class="name">刘淇</div>
      <div class="sno">201913136035</div>
      <div class="class">网络工程1901</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style  lang="scss" scoped>
.aboutContainer {
  text-align: center;
  .aboutBox:hover {
    box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.3);
    transition: 0.2s ease-in-out;
  }
  .aboutBox {
    display: block;
    width: 250px;
    padding: 20px;
    margin: 80px auto 0;
    box-shadow: 0 0 12px rgba($color: #000000, $alpha: 0.2);
    border-radius: 8px;
    transition: 0.2s ease-in-out;
    .aboutImg {
      width: 150px;
      height: 150px;
      margin: auto;
      border-radius: 50%;
      box-shadow: 0 0 12px rgba($color: #000000, $alpha: 0.2);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      margin-top: 40px;
      font-size: 26px;
      letter-spacing: 2px;
      padding-bottom: 10px;
      border-bottom: 3px solid #eee;
    }
    .sno,
    .class {
      letter-spacing: 1px;
      margin-top: 10px;
    }
  }
}
</style>