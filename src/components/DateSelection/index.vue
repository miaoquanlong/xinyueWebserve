<template>
  <div class="date-selection" style="width:100%;">
    <el-row>
      <el-col :lg="24" :md="24">
        <el-row>
          <el-col :lg="7" :md="7" :sm="7" :xs="24" style="padding-right:10px;" v-if="canFastSelect">
            <el-select v-model="ScreenValue" placeholder="请选择" @change="ScreenDate" clearable>
              <el-option v-for="item in ScreenDateArr" :key="item.value" :label="item.arr.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :lg="!canFastSelect ? 11: 8" :md="!canFastSelect ? 11: 8" :sm="!canFastSelect ? 11: 8" :xs="24">
            <el-date-picker class="padding-right-0" popper-class="curstumDate" v-model="StartDate" type="date" placeholder="选择开始日期" @change="StartEndChange(1)" :picker-options="{
                                        disabledDate(time) {
                                            if(EndDate != null&& EndDate != ''){
                                                return time.getTime() > new Date(EndDate);
                                            }else{
                                                return false
                                            }
                                        },
                                    }" value-format="yyyy-MM-dd" style="width:100%"></el-date-picker>
          </el-col>
          <el-col :lg="!canFastSelect ? 2: 1" :md="!canFastSelect ? 2: 1" :sm="!canFastSelect ? 2: 1" :xs="24">
            <div style="text-align:center">~</div>
          </el-col>
          <el-col :lg="!canFastSelect ? 11: 8" :md="!canFastSelect ? 11: 8" :sm="!canFastSelect ? 11: 8" :xs="24">
            <el-date-picker class="padding-right-0" popper-class="curstumDate" ref="EndSele" v-model="EndDate" type="date" placeholder="选择结束日期" @change="StartEndChange" :picker-options="{
                                        disabledDate(time) {
                                            if(StartDate!=null&&StartDate!=''){
                                                return (time.getTime()+ 3600 * 1000 * 24) < new Date(StartDate);
                                            }else{
                                                return false
                                            }
                                        },
                                    }" value-format="yyyy-MM-dd" style="width:100%"></el-date-picker>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { momentTime } from "@/filters";
import moment from 'moment'
export default {
  name: 'Date-Selection',
  props: {
    fastSelectionDate: {
      type: Array,
      required: false,
    },
    DefaultDate: {
      type: String | Number,
      default: '',
      required: false,
    },
    canFastSelect: {
      type: Boolean,
      default: true
    },
    DefaultDateArray: {  // 默认选中快捷选项外的日期, [start,end]必传2个参数
      type: Array,
      required: false,
    }
  },
  data () {
    return {
      StartDate: '',
      EndDate: '',
      ScreenValue: '',
      ScreenDateArr: [
        {
          value: 1,
          arr: {
            label: "一周内",
            dateArr: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()]
          }
        },
        {
          value: 2,
          arr: {
            label: "两周内",
            dateArr: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 14), new Date()]
          }
        },
        {
          value: 3,
          arr: {
            label: "一月内",
            dateArr: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 30), new Date()]
          }
        },
        {
          value: 4,
          arr: {
            label: "本日",
            dateArr: [new Date(), new Date()]
          }
        },
        {
          value: 5,
          arr: {
            label: "本月",
            dateArr: [moment().startOf('month').format("YYYY-MM-DD"), moment().endOf('month').format("YYYY-MM-DD")]
          }
        },
        {
          value: 6,
          arr: {
            label: "本年",
            dateArr: [moment().startOf('year').format("YYYY-MM-DD"), moment().endOf('year').format("YYYY-MM-DD")]
          }
        },
        {
          value: 7,
          arr: {
            label: "上周",
            dateArr: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDay() - 1 + 7)), new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDay()))]
          }
        },
        {
          value: 8,
          arr: {
            label: "上月",
            dateArr: [this.LastMonth(1), this.LastMonth(2)]
          }
        },
        {
          value: 9,
          arr: {
            label: "上年",
            dateArr: [(new Date().getFullYear() - 1) + '-' + '01' + '-' + '01', (new Date().getFullYear() - 1) + '-' + '12' + '-' + '31']
          }
        },
        {
          value: 10,
          arr: {
            label: "未来一周内",
            dateArr: [new Date().setTime(new Date().getTime() + 3600 * 1000 * 24), new Date().setTime(new Date().getTime() + 3600 * 1000 * 24 * 7)]
          }
        },
        {
          value: 11,
          arr: {
            label: "未来一月内",
            dateArr: [new Date().setTime(new Date().getTime() + 3600 * 1000 * 24), new Date().setTime(new Date().getTime() + 3600 * 1000 * 24 * 30)]
          }
        },
        {
          value: 12,
          arr: {
            label: "未来三月内",
            dateArr: [new Date().setTime(new Date().getTime() + 3600 * 1000 * 24), new Date().setTime(new Date().getTime() + 3600 * 1000 * 24 * 90)]
          }
        },
      ],
    }
  },
  created () {
    if (this.fastSelectionDate) {
      this.ScreenDateArr = this.ScreenDateArr.filter(item => {
        if (this.fastSelectionDate.includes(item.value)) {
          return true
        } else {
          return false
        }
      })
    }
    if (this.DefaultDate) {
      this.ScreenDateArr.filter(item => {
        if (this.DefaultDate == item.value) {
          this.StartDate = momentTime(item.arr.dateArr[0], "YYYY-MM-DD");
          this.EndDate = momentTime(item.arr.dateArr[1], "YYYY-MM-DD");
          this.ScreenValue = item.value;
        }
      })
    }
    if (this.DefaultDateArray) {
      this.StartDate = momentTime(this.DefaultDateArray[0], "YYYY-MM-DD");
      this.EndDate = momentTime(this.DefaultDateArray[1], "YYYY-MM-DD");
    }
    this.$emit("ObtainDate", this.StartDate, this.EndDate)
  },
  methods: {
    //上月
    LastMonth (str) {
      let tianshu;
      if (new Date().getMonth() == 0) {
        tianshu = this.mGetDate(new Date().getFullYear() - 1, 12)
      } else {
        tianshu = this.mGetDate(new Date().getFullYear(), new Date().getMonth())
      }
      if (str == 1) {
        return new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDate() - 1 + tianshu));
      } else {
        return new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDate()));
      }

    },
    //获取月的天数
    mGetDate (year, month) {
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    ScreenDate (val) {
      if (val) {
        for (const i in this.ScreenDateArr) {
          let item = this.ScreenDateArr[i];
          if (item.value == val) {
            this.StartDate = momentTime(item.arr.dateArr[0], 'YYYY-MM-DD');
            this.EndDate = momentTime(item.arr.dateArr[1], 'YYYY-MM-DD');
          }
        }
      } else {
        this.StartDate = '';
        this.EndDate = '';
      }
      this.$emit("ObtainDate", this.StartDate, this.EndDate)
    },
    StartEndChange (str) {
      let S, E;
      if (this.StartDate) {
        S = this.StartDate
      } else {
        S = '';
        this.ScreenValue = "";
      }
      if (this.EndDate) {
        E = this.EndDate
      } else {
        E = '';
        this.ScreenValue = "";
      }
      if (str == 1) {
        if (S != "" && E == "") {
          this.$refs['EndSele'].focus();
        }
      }
      this.$emit("ObtainDate", S, E)
    },
  }
}
</script>

<style scoped lang="scss">
</style>
