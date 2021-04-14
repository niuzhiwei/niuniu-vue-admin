<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card
          shadow="hover"
          class="mgb20"
        >
          <div class="user-info rflex">
            <img
              class="user-avatar"
              src="../assets/imgs/pig.png"
            >
            <div class="user-info-list">
              <div class="user-info-name">牛牛</div>
              <div>Admin</div>
            </div>
          </div>
          <div class="user-login-info">
            上次登录时间：
            <span>2020-04-11</span>
          </div>
          <div class="user-login-info">
            上次登录地点：
            <span>东莞</span>
          </div>
        </el-card>

        <el-card shadow="hover">
          <div
            slot="header"
            class="clearfix"
          >
            <span>语言详情</span>
          </div>
          Vue
          <el-progress
            :percentage="71.3"
            color="#42b983"
          ></el-progress>JavaScript
          <el-progress
            :percentage="52.1"
            color="#f1e05a"
          ></el-progress>CSS
          <el-progress :percentage="33.7"></el-progress>HTML
          <el-progress
            :percentage="36.9"
            color="#f56c6c"
          ></el-progress>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-row :gutter="20">
          <el-col
            v-for="content in contents"
            :key="content.icon"
            :span='8'
          >
            <el-card
              :body-style="{ padding: '0' }"
              shadow="hover"
            >
              <div class="figure-content rflex">
                <i
                  :class="content.icon"
                  class="content-icon"
                  :style="{background:content.bgColor}"
                ></i>
                <div class="content-right">
                  <div
                    :style="{color:content.color}"
                    class="content-num"
                  >{{content.number}}</div>
                  <div>{{content.title}}</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-card shadow="hover">
          <div
            slot="header"
            class="clearfix"
          >
            <span>待办事项</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
            >添加事项</el-button>
          </div>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            :show-header="false"
            style="width: 100%"
          >
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <echarts
            style="height:300px"
            :series-data="dataList"
            :extra-option="extraOption"
          ></echarts>
        </el-card>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "@/components/charts/index";
export default {
  components: { echarts },
  data() {
    return {
      contents: [
        {
          icon: "el-icon-user",
          number: 1234,
          title: "用户访问量",
          color: "#2d8cf0",
          bgColor: "#2d8cf0",
        },
        {
          icon: "el-icon-bell",
          number: 34,
          title: "系统消息",
          color: "#2d8cf0",
          bgColor: "#64d572",
        },
        {
          icon: "el-icon-s-cooperation",
          number: 480,
          title: "数量",
          color: "#f25e43",
          bgColor: "#f25e43",
        },
      ],
      tableData: [
        {
          title: "今天要给小屁洗澡",
          status: false,
        },
        {
          title: "今天要把ES6笔记写完",
          status: false,
        },
        {
          title: "今天要蛙泳两千米",
          status: false,
        },
        {
          title: "今天要把简历整理好",
          status: false,
        },
        {
          title: "今天要完善VUE项目",
          status: false,
        },
      ],
      dataList: [
        {
          name: "西瓜",
          value: 20,
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: "#ff7474 ", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#4176ff", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          name: "橘子",
          value: 13,
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: "#ffe390", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#f7c222", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          name: "杨桃",
          value: 33,
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: "#9090ff", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#5656d0", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          name: "梨子",
          value: 13,
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: "#95ec95", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#4ebb4e", // 100% 处的颜色
                },
              ],
            },
          },
        },
      ],
      extraOption: {
        color: ["#fe883a", "#2d90d1", "#f75981", "#90e2a9"],
      },
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>
<style lang='less' scoped>
.user-info {
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccc;
  .user-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-info-list {
    padding-left: 48px;
    flex: 1;
    font-size: 16px;
    color: #999;
    .user-info-name {
      font-size: 32px;
      color: #222;
    }
  }
}
.user-login-info {
  font-size: 14px;
  color: #999;
  line-height: 24px;
  span {
    margin-left: 64px;
  }
}

.figure-content {
  align-items: center;
  height: 100px;
  .content-icon {
    font-size: 48px;
    text-align: center;
    width: 100px;
    height: 100px;
    line-height: 100px;
    color: #fff;
  }
  .content-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
    .content-num {
      font-size: 32px;
      font-weight: bold;
    }
  }
}

.echart {
  width: 100%;
  height: 300px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>