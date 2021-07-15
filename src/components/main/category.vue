<template>
    <div>
       <el-header>
            <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="8" class="title-left">
                    <i class="el-icon-menu"></i>
                    <span>CATEGORIES</span>
                </el-col>
                <el-col :span="6">
                    <el-input class="search1 search2 search3" placeholder="搜索书籍" active-text-color="#4F6E9D" prefix-icon="el-icon-search" v-model="searchText" @confirm="toSearch()"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button class="cateButton" icon="el-icon-search" @click="toSearch()"></el-button>
                </el-col>
                <el-col :span="8" class="title-right">
                    <el-tag type="warning" size="medium">Books</el-tag>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="300px">
                <el-card class="leftNav">
                    <img src="../../../static/cateNav.png" class="leftImg" />
                    <div class="navItem" :class="index === showCategoryIndex ? 'cur' : ''"
                      v-for="(item, index) in navItems" :key="index" @click="showCategory(index)"> {{item.name}}
                    </div>
                    <div class="navItem" @click="toTop()"><i class="el-icon-arrow-up" style="font-size: 23px;"></i></div>
                </el-card>
            </el-aside>
            <el-main v-loading.fullscreen.lock="loading" element-loading-background="#FFFFFF">
                <el-row>
                    <el-card class="row" v-for="(book, index) in Books[showCategoryIndex]" :key="index"
                             :body-style="{ padding: '0px' }">
<!--                      //分页-->
                        <img class="img" @click="toInfo(book)" :src="book.imageUrl">
                        <el-link class="name" @click="toInfo(book)" :underline="false">
                          <i class="el-icon-reading readIcon"></i>{{ book.name }}</el-link>
                        <div class="author">{{ book.author }}</div>
                        <div style="position: absolute; bottom: 0;">
                            <el-row type="flex" align="middle">
                                <el-col :span="12" class="price">¥{{ book.price }}</el-col>
                                <el-col :span="12">
                                    <button class="shop" @click="addToCart(book)">
                                        <i class="el-icon-shopping-bag-1 icon"></i>
                                      </button>
                                </el-col>
                            </el-row>
                            <el-rate class="rate" v-model="book.score" :colors="colors" disabled></el-rate>
                        </div>
                    </el-card>
                </el-row>
                <el-row class="page">
                    <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="MAXlength">
                    </el-pagination>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import axios from "axios";
    import 'element-ui/lib/theme-chalk/display.css';

    export default {
        data() {
            return {
                loading: true,
                scroll: 0, //第一步：定义初始滚动高度
                activeIndex: "1",
                MAXlength: 0,
                bookPath: 1,
                searchText: "", //搜索关键字
                showCategoryIndex: 0,
                navItems: [],
              Books: [
                 []
                ],
                currentPage: 1,
                pagesize: 50
            };
        },
        //第二步：mounted中的方法代表dom已经加载完毕
      mounted: function() {
        window.addEventListener('scroll', this.handleScroll);
      },
        created() {
          axios.get('/api/category/list/').then(res =>{
            this.navItems=res.data.result.list;
            console.log(this.navItems);
          })
          axios.get('/api/book/list/').then(res => {
              let data=res.data.result;
             this.MAXlength=data.total/50;
            console.log(this.currentPage)
            this.Books[this.showCategoryIndex] = res.data.result.list; //获取数据
            console.log("success");
            console.log(this.Books[this.showCategoryIndex]);
            console.log(this.showCategoryIndex)

            this.reload();
          })
          // axios.get('/api/book/list').then(res => {
          //   let data=res.data.result;
          //   this.MAXlength=data.total/50;
          //   this.Books[0] = res.data.result.list; //获取数据
          //   console.log("success");
          //   console.log(this.Books[0]);
          //   console.log(this.MAXlength);
          //   console.log(res.data.result)
          //   console.log(this.navItems.length)
          // })
          this.loading = false;
        },
        methods: {
            handleCurrentChange: function(currentPage) {
              this.currentPage = currentPage
                //this.reload();
              axios.get('/api/book/category/'+this.showCategoryIndex+'/list/'+this.currentPage,
                {page:this.currentPage}).then(res => {
                  let data=res.data.result;
                this.MAXlength=data.total/50;
                console.log(this.currentPage)
                this.Books[this.showCategoryIndex] = res.data.result.list; //获取数据
                console.log("success");
                console.log(this.Books[this.showCategoryIndex]);
                console.log(res.data.result)
              })
            },
            //第三步：用于存放页面函数
            handleScroll() {
               this.scroll = $(window).height() + $(document).scrollTop()//可见高以及获取垂直滚动的距离  即当前滚动的地方的窗口顶端到整个页面顶端的距离
            },
            toTop() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            },
          toSearch(){
              if(this.searchText==''){
                this.$message({showClose: true, message: '查询不能为空！', type: 'error', center: true})
              }else{
            axios.get('/api/book/search/'+this.searchText+'/list/').then(res =>{
              console.log(res.data)
            this.Books[0]=res.data.result.list;
              let data=res.data.result;
              this.MAXlength=data.total/50;
              this.$message({showClose: true, message: '查询成功！', type: 'success', center: true})
              this.reload();
            })}
          },
          toInfo(e) {
            this.$router.push({path: "/bookInfo", query: {ID: e.bookId}
            });
          },
            showCategory(index) {
                this.showCategoryIndex = index;
                this.currentPage=1;
                axios.get('/api/book/category/'+this.navItems[index].cateId+'/list/').then(res => {
                this.Books[index] = res.data.result.list; //获取数据
                  let data=res.data.result;
                  this.MAXlength=data.total/50;
                console.log("success");
                console.log(this.Books[index]);
                console.log(res.data.result)
              })
            },
            addToCart(e) {
                this.$confirm("确定将此书加入购物车?", "smallFrog", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                      axios.post('/api/order/', {
                        userid: this.$cookies.get('userId'),
                        storeId: e.storeId,//书籍ID
                        bookId: e.bookId,
                        imageUrl: e.imageUrl,
                        bookName: e.name,
                        price: e.price,
                        orderMount: 1
                        }).then(res => {
                            console.log("success");
                        });
                        this.$message({
                        type: 'success',
                        message: '成功加入购物车！'
                    });
                })
                .catch(() => {});
            }
        },
        //第四步：当再次进入（前进或者后退）时，只触发activated（注：只有在keep-alive加载时调用）
        activated() {
            if (this.scroll > 0) {
                window.scrollTo(0, this.scroll);
                window.addEventListener('scroll', this.handleScroll);
            }
        },
        //第五步：deactivated 页面退出时关闭事件 防止其他页面出现问题
        deactivated() {
            window.removeEventListener('scroll', this.handleScroll);
        }
    };
</script>

<style scoped>
    .title-left {
        line-height: 100px;
        margin-left: 20px;
        font-size: 25px;
        color: #4f6e9d;
    }

    .title-right {
        line-height: 100px;
        text-align: end;
        margin-right: 20px;
        color: #4f6e9d;
    }

    .cateButton {
        border-radius: 25px;
        background-color: #4f6e9d;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        color: #ffffff;
        margin-left: 20px;
    }

    /* main里的样式 */
    .leftNav {
        top: 50%;
        width: 160px;
        height: 600px;
        margin-top: -180px;
        margin-left: 60px;
        position: fixed;
        border-radius: 20px;
        background-color: #4f6e9d;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }

    .leftNav .leftImg {
        width: 100%;
        margin-bottom: 20px;
        color: #ffffff;
        position: relative;
        border-radius: 20px;
    }

    .leftNav .navItem {
        text-align: center;
        height: 30px;
        cursor: pointer;
        color: #ffffff;
        cursor: pointer;
        position: relative;
    }

    .leftNav .navItem:hover {
        transform: scale(1.05);
    }

    .leftNav .navItem.cur::after {
        color: #ffffff;
        content: "";
        width: 5px;
        height: 22px;
        border-radius: 10px 10px 10px 10px;
        position: absolute;
        background-color: currentColor;
        top: 0;
        right: 0;
        margin: auto;
    }

    .row {
        margin-top: 20px;
        margin-bottom: 20px;
        width: 160px;
        height: 400px;
        margin-left: 30px;
        margin-right: 30px;
        display: inline-block;
        position: relative;
    }

    .row .img {
        width: 100%;
        height: 200px;
        /* display: block; */
        cursor: pointer;
        transition: all 0.6s;
    }

    .row .img:hover {
        transform: scale(1.1);
    }

    .row .name {
        padding-top: 14px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 16px;
    }

    .el-link.el-link--default {
        color: #4f6e9d;
    }

    .el-link.el-link--default:hover {
        color: #7e9dca;
    }

    .row .readIcon {
        text-align: left;
        padding-right: 5px;
    }

    .row .author {
        text-align: left;
        color: #909399;
        padding-top: 14px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 15px;
    }

    .row .price {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 15px;
        padding-left: 15px;
        padding-top: 4px;
    }

    .row .shop {
        margin-top: 10px;
        margin-bottom: 10px;
        border: none;
        outline: none;
        background-color: #ffffff;
        font-size: 20px;
        float: right;
        padding-right: 15px;
    }

    .row .shop .icon {
        color: #4f6e9d;
        cursor: pointer;
        transition: all 0.3s;
    }

    .row .shop .icon:hover {
        transform: scale(1.1);
    }

    .row .rate {
        text-align: center;
        padding: 0 10px 14px 10px;
    }

    .page {
        margin-top: 30px;
        text-align: center;
    }
</style>
